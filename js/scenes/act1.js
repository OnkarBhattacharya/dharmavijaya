/* ═══════════════════════════════════════════════
   js/scenes/act1.js
   ACT I — THE EMPIRE
   Add new scenes by adding entries to ACT1_SCENES.
   Each scene key must be unique across all scene files.
═══════════════════════════════════════════════ */
const ACT1_SCENES = {

  intro: {
    art:'pataliputra', loc:'Pataliputra — The Imperial Palace', act:'ACT I — THE EMPIRE',
    text:`The great city of <em>Pataliputra</em> sprawls across the confluence of the Ganges and Son rivers — three million souls under one roof of empire. You stand in the outer courtyard of the Mauryan Palace, summoned before dawn by a royal messenger whose hands shook as he delivered the sealed scroll.<br><br>
<strong>The Emperor Ashoka commands your presence. Immediately.</strong><br><br>
Through carved sandstone archways, the throne room flickers with oil lamps. Two imperial guards watch you with the stillness of trained killers. Somewhere deeper in the palace, a conch shell sounds.<br><br>
The scroll in your hands is sealed with the lion crest. You haven't opened it.`,
    choices:[
      { text:'Break the seal and read it before entering', next:'intro_read_scroll', dharma:2 },
      { text:'Enter without reading — loyalty before intelligence', next:'throne_room' },
      { text:'Observe the guards\' body language before moving', next:'intro_observe', class:'amatya', dharma:3 },
      { text:'Meditate briefly. Enter with a clear mind.', next:'intro_meditate', class:'bhikshu', dharma:5 },
    ],
  },

  intro_read_scroll: {
    art:'pataliputra', loc:'Outer Courtyard', act:'ACT I — THE EMPIRE',
    text:`The scroll reads simply:<br><br><em>"The matter concerns Kalinga. Bring only what cannot be taken from you."</em><br><br>
Seven words that mean everything. <em>Kalinga</em> — the last unconquered eastern kingdom. Rich in iron, rice, and pride. What the Emperor wants from you, specifically, is less clear.<br><br>
You pocket the scroll and walk toward the light.`,
    choices:[{ text:'Enter the throne room', next:'throne_room', dharma:2 }],
  },

  intro_observe: {
    art:'pataliputra', loc:'Outer Courtyard', act:'ACT I — THE EMPIRE',
    text:`The nearer guard is anxious — new posting, eyes darting behind you. The farther guard has the stillness of someone expecting violence. Their formation isn't standard protocol.<br><br>
<em>Someone inside arranged to have you watched, not protected.</em><br><br>
Interesting. You file this away and enter, knowing you are already a piece on someone's board.`,
    changes:{ flag:'palace_watched', intel:'Noticed anomalous guard formation at entry. Someone monitors arrivals beyond standard protocol.' },
    choices:[{ text:'Enter the throne room', next:'throne_room', dharma:3 }],
  },

  intro_meditate: {
    art:'pataliputra', loc:'Outer Courtyard', act:'ACT I — THE EMPIRE',
    text:`You sit cross-legged in the dust of the imperial courtyard, close your eyes, and breathe.<br><br>
A guard coughs. Another shifts weight. After a full minute, you open your eyes. The world is the same — palace, torchlight, scroll, urgency. But you are different. Centered.<br><br>
<em>One of the guards watches you with something that might be respect.</em>`,
    changes:{ flag:'meditated', dharmaBonus:5 },
    choices:[{ text:'Enter the throne room', next:'throne_room' }],
  },

  throne_room: {
    art:'throne', loc:'The Throne Room', act:'ACT I — THE EMPIRE',
    text:`<strong>Ashoka sits not on his throne but on the steps below it.</strong> His generals line the walls. The old minister Radhagupta stands to his left — ancient and unreadable. The war map of Kalinga is spread across the floor like an open wound.<br><br>
The Emperor's eyes find you immediately. Younger than the stories suggest — mid-thirties, broad-shouldered, carrying exhaustion like another garment.<br><br>
<em>"The army moves on Kalinga at the next full moon,"</em> he says. No greeting. <em>"I need someone I trust absolutely. The reports from the eastern border speak of a Kalinga king advised by... something inhuman. Something no treatise accounts for."</em><br><br>
He looks at the map. <em>"Go east. Find out what we face. Come back alive."</em>`,
    choices:[
      { text:'"What exactly have the scouts reported?"', next:'intel_brief', dharma:2 },
      { text:'Swear your blade to the Emperor\'s cause immediately', next:'throne_swear', dharmaLoss:3 },
      { text:'"What protections will be given to Kalinga civilians?"', next:'throne_civilians', class:'bhikshu', dharma:10 },
      { text:'Accept silently. Information is power.', next:'throne_silent', dharma:1 },
    ],
  },

  intel_brief: {
    art:'map_room', loc:'The War Room', act:'ACT I — THE EMPIRE',
    text:`Radhagupta unrolls a second map — fresh ink. <em>"Three border posts went silent in a single night. Not attacked. Silent. When we sent cavalry to investigate, they returned changed. One refused to cross water. One wept without stopping."</em><br><br>
<em>"One reported that a man in the Kalinga court knew his name, his debts, his private fears — and offered to resolve all three. He refused. Barely."</em><br><br>
<strong>An Asura agent.</strong> Corrupting through temptation — finding each wound and pressing until the person breaks.<br><br>
Ashoka looks at you steadily. <em>"Now you understand why I need someone who cannot be bought."</em>`,
    choices:[
      { text:'Accept. Head east via the main road.', next:'eastern_road', dharma:2 },
      { text:'Request the Dharma Scroll from the royal library first', next:'royal_library', dharma:4 },
      { text:'Ask to interrogate the changed cavalry soldiers', next:'cavalry_interrogation', dharma:4 },
    ],
  },

  throne_swear: {
    art:'throne', loc:'The Throne Room', act:'ACT I — THE EMPIRE',
    text:`You draw your weapon and kneel. Steel on marble — very loud in the silence.<br><br>
Something crosses Ashoka's face. Not satisfaction. Almost disappointment. As if he wanted harder questions from you.<br><br>
<em>"Very well,"</em> he says. <em>"Go east."</em><br><br>
Radhagupta gives you a barely perceptible shake of the head as you rise. Warning, or judgment — you cannot tell.`,
    choices:[{ text:'Head east to Kalinga', next:'eastern_road' }],
  },

  throne_civilians: {
    art:'throne', loc:'The Throne Room', act:'ACT I — THE EMPIRE',
    text:`The generals shift. One begins to object — Ashoka raises a hand and the room goes silent.<br><br>
The Emperor stares at you for a long moment.<br><br>
<em>"You are asking me to see the Kalingas as people."</em> His voice quieter now. <em>"My generals see them as an obstacle. You are asking a different question."</em><br><br>
He looks at the map as if seeing it differently. <em>"That question may be the most important thing spoken in this room in a year."</em><br><br>
Radhagupta looks furious. The generals are confused. But something has shifted in Ashoka's eyes — a crack in the iron, admitting light.`,
    changes:{ dharmaBonus:12, flag:'civilians_question', intel:'Ashoka responded to civilian protection question with visible reflection — first sign of doubt about the Kalinga campaign.' },
    choices:[
      { text:'Press: propose humane surrender terms before the army moves', next:'surrender_terms', dharma:6 },
      { text:'Accept the mission and head east', next:'eastern_road', dharma:3 },
    ],
  },

  throne_silent: {
    art:'throne', loc:'The Throne Room', act:'ACT I — THE EMPIRE',
    text:`You bow and say nothing. Ashoka holds your gaze for a long moment, reading something in your silence.<br><br>
<em>"Good,"</em> he says finally. It's not clear what he means.<br><br>
Radhagupta hands you a travel warrant and cover identity. As you leave you hear Ashoka, quietly:<br><br>
<em>"That one will either save us or betray us. We'll know which by Kalinga."</em>`,
    choices:[{ text:'Head east', next:'eastern_road' }],
  },

  surrender_terms: {
    art:'throne', loc:'The Throne Room', act:'ACT I — THE EMPIRE',
    text:`You lay out the case: a formal offer of peaceful integration — guaranteed autonomy, trade agreements, a seat in the imperial council. Not conquest. Partnership.<br><br>
Radhagupta lists seven reasons it won't work. Ashoka listens to both of you.<br><br>
<em>"Draft the terms,"</em> he says finally. <em>"Send them ahead of you. Go east and prepare the ground."</em><br><br>
It is not approval. It is <em>openness</em> — and that is more than you expected.`,
    changes:{ dharmaBonus:10, flag:'surrender_drafted', intel:'Peace terms drafted and approved for advance dispatch to Kalinga. Ashoka open to non-military resolution.' },
    choices:[{ text:'Head east with the peace terms', next:'eastern_road', dharma:3 }],
  },

  royal_library: {
    art:'library', loc:'The Royal Library', act:'ACT I — THE EMPIRE',
    text:`Inside: a tall sandstone room of banana-leaf manuscripts. The librarian leads you to a locked chest.<br><br>
Inside, wrapped in saffron cloth: a handwritten scroll. The teaching on <em>pratītyasamutpāda</em> — interdependence, the mutual arising of all things.<br><br>
As you lift it, you feel a subtle wrongness. A shadow in the corner that should not be there at midday. The shadow holds its shape even as the lamplight moves.`,
    choices:[
      { text:'Take the scroll and leave quickly', next:'library_shadow_avoid', item:'dharma_scroll', dharma:2 },
      { text:'Turn directly and confront the shadow', next:'library_shadow_confront', dharma:5 },
      { text:'Pretend not to notice — observe what it does', next:'library_shadow_observe', dharma:4 },
    ],
  },

  library_shadow_avoid: {
    art:'library', loc:'The Royal Library', act:'ACT I — THE EMPIRE',
    text:`You pocket the scroll and walk out. Behind you, a voice — more felt than heard:<br><br>
<em class="mara-text">"The scroll will not protect you. Understanding is not armour. It is a vulnerability."</em><br><br>
You don't look back. Some things are better not confirmed.`,
    changes:{ flag:'mara_library_contact', lore:'mara_first_contact' },
    choices:[{ text:'Head east to Kalinga', next:'eastern_road' }],
  },

  library_shadow_confront: {
    art:'library', loc:'The Royal Library', act:'ACT I — THE EMPIRE',
    text:`The shadow resolves: a woman in a red sari, beautiful and utterly still. Her eyes are black as pressed ink — no iris, no white.<br><br>
<em class="mara-text">"The scroll will not protect you,"</em> she says. <em class="mara-text">"I am here because you interest me. You are trying to serve a man who will rewrite history — but history has defenders you have not met yet."</em><br><br>
She simply isn't there anymore. The librarian enters, confused. <em>"Were you speaking to someone?"</em>`,
    changes:{ flag:'mara_library_contact', flag2:'mara_spoken', lore:'mara_first_contact', dharmaBonus:5 },
    choices:[
      { text:'Record what you saw before memory fades', next:'eastern_road', dharma:3 },
      { text:'Tell the librarian nothing. Information is leverage.', next:'eastern_road' },
    ],
  },

  library_shadow_observe: {
    art:'library', loc:'The Royal Library', act:'ACT I — THE EMPIRE',
    text:`You pretend to read. The shadow moves — testing. When it sees you won't turn, it speaks:<br><br>
<em class="mara-text">"Interesting. A mind that won't be provoked. I will be watching you in Kalinga. The entity in the court is a lesser expression of what I am. It will recognise you have met me. Use that."</em><br><br>
The shadow is gone. You have been given information — and you don't fully know why.`,
    changes:{ flag:'mara_library_contact', flag2:'mara_observation_gift', lore:'mara_first_contact', dharmaBonus:6, intel:"The shadow entity claimed the Kalinga court's corruptor is a 'lesser expression' of itself. Mara may be using us — or testing us." },
    choices:[{ text:'Head east to Kalinga', next:'eastern_road', dharma:2 }],
  },

  cavalry_interrogation: {
    art:'barracks', loc:'Palace Barracks', act:'ACT I — THE EMPIRE',
    text:`The cavalry commander Devapala sits staring at his hands.<br><br>
<em>"He knew about my daughter,"</em> he says quietly. <em>"She died three monsoons ago. He said she was in pain in the afterlife because of my choices in battle. That she would be freed if I handed him certain information."</em><br><br>
His knuckles go white. <em>"I said no. But I wanted to say yes. Gods help me, I wanted to."</em><br><br>
<strong>The mechanism: find grief, promise resolution, extract compliance.</strong>`,
    changes:{ dharmaBonus:5, lore:'asura_method', intel:"Asura agent method confirmed: exploits unresolved grief and guilt. Defense is wholeness — nothing hidden = nothing leverageable." },
    choices:[
      { text:'Reassure Devapala: his daughter is at peace. His no was righteous.', next:'eastern_road', dharma:7 },
      { text:'Extract more operational intelligence before leaving', next:'eastern_road', dharmaLoss:3 },
    ],
  },

  eastern_road: {
    art:'road', loc:'The Eastern Road', act:'ACT I — THE EMPIRE',
    text:`The road east follows the Ganges for three days before turning into dense jungle. Ashoka's mile-markers stand every thousand steps — sandstone pillars with shade trees alongside.<br><br>
On the second evening, you camp near a Shaiva temple. The priest there — ash-painted arms, white-haired — sits outside watching the sky.<br><br>
<em>"You travel toward Kalinga,"</em> he says. Not a question. <em>"The birds have stopped flying that direction. Animals know when the land is sick."</em><br><br>
He offers food. As you eat: <em>"Three kos off the road there is an old shrine. Something guards it. It has asked to speak with someone like you."</em>`,
    choices:[
      { text:'Take the detour to the shrine', next:'naga_shrine', dharma:4 },
      { text:'Continue directly — time is short', next:'kalinga_approach' },
      { text:'Ask the priest what he knows about the corruption in Tosali', next:'priest_lore', dharma:3 },
    ],
  },

  priest_lore: {
    art:'temple', loc:'Wayside Temple', act:'ACT I — THE EMPIRE',
    text:`The priest stares into the fire before answering.<br><br>
<em>"What you call an Asura my grandfather's teacher called by its true nature: a mind that has forgotten interdependence. That believes it is alone in the universe. Very dangerous. Very sad."</em><br><br>
He hands you a small terracotta figure of <strong>Kali</strong>. <em>"She walks near Kalinga now. Not as your enemy. As a reckoning. Offer this at the field before you enter the court and she will not mistake you for what you are not."</em><br><br>
<em>"One more thing: the thing you face cannot corrupt what is freely given. It can only take what is already half-surrendered."</em>`,
    changes:{ lore:'kali_near_kalinga', lore2:'asura_weakness_clue', dharmaBonus:6, intel:"Priest confirms: the Asura exploits half-surrendered will. Defense = genuine openness — nothing hidden = nothing leverageable." },
    choices:[
      { text:'Thank him and continue east', next:'kalinga_approach', dharma:2 },
      { text:'Visit the shrine before Kalinga', next:'naga_shrine', dharma:3 },
    ],
  },

  naga_shrine: {
    art:'jungle', loc:'Hidden Shrine, Deep Forest', act:'ACT I — THE EMPIRE',
    text:`The path is unmarked but inexplicably clear. A stone platform in a clearing: a carved serpent coiled around a pillar, eyes set with green stone that catches no visible light.<br><br>
The ground vibrates. Then — words felt in the chest rather than heard:<br><br>
<em class="txt-dharma">"Small walker. We have watched this conflict building for four hundred years. The thing in Kalinga's court took another empire before this one."</em><br><br>
<em class="txt-dharma">"We offer a choice: knowledge without obligation — or power with a price. The first is wiser. Most choose the second."</em>`,
    choices:[
      { text:'Request knowledge: what is the Asura\'s weakness?', next:'naga_knowledge', dharma:8 },
      { text:'Request power: enhance my combat ability', next:'naga_power', dharmaLoss:6 },
      { text:'Decline politely. Obligations are dangerous.', next:'kalinga_approach', dharma:5 },
    ],
  },

  naga_knowledge: {
    art:'jungle', loc:'Hidden Shrine', act:'ACT I — THE EMPIRE',
    text:`<em class="txt-dharma">"The Asura cannot take what is freely given. Only what is half-surrendered. The ones who fell had already stopped believing their choices mattered."</em><br><br>
<em class="txt-dharma">"When you face it: it will offer you everything you want. The answer is not 'no.' The answer is to have nothing it can offer."</em><br><br>
The green stone eyes pulse once. An object rises from the water — a gem, deep teal, humming at a frequency just below hearing.`,
    changes:{ item:'naga_gem', lore:'naga_teaching', flag:'naga_knowledge_chosen', dharmaBonus:9, intel:"The Asura cannot corrupt what is freely given. Defense = wholeness. The Naga Gem reveals supernatural concealment." },
    choices:[{ text:'Accept the gem and continue to Kalinga', next:'kalinga_approach', dharma:2 }],
  },

  naga_power: {
    art:'jungle', loc:'Hidden Shrine', act:'ACT I — THE EMPIRE',
    text:`Power surges through you — temporary, clarifying, intoxicating.<br><br>
<em class="txt-dharma">"The price: we will call this debt at an unexpected moment. You will owe us a truth — one you have been keeping from yourself."</em><br><br>
A snake crosses your path as you leave. Looks at you with human intelligence. Turns away.`,
    changes:{ item:'naga_gem', dharmaLoss:5, flag:'naga_debt', intel:"Accepted Naga power with attached debt: will owe a self-truth at an unknown future moment." },
    choices:[{ text:'Continue to Kalinga, stronger', next:'kalinga_approach' }],
  },

  kalinga_approach: {
    art:'kalinga', loc:'Kalinga — The Eastern Kingdom', act:'ACT I — THE EMPIRE',
    text:`Kalinga asserts itself gradually: rice paddies and then coast. The people watch from doorways with eyes that know something is coming.<br><br>
The capital <strong>Tosali</strong> sits on a river bend. Its walls have never been forced. At a roadside market, you hear the whispers: <em>a new advisor. Eyes like oil on dark water. Promises everything. Gives nothing back.</em><br><br>
A Kalinga merchant pulls you aside.<br><br>
<em>"Go back. Whatever your Emperor sent you for — go back. The thing in the court has been expecting visitors."</em>`,
    choices:[
      { text:'Press on into the city', next:'tosali_gates', dharma:1 },
      { text:'Ask the merchant to describe the advisor in detail', next:'merchant_detail', dharma:3 },
      { text:'Observe the city from the hilltop first', next:'tosali_recon', dharma:3 },
      { text:'Find Prince Vijaya — the king\'s son is our way in', next:'find_vijaya', dharma:4 },
    ],
  },

  merchant_detail: {
    art:'kalinga', loc:'Kalinga Roadside', act:'ACT I — THE EMPIRE',
    text:`<em>"Arrived six months ago. Called himself a philosopher from the Deccan. He knew Kalinga's history in impossible detail. Then advisors who disagreed began to forget things. The king's own son said his father no longer recognises him sometimes. Looks through him like he isn't there."</em>`,
    changes:{ lore:'tosali_corruption', intel:"Asura advisor arrived 6 months ago. Corrupts through prolonged persuasion. King's family noticing behavioural change — possible leverage." },
    choices:[
      { text:'Find the king\'s son — an ally inside the court', next:'find_vijaya', dharma:4 },
      { text:'Enter the city directly through the main gate', next:'tosali_gates' },
    ],
  },

  tosali_recon: {
    art:'kalinga', loc:'Hilltop Above Tosali', act:'ACT I — THE EMPIRE',
    text:`From higher ground, patterns emerge. Guards change formation at irregular intervals — not military discipline, something external directing them. Three figures in dark robes move through the market. Stall owners' expressions change — not fear exactly. Compliance without awareness.<br><br>
<strong>The corruption is spreading through the city itself.</strong> Time is critical.`,
    changes:{ lore:'tosali_corruption_scope', dharmaBonus:4, intel:"Corruption extending beyond palace into market district. Robed figures conducting systematic persuasion. City may be partially compromised." },
    choices:[
      { text:'Infiltrate through the western gate quickly', next:'tosali_gates' },
      { text:'Find Prince Vijaya first', next:'find_vijaya', dharma:3 },
    ],
  },

  find_vijaya: {
    art:'temple', loc:'Tosali Temple District', act:'ACT I — THE EMPIRE',
    text:`You find Prince Vijaya — twenty years old — in a temple, not the palace. He kneels before stone Shiva, and he is weeping.<br><br>
When you reveal why you've come, he looks at you for a long time.<br><br>
<em>"You are from Ashoka."</em> Bitterness fills the word. <em>"The man coming to conquer us."</em><br><br>
<em>"Before the armies come,"</em> you say, <em>"I need to know what's in your father's court."</em><br><br>
<em>"My father's court,"</em> Vijaya says quietly, <em>"is no longer my father's."</em>`,
    choices:[
      { text:'Ask Vijaya to guide you into the palace', next:'vijaya_ally_basic', dharma:3 },
      { text:'Promise: if you help me, I will advocate for Kalinga\'s people', next:'vijaya_ally_promise', dharma:9 },
    ],
  },

  vijaya_ally_basic: {
    art:'temple', loc:'Tosali Temple', act:'ACT I — THE EMPIRE',
    text:`<em>"I am trusting you because I have no other option,"</em> he says. Not warm — honest.<br><br>
He gives you a royal letter of passage. <em>"The advisor holds court in the eastern wing each night. He calls it a philosophical salon. No one who enters leaves the same."</em>`,
    changes:{ flag:'vijaya_basic_ally', item:'cipher_tablet' },
    choices:[{ text:'Enter the palace and attend the salon', next:'palace_salon', dharma:2 }],
  },

  vijaya_ally_promise: {
    art:'temple', loc:'Tosali Temple', act:'ACT I — THE EMPIRE',
    text:`You have said the one thing he was not expecting — a <em>promise</em>.<br><br>
<em>"If you are lying, the gods will judge you,"</em> he says. <em>"If you mean it... then perhaps this doesn't all end in darkness."</em><br><br>
He gives you a royal letter and something else: a personal seal allowing private access to the king — and tells you about a secret passage.<br><br>
<em>"The advisor is most vulnerable when debated publicly. He has never lost. Breaking this will fracture the collective spell."</em>`,
    changes:{ flag:'vijaya_full_ally', flag2:'kalinga_passage', item:'cipher_tablet', lore:'vijaya_strategy', dharmaBonus:10, intel:"Advisor vulnerable to public defeat in debate. Has never lost — breaking this publicly will fracture collective compliance." },
    choices:[{ text:'Enter the palace and attend the salon', next:'palace_salon', dharma:2 }],
  },

  tosali_gates: {
    art:'kalinga', loc:'Gates of Tosali', act:'ACT I — THE EMPIRE',
    text:`The guards admit you without challenge. Inside: beautiful — carved pillars, lotus pools, traders selling silk and bronze. But a silence lives under the noise. Eyes kept down.<br><br>
One guard, as you pass, turns to look at you with an expression that resolves slowly into recognition. He hasn't seen you before. The recognition isn't of your face.<br><br>
<strong>Something in the city already knows you're here.</strong>`,
    choices:[
      { text:'Head directly to the palace', next:'palace_salon' },
      { text:'Spend a day in the city gathering information', next:'merchant_detail', dharma:2 },
    ],
  },

  palace_salon: {
    art:'throne', loc:'Palace Eastern Wing — Night', act:'ACT I — THE EMPIRE',
    text:`A hundred oil lamps. A dozen Kalinga nobles on low cushions. At the centre, a man speaks.<br><br>
Ordinary-looking. Medium height, scholar's hands, grey silk robes. But when he speaks, the room <em>contracts</em> around his voice. Every face tilts toward him like sunflowers.<br><br>
<em>"Power is the only truth,"</em> he says pleasantly. <em>"Morality is what the powerful call the behaviour they prefer in the weak. Dharma is Ashoka's word for 'obey me.'"</em><br><br>
Then he looks directly at you — through the crowd, past ten people — and smiles.<br><br>
<em>"Oh. A sceptic. How delightful. Come forward."</em>`,
    choices:[
      { text:'Step forward and engage him in philosophical debate', next:'mara_debate_act1', dharma:6 },
      { text:'Identify the most corrupted nobles first', next:'mara_observe', dharma:3 },
      { text:'Use the Naga Gem to reveal his true form', next:'mara_revealed_gem', dharma:4, requireItem:'naga_gem' },
      { text:'Attack immediately — physical surprise', next:'combat_mara_physical', dharmaLoss:8 },
    ],
  },

  mara_observe: {
    art:'throne', loc:'The Salon', act:'ACT I — THE EMPIRE',
    text:`You catalog quickly. Three nobles: fully under — eyes flat, absent. Five: partially compromised. Four: still themselves — including a woman in the back who looks disturbed.<br><br>
The advisor hasn't looked away from you. His audience now serves a secondary purpose: pressure. Everyone else's compliance is meant to isolate you.<br><br>
<em>"You are cataloguing,"</em> he says pleasantly. <em>"A trained intelligence. Pataliputra sends its best."</em>`,
    choices:[
      { text:'Signal the undamaged nobles to leave — then debate him', next:'mara_debate_act1', dharma:5 },
      { text:'Engage him directly without preparation', next:'mara_debate_act1', dharma:2 },
    ],
  },

  mara_revealed_gem: {
    art:'throne', loc:'The Salon', act:'ACT I — THE EMPIRE',
    text:`You hold up the Naga Gem. Its teal light draws inward rather than shining out.<br><br>
The ordinary-looking man stops mid-sentence. Around him, the air shimmers — and through the gem's lens, you see what actually occupies that body. Something vast, coiled, patient. Older than the empire.<br><br>
Several nobles who were watching him look away instinctively. The spell fractures at the edges.<br><br>
He looks at the gem, then at you. <em class="mara-text">"The Nagas gave you that. Interesting. But revealing what I am is not the same as defeating me."</em>`,
    changes:{ flag:'mara_revealed_to_court', dharmaBonus:6 },
    choices:[
      { text:'Engage him in the philosophical debate — publicly', next:'mara_debate_act1', dharma:5 },
      { text:'Demand he release the corrupted nobles now', next:'mara_demand', dharma:3 },
    ],
  },

  mara_demand: {
    art:'throne', loc:'The Salon', act:'ACT I — THE EMPIRE',
    text:`<em>"This entity has been feeding on your doubt and grief. Look at each other. Do you recognise yourselves?"</em><br><br>
The woman in the back stands. Then one of the undamaged four follows. Then another.<br><br>
<em class="mara-text">"Interesting tactic. But the ones already committed to me heard nothing you just said."</em><br><br>
Four nobles have walked out. The partially compromised five are wavering. The debate must still be won.`,
    changes:{ flag:'partial_liberation', dharmaBonus:5 },
    choices:[{ text:'Debate him now — while the room is divided', next:'mara_debate_act1', dharma:3 }],
  },

  /* Scene that triggers the Act I Mara debate */
  mara_debate_act1: {
    art:'throne', loc:'The Salon', act:'ACT I — THE EMPIRE',
    special:'debate', debateId:'act1_salon',
  },

  combat_mara_physical: {
    art:'throne', loc:'The Salon', act:'ACT I — THE EMPIRE',
    special:'combat', enemy:'mara_physical', nextScene:'mara_post_combat',
  },

  mara_post_combat: {
    art:'throne', loc:'The Salon — Aftermath', act:'ACT I — THE EMPIRE',
    text:`The body the Asura wore lies still. The nobles stare.<br><br>
The three deeply corrupted nobles sit unchanged — the hold breaking slowly, without the anchor of the entity's defeat in argument.<br><br>
<em>Something went unresolved here — not the situation, but the opportunity.</em><br><br>
By morning, most affected nobles begin to recover. Slowly. Not all will fully return to themselves.`,
    changes:{ dharmaLoss:5, flag:'mara_beaten_physically', lore:'mara_physical_defeat_cost' },
    choices:[{ text:'Report to Ashoka: the threat is neutralized', next:'kalinga_freed_partial' }],
  },

  kalinga_freed_partial: {
    art:'kalinga', loc:'Tosali — Dawn', act:'ACT I — THE EMPIRE',
    text:`Your message reaches Ashoka before the army moves. He comes personally — not with war elephants but a small retinue, in plain clothes.<br><br>
The court's corruption is mostly dispelled, though three nobles remain dulled. Changed. Whether they recover fully, no one can say.<br><br>
Kalinga is spared the full weight of Mauryan conquest, but the experience leaves a scar.`,
    changes:{ flag:'kalinga_partial_result', dharmaBonus:8 },
    choices:[{ text:'Report fully to Ashoka and continue to Act II', next:'act2_entry' }],
  },

  kalinga_freed: {
    art:'kalinga', loc:'Tosali — Dawn', act:'ACT I — THE EMPIRE',
    text:`Your message reaches Ashoka three days before the army was to march. He sends back one line, in his own hand:<br><br>
<em>"Hold the city open. I am coming personally."</em><br><br>
He arrives in plain clothes. He walks through Tosali's market alone. At the western quarter — where the fighting would have been worst — he stops before a mother with a child. Asks her name. Asks what her family needs. Stays two hours.<br><br>
Returning, his face carries something new.<br><br>
<em>"I would have destroyed all this,"</em> he says quietly. <em>"For what?"</em><br><br>
<strong>The Kalinga War does not happen as history remembers it.</strong>`,
    changes:{ flag:'kalinga_fully_freed', dharmaBonus:22, lore:'ashoka_tosali_walk' },
    choices:[
      { text:'Stay close to Ashoka as he processes this', next:'act2_entry', dharma:5 },
      { text:'Send a full detailed report — the nature of Mara matters', next:'act2_entry_warned', dharma:8 },
    ],
  },

  act2_entry_warned: {
    art:'pataliputra', loc:'Eastern Road — Letter by Rider', act:'ACT I — THE EMPIRE',
    text:`Your message to Ashoka details everything: the Asura's method, the Naga warnings, the nature of Mara, why the threat is paused rather than ended.<br><br>
<em>"It is watching to see what you choose,"</em> you write. <em>"Every compassionate act holds it. Every cruelty invites it back."</em><br><br>
Ashoka reads it twice, according to the rider who returns. Then:<br><br>
<em>"Come back. I need counsel from someone who has seen what I have not yet seen."</em>`,
    changes:{ flag:'ashoka_fully_warned', dharmaBonus:6, intel:"Ashoka fully briefed on supernatural threat. Understands Mara's nature. Requests counselor role." },
    choices:[{ text:'Return to Pataliputra for Act II', next:'act2_entry' }],
  },

};
