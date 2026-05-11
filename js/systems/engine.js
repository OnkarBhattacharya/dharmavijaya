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

  /** Navigate to a scene by key */
  go(id) {
    if (id === '__ending__') { Overlays.showEnding(); return; }

    const scene = SCENES[id];
    if (!scene) { console.warn('Engine.go — unknown scene:', id); Engine.go('intro'); return; }

    /* Save current scene for death-continue */
    State.scene      = id;
    State.deathScene = id;

    /* Close any open overlay */
    Overlays.closeAll();

    /* Apply scene-level stat changes */
    if (scene.changes) State.applyChanges(scene.changes);

    /* Update act counter */
    if (scene.act) {
      const map = { 'ACT I — THE EMPIRE':1, 'ACT II — THE SILENCE':2, 'ACT III — DHARMASHOKA':3 };
      const n = map[scene.act];
      if (n && n > State.act) State.act = n;
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

    /* ── Render story text ── */
    const bodyEl = document.getElementById('story-body');
    bodyEl.innerHTML = `<div class="fade-in">${scene.text || ''}</div>`;
    document.getElementById('story-area').scrollTop = 0;

    /* ── Render choices ── */
    const wrap = document.getElementById('choices-area');
    wrap.innerHTML = '';
    (scene.choices || []).forEach(ch => {
      /* Filter class-exclusive and item-gated choices */
      if (ch.class       && ch.class       !== State.cls)             return;
      if (ch.requireItem && !State.inventory.includes(ch.requireItem)) return;

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
    if (ch.dharma)     { State.dharmaScore = Math.min(100, State.dharmaScore + ch.dharma);    HUD.adjustSpokes(ch.dharma,    true); }
    if (ch.dharmaLoss) { State.dharmaScore = Math.max(0,   State.dharmaScore - ch.dharmaLoss); HUD.adjustSpokes(ch.dharmaLoss, false); }
    if (ch.item && !State.inventory.includes(ch.item)) {
      State.inventory.push(ch.item);
      UI.notify(`Acquired: ${ITEMS_DATA[ch.item]?.name || ch.item}`, 'gold');
    }

    /* Side-quest completion hook */
    if (ch.onComplete) Quests.complete(ch.onComplete);

    State.journal.push({ scene: State.scene, choice: ch.text.substring(0, 60) });
    State.choiceCount++;

    HUD.update();
    Audio.playSfx('choice');
    Engine.go(ch.next);
  },

  /** Hooks that fire after every scene transition */
  _postSceneHooks() {
    Quests.checkActivations();
    Achievements.check();
    Relationships.update();
  },
};

/* Global shorthand used by onclick attributes in HTML and data files */
window.goScene = (id) => Engine.go(id);
