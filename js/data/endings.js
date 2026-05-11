/* ═══════════════════════════════════════════════
   js/data/endings.js
═══════════════════════════════════════════════ */
const ENDINGS = {
  golden: {
    icon:        '☀️',
    color:       'var(--gold)',
    title:       'THE GOLDEN WHEEL',
    dharmaLabel: 'Perfect Dharma — The Wheel Balanced',
    text: `<strong>Fourteen years after your first meeting in that torchlit throne room, you stand as Ashoka reads from the Major Rock Edict:</strong><br><br>
<em>"All men are my children. I desire their welfare and happiness in this world and the next."</em><br><br>
The Dhamma Mahamattas travel every road. Hospitals on every trade route. Wells and shade trees for a thousand miles. Kalinga holds self-governance. The three trade routes bring more wealth than conquest ever would have. Greek, Egyptian, and Lankan envoys are in the palace simultaneously.<br><br>
Mara watches from somewhere you cannot see. Not corrupting. Watching. Perhaps curious. Perhaps, finally, waiting to be proven wrong.<br><br>
You helped a powerful man remain powerful without becoming cruel. That is a very small miracle. It is also, possibly, the largest kind there is.`,
  },
  great: {
    icon:        '🌅',
    color:       'var(--dharma-light)',
    title:       'THE REFORMED EMPIRE',
    dharmaLabel: 'High Dharma — The Wheel Nearly Balanced',
    text: `The empire transforms — not perfectly, but genuinely. Dharma officers operate in most provinces. Animal protection is law. Kalinga exists, its people alive and trading.<br><br>
There are failures: Vasubandhu's resentment quietly undermines three northern provinces. Pushyamitra's son will undo the border agreements within a generation. The treasury never fully accounts for what was lost.<br><br>
<em>But the mother in Tosali who spoke with Ashoka — she is alive. Her children grew up in a city that was not destroyed. That is real and permanent, regardless of what comes after.</em><br><br>
The wheel turned. Not completely balanced — dharma rarely is in practice. But turning.`,
  },
  reformer: {
    icon:        '☸️',
    color:       'var(--dharma-mid)',
    title:       'THE REFORMER\'S PATH',
    dharmaLabel: 'Moderate Dharma — The Wheel Turning',
    text: `Ashoka's transformation is real but partial. Some crises were resolved through means that left wounds. The Kalinga situation improved but did not fully heal.<br><br>
The edicts are written. The hospitals are built. Three border governors remain loyal.<br><br>
It is enough for the people living in it now. Whether it holds for the next generation depends on choices you will not be alive to influence.`,
  },
  compromise: {
    icon:        '⚖️',
    color:       'var(--ash-light)',
    title:       'THE COMPROMISE',
    dharmaLabel: 'Mixed Dharma — The Wheel Unsteady',
    text: `The empire survives. Ashoka changed — but less than he could have. Several opportunities were missed. Several people who could have been allies became neutral or hostile.<br><br>
History will record his reign as a time of relative peace and notable legal reform. The edicts will be found centuries later and scholars will debate whether he was saint or politician.<br><br>
<em>Both, probably.</em> As most people are.`,
  },
  incomplete: {
    icon:        '🌑',
    color:       'var(--blood-light)',
    title:       'THE UNFINISHED WHEEL',
    dharmaLabel: 'Low Dharma — The Wheel Broken',
    text: `The campaign did not go as hoped. Mara's influence proved harder to counter than expected. Several key relationships were mishandled.<br><br>
Ashoka sits in his garden and asks a question you can no longer answer: <em>"Was it worth the cost?"</em><br><br>
You don't know. The wheel is not balanced. But it still turns — imperfectly, slowly. Maybe that is enough to start again.`,
  },
};

function computeEnding() {
  const s = State.dharmaScore;
  const f = State.flags;
  if (s >= 85 && f.mara_withdrawn_peacefully) return 'golden';
  if (s >= 75 && f.kalinga_fully_freed)        return 'great';
  if (s >= 60)                                  return 'reformer';
  if (s >= 40)                                  return 'compromise';
  return 'incomplete';
}
