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

  read(slot) {
    try {
      const raw = localStorage.getItem(this._key(slot));
      return raw ? JSON.parse(raw) : null;
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
