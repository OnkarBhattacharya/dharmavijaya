/* ═══════════════════════════════════════════════
   js/systems/hud.js
   HUD bars, Dharma Wheel, inventory, stats pane.
═══════════════════════════════════════════════ */

const HUD = {

  _esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  /** Refresh all HUD elements */
  update() {
    this._set('hud-name',         State.name);
    this._set('hud-class',        State.tagline);
    this._set('hud-dharma-score', State.dharmaScore);
    this._set('hud-gold',         State.gold);
    this._set('hud-act',          `ACT ${State.act}`);
    this._set('txt-hp',           `${State.hp}/${State.maxHp}`);
    this._style('bar-hp',     'width', `${(State.hp    / State.maxHp)    * 100}%`);
    this._style('bar-dharma', 'width', `${State.dharmaScore}%`);
    this._style('bar-mp',     'width', `${(State.mp    / State.maxMp)    * 100}%`);
    this._set('wheel-score', State.dharmaScore);
    this.updateDharmaWheel();

    /* Optional: meta panel (only if sidebar elements exist) */
    this.updateMetaPanel();
  },

  /** Nudge 2-3 random spokes by delta */
  adjustSpokes(delta, positive) {
    const keys  = Object.keys(State.spokes);
    const count = positive ? 3 : 2;
    [...keys].sort(() => Math.random() - 0.5).slice(0, count).forEach(k => {
      if (!Object.prototype.hasOwnProperty.call(State.spokes, k)) return;
      const change = (delta / count) * (positive ? 1 : -1);
      State.spokes[k] = Math.max(0, Math.min(100, State.spokes[k] + change));
    });
    this.updateDharmaWheel();
  },

  /** Redraw the SVG Dharma Wheel and spoke bars */
  updateDharmaWheel() {
    const spokes = State.spokes;
    const keys   = Object.keys(spokes);
    const cx = 60, cy = 60, r = 48;
    const aStep = (Math.PI * 2) / keys.length;

    const pts  = keys.map((k, i) => {
      const a   = i * aStep - Math.PI / 2;
      const len = (spokes[k] / 100) * r;
      return [cx + Math.cos(a) * len, cy + Math.sin(a) * len];
    });

    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + 'Z';

    const spokeLines = keys.map((k, i) => {
      const a = i * aStep - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#2E7D6E" stroke-width=".6" opacity=".3"/>`;
    }).join('');

    const svg = document.getElementById('dharma-wheel-svg');
    if (svg) {
      svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}"      fill="none" stroke="#2E7D6E" stroke-width=".7" opacity=".18"/>
        <circle cx="${cx}" cy="${cy}" r="${r * .66}" fill="none" stroke="#2E7D6E" stroke-width=".4" opacity=".12"/>
        <circle cx="${cx}" cy="${cy}" r="${r * .33}" fill="none" stroke="#2E7D6E" stroke-width=".3" opacity=".08"/>
        ${spokeLines}
        <path d="${path}" fill="#2E7D6E" fill-opacity=".22" stroke="#4ECDC4" stroke-width="1.2"/>
        <circle cx="${cx}" cy="${cy}" r="5" fill="#2E7D6E" opacity=".75"/>`;
    }

    /* Spoke bars */
    const cont = document.getElementById('spokes-container');
    if (cont) {
      cont.innerHTML = keys.map(k => `
        <div class="spoke-row">
          <div class="spoke-name">
            <span>${k}</span>
            <span style="color:var(--dharma-light);font-family:var(--font-display);font-size:10px">${Math.round(spokes[k])}</span>
          </div>
          <div class="spoke-track"><div class="spoke-fill" style="width:${spokes[k]}%"></div></div>
        </div>`).join('');
    }

    /* Rebuild the wheel pane shell if missing */
    const pane = document.getElementById('pane-wheel');
    if (pane && !document.getElementById('dharma-wheel-svg')) {
      this._buildWheelPane();
    }
  },

  _buildWheelPane() {
    const pane = document.getElementById('pane-wheel');
    if (!pane) return;
    const clsIcon = CLASSES_DATA[State.cls];
    pane.innerHTML = `
      <div class="char-portrait-row">
        <div class="char-portrait-icon">${clsIcon?.icon || '☸'}</div>
        <div class="char-portrait-info">
          <div class="char-portrait-name">${this._esc(State.name)}</div>
          <div class="char-portrait-role">${this._esc(State.tagline)}</div>
        </div>
      </div>
      <div class="wheel-container">
        <svg id="dharma-wheel-svg" viewBox="0 0 120 120"></svg>
        <div class="wheel-score" id="wheel-score">${State.dharmaScore}</div>
        <div class="wheel-label">Dharma Score</div>
      </div>
      <div id="spokes-container"></div>`;
    this.updateDharmaWheel();
  },

  /** Rebuild inventory grid */
  updateInventory() {
    const grid = document.getElementById('inv-grid');
    if (!grid) return;
    if (State.inventory.length === 0) {
      grid.innerHTML = '<div class="lore-empty">No items carried.</div>';
      return;
    }
    grid.innerHTML = State.inventory.map(key => {
      const item = ITEMS_DATA[key];
      if (!item) return '';
      return `<div class="inv-item">
        <div class="item-tooltip">${item.desc}</div>
        <div class="inv-icon">${item.icon}</div>
        <div class="inv-name">${item.name}</div>
        <div class="inv-type">${item.type}</div>
      </div>`;
    }).join('');
  },

  /** Rebuild the stats pane */
  updateStats() {
    const list = document.getElementById('stats-list');
    if (!list) return;

    const rows = [
      ['Class',         this._esc(State.name || '—')],
      ['Act',           `${State.act} of 3`],
      ['HP',            `${State.hp} / ${State.maxHp}`],
      ['MP',            `${State.mp} / ${State.maxMp}`],
      ['Attack',        State.attack],
      ['Defense',       State.defense],
      ['Gold',          `${State.gold} panas`],
      ['Choices made',  State.choiceCount],
      ['Lore found',    State.lore.length],
      ['Quests done',   State.completedQuests.length],
    ];

    list.innerHTML = rows.map(([k, v]) =>
      `<div class="stat-row"><span class="stat-key">${k}</span><span class="stat-val">${v}</span></div>`
    ).join('');

    /* Ashoka relationship bar */
    let relSec = document.getElementById('rel-section');
    if (!relSec) {
      relSec = document.createElement('div');
      relSec.id = 'rel-section';
      relSec.className = 'rel-section';
      list.parentNode.appendChild(relSec);
    }
    const lvl = State.ashokaRel >= 80 ? 'Trusted Counselor'
              : State.ashokaRel >= 60 ? 'Valued Advisor'
              : State.ashokaRel >= 40 ? 'Known Agent'
              : State.ashokaRel >= 20 ? 'Uncertain Ally'
              : 'Suspicious Asset';
    relSec.innerHTML = `
      <div class="pane-section-title" style="margin-top:12px">Ashoka's Trust</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px">
        <span style="font-size:10px;color:var(--ash)">Relationship</span>
        <span style="font-size:10px;color:var(--gold);font-family:var(--font-display)">${lvl}</span>
      </div>
      <div style="height:4px;background:rgba(42,26,16,.6);border-radius:2px;overflow:hidden">
        <div style="height:100%;width:${State.ashokaRel}%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:2px;transition:width .5s"></div>
      </div>
      <div class="pane-section-title" style="margin-top:12px">Intelligence</div>
      <div id="intel-list">
        ${State.intel.length === 0
          ? '<div style="font-size:11px;color:var(--stone);font-style:italic">No intelligence gathered.</div>'
          : State.intel.slice(-5).reverse().map(entry =>
              `<div class="intel-item"><div class="intel-body">${this._esc(entry)}</div></div>`
            ).join('')}
      </div>`;
  },

  /** Optional meta meters: reputation, motifs, oaths summary */
  updateMetaPanel() {
    /* Guard if sidebar container doesn’t exist yet */
    const list = document.getElementById('stats-list');
    if (!list) return;

    let metaSec = document.getElementById('meta-section');
    if (!metaSec) {
      metaSec = document.createElement('div');
      metaSec.id = 'meta-section';
      metaSec.className = 'meta-section';
      list.parentNode.appendChild(metaSec);
    }

    const rep = State.reputation || { court: 50, brahmin: 50, kalinga: 50 };
    const motifs = State.motifs || {};
    const motifEntries = Object.entries(motifs)
      .filter(([, v]) => Number(v) > 0)
      .sort((a, b) => (b[1] || 0) - (a[1] || 0))
      .slice(0, 4);

    const oaths = Array.isArray(State.oaths) ? State.oaths : [];
    const honored = oaths.filter(o => o && o.resolved && !o.broken).length;
    const broken  = oaths.filter(o => o && o.broken).length;

    const motifLine = motifEntries.length === 0
      ? `<div style="font-size:11px;color:var(--stone);font-style:italic">No motifs yet.</div>`
      : motifEntries.map(([k, v]) =>
          `<div style="display:flex;justify-content:space-between;gap:8px">
             <span style="font-size:11px;color:var(--gold-dim)">${this._esc(k)}</span>
             <span style="font-size:11px;color:var(--gold);font-family:var(--font-display)">${v}</span>
           </div>`
        ).join('');

    metaSec.innerHTML = `
      <div class="pane-section-title" style="margin-top:12px">Meta — Reputation</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${['court', 'brahmin', 'kalinga'].map((k) => `
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
            <span style="font-size:10px;color:var(--ash)">${k}</span>
            <span style="font-size:10px;color:var(--gold);font-family:var(--font-display)">${Math.round(rep[k] || 0)}%</span>
          </div>
          <div style="height:4px;background:rgba(42,26,16,.6);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${Math.round(rep[k] || 0)}%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:2px;transition:width .5s"></div>
          </div>
        `).join('')}
      </div>

      <div class="pane-section-title" style="margin-top:12px">Motifs & Oaths</div>
      <div style="font-size:11px;color:var(--stone);margin-bottom:6px">
        Oaths honored: <span style="color:var(--dharma-light)">${honored}</span> · Broken: <span style="color:var(--blood)">${broken}</span>
      </div>
      ${motifLine}

      <div style="margin-top:10px;font-size:11px;color:var(--stone)">
        Momentum: <span style="color:var(--gold);font-family:var(--font-display)">${Math.round((State.momentum && State.momentum.value) || 0)}</span>/100
      </div>`;
  },

  /** Rebuild the lore pane */
  updateLore() {
    const cont = document.getElementById('lore-container');
    if (!cont) return;
    if (State.lore.length === 0) {
      cont.innerHTML = '<div class="lore-empty">No chronicles yet. Explore, investigate, and speak with those you meet.</div>';
      return;
    }
    cont.innerHTML = State.lore.map(key => {
      const entry = LORE_DATA[key];
      if (!entry) return '';
      return `<div class="lore-entry">
        <div class="lore-title">${entry.title}</div>
        <div class="lore-body">${entry.text}</div>
      </div>`;
    }).join('');
  },

  /* ── Private helpers ── */
  _set(id, val)        { const el = document.getElementById(id); if (el) el.textContent = val; },
  _style(id, prop, val){ const el = document.getElementById(id); if (el) el.style[prop] = val; },
};

window.HUD = HUD;
