/* ═══════════════════════════════════════════════
   js/systems/engine.js
   Scene engine — the core game loop.
   Merges all scene files into SCENES, routes to
   combat / debate / ending as needed, builds the
   choice buttons, and fires post-scene hooks.
═══════════════════════════════════════════════ */

/* Merge all scene namespaces into one flat object */
const SCENES = Object.assign(
  {},
  ACT1_SCENES,
  ACT2_SCENES,
  ACT3_SCENES,
  SIDEQUEST_SCENES,
);

const Engine = {
  _guardDepth: 0,
  _guardMax: 50,

  /** Navigate to a scene by key */
  go(id) {
    /* Guard against infinite loops */
    if (this._guardDepth > this._guardMax) {
      console.error('Engine.go — infinite loop detected, forcing reset');
      this._guardDepth = 0;
      Engine.go('intro');
      return;
    }
    this._guardDepth++;

    if (id === '__ending__') { Overlays.showEnding(); this._guardDepth = 0; return; }

    const scene = SCENES[id];
    if (!scene) {
      console.warn('Engine.go — unknown scene:', id);
      this._guardDepth = 0;
      Engine.go('intro');
      return;
    }

    /* Save current scene for death-continue */
    State.scene      = id;
    State.deathScene = id;

    /* Reset guard depth after successful render */
    this._guardDepth = 0;

    /* Close any open overlay */
    Overlays.closeAll();

    /* Apply scene-level stat changes */
    if (scene.changes) State.applyChanges(scene.changes);

    /* Update act counter */
    if (scene.act) {
      const map = { 'ACT I — THE EMPIRE':1, 'ACT II — THE SILENCE':2, 'ACT III — DHARMASHOKA':3 };
      const n = map[scene.act];
      if (n && n > State.act) {
        State.act = n;
        /* Auto-save on act transitions */
        Save.write('auto');
        UI.notify(`💾 Act ${n} — auto-saved`, 'gold');
      }
    }

    /* Special scene types */
    if (scene.special === 'combat')  { Combat.start(scene.enemy, scene.nextScene); return; }
    if (scene.special === 'debate')  { Debate.start(scene.debateId); return; }

    /* ── Render art ── */
    const artEl = document.getElementById('scene-art');
    artEl.innerHTML = '';
    const artFn = ART[scene.art] || ART.pataliputra;
    artFn(artEl);
    artEl.innerHTML += '<div class="art-gradient"></div>'
      + '<div class="scene-loc-badge" id="scene-loc"></div>'
      + '<div class="scene-act-badge" id="scene-act-badge"></div>';
    document.getElementById('scene-loc').textContent      = scene.loc || '';
    document.getElementById('scene-act-badge').textContent = scene.act || '';

    /* ── Render story text with typewriter effect ── */
    const bodyEl = document.getElementById('story-body');
    const storyText = scene.text || '';
    bodyEl.innerHTML = `<div class="scene-text-transition"><div class="story-typewriter" id="story-typewriter"></div></div>`;
    document.getElementById('story-area').scrollTop = 0;

    /* Start typewriter animation */
    Engine._typewrite('story-typewriter', storyText, 20);

    /* ── Render choices ── */
    const wrap = document.getElementById('choices-area');
    wrap.innerHTML = '';
    (scene.choices || []).forEach(ch => {
      /* Filter class-exclusive, item-gated, spoke-gated, and meta-gated choices */
      if (ch.class       && ch.class       !== State.cls)                          return;
      if (ch.requireItem && !State.inventory.includes(ch.requireItem))          return;
      if (ch.requireSpoke) {
        const { name, min } = ch.requireSpoke;
        if ((State.spokes[name] || 0) < min) return;
      }
      if (ch.requireReputation) {
        const req = ch.requireReputation;
        if (req && typeof req === 'object') {
          for (const [k, min] of Object.entries(req)) {
            if (typeof k !== 'string') continue;
            const v = (State.reputation?.[k] ?? 0);
            if (v < Number(min || 0)) return;
          }
        }
      }
      if (ch.requireMotif) {
        const req = ch.requireMotif;
        if (typeof req === 'string') {
          const key = req;
          if ((State.motifs?.[key] || 0) <= 0) return;
        } else if (req && typeof req === 'object') {
          for (const [k, min] of Object.entries(req)) {
            const v = (State.motifs?.[k] || 0);
            if (v < Number(min || 0)) return;
          }
        }
      }
      if (ch.requireOathsHonored) {
        const min = Number(ch.requireOathsHonored || 0);
        const honored = (Array.isArray(State.oaths) ? State.oaths : [])
          .filter(o => o && o.resolved && !o.broken).length;
        if (honored < min) return;
      }

      const btn = document.createElement('button');
      btn.className = 'choice-item fade-in';
      if (ch.dharma    > 0) btn.classList.add('ci-dharma');
      if (ch.dharmaLoss > 0) btn.classList.add('ci-blood');
      if (ch.class)         btn.classList.add('ci-intel');

      /* Build label with floating meta tags */
      const metas = [];
      if (ch.dharma    > 0) metas.push(`<span class="choice-meta meta-dharma">+${ch.dharma} dharma</span>`);
      if (ch.dharmaLoss > 0) metas.push(`<span class="choice-meta meta-blood">−${ch.dharmaLoss} dharma</span>`);
      if (ch.class)          metas.push(`<span class="choice-meta meta-class">${CLASSES_DATA[ch.class]?.name} only</span>`);
      if (ch.requireItem)    metas.push(`<span class="choice-meta meta-class">Needs: ${ITEMS_DATA[ch.requireItem]?.name}</span>`);
      if (ch.requireSpoke)   metas.push(`<span class="choice-meta meta-class">${ch.requireSpoke.name} ≥${ch.requireSpoke.min}</span>`);
      btn.innerHTML = metas.join('') + ch.text;

      btn.onclick = () => Engine._choose(ch);
      wrap.appendChild(btn);
    });

    /* Post-render HUD refresh */
    HUD.update();
    Audio.setAmbiance(scene.art);
    Engine._postSceneHooks();
  },

  /** Handle a choice click */
  _choose(ch) {
    /* ── Optional skill check (deeper choice mechanic) ──
       If ch.check exists, resolve success/failure and route to:
         - ch.onSuccessNext (or ch.next on success)
         - ch.onFailNext
       Also optionally apply:
         - ch.successChanges / ch.failChanges via applyChanges()
    */
    let resolvedNext = ch.next;
    let changesToApply = null;

    if (ch.check && typeof ch.check === 'object') {
      const stat = ch.check.stat || 'intel';
      const dc    = Number(ch.check.dc || 10);
      const failType = ch.failType || 'fail';

      /* Basic stat resolver (extend later) */
      let value = 0;
      if (stat === 'intel') value = State.intel.length * 2;
      else if (stat === 'dharma') value = State.dharmaScore / 8;
      else if (stat === 'ashokaRel') value = State.ashokaRel / 10;
      else if (stat === 'gold') value = State.gold / 50;

      /* Momentum can bias checks */
      const momentum = (State.momentum && typeof State.momentum.value === 'number') ? State.momentum.value : 50;
      const bias = (momentum - 50) / 10; // -5..+5

      const roll = Math.random() * 20 + value + bias;

      const success = roll >= dc;

      if (success) {
        resolvedNext = ch.onSuccessNext || ch.onSuccess || ch.next;
        changesToApply = ch.successChanges || null;
      } else {
        resolvedNext = ch.onFailNext || ch.onFail || ch.next;
        changesToApply = ch.failChanges || null;
        if (failType === 'partial') {
          /* Optional: allow partial success reward blocks */
          if (ch.partialChanges) changesToApply = ch.partialChanges;
        }
      }
    }

    /* ── Apply legacy dharma/item/flags/etc ── */
    if (ch.dharma)     { State.dharmaScore = Math.min(100, State.dharmaScore + ch.dharma);    HUD.adjustSpokes(ch.dharma,    true); }
    if (ch.dharmaLoss) { State.dharmaScore = Math.max(0,   State.dharmaScore - ch.dharmaLoss); HUD.adjustSpokes(ch.dharmaLoss, false); }
    if (ch.item && !State.inventory.includes(ch.item)) {
      State.inventory.push(ch.item);
      State.applyItemEffect(ch.item);
      UI.notify(`Acquired: ${ITEMS_DATA[ch.item]?.name || ch.item}`, 'gold');
    }

    /* Meta changes at choice-level (backward compatible) */
    let didApplyMeta = false;

    if (changesToApply && typeof changesToApply === 'object') {
      State.applyChanges(changesToApply);
      didApplyMeta = true;
    } else if (ch.changes && typeof ch.changes === 'object') {
      State.applyChanges(ch.changes);
      didApplyMeta = true;
    }

    /* Support direct fields without requiring a `changes` wrapper */
    if (!didApplyMeta && (ch.reputationDelta || ch.reputationSet || ch.motif || ch.motifDelta || ch.motifSet || ch.oathAdd || ch.oathResolve || ch.oathBreak || typeof ch.momentumDelta === 'number' || typeof ch.momentumSet === 'number')) {
      State.applyChanges({
        reputationDelta: ch.reputationDelta,
        reputationSet: ch.reputationSet,
        motif: ch.motif,
        motifDelta: ch.motifDelta,
        motifSet: ch.motifSet,
        oathAdd: ch.oathAdd,
        oathResolve: ch.oathResolve,
        oathBreak: ch.oathBreak,
        momentumDelta: ch.momentumDelta,
        momentumSet: ch.momentumSet,
      });
    }

    /* Side-quest hooks */
    if (ch.questAdvance) Quests.advance(ch.questAdvance);
    if (ch.onComplete)   Quests.complete(ch.onComplete);

    State.journal.push({ scene: State.scene, choice: ch.text.substring(0, 60) });
    State.choiceCount++;

    HUD.update();
    Audio.playSfx('choice');
    Engine.go(resolvedNext);
  },

  /** Write text character by character into a container */
  _typewrite(elId, text, speed = 12) {
    const el = document.getElementById(elId);
    if (!el) return;
    Engine._skipTypewrite = false;
    el.innerHTML = '';
    let i = 0;
    const writeNext = () => {
      if (Engine._skipTypewrite) {
        el.innerHTML = text;
        return;
      }
      if (i >= text.length) return;
      /* Handle HTML tags — insert them atomically */
      if (text[i] === '<') {
        const end = text.indexOf('>', i);
        if (end !== -1) {
          el.innerHTML += text.substring(i, end + 1);
          i = end + 1;
          setTimeout(writeNext, speed);
          return;
        }
      }
      el.innerHTML += text[i++];
      setTimeout(writeNext, speed);
    };
    setTimeout(writeNext, 80);

    /* Clicking story area skips typewriter */
    const storyArea = document.getElementById('story-area');
    const skipHandler = () => { Engine._skipTypewrite = true; };
    storyArea.removeEventListener('click', storyArea._twSkip);
    storyArea.addEventListener('click', skipHandler, { once: true });
    storyArea._twSkip = skipHandler;
  },

  /** Hooks that fire after every scene transition */
  _postSceneHooks() {
    Quests.checkActivations();
    Achievements.check();
    Relationships.update();

    /* Momentum decay (minimal + safe; won’t break existing content)
       Scenes with special combat/debate tend to reduce “political momentum”. */
    const id = State.scene;
    const scene = SCENES[id];
    if (!scene) return;

    let decay = 0;
    if (scene.special === 'combat' || scene.special === 'debate') decay -= 1;
    if (scene.act) decay -= 2; /* act progression = friction */

    if (decay !== 0 && State.momentum && typeof State.momentum.value === 'number') {
      State.momentum.value = Math.max(0, Math.min(100, State.momentum.value + decay));
      HUD.update();
    }
  },
};

/* Global shorthand used by onclick attributes in HTML and data files */
window.goScene = (id) => Engine.go(id);
