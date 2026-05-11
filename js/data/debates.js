/* ═══════════════════════════════════════════════
   js/data/debates.js
   Philosophical combat against Mara.
   Add a new debate by adding an entry here and
   referencing it in a scene with:
     special: 'debate', debateId: 'your_key'
═══════════════════════════════════════════════ */
const DEBATES = {

  /* ── ACT I — The Salon ── */
  act1_salon: {
    title:      'Philosophical Combat — The Salon',
    maraIntro:  `<em>"Power is the only truth. Morality is what the powerful call the behavior they prefer in the weak. Dharma is simply Ashoka's preferred word for 'obey me.'"</em>`,
    rounds: [
      {
        id: 'r1',
        mara: `<em>"Consider this:"</em> Mara spreads his hands pleasantly. <em>"Every law, without exception, benefits someone at the expense of someone else. Ashoka's dharma benefits those who already have enough to be non-violent. The poor cannot afford ahimsa — they kill to eat. Who speaks for them? Not Ashoka. Not the Buddha."</em>`,
        choices: [
          {
            text:     '"Ashoka\'s hospital programme specifically targets the poor — material support for those who have least."',
            correct:  true,
            response: `Mara pauses. Something shifts behind its eyes. <em>"Material support. Yes. That does complicate the argument."</em> A notch of confidence lost.`,
            dharmaGain: 10,
          },
          {
            text:     '"The poor benefit most from stable governance — war harms them first and hardest."',
            partial:  true,
            response: `<em>"A reasonable point,"</em> Mara concedes, <em>"but it doesn't address who benefits from this particular articulation of dharma."</em> Partial ground held.`,
            dharmaGain: 5,
          },
          {
            text:     '"Laws always benefit someone — that doesn\'t make all laws equivalent."',
            wrong:    true,
            response: `<em>"Precisely,"</em> Mara says smoothly. <em>"Some benefit the powerful. Mine is the honest acknowledgment of that fact."</em>`,
            dharmaLoss: 5,
          },
        ],
      },
      {
        id: 'r2',
        mara: `<em>"Let us be direct,"</em> Mara continues. <em>"Compassion as a system of governance has never survived. Not once. Every Buddhist kingdom was eventually absorbed or converted to something harder. The evidence of history is overwhelming. You are fighting entropy with philosophy."</em>`,
        choices: [
          {
            text:     '"No one has committed to it long enough. This is the first real attempt. You\'re asking us to quit before the experiment has run."',
            correct:  true,
            response: `<em>"The first real attempt."</em> Mara is quiet for a moment. <em>"That is... a defensible position."</em>`,
            dharmaGain: 12,
          },
          {
            text:     '"History is not deterministic — the future is not fixed by the past."',
            partial:  true,
            response: `Mara smiles slightly. <em>"Possible. But you have given me no reason to believe this time is different."</em> Held, not won.`,
            dharmaGain: 4,
          },
          {
            text:     '"Compassionate governance has to be strong to survive — Ashoka\'s empire is very strong."',
            wrong:    true,
            response: `<em>"Strength without principle is exactly what I am advocating,"</em> Mara says gently. <em>"You have agreed with me."</em>`,
            dharmaLoss: 8,
          },
        ],
      },
      {
        id: 'r3',
        mara: `Mara leans forward slightly. <em>"Here is my final point — honestly offered. If dharma is real and righteousness has cosmological weight, why does it require enforcement? Why the prison, the edict with penalties attached? A truth that must be imposed is not a truth. It is a preference with consequences."</em>`,
        choices: [
          {
            text:     '"People are in the middle of becoming, not at their end. Dharma isn\'t imposed — it\'s offered. The edict creates conditions for becoming. You\'re confusing the scaffold with the building."',
            correct:  true,
            response: `Something breaks. Around the room, three nobles' eyes regain depth. <em>"The scaffold,"</em> Mara says quietly. <em>"I... had not considered that framing."</em>`,
            dharmaGain: 18,
          },
          {
            text:     '"All systems require enforcement — including yours. What makes your system honest?"',
            partial:  true,
            response: `<em>"Mine is honest about what it is,"</em> Mara says. But the room is shifting.`,
            dharmaGain: 7,
          },
          {
            text:     '"The edicts are persuasion, not compulsion — the penalties are light."',
            wrong:    true,
            response: `<em>"The lightest chain is still a chain,"</em> Mara says serenely. <em>"Thank you for proving my point."</em>`,
            dharmaLoss: 6,
          },
        ],
      },
    ],
    successScene: 'kalinga_freed',
    partialScene: 'kalinga_freed_partial',
    failScene:    'mara_post_combat',
  },

  /* ── ACT III — The Final Reckoning ── */
  act3_final: {
    title:      'The Final Reckoning — Mara and the Counselor',
    maraIntro:  `<em class="mara-text">"Very well. You want the debate. Five years I have watched. I will ask you three things that have broken better minds than yours. Answer well — I leave. Fail — I remain. And what comes after Ashoka will be mine."</em>`,
    rounds: [
      {
        id: 'f1',
        mara: `<em class="mara-text">"First question."</em> Mara's ancient eyes are calm. <em class="mara-text">"Ashoka built his righteousness on the ruins of conquest. He expanded the empire through violence, then declared himself a man of peace. His dharma was purchased with blood. How can it be genuine — and if it is not genuine, what have you actually built?"</em>`,
        choices: [
          {
            text:     '"Transformation is valid regardless of origin. A person who causes harm and then genuinely changes has changed. The alternative — that no one can ever change — serves only those who wish nothing to change. Including you."',
            correct:  true,
            response: `Mara is still for a long moment. <em class="mara-text">"The alternative serves only those who wish nothing to change. Including me."</em> It repeats the phrase slowly, as if tasting something unfamiliar.`,
            dharmaGain: 15,
          },
          {
            text:     '"The past cannot be changed, but the future can be shaped. Judging the transformation by its origin is a logical error."',
            partial:  true,
            response: `<em class="mara-text">"A philosophical point — but it doesn't address the genuine blood on genuine hands,"</em> Mara says. Ground held but not won.`,
            dharmaGain: 6,
          },
          {
            text:     '"Ashoka\'s sincerity is self-evident — look at what he has built."',
            wrong:    true,
            response: `<em class="mara-text">"Sincerity is not the same as validity,"</em> Mara says gently. <em class="mara-text">"The most sincere tyrant is still a tyrant."</em>`,
            dharmaLoss: 8,
          },
        ],
      },
      {
        id: 'f2',
        mara: `<em class="mara-text">"Second question."</em> Mara's voice is more direct now — something genuine is at stake. <em class="mara-text">"You spent five years managing, persuading, and sometimes coercing choices — through the spy network, political maneuvering, information control. How is what you did different from what I do? We both operate in shadows. The difference is only the outcome you prefer."</em>`,
        choices: [
          {
            text:     '"The difference is consent and direction. I shaped conditions for people to choose more freely — including choices against my preference. You collapse freedom. The difference isn\'t what I prefer. It\'s what I protect."',
            correct:  true,
            response: `This lands differently. Mara is genuinely quiet. The sound of the city beyond the walls. <em class="mara-text">"...what you protect."</em> The conviction bar drops sharply.`,
            dharmaGain: 20,
          },
          {
            text:     '"I was serving Ashoka\'s vision, not my own. The authority I operated within was legitimate."',
            partial:  true,
            response: `<em class="mara-text">"Legitimacy is the most common justification for exactly what I do,"</em> Mara says. But something has caught.`,
            dharmaGain: 8,
          },
          {
            text:     '"My methods were sometimes wrong — I admit that."',
            wrong:    true,
            response: `<em class="mara-text">"Then you admit you are not different from me — only better-intentioned. And good intentions are the road I travel most profitably."</em>`,
            dharmaLoss: 10,
          },
        ],
      },
      {
        id: 'f3',
        mara: `The old philosopher carries something close to exhaustion. <em class="mara-text">"Final question. I ask this honestly, because I want to know:"</em><br><br><em class="mara-text">"Ashoka will die. The empire will fracture — every empire does. The Pushyamitras of the next generation will undo what you built. The stone pillars will be defaced. Given that it will all end — why did you spend your life on this?"</em>`,
        choices: [
          {
            text:     '"Because the people who lived in it lived better. Because the mother in Tosali that Ashoka spoke to for two hours — that happened. It is real and permanent, regardless of what comes after. The impermanence of the empire does not retroactively cancel the lives lived well within it. You treat history as if only its ending matters. Only the living matters."',
            correct:  true,
            response: `Mara sits with this for a long time.<br><br><em class="mara-text">"Only the living matters."</em><br><br>The old philosopher stands. And as it stands, the shape of what it actually is becomes briefly visible — something vast and very tired.<br><br><em class="mara-text">"I believe I have been wrong for a very long time,"</em> it says quietly.`,
            dharmaGain: 30,
          },
          {
            text:     '"The seed matters even when the tree falls. What is planted in people\'s minds outlasts the institution."',
            partial:  true,
            response: `<em class="mara-text">"A poetic answer. Not wrong. But not quite enough."</em> The bar drops, but the debate isn't over.`,
            dharmaGain: 12,
          },
          {
            text:     '"Because it was right. That has to be enough."',
            wrong:    true,
            response: `<em class="mara-text">"'It was right' is exactly what every empire in history believed about itself. That is not an answer. That is the question restated."</em>`,
            dharmaLoss: 8,
          },
        ],
      },
    ],
    successScene: 'act3_mara_release',
    partialScene: 'ending_check',
    failScene:    'ending_check',
  },

};
