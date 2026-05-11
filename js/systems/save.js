/* ═══════════════════════════════════════════════
   js/systems/save.js
   localStorage save / load — 3 slots.
═══════════════════════════════════════════════ */

const Save = {
  _key: (slot) => `dharmavijaya_save_${slot}`,

  write(slot) {
    try {
      localStorage.setItem(this._key(slot), JSON.stringify(State.serialise()));
      UI.notify('Journey saved ✓', 'dharma');
    } catch (e) {
      UI.notify('Save failed — storage unavailable.', 'blood');
    }
  },

  _validate(d) {
    if (!d || typeof d !== 'object' || Array.isArray(d)) return false;
    if (typeof d.dharmaScore !== 'number') return false;
    if (typeof d.scene !== 'string')       return false;
    if (typeof d.act   !== 'number')       return false;
    /* Block prototype pollution keys */
    const dangerous = ['__proto__', 'constructor', 'prototype'];
    if (Object.keys(d).some(k => dangerous.includes(k))) return false;
    return true;
  },

  read(slot) {
    try {
      const raw = localStorage.getItem(this._key(slot));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return this._validate(parsed) ? parsed : null;
    } catch (e) { return null; }
  },

  load(slot) {
    const data = this.read(slot);
    if (!data) { UI.notify('No save found in that slot.', 'blood'); return; }
    State.load(data);
    Overlays.closeAll();
    UI.showScreen('game');
    HUD.update();
    HUD.updateDharmaWheel();
    HUD.updateInventory();
    HUD.updateStats();
    Engine.go(State.scene || 'intro');
  },

  meta(slot) {
    const d = this.read(slot);
    if (!d) return null;
    return {
      name:    d.name        || '—',
      tagline: d.tagline     || '—',
      act:     d.act         || 1,
      dharma:  d.dharmaScore || 0,
      date:    new Date(d.savedAt || 0).toLocaleDateString(),
    };
  },
};

window.Save = Save;
