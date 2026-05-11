/* ═══════════════════════════════════════════════
   js/systems/combat.js
   Turn-based combat system.
   Called by Engine when a scene has special:'combat'.
═══════════════════════════════════════════════ */

const Combat = {

  /** Start a combat encounter */
  start(enemyKey, nextScene) {
    const e = ENEMIES_DATA[enemyKey];
    if (!e) { Engine.go(nextScene); return; }

    State.combat = {
      active:      true,
      enemy:       enemyKey,
      eHp:         e.hp,
      eMaxHp:      e.hp,
      nextScene,
      poisonTurns: 0,
      poisonDmg:   0,
    };

    /* Build combat overlay HTML */
    document.getElementById('overlay-combat').innerHTML = `
      <div class="combat-scene">
        <div class="enemy-stage">
          <span class="enemy-glyph" id="enemy-glyph">${e.icon}</span>
          <div class="enemy-name-display">${e.name}</div>
          <div class="enemy-hp-wrap">
            <div class="enemy-hp-track"><div class="enemy-hp-fill" id="enemy-hp-fill" style="width:100%"></div></div>
            <div class="enemy-hp-text"  id="enemy-hp-text">${e.hp} / ${e.hp}</div>
          </div>
          <div class="enemy-desc-text">${e.desc}</div>
        </div>
        <div class="combat-log" id="combat-log"></div>
        <div class="combat-actions">
          <button class="ca-btn ca-attack" onclick="Combat.act('attack')">⚔ STRIKE<span class="ca-cost">Physical damage</span></button>
          <button class="ca-btn ca-mantra" onclick="Combat.act('mantra')" id="btn-mantra">🔮 MANTRA<span class="ca-cost">20 MP · Sacred dmg</span></button>
          <button class="ca-btn ca-dharma" onclick="Combat.act('dharma')">☸ DHARMA FORCE<span class="ca-cost">Scales with dharma</span></button>
          <button class="ca-btn ca-item"   onclick="Combat.act('item')">🌿 USE ITEM<span class="ca-cost">Healing herb / gem</span></button>
          <button class="ca-btn ca-flee"   onclick="Combat.act('flee')">↩ RETREAT — withdraw from battle</button>
        </div>
      </div>`;

    Combat._log(`<em>${e.name} appears!</em>`, 'log-hit');
    Overlays.open('combat');
    Audio.setAmbiance('combat');
  },

  /** Process a player action */
  act(type) {
    if (!State.combat.active) return;
    const e    = ENEMIES_DATA[State.combat.enemy];
    let pDmg   = 0;
    let eDmg   = 0;
    let dChange = 0;

    /* Poison DoT */
    if (State.combat.poisonTurns > 0) {
      State.combat.eHp -= State.combat.poisonDmg;
      Combat._log(`Poison burns for ${State.combat.poisonDmg} damage.`, 'log-dharma');
      State.combat.poisonTurns--;
    }

    switch (type) {
      case 'attack': {
        const crit = Math.random() < 0.15;
        pDmg   = Math.floor(Math.random() * 18 + State.attack * 0.8) * (crit ? 2 : 1);
        eDmg   = Math.floor(Math.random() * 14 + e.atk * 0.6);
        dChange = -2;
        Combat._log(crit ? `⚡ CRITICAL STRIKE — ${pDmg} damage!` : `You strike for ${pDmg} damage.`, crit ? 'log-crit' : 'log-hit');
        Audio.playSfx('hit');
        break;
      }
      case 'mantra': {
        if (State.mp < 20) { Combat._log('Insufficient mantra energy.', 'log-miss'); return; }
        State.mp -= 20;
        pDmg    = Math.floor(Math.random() * 25 + 22 * State.mantraStr);
        eDmg    = Math.floor(Math.random() * 8  + 4);
        dChange = 4;
        Combat._log(`Mantra resonates — ${pDmg} sacred damage!`, 'log-dharma');
        Audio.playSfx('dharma');
        break;
      }
      case 'dharma': {
        const roll = State.dharmaScore / 100;
        if (Math.random() < roll) {
          pDmg    = Math.floor(35 + State.dharmaScore * 0.4);
          eDmg    = Math.floor(Math.random() * 6 + 2);
          dChange = 6;
          Combat._log(`Dharma force — ${pDmg} damage. ${e.name} wavers.`, 'log-dharma');
          Audio.playSfx('dharma');
        } else {
          eDmg    = Math.floor(Math.random() * 18 + 8);
          dChange = 2;
          Combat._log(`Dharma speaks... ${e.name} is not ready to hear it.`, 'log-miss');
        }
        break;
      }
      case 'item': {
        if (State.inventory.includes('healing_herb')) {
          const heal = 40;
          State.hp = Math.min(State.maxHp, State.hp + heal);
          State.inventory.splice(State.inventory.indexOf('healing_herb'), 1);
          Combat._log(`Healing herb — restored ${heal} HP.`, 'log-heal');
          dChange = 1;
        } else if (State.inventory.includes('soma_draught')) {
          State.mp = Math.min(State.maxMp, State.mp + 30);
          State.inventory.splice(State.inventory.indexOf('soma_draught'), 1);
          Combat._log('Soma draught — restored 30 MP.', 'log-heal');
        } else if (State.inventory.includes('naga_gem')) {
          pDmg = 20;
          Combat._log(`Naga Gem pulses — supernatural damage: ${pDmg}.`, 'log-dharma');
        } else if (State.inventory.includes('poison_vial')) {
          State.combat.poisonTurns = 3;
          State.combat.poisonDmg  = 8;
          Combat._log('Poison applied — 8 damage/turn for 3 turns.', 'log-dharma');
          dChange = -3;
        } else {
          Combat._log('No usable items in combat.', 'log-miss');
          return;
        }
        break;
      }
      case 'flee': {
        if (Math.random() > 0.45) {
          Combat._log('You withdraw into shadow.', 'log-miss');
          State.dharmaScore  = Math.max(0, State.dharmaScore - 5);
          State.combat.active = false;
          Overlays.close('combat');
          HUD.update();
          return;
        }
        eDmg = Math.floor(Math.random() * 22 + 12);
        Combat._log('Retreat blocked!', 'log-hit');
        break;
      }
    }

    /* Apply damage */
    State.combat.eHp = Math.max(0, State.combat.eHp - pDmg);
    State.hp         = Math.max(0, State.hp         - eDmg);
    State.dharmaScore = Math.max(0, Math.min(100, State.dharmaScore + dChange));
    HUD.adjustSpokes(Math.abs(dChange), dChange > 0);

    if (eDmg > 0) Combat._log(`${e.name} strikes for ${eDmg} damage.`, 'log-hit');

    Combat._refreshHp();
    HUD.update();

    /* ── Player death ── */
    if (State.hp <= 0) {
      State.flags.died_once = true;
      Combat._log('You fall. The dharma wheel slows...', 'log-miss');
      State.hp = 1;
      State.combat.active = false;
      Overlays.close('combat');
      document.getElementById('go-score').textContent = State.dharmaScore;
      Overlays.open('gameover');
      return;
    }

    /* ── Enemy death ── */
    if (State.combat.eHp <= 0) {
      Combat._log(`${e.name} is overcome!`, 'log-dharma');
      State.combat.active = false;
      if (e.gold)   { State.gold += e.gold; Combat._log(`+${e.gold} panas.`, 'log-heal'); }
      if (e.reward && !State.inventory.includes(e.reward)) {
        State.inventory.push(e.reward);
        Combat._log(`Found: ${ITEMS_DATA[e.reward]?.name}`, 'log-dharma');
        UI.notify(`Acquired: ${ITEMS_DATA[e.reward]?.name}`, 'gold');
      }
      HUD.update();
      const ns = State.combat.nextScene;
      setTimeout(() => { Overlays.close('combat'); Engine.go(ns); }, 1400);
    }
  },

  /** Add a line to the combat log */
  _log(msg, cls) {
    const log = document.getElementById('combat-log');
    if (!log) return;
    const d = document.createElement('div');
    d.className = cls || '';
    d.textContent = msg;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  },

  /** Sync enemy HP bar */
  _refreshHp() {
    const pct  = Math.max(0, (State.combat.eHp / State.combat.eMaxHp) * 100);
    const fill = document.getElementById('enemy-hp-fill');
    const txt  = document.getElementById('enemy-hp-text');
    if (fill) fill.style.width = pct + '%';
    if (txt)  txt.textContent  = `${Math.max(0, State.combat.eHp)} / ${State.combat.eMaxHp}`;
  },
};

/* Expose to HTML onclick */
window.Combat = Combat;
