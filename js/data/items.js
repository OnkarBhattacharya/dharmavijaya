/* ═══════════════════════════════════════════════
   js/data/items.js
   Add new items here. They appear automatically
   in inventory and shop if referenced.
═══════════════════════════════════════════════ */
const ITEMS_DATA = {
  iron_sword:     { name:'Iron Sword',       icon:'⚔️', type:'Weapon', desc:'Magadha iron, battle-honed. +8 Attack.',            effect:{ attack:8 } },
  chain_armor:    { name:'Chain Armor',      icon:'🛡️', type:'Armor',  desc:'Rings of welded iron. +10 Defense.',                effect:{ defense:10 } },
  war_drum:       { name:'War Drum',         icon:'🥁', type:'Misc',   desc:'Rallies troops. +10 morale once per battle.',        effect:{} },
  prayer_beads:   { name:'Prayer Beads',     icon:'📿', type:'Relic',  desc:'Sandalwood. Restores 15 MP. Reveals NPC intent.',    effect:{ mp:15 } },
  dharma_scroll:  { name:'Dharma Scroll',    icon:'📜', type:'Relic',  desc:'Buddhist teaching. +10 to dharma debate checks.',   effect:{ debateBonus:10 } },
  healing_herb:   { name:'Healing Herb',     icon:'🌿', type:'Potion', desc:'Neem and tulsi. Restores 40 HP in combat.',          effect:{ hp:40 }, consumable:true },
  poison_vial:    { name:'Poison Vial',      icon:'🧪', type:'Weapon', desc:'Tasteless. DoT: 8 dmg/turn for 3 turns.',            effect:{ poison:true } },
  cipher_tablet:  { name:'Cipher Tablet',    icon:'🪨', type:'Intel',  desc:'Mauryan codes. +5 to all intelligence checks.',      effect:{ intel:5 } },
  disguise_kit:   { name:'Disguise Kit',     icon:'🎭', type:'Misc',   desc:'Become anyone. Unlocks hidden dialogue paths.',      effect:{} },
  sacred_compass: { name:'Sacred Compass',   icon:'🧭', type:'Tool',   desc:'Vastu alignment. +15 Defense on fortified ground.',  effect:{ defense:15 } },
  stone_tablet:   { name:'Stone Tablet',     icon:'🪨', type:'Tool',   desc:'For edicts and plans. Unlocks building paths.',      effect:{} },
  rope_ladder:    { name:'Rope Ladder',      icon:'🪢', type:'Misc',   desc:'Siege or escape. Unlocks vertical routes.',          effect:{} },
  lion_capital:   { name:'Lion Capital',     icon:'🦁', type:'Relic',  desc:'Fragment of an Ashoka Pillar. +12 dharma aura.',     effect:{ dharmaBonus:12 } },
  naga_gem:       { name:'Naga Gem',         icon:'💎', type:'Relic',  desc:'Naga-gifted. Reveals supernatural concealment.',     effect:{ reveal:true } },
  kalinga_urn:    { name:'Kalinga Urn',      icon:'⚱️', type:'Relic',  desc:'Ash from the battlefield. +8 dharma aura.',          effect:{ dharmaBonus:8 } },
  soma_draught:   { name:'Soma Draught',     icon:'🫙', type:'Potion', desc:'Ancient rite. Restores 30 MP. Heightens mantra.',    effect:{ mp:30 }, consumable:true },
  kautilya_text:  { name:'Arthashastra',     icon:'📗', type:'Intel',  desc:'Kautilya\'s treatise. +10 to statecraft checks.',    effect:{ intel:10 } },
  agni_amulet:    { name:'Agni Amulet',      icon:'🔥', type:'Relic',  desc:'Fire god\'s protection. +20 vs supernatural foes.', effect:{ supernatural:20 } },
};
