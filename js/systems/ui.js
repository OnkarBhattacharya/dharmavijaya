/* ═══════════════════════════════════════════════
   js/systems/ui.js
   Notifications, screen routing, and all dynamic
   panel overlays (merchant, spy, quests, codex,
   achievements, timeline).
═══════════════════════════════════════════════ */

const UI = {

    _esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  /* ─────────────────────────────────────────────
     Screen management
  ───────────────────────────────────────────── */
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${id}`)?.classList.add('active');
  },

  switchTab(id, el) {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.sidebar-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(`pane-${id}`)?.classList.add('active');

    /* Rebuild pane content on activation */
    if (id === 'lore')  HUD.updateLore();
    if (id === 'inv')   HUD.updateInventory();
    if (id === 'stats') HUD.updateStats();
    if (id === 'wheel') HUD.updateDharmaWheel();
  },

  /* ─────────────────────────────────────────────
     Toast notifications
  ───────────────────────────────────────────── */
  notify(msg, type = 'gold', duration = 2800) {
    const el  = document.createElement('div');
    el.className = `notif notif-${type}`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration);
  },

  /* ─────────────────────────────────────────────
     Class grid builder
  ───────────────────────────────────────────── */
  buildClassGrid() {
    const grid = document.getElementById('class-grid');
    if (!grid) return;
    grid.innerHTML = Object.values(CLASSES_DATA).map(d => `
      <div class="class-card ${d.css}" onclick="Game.selectClass('${d.id}')">
        <span class="card-icon">${d.icon}</span>
        <div class="card-name">${d.name}</div>
        <div class="card-tagline">${d.tagline}</div>
        <div class="card-desc">${d.desc}</div>
        <div class="card-stats">
          ${d.badges.map(([cls, lbl]) => `<span class="stat-badge ${cls}">${lbl}</span>`).join('')}
        </div>
      </div>`).join('');
  },

  /* ─────────────────────────────────────────────
     Merchant
  ───────────────────────────────────────────── */
  openMerchant() {
    this._openPanel('merchant', this._buildMerchant.bind(this));
  },

  _buildMerchant() {
    return `
      <div class="panel-box">
        <div class="panel-title">🛒 THE WANDERING MERCHANT</div>
        <div class="panel-sub">"Rare goods from every corner of the empire"</div>
        <div class="shop-header-row">
          <span class="shop-gold-label">Your panas:</span>
          <span class="shop-gold-value" id="shop-gold-display">◈ ${State.gold}</span>
        </div>
        <div class="shop-grid" id="shop-items-grid">${this._shopGrid()}</div>
        <button class="btn-main" style="width:100%" onclick="UI.closePanel('merchant')">LEAVE MARKET</button>
      </div>`;
  },

  _shopGrid() {
    return SHOP_ITEMS.map(si => {
      const item     = ITEMS_DATA[si.id];
      const owned    = State.inventory.includes(si.id);
      const canAfford = State.gold >= si.price;
      const cls      = owned ? 'owned' : !canAfford ? 'cant-afford' : '';
      const action   = (!owned && canAfford) ? `onclick="UI._buyItem('${si.id}',${si.price})"` : '';
      return `<div class="shop-item ${cls}" ${action}>
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${si.desc}</div>
        <div class="shop-item-price ${owned ? 'price-owned' : canAfford ? 'price-gold' : 'price-blood'}">
          ${owned ? '✓ OWNED' : `◈ ${si.price} panas`}
        </div>
      </div>`;
    }).join('');
  },

  _buyItem(id, price) {
    if (State.gold < price) { this.notify('Insufficient panas.', 'blood'); return; }
    State.gold -= price;
    State.inventory.push(id);
    this.notify(`Purchased: ${ITEMS_DATA[id].name}`, 'gold');
    HUD.update();
    HUD.updateInventory();
    const grid = document.getElementById('shop-items-grid');
    if (grid) grid.innerHTML = this._shopGrid();
    const gd   = document.getElementById('shop-gold-display');
    if (gd)   gd.textContent = `◈ ${State.gold}`;
  },

  /* ─────────────────────────────────────────────
     Spy Network
  ───────────────────────────────────────────── */
  openSpyNetwork() {
    this._openPanel('spy', this._buildSpy.bind(this));
  },

  _buildSpy() {
    const active = Object.keys(State.spyActiveMissions).length;
    return `
      <div class="panel-box">
        <div class="panel-title">🕵 THE SANSTHA NETWORK</div>
        <div class="panel-sub">Mauryan Intelligence — Eyes throughout the empire</div>
        <div class="spy-stats-row">
          <div class="spy-stat-box"><div class="spy-stat-val">${State.gold}</div><div class="spy-stat-label">Panas Available</div></div>
          <div class="spy-stat-box"><div class="spy-stat-val" id="spy-active-count">${active}</div><div class="spy-stat-label">Active Missions</div></div>
        </div>
        <div class="panel-section-label">Available Missions</div>
        <div id="spy-missions-list">${this._spyMissions()}</div>
        <button class="btn-main" style="width:100%;margin-top:4px" onclick="UI.closePanel('spy')">CLOSE NETWORK</button>
      </div>`;
  },

  _spyMissions() {
    return SPY_MISSIONS.map(m => {
      const isActive  = !!State.spyActiveMissions[m.id];
      const done      = !!State.flags[`spy_done_${m.id}`];
      const canAfford = State.gold >= m.cost;
      const cls       = done ? 'done-mission' : isActive ? 'active-mission' : !canAfford ? 'no-funds' : '';
      const action    = (!done && !isActive && canAfford) ? `onclick="UI._deployMission('${m.id}')"` : '';
      const costDisp  = done ? '<span class="cost-done">✓ Done</span>'
                      : isActive ? `<span class="cost-active">${State.spyActiveMissions[m.id]?.turnsLeft || '?'}t left</span>`
                      : `<span class="${canAfford ? 'cost-gold' : 'cost-broke'}">◈ ${m.cost}</span>`;
      return `<div class="spy-mission ${cls}" ${action}>
        <div class="spy-mission-header">
          <span class="spy-mission-name">${m.name}</span>${costDisp}
        </div>
        <div class="spy-mission-desc">${m.description}</div>
      </div>`;
    }).join('');
  },

  _deployMission(id) {
    const m = SPY_MISSIONS.find(x => x.id === id);
    if (!m || State.gold < m.cost || State.spyActiveMissions[id]) return;
    State.gold -= m.cost;
    State.spyActiveMissions[id] = { turnsLeft: m.turns, mission: m };
    this.notify(`Mission deployed: ${m.name}`, 'gold');
    HUD.update();
    setTimeout(() => Spies.complete(id), m.turns * 8000);
    const list = document.getElementById('spy-missions-list');
    if (list) list.innerHTML = this._spyMissions();
  },

  /* ─────────────────────────────────────────────
     Quest Log
  ───────────────────────────────────────────── */
  openQuestLog() {
    this._openPanel('quests', this._buildQuests.bind(this));
  },

  _buildQuests() {
    const activeCards = Object.values(State.activeQuests).map(aq => {
      const q    = SIDE_QUESTS.find(x => x.id === aq.questId);
      if (!q) return '';
      const step = q.steps[aq.currentStep];
      return `<div class="quest-card">
        <div class="quest-card-title">${q.title}</div>
        <div class="quest-card-desc">${q.description}</div>
        <div class="quest-step">▶ ${step?.text || 'Complete'}</div>
        <button class="quest-go-btn" onclick="UI.closePanel('quests');Engine.go('${step?.scene || 'intro'}')">GO TO QUEST</button>
      </div>`;
    }).join('') || '<div class="lore-empty">No active quests.</div>';

    const doneCards = State.completedQuests.map(qid => {
      const q = SIDE_QUESTS.find(x => x.id === qid);
      return q ? `<div class="quest-completed"><div class="quest-completed-title">✓ ${q.title}</div></div>` : '';
    }).join('');

    return `
      <div class="panel-box">
        <div class="panel-title">📋 QUEST LOG</div>
        <div class="panel-section-label">Active Quests</div>
        ${activeCards}
        <div class="panel-section-label" style="margin-top:12px">Completed (${State.completedQuests.length})</div>
        ${doneCards || '<div class="lore-empty">None yet.</div>'}
        <button class="btn-main" style="width:100%;margin-top:12px" onclick="UI.closePanel('quests')">CLOSE LOG</button>
      </div>`;
  },

  /* ─────────────────────────────────────────────
     Codex
  ───────────────────────────────────────────── */
  openCodex() {
    const entries = [
      { icon:'👹', title:'The Asura',          body:'Ancient beings who believe adharma — self-interest, domination — is the true nature of reality. They cannot corrupt what is freely given. They prey on what is half-surrendered. Their weakness: they need us to believe our choices do not matter.' },
      { icon:'🌑', title:'Mara',               body:'Something vast, old, and exhausted that has watched empire after empire collapse. Its power is persuasion, not force. In Buddhist tradition it is the principle of temptation itself. It cannot be killed. It can be answered.' },
      { icon:'🐍', title:'The Nagas',          body:'Serpent beings of great intelligence, maintaining underground kingdoms predating human civilisation. Neutral, amoral information brokers. They deal in truths, not loyalties. The Naga Gem reveals supernatural concealment.' },
      { icon:'🔥', title:'Kali',               body:'Destroyer and protector. She walks near places of great moral reckoning — not as enemy, but as the force that ends what must end. Her presence near Kalinga was a sign: the old order was about to be resolved.' },
      { icon:'🌳', title:'Yakshas',            body:'Nature spirits of forest and crossroads. Mercurial and emotional. They can be bargained with through offerings, or offended through carelessness. They appear at liminal moments — dawn, dusk, threshold crossings.' },
      { icon:'🧿', title:'The Asura Vessel',   body:'A human who accepted an Asura\'s bargain under duress. Unlike the Asura itself, vessels can recover if the entity is removed or weakened. Viduratha was a vessel, not a true agent — his recovery was possible.' },
    ];
    this._openPanel('codex', () => `
      <div class="panel-box">
        <div class="panel-title">📖 CODEX</div>
        ${entries.map(e => `
          <div class="codex-entry">
            <div class="codex-entry-header">
              <span class="codex-entry-icon">${e.icon}</span>
              <span class="codex-entry-title">${e.title}</span>
            </div>
            <div class="codex-entry-body">${e.body}</div>
          </div>`).join('')}
        <button class="btn-main" style="width:100%;margin-top:4px" onclick="UI.closePanel('codex')">CLOSE CODEX</button>
      </div>`);
  },

  /* ─────────────────────────────────────────────
     Achievements
  ───────────────────────────────────────────── */
  openAchievements() {
    this._openPanel('achievements', () => `
      <div class="panel-box">
        <div class="panel-title">🏆 ACHIEVEMENTS</div>
        <div class="achievement-grid">
          ${ACHIEVEMENTS.map(a => {
            const unlocked = State.unlockedAchievements.includes(a.id);
            return `<div class="ach-card ${unlocked ? 'unlocked' : 'locked'}">
              <div class="ach-card-title">${a.title}</div>
              <div class="ach-card-desc">${unlocked ? a.desc : '???'}</div>
            </div>`;
          }).join('')}
        </div>
        <button class="btn-main" style="width:100%" onclick="UI.closePanel('achievements')">CLOSE</button>
      </div>`);
  },

  /* ─────────────────────────────────────────────
     Timeline / Chronicle
  ───────────────────────────────────────────── */
  openTimeline() {
    this._openPanel('timeline', () => {
      const entries = State.journal.slice().reverse().slice(0, 25);
      const html = entries.length === 0
        ? '<div class="lore-empty">No chronicle entries yet.</div>'
        : entries.map((e, i) => `
          <div class="timeline-entry">
            <div class="timeline-num">${State.journal.length - i}</div>
            <div>
              <div class="timeline-scene">${this._esc(e.scene)}</div>
              <div class="timeline-choice">${this._esc(e.choice)}</div>
            </div>
          </div>`).join('');
      return `
        <div class="panel-box">
          <div class="panel-title">📜 YOUR CHRONICLE</div>
          ${html}
          <button class="btn-main" style="width:100%;margin-top:8px" onclick="UI.closePanel('timeline')">CLOSE CHRONICLE</button>
        </div>`;
    });
  },

  /* ─────────────────────────────────────────────
     Generic panel helper
  ───────────────────────────────────────────── */
  _panels: {},

  _openPanel(id, buildFn) {
    let ov = document.getElementById(`panel-${id}`);
    if (!ov) {
      ov = document.createElement('div');
      ov.id        = `panel-${id}`;
      ov.className = 'panel-overlay';
      ov.style.background = 'rgba(13,10,5,.97)';
      document.getElementById('app').appendChild(ov);
    }
    ov.innerHTML = buildFn();
    ov.classList.add('active');
  },

  closePanel(id) {
    document.getElementById(`panel-${id}`)?.classList.remove('active');
  },
};

window.UI = UI;

/* ─────────────────────────────────────────────
   Quests helper (used by engine + UI)
───────────────────────────────────────────── */
const Quests = {
  checkActivations() {
    SIDE_QUESTS.forEach(q => {
      if (State.activeQuests[q.id] || State.completedQuests.includes(q.id)) return;
      if (q.requireFlag && !State.flags[q.requireFlag]) return;
      State.activeQuests[q.id] = { questId: q.id, currentStep: 0 };
      UI.notify(`📋 New quest: ${q.title}`, 'lore', 4000);
    });
  },

  complete(questId) {
    if (!State.activeQuests[questId]) return;
    const q = SIDE_QUESTS.find(x => x.id === questId);
    if (!q) return;
    delete State.activeQuests[questId];
    State.completedQuests.push(questId);
    if (q.reward.dharma)  { State.dharmaScore = Math.min(100, State.dharmaScore + q.reward.dharma); HUD.adjustSpokes(q.reward.dharma, true); }
    if (q.reward.flag)    State.flags[q.reward.flag]  = true;
    if (q.reward.lore  && !State.lore.includes(q.reward.lore))  State.lore.push(q.reward.lore);
    if (q.reward.item  && !State.inventory.includes(q.reward.item)) State.inventory.push(q.reward.item);
    if (q.reward.intel) State.intel.push(q.reward.intel);
    if (q.reward.gold)  { State.gold += q.reward.gold; }
    UI.notify(`✓ Quest complete: ${q.title}`, 'dharma', 4000);
    HUD.update();
    HUD.updateInventory();
  },
};
window.Quests = Quests;

/* ─────────────────────────────────────────────
   Spy mission completion
───────────────────────────────────────────── */
const Spies = {
  complete(id) {
    const entry = State.spyActiveMissions[id];
    if (!entry) return;
    const m = entry.mission;
    delete State.spyActiveMissions[id];
    State.flags[`spy_done_${id}`] = true;
    switch (m.reward) {
      case 'intel': State.intel.push(m.rewardData); UI.notify(`Intelligence received: ${m.name}`, 'lore'); break;
      case 'gold':  State.gold += m.rewardData;     UI.notify(`${m.name} complete — ${m.rewardData} panas earned`, 'gold'); HUD.update(); break;
      case 'flag':  State.flags[m.rewardData] = true; UI.notify(`${m.name} complete`, 'dharma'); break;
      case 'lore':  if (!State.lore.includes(m.rewardData)) { State.lore.push(m.rewardData); UI.notify(`Chronicle unlocked: ${m.name}`, 'lore'); } break;
    }
    HUD.updateStats();
  },
};
window.Spies = Spies;

/* ─────────────────────────────────────────────
   Achievements
───────────────────────────────────────────── */
const Achievements = {
  check() {
    ACHIEVEMENTS.forEach(a => {
      if (State.unlockedAchievements.includes(a.id)) return;
      if (!a.check()) return;
      State.unlockedAchievements.push(a.id);
      this._toast(a);
    });
  },

  _toast(a) {
    const el = document.createElement('div');
    el.className = 'achievement-toast';
    el.innerHTML = `
      <div class="ach-eyebrow">ACHIEVEMENT UNLOCKED</div>
      <div class="ach-title">${a.title}</div>
      <div class="ach-desc">${a.desc}</div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  },
};
window.Achievements = Achievements;

/* ─────────────────────────────────────────────
   Relationships
───────────────────────────────────────────── */
const Relationships = {
  _applied: new Set(),

  update() {
    const checks = [
      { flag:'civilians_question', delta:8,  key:'_rel_civ' },
      { flag:'kalinga_fully_freed', delta:15, key:'_rel_kal' },
      { flag:'brahmin_debate_heart', delta:10, key:'_rel_deb' },
      { flag:'mara_withdrawn_peacefully', delta:20, key:'_rel_mar' },
      { flag:'chandrasena_solved', delta:5, key:'_rel_chan' },
      { flag:'push_advisor', delta:6, key:'_rel_push' },
    ];
    checks.forEach(({ flag, delta, key }) => {
      if (State.flags[flag] && !this._applied.has(key)) {
        this._applied.add(key);
        State.ashokaRel = Math.max(0, Math.min(100, State.ashokaRel + delta));
        if (delta >= 5) UI.notify(`Ashoka's trust deepens (+${delta})`, 'dharma');
      }
    });
  },
};
window.Relationships = Relationships;
