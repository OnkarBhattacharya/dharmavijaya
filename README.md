# Dharmavijaya — Victory Through Righteousness

A narrative RPG set in 3rd century BCE India. Serve Emperor Ashoka across three acts of conquest, remorse, and enlightenment. Every choice shifts the Dharma Wheel. History bends around your decisions.

**[Play it live →] http://onkarbhattacharya.github.io/dharmavijaya **

---

## Features

- **4 playable classes** — Kshatriya (warrior), Bhikshu (monk), Amatya (spy), Sthapati (builder)
- **3 full acts** with 80+ branching scenes
- **Mara philosophical debate system** — timed argument rounds with real consequences, Dharma Scroll hint system
- **Dharma Wheel** — 8-spoke alignment tracker (Ahimsa, Satya, Dana, Shila, Karuna, Prajna, Virya, Upekkha) with SVG visualization
- **Turn-based combat** — 5 action types + class-specific abilities (Battle Rage, Compassion Field, Poison Strike, Fortify)
- **Sanstha spy network** — deployable intelligence missions with asynchronous completion
- **Side quest system** — 3 fully voiced quests with multi-step progression
- **Merchant, codex, achievement, chronicle log** systems
- **5 distinct endings** based on dharma score and key flags
- **Typewriter text effect** — narrative dialogue revealed character-by-character with click-to-skip
- **Character portrait** — class icon and identity shown in the sidebar
- **Auto-save** — game saves automatically on act transitions; auto-save slot shown in "Continue Journey"
- **localStorage save** — 3 manual slots + 1 auto-save slot
- **Web Audio API** ambient sound (optional)
- **Keyboard shortcuts** — number keys (1-9) for choices, M/S/Q/C/I/L for panels
- **Mobile responsive** — adaptive layout for small screens with bottom-sheet sidebar
- **Zero dependencies** — pure HTML/CSS/JS, no build step

---

## Project Structure

```
dharmavijaya/
├── index.html              ← Entry point, HTML structure, script tags
│
├── css/
│   ├── variables.css       ← Design tokens (colours, fonts, spacing)
│   ├── base.css            ← Reset, body, utility classes, mobile responsive
│   ├── animations.css      ← All @keyframes + typewriter cursor + combat effects
│   ├── screens.css         ← Title screen, class select
│   ├── hud.css             ← HUD, game layout, scene panel, choices
│   ├── sidebar.css         ← Sidebar tabs, wheel, inventory, lore, portrait
│   ├── overlays.css        ← Combat, debate, map, save, ending
│   └── components.css      ← Merchant, spy, quests, codex, achievements
│
├── js/
│   ├── data/               ← Pure data — edit to add content
│   │   ├── classes.js      ← Playable classes
│   │   ├── items.js        ← All items
│   │   ├── enemies.js      ← All enemies
│   │   ├── lore.js         ← Chronicle entries
│   │   ├── art.js          ← SVG scene art renderers
│   │   ├── debates.js      ← Mara debate rounds
│   │   ├── endings.js      ← Ending texts + computeEnding()
│   │   ├── achievements.js ← Achievement definitions
│   │   ├── map.js          ← Map location list
│   │   ├── shop.js         ← Merchant item list
│   │   ├── quests.js       ← Side quest definitions
│   │   └── spy.js          ← Sanstha mission definitions
│   │
│   ├── scenes/             ← Story content — edit to add scenes
│   │   ├── act1.js         ← Act I: The Empire
│   │   ├── act2.js         ← Act II: The Silence of Kalinga
│   │   ├── act3.js         ← Act III: Dharmashoka
│   │   └── sidequests.js   ← Side quest scenes
│   │
│   └── systems/            ← Engine — rarely needs editing
│       ├── state.js        ← Central game state
│       ├── engine.js       ← Scene router, choice processor, typewriter
│       ├── combat.js       ← Turn-based combat
│       ├── debate.js       ← Philosophical debate system
│       ├── audio.js        ← Web Audio ambiance + SFX
│       ├── save.js         ← localStorage save/load
│       ├── hud.js          ← HUD + sidebar rendering
│       ├── ui.js           ← Panels, notifications, quests, achievements
│       ├── overlays.js     ← Fixed overlay management
│       └── main.js         ← Entry point, Game object, keyboard shortcuts
```

---

## Running Locally

No build step required. Just open `index.html` in a browser:

```bash
# Option 1 — Direct open
open index.html

# Option 2 — Local server (avoids any CORS issues)
npx serve .
# or
python3 -m http.server 8080
```

---

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)**
4. Your game will be live at `https://your-username.github.io/dharmavijaya`

---

## Adding Content

### New scene
Add an entry to any `js/scenes/act*.js` file:

