/* ═══════════════════════════════════════════════
   js/main.js
   Entry point. Initialises the game, wires up the
   top-level Game object, tutorial tooltips, and
   keyboard shortcuts.

   Execution order:
     data/* → scenes/* → systems/* → main.js
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   Game — top-level controller
   Exposed on window so HTML onclick attrs work.
───────────────────────────────────────────── */
const Game = {

  /* Called from the "Begin Your Journey" button */
  startGame() {
    UI.showScreen('class');
    UI.buildClassGrid();
  },

  /* Called when a class card is clicked */
  selectClass(id) {
    State.initClass(id);
    UI.showScreen('game');

    /* Build sidebar pane shells */
    document.getElementById('pane-wheel').innerHTML = `
      <div class="wheel-container">
        <svg id="dharma-wheel-svg" viewBox="0 0 120 120"></svg>
        <div class="wheel-score" id="wheel-score">${State.dharmaScore}</div>
        <div class="wheel-label">Dharma Score</div>
      </div>
      <div id="spokes-container"></div>`;

    document.getElementById('pane-stats').innerHTML = `
      <div class="pane-section-title">Character</div>
      <div id="stats-list"></div>`;

    document.getElementById('pane-inv').innerHTML = `
      <div class="pane-section-title">Possessions</div>
      <div class="inv-grid" id="inv-grid"></div>`;

    document.getElementById('pane-lore').innerHTML = `
      <div class="pane-section-title">Chronicles</div>
      <div id="lore-container"></div>`;

    HUD.update();
    HUD.updateDharmaWheel();
    HUD.updateInventory();
    HUD.updateStats();

    /* Ensure overlay game-over HTML is ready */
    Overlays.buildGameOver();

    Engine.go('intro');
    Tutorial.maybeShow();
  },

  /* Return to title screen */
  goTitle() {
    Overlays.closeAll();
    if (State.debate?.timerInterval) {
      clearInterval(State.debate.timerInterval);
      State.debate.timerInterval = null;
    }
    UI.showScreen('title');
  },

  /* Map toggle — proxied to Overlays */
  toggleMap() { Overlays.toggleMap(); },

  /* Save overlay — proxied to Overlays */
  showSave(mode) { Overlays.showSave(mode); },
};

window.Game = Game;


/* ─────────────────────────────────────────────
   Tutorial — first-time tips
───────────────────────────────────────────── */
const Tutorial = {
  maybeShow() {
    if (localStorage.getItem('dv_tutorial_shown')) return;
    localStorage.setItem('dv_tutorial_shown', '1');
    const tips = [
      { msg:'☸ Green choices gain dharma. Red choices lose it.',       delay:1500,  type:'dharma' },
      { msg:'📜 Check the Lore tab to track chronicles you discover.', delay:4000,  type:'lore'   },
      { msg:'⚔ DHARMA FORCE in combat scales with your dharma score.', delay:6500,  type:'gold'   },
      { msg:'💾 Save often — three slots available in the bottom bar.', delay:9000,  type:'gold'   },
    ];
    tips.forEach(({ msg, delay, type }) => {
      setTimeout(() => UI.notify(msg, type, 4500), delay);
    });
  },
};


/* ─────────────────────────────────────────────
   Keyboard shortcuts
───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  const gameActive = document.getElementById('screen-game')?.classList.contains('active');

  switch (e.key) {
    case 'Escape': Overlays.closeAll();              break;
    case 'm': case 'M': if (gameActive) Game.toggleMap();              break;
    case 's': case 'S': if (gameActive) Game.showSave('save');         break;
    case 'q': case 'Q': if (gameActive) UI.openQuestLog();             break;
    case 'c': case 'C': if (gameActive) UI.openCodex();                break;
    case 'i': case 'I': if (gameActive) UI.switchTab('inv',  document.querySelector('.stab:nth-child(3)')); break;
    case 'l': case 'L': if (gameActive) UI.switchTab('lore', document.querySelector('.stab:nth-child(4)')); break;
  }
});


/* ─────────────────────────────────────────────
   Expose remaining globals needed by inline
   onclick attrs in data files and overlays
───────────────────────────────────────────── */
window.DEBATES     = DEBATES;   // needed by Debate._loadRound onclick
window.SIDE_QUESTS = SIDE_QUESTS;
window.State       = State;
