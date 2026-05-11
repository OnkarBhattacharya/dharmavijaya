/* ═══════════════════════════════════════════════
   js/systems/audio.js
   Web Audio API ambient sound and SFX.
   Entirely optional — gracefully degrades if
   AudioContext is unavailable.
═══════════════════════════════════════════════ */

const Audio = {
  _ctx:     null,
  _nodes:   {},
  _enabled: false,

  _init() {
    if (this._ctx) return;
    try {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio not available');
    }
  },

  toggle() {
    this._init();
    this._enabled = !this._enabled;
    const btn = document.getElementById('btn-sound');
    if (btn) btn.textContent = this._enabled ? '🔊 SOUND' : '🔇 SOUND';
    if (!this._enabled) this._stopAmbiance();
    UI.notify(this._enabled ? 'Ambient sound on' : 'Sound off', 'gold');
  },

  setAmbiance(artKey) {
    if (!this._enabled || !this._ctx) return;
    const map = {
      jungle:     { freq:110, wave:'sine',     gain:0.025 },
      barracks:   { freq:80,  wave:'sawtooth', gain:0.02  },
      pataliputra:{ freq:55,  wave:'sine',     gain:0.04  },
      throne:     { freq:55,  wave:'sine',     gain:0.04  },
      kalinga:    { freq:65,  wave:'sawtooth', gain:0.02  },
      temple:     { freq:110, wave:'sine',     gain:0.025 },
      combat:     { freq:80,  wave:'sawtooth', gain:0.02  },
    };
    const cfg = map[artKey] || map.pataliputra;
    this._stopAmbiance();
    const osc  = this._ctx.createOscillator();
    const gain = this._ctx.createGain();
    osc.type           = cfg.wave;
    osc.frequency.value = cfg.freq;
    gain.gain.value    = cfg.gain;
    osc.connect(gain);
    gain.connect(this._ctx.destination);
    osc.start();
    this._nodes = { osc, gain };
  },

  playSfx(type) {
    if (!this._enabled || !this._ctx) return;
    const osc  = this._ctx.createOscillator();
    const gain = this._ctx.createGain();
    osc.connect(gain);
    gain.connect(this._ctx.destination);
    gain.gain.setValueAtTime(0.15, this._ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this._ctx.currentTime + 0.4);
    switch (type) {
      case 'choice': osc.frequency.setValueAtTime(440, this._ctx.currentTime); osc.frequency.linearRampToValueAtTime(550, this._ctx.currentTime + 0.1); break;
      case 'hit':    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, this._ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(50, this._ctx.currentTime + 0.3); break;
      case 'dharma': osc.frequency.setValueAtTime(528, this._ctx.currentTime); osc.frequency.linearRampToValueAtTime(660, this._ctx.currentTime + 0.3); break;
    }
    osc.start();
    osc.stop(this._ctx.currentTime + 0.5);
  },

  _stopAmbiance() {
    try { if (this._nodes.osc) this._nodes.osc.stop(); } catch (e) {}
    this._nodes = {};
  },
};

window.Audio = Audio;
