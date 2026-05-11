/* ═══════════════════════════════════════════════
   js/data/enemies.js
   Add enemies here. Reference by key in scenes
   using  special:'combat', enemy:'key_here'
═══════════════════════════════════════════════ */
const ENEMIES_DATA = {
  asura_general: {
    name:   'Asura General',
    icon:   '👹',
    hp:     85,  atk: 18, def: 8,
    xp:     40,  gold: 50,
    reward: 'lion_capital',
    desc:   'An ancient being wearing a general\'s face. Knows your name before you speak it.',
  },
  kalinga_champ: {
    name:   'Kalinga Champion',
    icon:   '🗡️',
    hp:     65,  atk: 15, def: 10,
    xp:     30,  gold: 30,
    reward: null,
    desc:   'Defends his homeland. His eyes carry grief and resolve in equal measure.',
  },
  mara_physical: {
    name:   'Mara — Manifest Form',
    icon:   '🌑',
    hp:     110, atk: 20, def: 12,
    xp:     80,  gold: 0,
    reward: 'dharma_scroll',
    desc:   'It wears darkness like armor. It cannot be harmed by doubt — only by clarity.',
  },
  court_assassin: {
    name:   'Court Assassin',
    icon:   '🗡️',
    hp:     50,  atk: 18, def: 6,
    xp:     25,  gold: 40,
    reward: 'poison_vial',
    desc:   'Hired by a rival faction. Fast and eerily silent. Moves like a shadow with intent.',
  },
  naga_guardian: {
    name:   'Naga Guardian',
    icon:   '🐍',
    hp:     75,  atk: 16, def: 14,
    xp:     35,  gold: 0,
    reward: 'naga_gem',
    desc:   'Coils of living stone. Ancient. Patient. Neutral — until you are not.',
  },
  corrupt_minister: {
    name:   'Corrupt Minister',
    icon:   '🧿',
    hp:     55,  atk: 12, def: 8,
    xp:     28,  gold: 60,
    reward: 'kautilya_text',
    desc:   'Twisted by Asura influence. Quotes Kautilya as justification for everything.',
  },
  war_elephant: {
    name:   'Rogue War Elephant',
    icon:   '🐘',
    hp:     120, atk: 25, def: 20,
    xp:     60,  gold: 40,
    reward: 'agni_amulet',
    desc:   'Maddened by the smell of blood. Colossally powerful and genuinely terrified.',
  },
  pushyamitra_duel: {
    name:   'Pushyamitra',
    icon:   '⚔️',
    hp:     90,  atk: 22, def: 15,
    xp:     50,  gold: 0,
    reward: null,
    desc:   'The disaffected general. He fights you to prove a point about strength.',
  },
};
