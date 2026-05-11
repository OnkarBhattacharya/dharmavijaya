/* ═══════════════════════════════════════════════
   js/systems/overlays.js
   Manages the fixed overlays declared in index.html:
   combat, debate, map, save, gameover, ending.
   Dynamic panels (merchant, spy, etc.) are handled
   by UI._openPanel() in ui.js.
═══════════════════════════════════════════════ */

const Overlays = {

  /** Escape a string for safe innerHTML insertion */
  _esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  open(id) {
    document.getElementById(`overlay-${id}`)?.classList.add('active');
  },

  close(id) {
    document.getElementById(`overlay-${id}`)?.classList.remove('active');
  },

  closeAll() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    /* Also close dynamic panels */
    document.querySelectorAll('.panel-overlay').forEach(el => el.classList.remove('active'));
    /* Kill any live debate timer */
    if (State.debate?.timerInterval) {
      clearInterval(State.debate.timerInterval);
      State.debate.timerInterval = null;
    }
  },

  /* ─────────────────────────────────────────────
     Map overlay
  ───────────────────────────────────────────── */
  buildMap() {
    const grid = document.getElementById('map-grid');
    if (!grid) return;
    grid.innerHTML = MAP_LOCS_DATA.map(loc => {
      const isCurrent = loc.key === State.location;
      const cls       = isCurrent ? 'map-loc current' : 'map-loc';
      const click     = loc.unlocked
        ? `onclick="Engine.go('${loc.scene}'); Overlays.close('map')"`
        : '';
      return `<div class="${cls}" ${click}>
        <div class="map-loc-icon">${loc.icon}</div>
        <div class="map-loc-name">${this._esc(loc.name)}</div>
        <div class="map-loc-sub">${loc.unlocked ? this._esc(loc.sub) : '🔒 Locked'}</div>
      </div>`;
    }).join('');
  },

  toggleMap() {
    const ov = document.getElementById('overlay-map');
    if (!ov) return;
    if (ov.classList.contains('active')) {
      this.close('map');
    } else {
      /* Ensure map overlay has its HTML shell */
      if (!ov.innerHTML.trim()) {
        ov.innerHTML = `
          <div class="map-title">🗺 The Mauryan World</div>
          <div class="map-sub">Travel to a known region</div>
          <div class="map-grid" id="map-grid"></div>
          <button class="btn-main" style="font-size:11px" onclick="Overlays.close('map')">✕ Close Map</button>`;
      }
      this.buildMap();
      this.open('map');
    }
  },

  /* ─────────────────────────────────────────────
     Save / Load overlay
  ───────────────────────────────────────────── */
  showSave(mode) {
    const ov = document.getElementById('overlay-save');
    if (!ov) return;

    ov.innerHTML = `
      <div class="save-panel">
        <div class="save-title">${mode === 'save' ? 'SAVE JOURNEY' : 'CONTINUE JOURNEY'}</div>
        <div id="save-slots"></div>
        <button class="btn-main" style="width:100%;margin-top:8px;font-size:10px"
          onclick="Overlays.close('save')">CANCEL</button>
      </div>`;

    const cont = document.getElementById('save-slots');
    for (let i = 1; i <= 3; i++) {
      const meta = Save.meta(i);
      const slot = document.createElement('div');
      slot.className = 'save-slot';

      if (meta) {
        slot.innerHTML = `
          <div class="save-slot-num">${i}</div>
          <div class="save-slot-info">
            <div class="save-slot-name">${this._esc(meta.name)} — ${this._esc(meta.tagline)}</div>
            <div class="save-slot-meta">Act ${this._esc(String(meta.act))} · Dharma ${this._esc(String(meta.dharma))} · ${this._esc(meta.date)}</div>
          </div>
          <div class="save-slot-action">${mode === 'save' ? 'OVERWRITE' : 'LOAD'}</div>`;
        slot.onclick = () => {
          if (mode === 'save') { Save.write(i); this.close('save'); }
          else                 { Save.load(i); }
        };
      } else {
        slot.innerHTML = `
          <div class="save-slot-num">${i}</div>
          <div class="save-slot-info">
            <div class="save-slot-name" style="color:var(--stone)">Empty Slot</div>
          </div>
          <div class="save-slot-action">${mode === 'save' ? 'SAVE HERE' : '—'}</div>`;
        if (mode === 'save') slot.onclick = () => { Save.write(i); this.close('save'); };
      }
      cont.appendChild(slot);
    }
    this.open('save');
  },

  /* ─────────────────────────────────────────────
     Game over overlay
  ───────────────────────────────────────────── */
  buildGameOver() {
    const ov = document.getElementById('overlay-gameover');
    if (!ov) return;
    ov.innerHTML = `
      <div class="go-title">THE WHEEL IS STILL</div>
      <div class="go-sub">Your dharma was tested and found… incomplete</div>
      <div class="go-score" id="go-score">${State.dharmaScore}</div>
      <div class="go-score-label">DHARMA ACCUMULATED</div>
      <button class="btn-main" style="margin-bottom:10px"
        onclick="Overlays._continueFromDeath()">☸ CONTINUE FROM LAST SCENE</button>
      <button class="btn-text" onclick="Game.goTitle()">Return to Title</button>`;
  },

  _continueFromDeath() {
    State.hp = Math.floor(State.maxHp * 0.4);
    this.close('gameover');
    Engine.go(State.deathScene || 'intro');
  },

  /* ─────────────────────────────────────────────
     Ending overlay
  ───────────────────────────────────────────── */
  showEnding() {
    const endId  = computeEnding();
    const end    = ENDINGS[endId];
    const ov     = document.getElementById('overlay-ending');
    if (!ov) return;

    ov.innerHTML = `
      <div class="ending-container">
        <div class="ending-icon">${end.icon}</div>
        <div class="ending-title" style="color:${this._esc(end.color)}">${this._esc(end.title)}</div>
        <div class="ending-dharma-label">${this._esc(end.dharmaLabel)}</div>
        <div class="divider" style="margin:0 auto 16px"></div>
        <div class="ending-text">${end.text}</div>
        <div class="ending-stats">
          <div class="ending-stat">
            <div class="ending-stat-val">${State.dharmaScore}</div>
            <div class="ending-stat-key">Dharma Score</div>
          </div>
          <div class="ending-stat">
            <div class="ending-stat-val">${State.choiceCount}</div>
            <div class="ending-stat-key">Choices Made</div>
          </div>
          <div class="ending-stat">
            <div class="ending-stat-val">${State.lore.length}</div>
            <div class="ending-stat-key">Chronicles Found</div>
          </div>
        </div>
        <button class="btn-main" style="width:100%;margin-bottom:10px"
          onclick="location.reload()">☸ PLAY AGAIN</button>
        <button class="btn-text" onclick="Overlays.showSave('save')">Save Final State</button>
      </div>`;

    this.open('ending');
  },
};

window.Overlays = Overlays;
