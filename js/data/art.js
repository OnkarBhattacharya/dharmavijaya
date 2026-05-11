/* ═══════════════════════════════════════════════
   js/data/art.js
   Scene artwork renderers.
   Each function receives the container element
   and injects an SVG.  Add new art keys here
   and reference them in scene definitions via
   art: 'your_key'
═══════════════════════════════════════════════ */
const ART = {

  pataliputra(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky_p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#0A0820"/>
          <stop offset="100%" stop-color="#1E0F04"/>
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#sky_p)"/>
      <circle cx="300" cy="30" r="14" fill="#C9A84C" opacity=".5"/>
      <circle cx="60"  cy="20" r="2"  fill="#C9A84C" opacity=".7"/>
      <circle cx="140" cy="15" r="1.5" fill="#C9A84C" opacity=".5"/>
      <circle cx="350" cy="18" r="1.5" fill="#C9A84C" opacity=".4"/>
      <rect x="0"   y="100" width="400" height="60" fill="#0D0A05"/>
      <rect x="140" y="45"  width="120" height="90" fill="#1A1008"/>
      <rect x="130" y="40"  width="140" height="10" fill="#2A1A10"/>
      <polygon points="140,40 200,12 260,40" fill="#221608"/>
      <circle cx="200" cy="10" r="6" fill="#C9A84C" opacity=".8"/>
      <rect x="175" y="90" width="50" height="55" fill="#0D0805"/>
      <rect x="25"  y="80" width="80" height="70" fill="#1A1008"/>
      <rect x="18"  y="74" width="94" height="10" fill="#2A1A10"/>
      <rect x="295" y="70" width="90" height="80" fill="#1A1008"/>
      <rect x="288" y="64" width="104" height="10" fill="#2A1A10"/>
      <polygon points="295,64 340,40 390,64" fill="#221608"/>
    </svg>`;
  },

  throne(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#080605"/>
      <rect x="145" y="15"  width="110" height="145" fill="#100C06" opacity=".9"/>
      <rect x="135" y="10"  width="130" height="10"  fill="#1E1408"/>
      <rect x="140" y="105" width="120" height="55"  fill="#1E1408"/>
      <rect x="158" y="112" width="84"  height="48"  fill="#0A0705"/>
      <polygon points="155,15 200,2 245,15" fill="#C9A84C" opacity=".55"/>
      <circle cx="200" cy="0" r="5" fill="#C9A84C" opacity=".75"/>
      <rect x="52"  y="55" width="5" height="100" fill="#1E1408"/>
      <rect x="43"  y="47" width="23" height="10"  fill="#2A1E10"/>
      <rect x="343" y="55" width="5" height="100" fill="#1E1408"/>
      <rect x="334" y="47" width="23" height="10"  fill="#2A1E10"/>
      <ellipse cx="200" cy="158" rx="70" ry="6" fill="#C9A84C" opacity=".06"/>
    </svg>`;
  },

  kalinga(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky_k" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#0A0808"/>
          <stop offset="100%" stop-color="#1A0A04"/>
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#sky_k)"/>
      <path d="M0 110 Q50 85 100 105 Q150 75 200 95 Q250 68 300 90 Q350 72 400 88 L400 160 L0 160Z" fill="#0E1A0A"/>
      <rect x="155" y="50" width="90"  height="90" fill="#0E0E06"/>
      <polygon points="155,50 200,22 245,50" fill="#1E1E0A"/>
      <rect x="178" y="100" width="44" height="40" fill="#060606"/>
      <circle cx="48"  cy="40" r="10" fill="none" stroke="#8B1A1A" stroke-width=".8" opacity=".45"/>
      <circle cx="352" cy="32" r="7"  fill="none" stroke="#8B1A1A" stroke-width=".8" opacity=".35"/>
    </svg>`;
  },

  jungle(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#040E04"/>
      <path d="M0 50 Q30 15 65 45 Q90 5 120 35 Q150 0 185 30 Q215 0 250 33 Q280 2 315 38 Q345 10 380 42 L400 50 L400 160 L0 160Z" fill="#071407"/>
      <path d="M0 70 Q40 35 80 65 Q125 25 165 58 Q210 20 250 55 Q290 28 330 60 Q365 35 400 62 L400 160 L0 160Z" fill="#0A1E08" opacity=".85"/>
      <circle cx="200" cy="130" r="22" fill="none" stroke="#2E7D6E" stroke-width="1"   opacity=".4"/>
      <circle cx="200" cy="130" r="10" fill="none" stroke="#4ECDC4" stroke-width=".8"  opacity=".5"/>
      <circle cx="200" cy="130" r="4"  fill="#4ECDC4" opacity=".65"/>
      <line x1="200" y1="108" x2="200" y2="82" stroke="#2E7D6E" stroke-width="1.5" opacity=".5"/>
    </svg>`;
  },

  road(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky_r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#080A18"/>
          <stop offset="100%" stop-color="#140C04"/>
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#sky_r)"/>
      <circle cx="60"  cy="45" r="2.5" fill="#C9A84C" opacity=".65"/>
      <circle cx="130" cy="25" r="2"   fill="#C9A84C" opacity=".5"/>
      <circle cx="310" cy="38" r="2.5" fill="#C9A84C" opacity=".55"/>
      <circle cx="370" cy="20" r="2"   fill="#C9A84C" opacity=".4"/>
      <path d="M0 125 Q100 115 200 85 Q300 115 400 125 L400 160 L0 160Z" fill="#0E0A05"/>
      <path d="M175 160 Q200 95 225 160" fill="#1E1408"/>
      <rect x="196" y="70" width="8"  height="90" fill="#2A1A10"/>
      <rect x="193" y="62" width="14" height="10" fill="#3A2A18"/>
      <circle cx="200" cy="58" r="5" fill="#C9A84C" opacity=".7"/>
    </svg>`;
  },

  temple(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#050A06"/>
      <rect x="142" y="42"  width="116" height="118" fill="#0C140C"/>
      <polygon points="142,42 200,10 258,42" fill="#142014"/>
      <circle cx="200" cy="6" r="7" fill="#C9A84C" opacity=".75"/>
      <rect x="157" y="80" width="36" height="80" fill="#060A06"/>
      <rect x="207" y="80" width="36" height="80" fill="#060A06"/>
      <rect x="162" y="60" width="76" height="5"  fill="#1E2E1E"/>
      <rect x="52"  y="72" width="42" height="88" fill="#0C140C"/>
      <rect x="306" y="72" width="42" height="88" fill="#0C140C"/>
      <ellipse cx="200" cy="156" rx="55" ry="5" fill="#C9A84C" opacity=".12"/>
    </svg>`;
  },

  library(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#07070A"/>
      <rect x="18" y="35" width="364" height="125" fill="#110E08"/>
      <rect x="18" y="35" width="364" height="10"  fill="#1E1808"/>
      <g fill="#07070A">
        <rect x="28"  y="45" width="28" height="115"/>
        <rect x="66"  y="45" width="28" height="115"/>
        <rect x="104" y="45" width="28" height="115"/>
        <rect x="142" y="45" width="28" height="115"/>
        <rect x="180" y="45" width="28" height="115"/>
        <rect x="218" y="45" width="28" height="115"/>
        <rect x="256" y="45" width="28" height="115"/>
        <rect x="294" y="45" width="28" height="115"/>
        <rect x="332" y="45" width="28" height="115"/>
      </g>
      <circle cx="95"  cy="110" r="12" fill="#C9A84C" opacity=".25"/>
      <circle cx="95"  cy="110" r="6"  fill="#C9A84C" opacity=".45"/>
      <rect x="170" y="95" width="60" height="40" fill="#110E08" stroke="#C9A84C" stroke-width=".8" opacity=".5"/>
      <line x1="175" y1="107" x2="225" y2="107" stroke="#C9A84C" stroke-width=".4" opacity=".35"/>
      <line x1="175" y1="118" x2="225" y2="118" stroke="#C9A84C" stroke-width=".4" opacity=".35"/>
      <line x1="175" y1="129" x2="225" y2="129" stroke="#C9A84C" stroke-width=".4" opacity=".35"/>
    </svg>`;
  },

  map_room(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#080605"/>
      <rect x="48" y="50" width="304" height="100" fill="#110E08" stroke="#2A1A10" stroke-width="1"/>
      <path d="M48 50 Q200 24 352 50" fill="none" stroke="#2A1A10" stroke-width=".8" opacity=".5"/>
      <path d="M78 72 Q118 82 158 68 Q198 58 248 74 Q288 84 318 68"
            fill="none" stroke="#C9A84C" stroke-width=".8" opacity=".35"/>
      <circle cx="128" cy="74" r="4" fill="#C9A84C" opacity=".65"/>
      <circle cx="200" cy="90" r="3" fill="#8B1A1A" opacity=".65"/>
      <circle cx="268" cy="74" r="4" fill="#2E7D6E" opacity=".65"/>
      <line x1="128" y1="74" x2="200" y2="90" stroke="#C9A84C" stroke-width=".5" opacity=".4" stroke-dasharray="3,3"/>
      <line x1="200" y1="90" x2="268" y2="74" stroke="#C9A84C" stroke-width=".5" opacity=".4" stroke-dasharray="3,3"/>
    </svg>`;
  },

  barracks(el) {
    el.innerHTML = `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="#080605"/>
      <rect x="0"   y="88" width="400" height="72" fill="#100C07"/>
      <rect x="18"  y="68" width="82"  height="92"  fill="#100C07" stroke="#1E1408" stroke-width="1"/>
      <rect x="108" y="56" width="82"  height="104" fill="#100C07" stroke="#1E1408" stroke-width="1"/>
      <rect x="210" y="56" width="82"  height="104" fill="#100C07" stroke="#1E1408" stroke-width="1"/>
      <rect x="300" y="68" width="82"  height="92"  fill="#100C07" stroke="#1E1408" stroke-width="1"/>
      <rect x="38"  y="93" width="20"  height="40"  fill="#070504"/>
      <rect x="128" y="88" width="20"  height="40"  fill="#070504"/>
      <rect x="228" y="88" width="20"  height="40"  fill="#070504"/>
      <rect x="322" y="93" width="20"  height="40"  fill="#070504"/>
      <line x1="0" y1="86" x2="400" y2="86" stroke="#1E1408" stroke-width=".8"/>
      <rect x="178" y="76" width="44"  height="3"   fill="#8B1A1A" opacity=".6"/>
    </svg>`;
  },

};
