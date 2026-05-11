/* ═══════════════════════════════════════════════
   js/systems/debate.js
   Mara philosophical combat system.
   Called by Engine when a scene has special:'debate'.
═══════════════════════════════════════════════ */

const Debate = {

  /** Start a debate by id */
  start(debateId) {
    const db = DEBATES[debateId];
    if (!db) { Engine.go('intro'); return; }

    State.debate = {
      active:        true,
      id:            debateId,
      round:         0,
      maraHp:        100,
      timerInterval: null,
      timeLeft:      30,
      _scrollUsed:   false,
    };

    /* Build overlay HTML */
    document.getElementById('overlay-debate').innerHTML = `
      <div class="debate-scene">
        <div class="debate-header">
          <div class="debate-title">🌑 ${db.title} 🌑</div>
          <div class="debate-subtitle">Defeat Mara through clarity of mind — not sword</div>
        </div>
        <div class="debate-hp">
          <div class="debate-hp-label">Mara's conviction: <span id="debate-hp-num">100</span>%</div>
          <div class="debate-hp-track"><div class="debate-hp-fill" id="debate-hp-fill" style="width:100%"></div></div>
        </div>
        <div class="debate-timer">
          <div class="timer-label">TIME</div>
          <div class="timer-track"><div class="timer-fill" id="timer-fill" style="width:100%"></div></div>
          <span id="timer-num" style="font-family:var(--font-display);font-size:11px;color:var(--gold-dim)">30</span>
        </div>
        <div class="debate-mara-says" id="debate-mara-text">${db.maraIntro}</div>
        <div class="debate-feedback hidden" id="debate-feedback"></div>
        <div class="debate-choices" id="debate-choices"></div>
      </div>`;

    Overlays.open('debate');
    Debate._loadRound(db, 0);
  },

  /** Load a specific round */
  _loadRound(db, roundIdx) {
    if (roundIdx >= db.rounds.length) {
      Debate._finish(db);
      return;
    }

    State.debate.round = roundIdx;
    const round = db.rounds[roundIdx];

    document.getElementById('debate-mara-text').innerHTML = round.mara;
    document.getElementById('debate-feedback').classList.add('hidden');

    const choicesEl = document.getElementById('debate-choices');
    choicesEl.innerHTML = '';
    round.choices.forEach((ch, i) => {
      const btn = document.createElement('button');
      btn.className = 'debate-choice fade-in';
      btn.style.animationDelay = `${i * 0.1}s`;
      const hint = ch.correct  ? '☸ This argument targets the core contradiction'
                 : ch.partial  ? '⚖ This argument holds some ground'
                               : '◎ This argument may be turned against you';
      btn.innerHTML = `${ch.text}<div class="choice-hint">${hint}</div>`;
      btn.onclick   = () => Debate._resolve(db, round, ch);
      choicesEl.appendChild(btn);
    });

    Debate._startTimer(db, roundIdx);
  },

  /** Resolve a chosen argument */
  _resolve(db, round, choice) {
    Debate._clearTimer();

    const feed = document.getElementById('debate-feedback');
    feed.className    = 'debate-feedback';
    feed.innerHTML    = choice.response || '';

    if (choice.correct) {
      State.debate.maraHp = Math.max(0, State.debate.maraHp - (choice.dharmaGain || 15));
      State.dharmaScore   = Math.min(100, State.dharmaScore + (choice.dharmaGain || 15));
      HUD.adjustSpokes(choice.dharmaGain || 15, true);
      feed.classList.add('feedback-great');
      UI.notify(`+${choice.dharmaGain} dharma · Mara's conviction weakened!`, 'dharma');
      Audio.playSfx('dharma');
    } else if (choice.partial) {
      State.debate.maraHp = Math.max(0, State.debate.maraHp - (choice.dharmaGain || 6));
      State.dharmaScore   = Math.min(100, State.dharmaScore + (choice.dharmaGain || 6));
      HUD.adjustSpokes(choice.dharmaGain || 6, true);
      feed.classList.add('feedback-good');
    } else {
      State.debate.maraHp = Math.min(100, State.debate.maraHp + (choice.dharmaLoss || 6));
      State.dharmaScore   = Math.max(0, State.dharmaScore - (choice.dharmaLoss || 6));
      HUD.adjustSpokes(choice.dharmaLoss || 6, false);
      feed.classList.add('feedback-bad');
      UI.notify(`Mara gains ground. Dharma −${choice.dharmaLoss || 6}.`, 'blood');
      document.getElementById('overlay-debate').classList.add('shake');
      setTimeout(() => document.getElementById('overlay-debate').classList.remove('shake'), 400);
    }

    feed.classList.remove('hidden');
    Debate._refreshHp();
    HUD.update();

    /* Continue button */
    const nextRound = State.debate.round + 1;
    const continueBtn = document.createElement('button');
    continueBtn.className = 'debate-choice';
    continueBtn.style.cssText = 'text-align:center;border-color:var(--gold-dark);color:var(--gold)';
    continueBtn.textContent = 'Continue the debate \u2192';
    continueBtn.onclick = () => Debate._loadRound(db, nextRound);
    const choicesEl2 = document.getElementById('debate-choices');
    choicesEl2.innerHTML = '';
    choicesEl2.appendChild(continueBtn);
  },

  /** Wrap up and route to outcome scene */
  _finish(db) {
    Debate._clearTimer();
    const pct  = State.debate.maraHp;
    const next = pct <= 30 ? db.successScene
               : pct <= 60 ? db.partialScene
               :              db.failScene;
    State.debate.active = false;

    const msg  = pct <= 30 ? '☸ Debate won — Mara\'s conviction broken.'
               : pct <= 60 ? 'Debate partially won.'
               :              'Mara held firm.';
    UI.notify(msg, pct <= 30 ? 'dharma' : 'blood');
    Overlays.close('debate');
    Engine.go(next);
  },

  /** Timer that advances to wrong answer if player idles */
  _startTimer(db, roundIdx) {
    Debate._clearTimer();
    const timeLimits = { bhikshu: 45, amatya: 30, kshatriya: 22, sthapati: 28 };
    const limit = timeLimits[State.cls] || 30;
    State.debate.timeLeft = limit;
    const fill = document.getElementById('timer-fill');
    const num  = document.getElementById('timer-num');

    /* dharma_scroll reveals the correct answer hint for one round */
    if (State.inventory.includes('dharma_scroll') && !State.debate._scrollUsed) {
      State.debate._scrollUsed = true;
      const round = db.rounds[roundIdx];
      const correctIdx = round.choices.findIndex(c => c.correct);
      if (correctIdx >= 0) {
        const btns = document.querySelectorAll('#debate-choices .debate-choice');
        if (btns[correctIdx]) {
          btns[correctIdx].style.borderColor = 'var(--dharma-light)';
          btns[correctIdx].title = 'Dharma Scroll: this argument is strongest';
        }
      }
    }

    State.debate.timerInterval = setInterval(() => {
      State.debate.timeLeft--;
      if (fill) fill.style.width = (State.debate.timeLeft / limit * 100) + '%';
      if (num)  num.textContent  = State.debate.timeLeft;
      if (State.debate.timeLeft <= 0) {
        Debate._clearTimer();
        const round  = db.rounds[roundIdx];
        const wrong  = round.choices[round.choices.length - 1];
        Debate._resolve(db, round, wrong);
      }
    }, 1000);
  },

  _clearTimer() {
    if (State.debate.timerInterval) {
      clearInterval(State.debate.timerInterval);
      State.debate.timerInterval = null;
    }
  },

  _refreshHp() {
    const pct  = Math.max(0, State.debate.maraHp);
    const fill = document.getElementById('debate-hp-fill');
    const num  = document.getElementById('debate-hp-num');
    if (fill) fill.style.width  = pct + '%';
    if (num)  num.textContent   = pct;
  },
};

/* Expose for inline onclick */
window.Debate = Debate;

/* Pause debate timer when tab loses focus */
document.addEventListener('visibilitychange', () => {
  if (!State.debate?.active) return;
  if (document.hidden) {
    Debate._clearTimer();
  } else {
    const db = DEBATES[State.debate.id];
    if (db) Debate._startTimer(db, State.debate.round);
  }
});
