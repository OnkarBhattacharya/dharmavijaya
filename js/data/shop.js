/* ═══════════════════════════════════════════════
   js/data/shop.js
   Items available in the wandering merchant.
   price  — cost in panas
   desc   — short display description
   The full item data comes from ITEMS_DATA.
═══════════════════════════════════════════════ */
const SHOP_ITEMS = [
  { id:'healing_herb',   price:30,  desc:'Restores 40 HP in combat.' },
  { id:'soma_draught',   price:55,  desc:'Restores 30 MP. Heightens mantra power.' },
  { id:'agni_amulet',    price:120, desc:'+20 vs supernatural enemies.' },
  { id:'kautilya_text',  price:90,  desc:'+10 to all intelligence checks.' },
  { id:'prayer_beads',   price:45,  desc:'Restores 15 MP. Reveals intent.' },
  { id:'kalinga_urn',    price:70,  desc:'+8 dharma aura permanently.' },
];
