/* ═══════════════════════════════════════════════
   js/data/spy.js
   Sanstha intelligence missions.
   reward types: 'intel' | 'gold' | 'flag' | 'lore'
   turns  — approximate scene-transitions until completion
   cost   — panas to deploy
═══════════════════════════════════════════════ */
const SPY_MISSIONS = [
  {
    id:          'track_pushyamitra',
    name:        'Shadow Pushyamitra',
    cost:        40,
    turns:       2,
    description: 'Deploy an agent to observe the general\'s private meetings.',
    reward:      'intel',
    rewardData:  'Pushyamitra met privately with two border governors. Loyalty uncertain but not yet broken.',
  },
  {
    id:          'infiltrate_brahmin',
    name:        'Infiltrate Brahmin Council',
    cost:        60,
    turns:       3,
    description: 'Place a sansthana inside the theological establishment.',
    reward:      'lore',
    rewardData:  'brahmin_internal',
  },
  {
    id:          'kalinga_trade',
    name:        'Establish Kalinga Trade Route',
    cost:        80,
    turns:       3,
    description: 'Use the Sanstha to secure a legitimate trade arrangement.',
    reward:      'gold',
    rewardData:  150,
  },
  {
    id:          'find_mara_vessel',
    name:        "Locate Mara's Vessels",
    cost:        50,
    turns:       2,
    description: 'Identify which officials may be under supernatural influence.',
    reward:      'flag',
    rewardData:  'mara_vessels_known',
  },
  {
    id:          'northern_eyes',
    name:        'Northern Province Watch',
    cost:        35,
    turns:       2,
    description: 'Monitor reports from the frontier provinces for Asura activity.',
    reward:      'intel',
    rewardData:  'Three northern villages show behavioural changes consistent with Asura influence. Requires investigation.',
  },
];
