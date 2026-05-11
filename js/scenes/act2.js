/* ═══════════════════════════════════════════════
   js/scenes/act2.js
   ACT II — THE SILENCE OF KALINGA
═══════════════════════════════════════════════ */
const ACT2_SCENES = {

  act2_entry: {
    art:'pataliputra', loc:'Pataliputra — Five Years Later', act:'ACT II — THE SILENCE',
    text:`<strong>ACT II: THE SILENCE OF KALINGA</strong><br><br>
Five years have passed. Ashoka's transformation deepens but his court fractures. Old generals resent the peace. The Brahmin establishment is alarmed by Buddhist missionaries. Radhagupta is dead — of age, they say, though the timing was convenient for several factions.<br><br>
Three threats converge simultaneously:<br><br>
<strong>Pushyamitra</strong> — a general gathering support among the war party.<br>
<strong>Vasubandhu</strong> — a Brahmin theologian preparing a formal challenge to Ashoka's divine right to rule.<br>
<strong>The Treasury</strong> — gold disappearing in a pattern that suggests organised resistance to Ashoka's reforms.<br><br>
The Emperor meditates four hours a day. He is becoming something remarkable. He is also becoming vulnerable.`,
    changes:{ act:2, dharmaBonus:5 },
    choices:[
      { text:'Investigate the treasury disappearances first', next:'act2_treasury', dharma:3 },
      { text:'Approach the Brahmin challenge directly', next:'act2_brahmin', dharma:4 },
      { text:'Surveil Pushyamitra and his dinner gatherings', next:'act2_pushyamitra', dharma:2 },
    ],
  },

  act2_treasury: {
    art:'map_room', loc:'Imperial Treasury', act:'ACT II — THE SILENCE',
    text:`The records reveal a pattern: small amounts, always after dharma officer reports on illegal animal slaughter, always routed through the same mid-level account.<br><br>
The trail leads to <strong>Chandrasena</strong> — a minister whose family has run slaughterhouses for four generations, now watching their livelihood disappear under Ashoka's animal protection laws.<br><br>
He isn't evil. He's a man watching sixty families lose their income under someone else's enlightenment.`,
    changes:{ lore:'treasury_investigation', intel:"Treasury leak traced to Chandrasena — funding butchers' guild against animal protection laws. Sixty families affected by Ashoka's reforms." },
    choices:[
      { text:'Arrest Chandrasena and present evidence to Ashoka', next:'act2_chandrasena_arrest', dharmaLoss:3 },
      { text:'Meet Chandrasena privately first — understand before acting', next:'act2_chandrasena_talk', dharma:8 },
      { text:'Find an economic solution — what else can his family do?', next:'act2_chandrasena_solution', dharma:14 },
    ],
  },

  act2_chandrasena_talk: {
    art:'barracks', loc:"Chandrasena's Home", act:'ACT II — THE SILENCE',
    text:`He knows why you're there. He doesn't run.<br><br>
<em>"My grandfather built that business. My father expanded it. I employed sixty people. Now I employ eight, because the Emperor decided animals have the same right to life as humans."</em><br><br>
He spreads his hands. <em>"I don't disagree with him philosophically. I just have sixty families to feed."</em><br><br>
This is the texture of dharma in practice: not a monster, but a man caught in the gap between two systems.`,
    choices:[
      { text:'Propose a transition fund — take the case to Ashoka', next:'act2_chandrasena_solution', dharma:10 },
      { text:'Warn him to stop or face formal arrest', next:'act2_chandrasena_arrest', dharma:1 },
    ],
  },

  act2_chandrasena_solution: {
    art:'throne', loc:'Throne Room — Private Audience', act:'ACT II — THE SILENCE',
    text:`Ashoka listens without interrupting. When you finish, he is quiet.<br><br>
<em>"I made a law without making a bridge. That is my failure, not his."</em><br><br>
He orders a transition fund. Chandrasena is given first contracts for leather goods — still animal products, but not slaughter. Not perfect. Something.<br><br>
<em>"This is what dharma actually requires. Not just the prohibition — the path through the prohibition."</em>`,
    changes:{ dharmaBonus:16, flag:'chandrasena_solved', lore:'dharma_bridge_teaching' },
    choices:[
      { text:'Turn to Pushyamitra next', next:'act2_pushyamitra' },
      { text:'Help Ashoka prepare for the Brahmin challenge', next:'act2_brahmin' },
    ],
  },

  act2_chandrasena_arrest: {
    art:'barracks', loc:'Chandrasena in Custody', act:'ACT II — THE SILENCE',
    text:`Chandrasena is arrested. The court applauds efficiency. The sixty families he employed have no income. Three of his workers, angered, join Pushyamitra's faction.<br><br>
Ashoka signs the warrant without comment. That evening you find him in the garden, sitting very still.<br><br>
<em>"Was there another way?"</em> he asks. Not accusing. Genuinely asking.`,
    changes:{ dharmaLoss:4, flag:'chandrasena_arrested', intel:"Arrest triggered worker radicalisation — 3 joined Pushyamitra faction. Unintended consequence." },
    choices:[
      { text:'"Yes. I should have found it. I\'m sorry."', next:'act2_pushyamitra', dharma:5 },
      { text:'"The law required enforcement."', next:'act2_pushyamitra' },
    ],
  },

  act2_brahmin: {
    art:'library', loc:'The Debate Hall', act:'ACT II — THE SILENCE',
    text:`The Brahmin council has issued a formal theological challenge: Ashoka's Buddhist leanings violate Vedic principle, therefore his kingship lacks divine sanction.<br><br>
A political move in theological dress. If Ashoka loses the debate, three border governors may reconsider their loyalty.<br><br>
Head debater: <strong>Vasubandhu</strong>, sixty years old, sharp as obsidian, genuinely learned. Not wrong about everything. Not acting in good faith.`,
    choices:[
      { text:'Research Vedic-Buddhist compatibility — find the shared root', next:'act2_debate_research', dharma:6 },
      { text:'Find leverage on Vasubandhu — compromise his position', next:'act2_debate_leverage', dharmaLoss:5 },
      { text:'Advise Ashoka to debate from the heart, not strategy', next:'act2_debate_heart', dharma:10 },
    ],
  },

  act2_debate_research: {
    art:'library', loc:'The Library — Three Nights', act:'ACT II — THE SILENCE',
    text:`Three nights of reading. Rig Veda, Dhammapada, Atharvaveda.<br><br>
You find it: a passage in the Atharvaveda speaking of <em>ahimsa</em> as an ancient Vedic ideal — present before the schools diverged. Vasubandhu knows this passage. But it opens a line of argument he cannot close without rejecting his own tradition.`,
    changes:{ lore:'vedic_ahimsa_root', dharmaBonus:7, intel:"Atharvaveda contains pre-Buddhist ahimsa ideal. Vasubandhu cannot reject it without contradicting his own tradition. Strong debate foundation established." },
    choices:[{ text:'Brief Ashoka and prepare for the debate', next:'act2_debate_heart', dharma:3 }],
  },

  act2_debate_leverage: {
    art:'barracks', loc:'Intelligence Archives', act:'ACT II — THE SILENCE',
    text:`Your network finds something: Vasubandhu has been accepting fees from an army supply merchant — a conflict of interest with his priestly vows of non-commerce.<br><br>
You could ruin him publicly. Or let him know you could — a quieter coercion.<br><br>
Both options are, at their root, coercion.`,
    choices:[
      { text:'Use it to silence him quietly', next:'act2_brahmin_resolved_leverage', dharmaLoss:9 },
      { text:'Discard it — win honestly or not at all', next:'act2_brahmin', dharma:6 },
    ],
  },

  act2_brahmin_resolved_leverage: {
    art:'throne', loc:'Court — Next Morning', act:'ACT II — THE SILENCE',
    text:`Vasubandhu withdraws his challenge that morning, citing "further theological reflection." His face, when he looks at you, carries no warmth.<br><br>
The challenge is gone. The enemy is made.`,
    changes:{ dharmaLoss:8, flag:'brahmin_silenced_coercion', intel:"Vasubandhu neutralised via leverage. Warning: created a long-term enemy with full knowledge of the method used." },
    choices:[{ text:'Turn to the other threats', next:'act2_pushyamitra' }],
  },

  act2_debate_heart: {
    art:'throne', loc:'The Debate Hall', act:'ACT II — THE SILENCE',
    text:`Ashoka stands before the assembled council and abandons the prepared arguments entirely.<br><br>
<em>"I am not trying to replace the Vedic order. I am trying to live by its deepest principle: that all beings are sacred. If you believe they are not, then I am not a good Vedic king. But I think you do believe they are. I think that is the ground we share."</em><br><br>
Silence. Vasubandhu's prepared arguments are useless against this.<br><br>
Two governors send quiet messages: their loyalty holds. One is still uncertain.`,
    changes:{ dharmaBonus:14, flag:'brahmin_debate_heart', lore:'ashoka_debate_victory' },
    choices:[{ text:'Address Pushyamitra while the momentum holds', next:'act2_pushyamitra', dharma:2 }],
  },

  act2_pushyamitra: {
    art:'barracks', loc:'Military Quarter', act:'ACT II — THE SILENCE',
    text:`Pushyamitra is not subtle. He hosts dinners for disaffected generals, speaks openly about the empire's "softening."<br><br>
He's not evil. He is a man who believes strength is the only language the world understands — with forty years of evidence to support that belief.<br><br>
<em>"You stopped the Kalinga campaign. I know it was you. Do you understand what you cost us? Kalinga controls three trade routes. We handed it away for — a feeling?"</em>`,
    choices:[
      { text:'Counter on strategic grounds: peace was the better war strategy', next:'act2_push_debate', dharma:5 },
      { text:'Offer him a genuine military role in the new empire', next:'act2_push_offer', dharma:7 },
      { text:'Report him to Ashoka as a conspiracy risk', next:'act2_push_ashoka', dharmaLoss:2 },
      { text:'Challenge him to a duel — settle it warrior to warrior', next:'combat_pushyamitra', class:'kshatriya' },
    ],
  },

  combat_pushyamitra: {
    art:'barracks', loc:'Training Ground', act:'ACT II — THE SILENCE',
    special:'combat', enemy:'pushyamitra_duel', nextScene:'act2_push_duel_result',
  },

  act2_push_duel_result: {
    art:'barracks', loc:'Training Ground', act:'ACT II — THE SILENCE',
    text:`The duel ends. Whichever way it went, Pushyamitra sits across from you afterward, breathing hard, studying you with new attention.<br><br>
<em>"You're better than I expected."</em><br><br>
A grudging respect. Not alliance — respect. He hasn't closed his faction dinners, but he's started talking about capability rather than betrayal.`,
    changes:{ flag:'push_dueled', dharmaBonus:3 },
    choices:[{ text:'Follow up with the genuine offer', next:'act2_push_offer', dharma:4 }],
  },

  act2_push_debate: {
    art:'barracks', loc:"Officers' Mess", act:'ACT II — THE SILENCE',
    text:`<em>"Kalinga would have cost us ten thousand soldiers and created a generation of insurgents. The three trade routes — we now have treaty access to all three, freely given, because the king we didn't kill owes us a debt of gratitude."</em><br><br>
Pushyamitra blinks. He hadn't run the calculation that way.<br><br>
<em>"You're saying peace was the better war strategy."</em><br><br>
<em>"I'm saying dharma and competence aren't opposites. Ashoka isn't weak. He's playing a longer game."</em>`,
    changes:{ dharmaBonus:8, flag:'push_debated' },
    choices:[
      { text:'Follow up with a concrete military role offer', next:'act2_push_offer', dharma:4 },
      { text:'Leave him with that thought — sometimes doubt is enough', next:'act2_resolution', dharma:2 },
    ],
  },

  act2_push_offer: {
    art:'barracks', loc:"Officers' Mess", act:'ACT II — THE SILENCE',
    text:`You offer him a new role: Commander of Border Defence — protecting Mauryan citizens from actual threats, with real command and genuine honour.<br><br>
He stares at you for a long time.<br><br>
<em>"You're telling me I'm still needed."</em><br><br>
<em>"You are. The question is what for."</em><br><br>
He doesn't join your faction. But the dinner meetings stop. The conspiracy, without its centre of gravity, dissolves quietly.`,
    changes:{ dharmaBonus:11, flag:'push_converted', lore:'pushyamitra_role' },
    choices:[{ text:'Report to Ashoka — the court is stable', next:'act2_resolution' }],
  },

  act2_push_ashoka: {
    art:'throne', loc:'Throne Room', act:'ACT II — THE SILENCE',
    text:`Ashoka has Pushyamitra brought in. The general stands like a man prepared to die — not afraid, resolved.<br><br>
<em>"You disagree with everything I'm doing."</em><br><br>
<em>"Yes, my Emperor."</em><br><br>
<em>"Then you will serve as the officer who tells me when I am wrong. I do not need agreement. I need honesty."</em><br><br>
Pushyamitra is stunned. Whatever he expected, it wasn't this.`,
    changes:{ dharmaBonus:6, flag:'push_advisor', lore:'ashoka_opposition_counsel' },
    choices:[{ text:'Report: the court is stable, proceed to Act III', next:'act2_resolution' }],
  },

  act2_resolution: {
    art:'pataliputra', loc:'Pataliputra — End of Year', act:'ACT II — THE SILENCE',
    text:`The court has stabilised. Not perfectly — nothing in governance is ever perfect — but the three crises have taught you something about the difference between power and authority.<br><br>
Ashoka plants a tree in the palace garden. He does it himself, with his own hands. A crowd gathers to watch the Emperor dig.<br><br>
Afterward, he says: <em>"My great-grandfather built an empire. My grandfather held it. I am trying to do something with no precedent: make it worthy of existing."</em><br><br>
He looks at you. <em>"Are you still with me?"</em>`,
    choices:[
      { text:'"Yes. Until the Wheel is complete."', next:'act3_entry', dharma:8 },
      { text:'"I am. But I need to tell you what I know about Mara."', next:'act2_mara_briefing', dharma:6 },
    ],
  },

  act2_mara_briefing: {
    art:'throne', loc:'Private Garden — Night', act:'ACT II — THE SILENCE',
    text:`You tell Ashoka everything: the library, the woman in red, the Naga teaching, what the salon entity was.<br><br>
He listens without interrupting. When you finish, the palace is very quiet.<br><br>
<em>"So it will come back."</em><br><br>
<em>"Yes."</em><br><br>
<em>"And what holds it?"</em><br><br>
<em>"Every compassionate act. Every bridge built for a law. Every honest answer instead of a useful lie."</em><br><br>
He looks at the stars. <em>"Then I had better be very busy."</em>`,
    changes:{ dharmaBonus:10, flag:'ashoka_knows_mara', lore:'ashoka_mara_briefed' },
    choices:[{ text:'Head into Act III together', next:'act3_entry', dharma:5 }],
  },

};
