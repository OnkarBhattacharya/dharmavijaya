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
    const skip = new Set(['combat', 'debate', 'serialise', 'load', 'initClass', 'applyChanges']);
    for (const [k, v] of Object.entries(snapshot)) {
      if (skip.has(k)) continue;
      this[k] = v;
    }
    /* Reset transient */
    this.combat  = { active:false, enemy:null, eHp:0, eMaxHp:0, nextScene:'', poisonTurns:0, poisonDmg:0 };
    this.debate  = { active:false, id:'', round:0, maraHp:100, timerInterval:null, timeLeft:30 };
  },
};
