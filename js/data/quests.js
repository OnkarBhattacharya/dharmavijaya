/* ═══════════════════════════════════════════════
   js/data/quests.js
   Side quests.  Each quest has:
     id          — unique string key
     title       — display name
     description — shown in quest log
     steps       — array of { id, text, scene }
     reward      — { dharma?, flag?, lore?, item?, intel?, gold? }
     requireFlag — (optional) State flag that must be true to activate
═══════════════════════════════════════════════ */
const SIDE_QUESTS = [
  {
    id:          'devapala_daughter',
    title:       "Devapala's Grief",
    description: 'The cavalry commander who resisted the Asura still carries guilt about his daughter\'s death. A Buddhist monk claims to have knowledge that might bring him peace.',
    steps: [
      { id:'step1', text:'Find the monk Nagarjuna in Pataliputra\'s market district', scene:'sidequest_nagarjuna' },
      {
        id:      'step2',
        text:    'Bring his teaching to Devapala',
        scene:   'sidequest_devapala_closure',
        completionFlags: ['devapala_healed'],
      },
    ],
    reward: { dharma:12, lore:'devapala_peace' },
  },
  {
    id:          'vijaya_governance',
    title:       "Vijaya's First Edict",
    description: 'Prince Vijaya is writing Kalinga\'s first internal governance charter. He needs counsel on which of Ashoka\'s principles to adapt and which to make his own.',
    steps: [
      {
        id: 'step1',
        text:'Advise Vijaya on the charter',
        scene:'sidequest_vijaya_charter',
        completionFlags: ['kalinga_charter'],
      },
    ],
    reward: {
      dharma: 15,
      flag:   'kalinga_charter',
      intel:  'Kalinga has begun self-governance. Treaty obligations to Pataliputra honored. Vijaya emerging as legitimate regional leader.',
    },
  },
  {
    id:          'naga_debt',
    title:       "The Naga's Question",
    description: 'The Nagas said they would call their debt at an unexpected moment — a truth you have been keeping from yourself.',
    steps: [
      {
        id:'step1',
        text:'Return to the hidden shrine',
        scene:'sidequest_naga_debt',
        completionFlags: ['naga_debt_paid'],
      },
    ],
    reward: { dharma:20, item:'naga_gem' },
    requireFlag: 'naga_debt',
  },
];
