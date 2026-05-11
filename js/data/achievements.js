/* ═══════════════════════════════════════════════
   js/data/achievements.js
   Add new achievements by adding entries here.
   check() receives no arguments — read from State.
═══════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  {
    id:    'first_debate',
    title: 'The Philosopher',
    desc:  'Won your first debate with Mara.',
    check: () => State.flags.mara_insight || State.flags.kalinga_fully_freed,
  },
  {
    id:    'kalinga_saved',
    title: 'The Peacemaker',
    desc:  'Kalinga was not destroyed.',
    check: () => State.flags.kalinga_fully_freed || State.flags.kalinga_partial_result,
  },
  {
    id:    'full_wheel',
    title: 'The Balanced Wheel',
    desc:  'Dharma score reached 80 or above.',
    check: () => State.dharmaScore >= 80,
  },
  {
    id:    'mara_peace',
    title: "Mara's Student",
    desc:  'Convinced Mara to withdraw voluntarily.',
    check: () => State.flags.mara_withdrawn_peacefully,
  },
  {
    id:    'spy_network',
    title: 'The Spymaster',
    desc:  'Completed two or more Sanstha missions.',
    check: () => Object.keys(State.flags).filter(k => k.startsWith('spy_done_')).length >= 2,
  },
  {
    id:    'vijaya_ally',
    title: 'The Diplomat',
    desc:  "Earned Vijaya's full alliance.",
    check: () => State.flags.vijaya_full_ally,
  },
  {
    id:    'naga_knowledge',
    title: "The Serpent's Friend",
    desc:  'Chose knowledge over power at the Naga shrine.',
    check: () => State.flags.naga_knowledge_chosen,
  },
  {
    id:    'all_quests',
    title: 'The Complete Path',
    desc:  'Completed all available side quests.',
    check: () => {
      const available = SIDE_QUESTS.filter(q => !q.requireFlag || State.flags[q.requireFlag]);
      return State.completedQuests.length >= available.length && available.length > 0;
    },
  },
  {
    id:    'act3_reached',
    title: 'Dharmashoka',
    desc:  'Reached Act III — The Righteous.',
    check: () => State.act >= 3,
  },
  {
    id:    'no_deaths',
    title: 'The Unbroken Thread',
    desc:  'Reached Act II without being defeated in combat.',
    check: () => State.act >= 2 && !State.flags.died_once,
  },
];
