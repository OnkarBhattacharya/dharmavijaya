/* ═══════════════════════════════════════════════
   js/data/codex.js
   Codex entries unlocked via existing narrative signals:
   - lore keys in State.lore
   - intel strings in State.intel
   - flags in State.flags
═══════════════════════════════════════════════ */

const CODEX_DATA = [
  {
    id: 'codex_asura',
    icon: '👹',
    title: 'The Asura',
    body:
      'Ancient beings who believe adharma — self-interest, domination — is the true nature of reality. They cannot corrupt what is freely given. Their weakness: they need us to believe our choices do not matter.',
    requires: { lore: ['asura_method'], flags: [] },
  },
  {
    id: 'codex_mara',
    icon: '🌑',
    title: 'Mara',
    body:
      'Something vast, old, and exhausted that has watched empire after empire collapse. Its power is persuasion, not force. Mara cannot be killed. It can be answered.',
    requires: { lore: ['mara_first_contact', 'asura_weakness_clue'], flags: ['mara_withdrawn_peacefully'] },
  },
  {
    id: 'codex_nagas',
    icon: '🐍',
    title: 'The Nagas',
    body:
      'Serpent beings of great intelligence, maintaining underground kingdoms. They deal in truths, not loyalties. The Naga Gem reveals supernatural concealment.',
    requires: { lore: ['naga_teaching'], flags: ['naga_gem_revealed', 'naga_debt_paid'] },
  },
  {
    id: 'codex_kali',
    icon: '🔥',
    title: 'Kali',
    body:
      'Destroyer and protector. She walks near places of great moral reckoning — not as enemy, but as the force that ends what must end. Her presence near Kalinga was a sign the old order was about to be resolved.',
    requires: { lore: ['kali_near_kalinga'], flags: [] },
  },
  {
    id: 'codex_asura_vessel',
    icon: '🧿',
    title: 'The Asura Vessel',
    body:
      'A human who accepted an Asura’s bargain under duress. Unlike the Asura itself, vessels can recover if the entity is removed or weakened.',
    requires: { lore: ['lesser_asura_vessel'], flags: ['devapala_healed'] },
  },
];

window.CODEX_DATA = CODEX_DATA;
