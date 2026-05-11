/* ═══════════════════════════════════════════════
   js/scenes/act3.js
   ACT III — DHARMASHOKA
═══════════════════════════════════════════════ */
const ACT3_SCENES = {

  act3_entry: {
    art:'pataliputra', loc:'Pataliputra — Year 249 BCE', act:'ACT III — DHARMASHOKA',
    text:`<strong>ACT III: DHARMASHOKA — THE RIGHTEOUS</strong><br><br>
The empire transforms. Dhamma Mahamattas — officers of righteousness — travel every road, reporting on the poor, prisoners, animals, women. Hospitals appear on trade routes. Wells and shade trees shelter travellers for a thousand miles. Stone pillars that once marked military victories are being re-inscribed with ethical principles.<br><br>
Ashoka sends his son Mahinda and daughter Sanghamitta to Ceylon with the Dharma. Envoys leave for Antiochus II in Syria, Ptolemy in Egypt.<br><br>
But three final threats remain. <strong>Mara has not left.</strong> And there is a question of endings.`,
    changes:{ act:3, dharmaBonus:8 },
    choices:[
      { text:'Address the final Asura corruption in the north', next:'act3_north_corruption', dharma:3 },
      { text:'Help Ashoka write the final Major Rock Edicts', next:'act3_edicts', dharma:5 },
      { text:'Confront Mara directly — it has not left', next:'act3_mara_final', dharma:6 },
    ],
  },

  act3_north_corruption: {
    art:'road', loc:'Northern Trade Road', act:'ACT III — DHARMASHOKA',
    text:`Reports from the northern provinces: a cluster of villages where Ashoka's dharma officers have been turned away — politely but firmly — by a local administrator named Viduratha who has rebuilt the old slaughter practices and has what witnesses describe as <em>"eyes that don't quite track right."</em><br><br>
You ride north. Three days out of Pataliputra, you are attacked on the road by a figure who moves too fast for a human.`,
    special:'combat', enemy:'corrupt_minister', nextScene:'act3_north_resolution',
  },

  act3_north_resolution: {
    art:'road', loc:'Northern Province', act:'ACT III — DHARMASHOKA',
    text:`Viduratha's corruption is visible in person — the same flat quality you saw in Tosali, the same careful logical arguments for why dharma is impractical. But he is a lesser vessel. Without Mara directly present, he cannot withstand the Gem's clarity or a direct challenge.<br><br>
He breaks in the second hour of the confrontation: <em>"It told me the empire was going to collapse anyway. That I should take what I could while it existed."</em><br><br>
He begins to weep. A man who made a terrible bargain, fully awake to its cost now.`,
    changes:{ dharmaBonus:8, flag:'north_resolved', lore:'lesser_asura_vessel' },
    choices:[
      { text:'Recommend rehabilitation — he was manipulated', next:'act3_edicts', dharma:8 },
      { text:'Recommend prosecution — he chose this', next:'act3_edicts', dharmaLoss:2 },
    ],
  },

  act3_edicts: {
    art:'library', loc:'The Inscription Hall', act:'ACT III — DHARMASHOKA',
    text:`Ashoka is writing the Rock Edicts — the most extensive philosophical inscriptions any ruler has ever commissioned. He wants your help with two of them.<br><br>
The first concerns <strong>religious tolerance</strong>: Brahmins, Buddhists, Jains, Ajivikas, and Greeks all practising within the empire's borders. He drafts:<br><br>
<em>"One should not honour only one's own religion and condemn the religion of others. All religions deserve reverence."</em><br><br>
He looks at you. <em>"Is this enough? Or is it still too cautious?"</em>`,
    choices:[
      { text:'"Add: the growth of understanding itself is the highest worship."', next:'act3_edict_bolder', dharma:8 },
      { text:'"It is enough. Clarity over ambition."', next:'act3_edict_careful', dharma:5 },
      { text:'"Ask the Brahmin and Buddhist councils both — their consensus carries more weight."', next:'act3_edict_consensus', dharma:6 },
    ],
  },

  act3_edict_bolder: {
    art:'library', loc:'The Inscription Hall', act:'ACT III — DHARMASHOKA',
    text:`Ashoka writes it. Pauses. Reads it back.<br><br>
<em>"The growth of understanding itself is the highest worship."</em><br><br>
<em>"This,"</em> he says quietly, <em>"is either the most important sentence I have written — or the most dangerous."</em><br><br>
He inscribes it on stone regardless. The edict will stand for two thousand years.`,
    changes:{ dharmaBonus:12, flag:'bold_edict', lore:'edict_understanding' },
    choices:[{ text:'Prepare for the final confrontation with Mara', next:'act3_mara_final', dharma:4 }],
  },

  act3_edict_careful: {
    art:'library', loc:'The Inscription Hall', act:'ACT III — DHARMASHOKA',
    text:`The edict is inscribed as written. Careful, clear, durable.<br><br>
Ashoka seems satisfied — and perhaps a little relieved. Not every moment requires the most ambitious version of itself.<br><br>
<em>"Some things,"</em> he says, <em>"are best planted small. They grow."</em>`,
    changes:{ dharmaBonus:7, flag:'careful_edict' },
    choices:[{ text:'Prepare for the final confrontation with Mara', next:'act3_mara_final', dharma:3 }],
  },

  act3_edict_consensus: {
    art:'library', loc:'The Inscription Hall', act:'ACT III — DHARMASHOKA',
    text:`You convene a small council — three Brahmin scholars, two senior monks, a Jain elder. They argue for a day and a half. They agree on six words:<br><br>
<em>"Concord among all faiths is best."</em><br><br>
Ashoka smiles. <em>"Six words. Three days of effort. And they are the six best words I could have used."</em><br><br>
The edict inscribed by consensus carries a different kind of weight — not one ruler's clarity, but a civilisational agreement.`,
    changes:{ dharmaBonus:15, flag:'consensus_edict', lore:'edict_consensus_process' },
    choices:[{ text:'The final meeting with Mara awaits', next:'act3_mara_final', dharma:4 }],
  },

  act3_mara_final: {
    art:'temple', loc:'Palace Garden — Dusk', act:'ACT III — DHARMASHOKA',
    text:`You find Mara at sunset, sitting in the palace garden near the tree Ashoka planted.<br><br>
It wears an old man's body this time — a philosopher, white-haired and weathered, feeding birds with a patience that is almost meditative.<br><br>
It looks up as you approach. Its eyes, even in this form, carry that quality of knowing too much.<br><br>
<em class="mara-text">"You again. You're persistent."</em><br><br>
<em>"You said you would pause. You've been here five years."</em><br><br>
<em class="mara-text">"I said I wanted to see what he would do. I am still watching."</em> A pause. <em class="mara-text">"Sit. Let us speak honestly for once. You have earned that, at least."</em>`,
    choices:[
      { text:'Sit and engage: "What will it take for you to leave this empire in peace?"', next:'act3_mara_negotiation', dharma:6 },
      { text:'Challenge Mara to the final philosophical debate', next:'mara_debate_act3', dharma:8 },
      { text:'"What did you see in these five years? What changed your mind?"', next:'act3_mara_witness', dharma:10 },
    ],
  },

  act3_mara_witness: {
    art:'temple', loc:'Palace Garden', act:'ACT III — DHARMASHOKA',
    text:`Mara is quiet for a long time. The birds continue feeding from its outstretched hand.<br><br>
<em class="mara-text">"I watched him walk through Tosali. I watched him plant that tree."</em> A gesture toward the young sapling. <em class="mara-text">"I watched him ask the treasury minister whether there was another way — genuinely asking, not performing the question."</em><br><br>
<em class="mara-text">"I have watched seventeen empires. Fourteen of them, the leaders asked that same question — and meant it in the first year. By the fifth year, they stopped asking."</em><br><br>
<em class="mara-text">"He still asks."</em><br><br>
Something in Mara's face that might — might — be almost-sadness. <em class="mara-text">"I am not accustomed to being wrong."</em>`,
    changes:{ dharmaBonus:12, flag:'mara_witnessed_ashoka', lore:'mara_seventeen_empires' },
    choices:[
      { text:'"Then let this be the first empire you leave in peace."', next:'act3_mara_release', dharma:15 },
      { text:'Press the philosophical debate — close this definitively', next:'mara_debate_act3', dharma:8 },
    ],
  },

  act3_mara_negotiation: {
    art:'temple', loc:'Palace Garden', act:'ACT III — DHARMASHOKA',
    text:`<em class="mara-text">"What would it take,"</em> Mara repeats thoughtfully. <em class="mara-text">"You are treating me as a rational actor with negotiable interests."</em><br><br>
<em>"Aren't you?"</em><br><br>
A long pause. The birds finish the grain and fly away.<br><br>
<em class="mara-text">"I want to know if it is possible. If a civilisation built on restraint rather than fear can hold. Every time I have seen it tried, it has collapsed — from within, from corruption, from the next generation's forgetfulness."</em><br><br>
<em class="mara-text">"If it holds — I will have my answer. And I will not need to corrupt it to see."</em>`,
    changes:{ dharmaBonus:8, flag:'mara_negotiation' },
    choices:[
      { text:'"Then stand down. Let us prove it."', next:'act3_mara_release', dharma:12 },
      { text:'"I don\'t trust that. Win the debate — then it\'s done."', next:'mara_debate_act3', dharma:6 },
    ],
  },

  act3_mara_release: {
    art:'temple', loc:'Palace Garden', act:'ACT III — DHARMASHOKA',
    text:`Mara looks at the tree Ashoka planted. Looks at you.<br><br>
<em class="mara-text">"Seventeen empires,"</em> it says again. <em class="mara-text">"And you are asking me to not-act, when not-acting is the one thing I have never tried."</em><br><br>
It stands. The old man's body straightens — and for just a moment you see what it actually is: something enormous, patient, exhausted in a way that has no human analogue.<br><br>
<em class="mara-text">"I will withdraw. Not because you defeated me. Because you offered me something more interesting than victory: the possibility of being genuinely wrong."</em><br><br>
<em class="mara-text">"Do not waste it."</em><br><br>
The old man walks away and is gone. The garden is just a garden.`,
    changes:{ dharmaBonus:25, flag:'mara_withdrawn_peacefully', lore:'mara_peaceful_withdrawal' },
    choices:[{ text:'Tell Ashoka. Then see what the empire becomes.', next:'ending_check' }],
  },

  mara_debate_act3: {
    art:'temple', loc:'Palace Garden', act:'ACT III — DHARMASHOKA',
    special:'debate', debateId:'act3_final',
  },

  ending_check: {
    art:'pataliputra', loc:'Pataliputra', act:'ACT III — DHARMASHOKA',
    text:`You stand with Ashoka as he reads the newly inscribed edict aloud to the court. His voice is steady and clear:<br><br>
<em>"All men are my children. As for my own children, I desire they be provided with all welfare and happiness of this world and of the next."</em><br><br>
The Dharma Wheel has turned. History has bent — and this time it bends toward something worth bending toward.<br><br>
What kind of empire has your dharma built?`,
    choices:[{ text:'See your ending', next:'__ending__' }],
  },

};
