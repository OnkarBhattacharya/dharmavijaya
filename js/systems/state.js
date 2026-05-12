/* ═══════════════════════════════════════════════
   js/systems/state.js
   Single source of truth for all game state.
   Import / read from State.xxx throughout the app.
   Mutate via State.set() or direct assignment —
   never spread or replace the object entirely
   (saves and the engine hold a reference to it).
═══════════════════════════════════════════════ */

const State = {
  /* ── Character ── */
  cls:        '',
  name:       '',
  tagline:    '',
  hp:         100,
  maxHp:      100,
  mp:         80,
  maxMp:      80,
  attack:     15,
  defense:    10,
  mantraStr:  1.0,

  /* ── Resources ── */
  dharmaScore: 20,
  gold:        150,
  ashokaRel:   50,   // 0-100

  /* ── Narrative Meta: Reputation / Oaths / Motifs ── */
  reputation: {
    court:   50,
    brahmin: 50,
    kalinga: 50,
  },
  /* Oaths ledger: { id, text, resolved, broken, createdAt? } */
  oaths: [],
  /* Motifs: tag counts (supports deeper “memory” system) */
  motifs: {
    /* e.g. 'ahimsa_root': 1 */
  },
  /* Momentum: decays around certain “delay”/scene friction moments */
  momentum: {
    /* Generic meter (0–100) + optional counters/tags */
    value: 50,
  },

  /* ── Progress ── */
  act:         1,
  scene:       'intro',
  deathScene:  'intro',
  location:    'pataliputra',
  choiceCount: 0,

  /* ── Collections ── */
  inventory:         [],   // array of item keys
  lore:              [],   // array of lore keys
  intel:             [],   // array of intel strings
  journal:           [],   // array of { scene, choice }
  flags:             {},   // arbitrary boolean flags
  completedQuests:   [],   // array of quest ids
  activeQuests:      {},   // { questId: { currentStep } }
  spyActiveMissions: {},   // { missionId: { turnsLeft, mission } }
  unlockedAchievements: [],

  /* ── Dharma Wheel Spokes ── */
  spokes: {
    Ahimsa:   20,
    Satya:    20,
    Dana:     15,
    Shila:    25,
    Karuna:   20,
    Prajna:   12,
    Virya:    22,
    Upekkha:  18,
  },

  /* ── Transient (not saved) ── */
  combat: {
    active:      false,
    enemy:       null,
    eHp:         0,
    eMaxHp:      0,
    nextScene:   '',
    poisonTurns: 0,
    poisonDmg:   0,
  },
  debate: {
    active:        false,
    id:            '',
    round:         0,
    maraHp:        100,
    timerInterval: null,
    timeLeft:      30,
  },

  /* ── Helpers ── */

  /** Apply a changes block from a scene or choice */
  applyChanges(c) {
    if (!c) return;

    /* ── Core stat changes ── */
    if (c.dharmaBonus) {
      this.dharmaScore = Math.min(100, this.dharmaScore + c.dharmaBonus);
      HUD.adjustSpokes(c.dharmaBonus, true);
    }
    if (c.dharmaLoss) {
      this.dharmaScore = Math.max(0, this.dharmaScore - c.dharmaLoss);
      HUD.adjustSpokes(c.dharmaLoss, false);
    }

    if (c.item && !this.inventory.includes(c.item)) {
      this.inventory.push(c.item);
      this.applyItemEffect(c.item);
      UI.notify(`Acquired: ${ITEMS_DATA[c.item]?.name || c.item}`, 'gold');
    }
    if (c.lore  && !this.lore.includes(c.lore))  {
      this.lore.push(c.lore);
      UI.notify(`📜 ${LORE_DATA[c.lore]?.title || c.lore}`, 'lore');
    }
    if (c.lore2 && !this.lore.includes(c.lore2)) {
      this.lore.push(c.lore2);
      UI.notify(`📜 ${LORE_DATA[c.lore2]?.title || c.lore2}`, 'lore');
    }
    if (c.intel) this.intel.push(c.intel);

    if (c.flag)  this.flags[c.flag]  = true;
    if (c.flag2) this.flags[c.flag2] = true;

    if (c.act)   this.act = c.act;

    /* ── Reputation deltas ──
       supports:
         reputationDelta: { court:+5, ... }
         reputationSet:   { court:70, ... }
    */
    if (c.reputationDelta && typeof c.reputationDelta === 'object') {
      for (const [k, delta] of Object.entries(c.reputationDelta)) {
        if (!(k in this.reputation)) continue;
        const v = (this.reputation[k] || 0) + Number(delta || 0);
        this.reputation[k] = Math.max(0, Math.min(100, v));
      }
    }
    if (c.reputationSet && typeof c.reputationSet === 'object') {
      for (const [k, val] of Object.entries(c.reputationSet)) {
        if (!(k in this.reputation)) continue;
        const v = Number(val);
        if (Number.isNaN(v)) continue;
        this.reputation[k] = Math.max(0, Math.min(100, v));
      }
    }

    /* ── Motifs ──
       supports:
         motif: 'ahimsa_root' (increment by 1)
         motifDelta: { key:+2, ... }
         motifSet: { key:3, ... }
    */
    if (c.motif) {
      const key = String(c.motif);
      this.motifs[key] = (this.motifs[key] || 0) + 1;
    }
    if (c.motifDelta && typeof c.motifDelta === 'object') {
      for (const [k, delta] of Object.entries(c.motifDelta)) {
        const key = String(k);
        const d = Number(delta || 0);
        this.motifs[key] = (this.motifs[key] || 0) + d;
        if (this.motifs[key] < 0) this.motifs[key] = 0;
      }
    }
    if (c.motifSet && typeof c.motifSet === 'object') {
      for (const [k, val] of Object.entries(c.motifSet)) {
        const key = String(k);
        const v = Number(val);
        if (Number.isNaN(v) || v < 0) continue;
        this.motifs[key] = v;
      }
    }

    /* ── Oaths ledger ──
       supports:
         oathAdd: { id, text, resolved?:bool, broken?:bool }
         oathResolve: id
         oathBreak: id
    */
    if (c.oathAdd && typeof c.oathAdd === 'object' && c.oathAdd.id) {
      const o = c.oathAdd;
      const id = String(o.id);
      const existing = this.oaths.find(x => x && x.id === id);
      if (!existing) {
        this.oaths.push({
          id,
          text: String(o.text || ''),
          resolved: Boolean(o.resolved),
          broken: Boolean(o.broken),
          createdAt: Date.now(),
        });
      }
    }
    if (c.oathResolve) {
      const id = String(c.oathResolve);
      const o = this.oaths.find(x => x && x.id === id);
      if (o) o.resolved = true;
    }
    if (c.oathBreak) {
      const id = String(c.oathBreak);
      const o = this.oaths.find(x => x && x.id === id);
      if (o) o.broken = true;
    }

    /* ── Momentum ── */
    if (typeof c.momentumDelta === 'number') {
      this.momentum.value = Math.max(0, Math.min(100, this.momentum.value + c.momentumDelta));
    }
    if (typeof c.momentumSet === 'number') {
      this.momentum.value = Math.max(0, Math.min(100, c.momentumSet));
    }
  },

  /** Apply a single item's effect fields to character stats (one-time) */
  applyItemEffect(key) {
    const item = ITEMS_DATA[key];
    if (!item?.effect) return;
    const e = item.effect;

    /* Numeric stat effects */
    if (e.attack)     this.attack   += e.attack;
    if (e.defense)    this.defense  += e.defense;
    if (e.hp)         { this.maxHp  += e.hp;  this.hp  = Math.min(this.hp  + e.hp,  this.maxHp); }
    if (e.mp)         { this.maxMp  += e.mp;  this.mp  = Math.min(this.mp  + e.mp,  this.maxMp); }
    if (e.dharmaBonus){ this.dharmaScore = Math.min(100, this.dharmaScore + e.dharmaBonus); }

    /* Narrative / codex flags for certain artifacts (backward-compatible) */
    if (key === 'naga_gem')      this.flags.naga_gem_revealed = true;
    if (key === 'dharma_scroll') this.flags.dharma_scroll_found = true;
    if (key === 'kautilya_text') this.flags.kautilya_text_found = true;
  },

  /** Initialise state for a newly selected class */
  initClass(id) {
    const d = CLASSES_DATA[id];
    this.cls        = id;
    this.name       = d.name;
    this.tagline    = d.tagline;
    this.hp         = this.maxHp  = d.hp;
    this.mp         = this.maxMp  = d.mp;
    this.attack     = d.attack;
    this.defense    = d.defense;
    this.mantraStr  = d.mantraStr;
    this.dharmaScore = d.dharma;
    this.gold       = d.gold;
    this.ashokaRel  = 50;
    this.act        = 1;
    this.scene      = 'intro';
    this.inventory  = [...d.items];
    this.lore       = [];
    this.intel      = [];
    this.journal    = [];
    this.flags      = {};
    this.completedQuests = [];
    this.activeQuests    = {};
    this.spyActiveMissions = {};
    this.unlockedAchievements = [];
    this.choiceCount = 0;

    /* Narrative meta defaults */
    this.reputation = { court: 50, brahmin: 50, kalinga: 50 };
    this.oaths = [];
    this.motifs = {};
    this.momentum = { value: 50 };

    const base = d.dharma;
    this.spokes = {
      Ahimsa:   base,
      Satya:    base,
      Dana:     Math.max(0, base - 5),
      Shila:    Math.min(100, base + 5),
      Karuna:   base,
      Prajna:   Math.max(0, base - 8),
      Virya:    Math.min(100, base + 3),
      Upekkha:  Math.max(0, base - 2),
    };

    /* Apply starting item effects to base stats */
    d.items.forEach(key => this.applyItemEffect(key));
  },

  /** Serialise for saving (strips transient fields) */
  serialise() {
    const skip = new Set(['combat', 'debate']);
    const out = {};
    for (const [k, v] of Object.entries(this)) {
      if (typeof v === 'function' || skip.has(k)) continue;
      out[k] = v;
    }
    out.savedAt = Date.now();
    return out;
  },

  /** Load from a saved snapshot */
  load(snapshot) {
    const skip = new Set(['combat', 'debate', 'serialise', 'load', 'initClass', 'applyChanges',
                          '__proto__', 'constructor', 'prototype']);
    for (const [k, v] of Object.entries(snapshot)) {
      if (skip.has(k)) continue;
      if (!Object.prototype.hasOwnProperty.call(this, k)) continue;
      this[k] = v;
    }

    /* Ensure meta defaults exist for older saves */
    if (!this.reputation || typeof this.reputation !== 'object') {
      this.reputation = { court: 50, brahmin: 50, kalinga: 50 };
    } else {
      this.reputation.court   = Number.isFinite(this.reputation.court)   ? this.reputation.court   : 50;
      this.reputation.brahmin= Number.isFinite(this.reputation.brahmin)? this.reputation.brahmin: 50;
      this.reputation.kalinga= Number.isFinite(this.reputation.kalinga)? this.reputation.kalinga: 50;
      this.reputation.court    = Math.max(0, Math.min(100, this.reputation.court));
      this.reputation.brahmin = Math.max(0, Math.min(100, this.reputation.brahmin));
      this.reputation.kalinga = Math.max(0, Math.min(100, this.reputation.kalinga));
    }
    if (!Array.isArray(this.oaths)) this.oaths = [];
    if (!this.motifs || typeof this.motifs !== 'object') this.motifs = {};
    if (!this.momentum || typeof this.momentum !== 'object' || typeof this.momentum.value !== 'number') {
      this.momentum = { value: 50 };
    } else {
      this.momentum.value = Math.max(0, Math.min(100, this.momentum.value));
    }

    /* Reset transient */
    this.combat  = { active:false, enemy:null, eHp:0, eMaxHp:0, nextScene:'', poisonTurns:0, poisonDmg:0 };
    this.debate  = { active:false, id:'', round:0, maraHp:100, timerInterval:null, timeLeft:30 };
  },
};
