/* ═══════════════════════════════════════════════
   js/scenes/sidequests.js
   Side quest scenes.
   These are referenced by the quest step 'scene'
   fields in js/data/quests.js
═══════════════════════════════════════════════ */
const SIDEQUEST_SCENES = {

  sidequest_nagarjuna: {
    art:'temple', loc:"Pataliputra Market District", act:'SIDE QUEST',
    text:`You find him in a tea stall — a young monk, perhaps twenty-five, with eyes far older than that. He introduces himself as Nagarjuna, recently arrived from the south.<br><br>
His conversation moves like water around obstacles. Within ten minutes you realise he has articulated a philosophical framework you'll be thinking about for years.<br><br>
When you explain Devapala's situation, he listens carefully.<br><br>
<em>"The grief of the living is not the reality of the dead,"</em> he says. <em>"His daughter's state is not determined by his guilt. The connection between father and child is not severable by guilt or time. Tell him: he is still her father. That has not changed. That cannot change."</em>`,
    changes:{ dharmaBonus:5, lore:'nagarjuna_teaching' },
    choices:[{ text:"Bring this teaching to Devapala", next:'sidequest_devapala_closure', dharma:3 }],
  },

  sidequest_devapala_closure: {
    art:'barracks', loc:'Palace Barracks', act:'SIDE QUEST',
    text:`Devapala listens to Nagarjuna's words. You watch his face change — not immediately, but slowly, like ice thawing.<br><br>
<em>"He is still her father. That has not changed."</em> He repeats it quietly. Then again.<br><br>
He looks up. His eyes are wet but his hands have finally unclenched.<br><br>
<em>"I have been holding this,"</em> he says, <em>"like a stone in a closed fist. Convinced that releasing it would mean I loved her less."</em><br><br>
He opens his hands. Empty. Alive.`,
    changes:{ dharmaBonus:12, lore:'devapala_peace', flag:'devapala_healed' },
    choices:[{
      text:"Complete quest: Devapala's Grief",
      next:'act2_entry',
      onComplete: 'devapala_daughter',
    }],
  },

  sidequest_vijaya_charter: {
    art:'library', loc:"Tosali — Vijaya's Study", act:'SIDE QUEST',
    text:`Vijaya has spread six different versions of a charter across a large table.<br><br>
<em>"Here is my problem,"</em> he says. <em>"If I copy Ashoka too closely, it looks like capitulation. If I diverge too much, I lose access to the genuinely good ideas in his edicts."</em><br><br>
He looks at you. <em>"How do you make something your own that you learned from someone else?"</em>`,
    choices:[
      { text:'"Take the principles, not the words. What Ashoka understood, you can understand independently."', next:'sidequest_vijaya_complete', dharma:8 },
      { text:'"Acknowledge the source. Strength is admitting who taught you."', next:'sidequest_vijaya_complete', dharma:10 },
      { text:'"Focus on what Kalinga specifically needs. Your charter should solve your problems."', next:'sidequest_vijaya_complete', dharma:7 },
    ],
  },

  sidequest_vijaya_complete: {
    art:'library', loc:"Tosali — Vijaya's Study", act:'SIDE QUEST',
    text:`Vijaya writes for an hour. What emerges is unmistakably Kalinga — the maritime emphasis, the reference to their river festivals, specific protections for fishing communities. But the ethical skeleton is recognisable.<br><br>
<em>"It is its own thing,"</em> he says, satisfied. <em>"And yet I couldn't have written it without having read his."</em><br><br>
He looks at you with something new: not bitterness, not even gratitude. Peer-to-peer respect.`,
    changes:{ dharmaBonus:15, flag:'kalinga_charter', intel:"Kalinga charter completed. Vijaya establishing legitimate governance. Trade agreements being drafted. Regional stability improving." },
    choices:[{
      text:"Complete quest: Vijaya's First Edict",
      next:'act2_entry',
      onComplete: 'vijaya_governance',
    }],
  },

  sidequest_naga_debt: {
    art:'jungle', loc:'Hidden Shrine', act:'SIDE QUEST',
    text:`The shrine is exactly as you left it. The serpent eyes catch no light.<br><br>
The ground vibrates.<br><br>
<em class="txt-dharma">"You came back. That is the truth already."</em><br><br>
<em>"I don't understand."</em><br><br>
<em class="txt-dharma">"The truth you kept from yourself was that you didn't come back because of the debt. You came back because you wanted to. The debt was already paid when you made that choice. There is a difference between obligation and desire, and you now know which one this was."</em><br><br>
The gem in your possession glows once, warm.`,
    changes:{ dharmaBonus:20, flag:'naga_debt_paid', lore:'naga_debt_resolution' },
    choices:[{
      text:"Complete quest: The Naga's Question",
      next:'act2_entry',
      onComplete: 'naga_debt',
    }],
  },

};