```js
my_new_scene: {
  art:     'pataliputra',         // key from ART in js/data/art.js
  loc:     'My Location Name',
  act:     'ACT I — THE EMPIRE',
  text:    `Your scene text here. Use <em>italics</em> and <strong>bold</strong>.`,
  changes: { dharmaBonus:5, lore:'my_lore_key', flag:'my_flag' },
  choices: [
    { text: 'Choice text here', next: 'next_scene_key', dharma: 3 },
    { text: 'Another choice',   next: 'other_scene',    dharmaLoss: 2 },
    { text: 'Class-only choice',next: 'special_scene',  class: 'bhikshu' },
  ],
},
```

Then reference it from another scene's `choices[].next` or from the map in `js/data/map.js`.

### New enemy
Add to `js/data/enemies.js`, then reference in a scene with `special:'combat', enemy:'your_key'`.

### New item
Add to `js/data/items.js`, give it to a class in `js/data/classes.js` or award it in a scene via `changes:{ item:'your_key' }`.

### New debate
Add to `js/data/debates.js`, then reference in a scene with `special:'debate', debateId:'your_key'`.

### New side quest
1. Add quest definition to `js/data/quests.js`
2. Add quest scenes to `js/scenes/sidequests.js`
3. Add a lore entry to `js/data/lore.js` if needed

### Retheme visuals
Edit `css/variables.css` — all colours, fonts, and spacing are tokens.

### Add new art
Add a function to `js/data/art.js`:
```js
my_location(el) {
  el.innerHTML = `<svg viewBox="0 0 400 160" ...>...</svg>`;
},
```
Then use `art: 'my_location'` in any scene.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` – `9` | Select choice #1–9 |
| `M` | Toggle map |
| `S` | Save game |
| `Q` | Quest log |
| `C` | Codex |
| `I` | Inventory tab |
| `L` | Lore tab |
| `Esc` | Close overlays |

---

## Save System

The game auto-saves to `localStorage` in 3 manual slots plus 1 auto-save slot. Auto-save triggers on act transitions and is displayed with an ⚡ badge in the "Continue Journey" dialog. Saves survive browser refreshes but not private/incognito windows.

Save data is schema-validated on load — slots with missing or malformed required fields (`dharmaScore`, `scene`, `act`) are rejected silently. Prototype-pollution keys (`__proto__`, `constructor`, `prototype`) are explicitly blocked.

---

## Security

The following hardening was applied in the last audit pass:

- **Content Security Policy** — `<meta>` CSP tag in `index.html` uses `script-src 'self' 'unsafe-inline'`; `'unsafe-inline'` is required because all button wiring uses inline `onclick` attributes. Removing it silently breaks all interactivity.
- **Save schema validation** — `save.js` validates deserialized `localStorage` data before merging into game state; prototype-poisoning keys (`__proto__`, `constructor`, `prototype`) are blocked
- **Prototype pollution guard** — `state.js` `load()` only writes keys that already exist on the `State` object; `hud.js` `adjustSpokes()` uses `hasOwnProperty` before writing spoke values
- **XSS sanitization** — all save-derived or user-influenced strings (save slot names, map location names, intel entries, journal entries, ending titles) are HTML-escaped before `innerHTML` insertion in `overlays.js`, `hud.js`, and `ui.js`
- **Debate injection fix** — the continue-round button in `debate.js` uses a DOM event listener instead of an inline `onclick` string that previously embedded `State.debate.id` directly
- **Combat log** — `combat.js` `_log()` uses `innerHTML` for rich text rendering; only authored content is inserted (no user input)
- **Debate timer pause** — `debate.js` pauses the round timer on `visibilitychange` (tab blur) to prevent unfair timeouts
- **Infinite loop guard** — `engine.js` includes a depth counter (`_guardDepth` / `_guardMax`) that breaks circular scene routing

### Known bugs fixed

- **All buttons unresponsive** — `script-src 'self'` (without `'unsafe-inline'`) in the CSP blocked every inline `onclick` handler silently. Fixed by adding `'unsafe-inline'` to `script-src` in `index.html`.
- **Crash on player death in combat** — `combat.js` accessed `#go-score` directly before the game-over overlay HTML existed. Fixed by calling `Overlays.buildGameOver()` before opening the overlay.
- **Blank sidebar on save-load from title screen** — `Save.load()` called HUD update methods before the sidebar pane shells were in the DOM (they are normally built by `Game.selectClass()`). Fixed by rebuilding missing pane shells inside `Save.load()`.
- **Combat log HTML rendering** — `combat._log()` used `textContent` which rendered `<em>` tags as raw text. Fixed by switching to `innerHTML`.
- **Debate timer fallback** — timer expiry assumed the last choice index was always wrong; now correctly searches for `c.wrong` property with graceful fallback.
- **Debate timer leak** — closing the debate overlay without finishing left the timer interval running. Fixed by cleaning up interval in `Overlays.close('debate')`.

---

## License

MIT — free to use, modify, and distribute. Attribution appreciated but not required.

---

*"All men are my children. As for my own children, I desire they be provided with all welfare and happiness of this world and of the next."*
*— Ashoka, Major Rock Edict*