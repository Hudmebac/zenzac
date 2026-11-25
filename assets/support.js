/* ==========================================================================
   ZenZac — support.js
   The long version, for the grown-ups: scripts, explanations and practical
   detail. Content only — the app renders it. No network needed.

   Everything here is general guidance, not medical advice, and not a
   diagnosis. Written for UK families where a system is named.
   ========================================================================== */
window.ZenSupport = {
  topics: [
    { id: "understanding", name: "Understanding it", emoji: "🧠", blurb: "Why it happens, and why the usual advice misses." },
    { id: "moment", name: "In the moment", emoji: "🌊", blurb: "The first minute, what to say, and the afternoon after." },
    { id: "transitions", name: "Transitions", emoji: "🚪", blurb: "Getting out of the door, off a screen, and through a change." },
    { id: "school", name: "School", emoji: "🏫", blurb: "Meetings, adjustments, homework and the mornings they cannot face it." },
    { id: "sleep", name: "Sleep", emoji: "🌙", blurb: "Wind-downs, 11pm energy and 5am wake-ups." },
    { id: "food", name: "Food", emoji: "🍎", blurb: "Safe foods, pressure, and when it needs a professional." },
    { id: "siblings", name: "Siblings & family", emoji: "🧸", blurb: "Fairness, one-to-one time, and the child who copes." },
    { id: "you", name: "You", emoji: "🫖", blurb: "Burnout, respite, and your own wiring." },
    { id: "help", name: "Getting help", emoji: "🧭", blurb: "GP, school, money and the paper trail that gets things done." },
    { id: "words", name: "What to say", emoji: "💬", blurb: "Telling your child, and words they can use for themselves." },
    { id: "nutrition", name: "Food & growth", emoji: "🍽️", blurb: "Eating, growth and the long game — without turning dinner into a fight." },
    { id: "health", name: "Health & medication", emoji: "🩺", blurb: "Getting heard by the GP, and the questions worth asking about medication." },
    { id: "activity", name: "Activities & energy", emoji: "🤸", blurb: "Burning it off, joining clubs, and surviving birthday parties." }
  ],
  entries: []
};

window.ZenSupport.entries.push(
  {
    topic: "understanding", emoji: "🧩", title: "It is not naughtiness",
    summary: "ADHD is usually a doing gap, not a knowing gap. Autism is a different operating system, not a refusal to cope.",
    sections: [
      { h: "Skills, not willpower", p: [
        "A child who can explain the rule and then break it thirty seconds later is not being sly. In ADHD the knowing and the doing sit in different rooms. Repeating the instruction louder does not build the bridge between them.",
        "The useful question is not 'why won't they?' but 'what would make this possible?' Something smaller, something visible, something sooner, or someone beside them."
      ] },
      { h: "What this changes day to day", list: [
        "Assume the skill is missing and teach it, rather than assuming the will is missing and punishing it.",
        "Change the environment before you change the child: fewer things in sight, one instruction at a time, a place for everything.",
        "Praise the attempt out loud, not just the result — effort is the part that needs fuel.",
        "Expect the same task to be easy on Tuesday and impossible on Thursday. That is the condition, not a choice."
      ] },
      { h: "Autism is not a behaviour problem", p: [
        "For an autistic child, behaviour is usually the output of sensory load, unpredictable change, unclear communication, or a demand that arrived at the wrong moment. The behaviour is the smoke. The fire is elsewhere.",
        "This is why sticker charts and consequences so often fail: they address the smoke."
      ] }
    ]
  },
  {
    topic: "understanding", emoji: "🌪️", title: "Meltdown or tantrum — and why the difference matters",
    summary: "One is a nervous system overflowing. The other is a negotiating strategy. They need opposite responses.",
    sections: [
      { h: "A meltdown", list: [
        "Triggered by overload — sensory, emotional, or too many demands at once.",
        "Has no goal. It does not stop when you give in, because there is nothing to give in to.",
        "May not want to be touched, looked at, or spoken to. May not be able to answer questions.",
        "Needs safety, space, quiet and time. Reasoning, bargaining and consequences all make it longer."
      ] },
      { h: "A tantrum", list: [
        "Has a goal — a thing, an exit, attention, or a delay.",
        "Audience-aware. Often pauses to check whether it is working.",
        "Stops when the goal is met, or when it clearly will not be.",
        "Can be discussed afterwards, and the boundary can hold."
      ] },
      { h: "Why it matters", p: [
        "Treat a meltdown as a tantrum and you punish a child for a nervous system they cannot control. Treat a tantrum as a meltdown and you teach that escalation works. Getting the read wrong in either direction costs you weeks.",
        "When you are not sure, err towards safety and quiet. You can always hold a boundary later, once the storm has passed."
      ] }
    ]
  },
  {
    topic: "understanding", emoji: "🎒", title: "After-school collapse",
    summary: "Holding it together all day costs everything they have. Home is where the bill arrives.",
    sections: [
      { h: "What is happening", p: [
        "Many children mask hard at school: sit still, stay quiet, follow the routine, tolerate the noise. That takes continuous effort. The moment they reach a safe adult, the effort stops and the feelings arrive all at once.",
        "It looks like your child is worst-behaved for you. In fact it is a compliment you would rather not receive: you are the person they trust enough to fall apart with."
      ] },
      { h: "Plan a landing, not a conversation", list: [
        "Food first. Blood sugar and dehydration do more to behaviour than any conversation.",
        "Twenty minutes of no questions. Not 'how was school?' Not 'what did you do?'",
        "Offer movement or quiet, whichever fits: trampoline, walk, bath, blanket, headphones.",
        "Ask about the day later, sideways — in the car, at bedtime, while doing something else."
      ] },
      { h: "Say this", say: [
        "You held it together all day. You can let go now — I've got you.",
        "You don't have to tell me about it. I'm just glad you're home."
      ] }
    ]
  },
  {
    topic: "understanding", emoji: "🛑", title: "Demand avoidance: when 'shoes on' starts a war",
    summary: "For some children an ordinary request lands like a threat. The fight is not about the shoes.",
    sections: [
      { h: "What it looks like", list: [
        "Instant refusal to small, easy requests — especially ones they were about to do anyway.",
        "Delay, distraction, negotiation, or suddenly needing the loo.",
        "Doing it happily once nobody is watching, or once it was their idea.",
        "Big reactions to being told, corrected, or rushed."
      ] },
      { h: "What helps", list: [
        "Cut the demands that do not matter. Every unnecessary instruction is a withdrawal from a small account.",
        "Use indirect language: 'The bin needs emptying' rather than 'Empty the bin now'.",
        "Offer two acceptable choices so the decision stays theirs.",
        "Explain the reason once, briefly, and then give space rather than repeating.",
        "Build in 'done' time and announce your own demands out loud so they can see the pattern."
      ] },
      { h: "What makes it worse", p: [
        "Rewards for compliance, countdowns delivered as threats, and 'do it because I said so' all raise the stakes. The child is not choosing to be difficult; being told what to do is the difficult thing."
      ] }
    ]
  },
  {
    topic: "understanding", emoji: "🌡️", title: "The window of tolerance",
    summary: "There are three states. Only one of them can hear you.",
    sections: [
      { h: "Regulated", p: "Can think, talk, choose, and learn. This is when plans, rules and conversations belong here." },
      { h: "Hyper-aroused", p: "Fight or flight: shouting, running, hitting, climbing, silly and loud. Reasoning will not land. Reduce input, stay calm, keep everyone safe." },
      { h: "Hypo-aroused", p: "Shutdown: silent, flat, curled up, 'I don't know', unable to move or speak. Do not fill the silence with questions. Sit nearby, lower your voice, wait." },
      { h: "The practical rule", p: [
        "Teach and plan in the top zone. Keep safe in the middle. Reconnect in the bottom. Most parenting advice assumes the child is always in the top zone — which is why it fails on the days you need it."
      ] }
    ]
  },
  {
    topic: "moment", emoji: "⏱️", title: "The first sixty seconds",
    summary: "What you do in the first minute decides whether the next twenty are recovery or escalation.",
    sections: [
      { h: "Reduce everything", list: [
        "Noise off. Lights down if you can. Bystanders out of the room, including siblings.",
        "One adult speaks. Two adults giving different instructions is noise.",
        "Get low — sit or crouch — and stay further away than feels natural.",
        "Fewer words than you want to use. Three is plenty."
      ] },
      { h: "Keep everyone safe, not compliant", p: [
        "Move hazards rather than moving the child. Do not restrain unless there is immediate danger — restraint usually escalates and can hurt both of you.",
        "If they are running, follow at a distance rather than chasing. If they are hitting, protect your body and theirs and give space."
      ] },
      { h: "Say this", say: ["I'm here.", "You're safe.", "I'm not going anywhere.", "Take your time."] }
    ]
  },
  {
    topic: "moment", emoji: "🚫", title: "What not to say (and why it backfires)",
    summary: "Every one of these is said with love. Every one raises the temperature.",
    sections: [
      { h: "The five worst", list: [
        "'Calm down.' — Naming a state they cannot reach adds shame to overload.",
        "'You're fine.' — Contradicts their body. They are not fine, and now they know you cannot tell.",
        "'Look at me.' — Eye contact is effortful for many autistic children, and harder mid-meltdown.",
        "'Why did you do that?' — The thinking brain is offline. There is no answer available.",
        "'If you don't stop, I'll…' — Adds a second threat to a child already in threat mode."
      ] },
      { h: "Instead", p: [
        "Describe, do not judge: 'You're having a really hard time.' Then wait. Silence from a calm adult is a regulating tool, not a failure to parent."
      ] }
    ]
  },
  {
    topic: "moment", emoji: "🗣️", title: "Scripts that lower the temperature",
    summary: "Short, true, and repeatable. Choose one and say it quietly.",
    sections: [
      { h: "In the storm", say: [
        "I'm here. You don't have to talk.",
        "I can see this is really hard.",
        "Nothing is broken. We'll sort it out later.",
        "Do you want a hug, or do you want some space?",
        "I'm going to sit over here until you're ready."
      ] },
      { h: "Coming out of it", say: [
        "That was a big one. You got through it.",
        "I'm not cross about the feelings. Only about what got broken, and we can deal with that later.",
        "Do you want a drink?"
      ] },
      { h: "Why short works", p: [
        "Long sentences need working memory, and working memory is the first thing to go. One sentence, then silence, then another if needed."
      ] }
    ]
  },
  {
    topic: "moment", emoji: "🩹", title: "After the storm: repair, not a lecture",
    summary: "The lesson lands in the calm, not in the crash. And it lands better in one sentence than in ten.",
    sections: [
      { h: "Within the hour", list: [
        "Food, water, a shower, a walk — physical reset before any talking.",
        "Say one true thing about your own part: 'I shouted. I'm sorry.'",
        "Do not require an apology on the spot. A forced sorry teaches performance, not repair.",
        "Do not bring up the whole week. One incident, one conversation."
      ] },
      { h: "Later, or the next day", list: [
        "Ask one question, then listen: 'What would have helped?'",
        "Agree one change, write it down, and put it where it can be seen.",
        "Tell them the relationship is intact. Children remember ruptures; they need to hear about repairs."
      ] },
      { h: "Say this", say: ["We had a rough one. We're still okay.", "What should we do differently next time?"] }
    ]
  },
  {
    topic: "moment", emoji: "🛡️", title: "When it gets physical",
    summary: "Your safety and theirs comes before every rule, consequence and lesson.",
    sections: [
      { h: "Do", list: [
        "Move other children and pets out of the room.",
        "Put distance and furniture between you if you are being hit or kicked.",
        "Leave the room if it is safe to do so, and keep talking from the doorway.",
        "Remove or cover anything that could be thrown or used.",
        "Call another adult if you are on your own. Call 999 if anyone is in danger."
      ] },
      { h: "Do not", list: [
        "Restrain during a meltdown unless there is immediate danger — it often escalates and can injure both of you.",
        "Block the exit, corner them, or stand over them.",
        "Shout, threaten, or physically punish. It stops the moment, not the pattern."
      ] },
      { h: "Afterwards", p: [
        "Write down what happened while it is fresh: what came before, what helped, how long it lasted. Take that to the GP and to school. A pattern written down is evidence; a pattern remembered is an argument."
      ] }
    ]
  }
);

window.ZenSupport.entries.push(
  {
    topic: "transitions", emoji: "1️⃣", title: "First-then, and why two is plenty",
    summary: "A list of five things is a wall. Two things is a step.",
    sections: [
      { h: "The rule", p: [
        "Show one thing that is happening now and one thing that comes after. Everything else waits out of sight — in a written list, a drawer, or the app's Then section.",
        "This is not dumbing down. Working memory is the bottleneck, and two items fit through it when five do not."
      ] },
      { h: "Make it visible", list: [
        "Say it and point at it: 'Now: shoes. Then: car.'",
        "Use the Now & Next page, or two cards on the fridge.",
        "Put the first thing in the child's hands where possible — shoes on the floor, bag by the door.",
        "Change it only when the first thing is finished, not before."
      ] },
      { h: "Try this", try: [
        "For a week, say nothing about task three or four. Only ever name the next two.",
        "Watch whether the number of arguments drops before you change anything else."
      ] }
    ]
  },
  {
    topic: "transitions", emoji: "⏲️", title: "Warnings that actually work",
    summary: "'Five more minutes' means nothing to a child with no sense of time. Use events and something they can see.",
    sections: [
      { h: "Why time warnings fail", p: [
        "Time is abstract, and time blindness is common in ADHD. A number does not tell the body how long anything is. Repeating the warning five times trains a child to ignore the first four."
      ] },
      { h: "What works better", list: [
        "Anchor to an event: 'when this song ends', 'after the next advert', 'when the kettle boils'.",
        "Use a visual timer they can watch — the Now & Next timer or a sand timer.",
        "Warn once at the start, once at the last chunk, once at the end. Not on a loop.",
        "Give the end a job: 'when it goes off, you put the lid on and bring it to me'."
      ] },
      { h: "Say this", say: ["Two minutes, then shoes. I'll set the timer so you can see it.", "When the music stops, that's the end — not because I say so, because the music says so."] }
    ]
  },
  {
    topic: "transitions", emoji: "🚪", title: "Leaving the house without a fight",
    summary: "Most morning battles are decided the night before, or in the ten minutes you did not leave spare.",
    sections: [
      { h: "The night before", list: [
        "Clothes laid out in order, including socks and shoes.",
        "Bag packed and by the door, with a list on the wall.",
        "Breakfast decided, not negotiated at 7:40.",
        "One job per child, named, visible, and the same every day."
      ] },
      { h: "In the morning", list: [
        "Dress in the order the clothes are stacked — no choosing.",
        "Do the hardest thing first, while the day still has goodwill in it.",
        "Leave ten minutes earlier than you think you need. The buffer is the intervention.",
        "Have a transition object ready: a toy in the pocket, headphones, a snack for the car."
      ] },
      { h: "When it goes wrong", p: [
        "Do not add a second demand to a stalled one. Finish the first thing, then the next. If you have to carry a coat rather than argue about it, carry the coat."
      ] }
    ]
  },
  {
    topic: "transitions", emoji: "🎮", title: "Screen handover",
    summary: "The hardest transition in most houses. It is not about the game — it is about the stop.",
    sections: [
      { h: "Set it up before the handover", list: [
        "Agree the end point at the start: a level, a match, a save point — not a clock in the middle of something.",
        "Use the console or app timer if it has one, so the device is the bad guy, not you.",
        "Warn at the last chunk, not every five minutes.",
        "Have the next thing ready and visible: dinner on the table, shoes by the door, the dog on the lead."
      ] },
      { h: "At the handover", list: [
        "Do not snatch or switch off mid-game. That is the fastest route to a meltdown.",
        "Let them finish the round and press the button themselves.",
        "Stay nearby for two minutes. The crash usually comes right after the stop.",
        "Offer a bridge: a snack, a shower, a walk, or ten minutes of something together."
      ] },
      { h: "If it always ends in tears", p: [
        "Shorten the session, or end on a natural break. Some children cope better with three twenty-minute sessions than one hour. Write down what the last five minutes looked like — the pattern is usually the clue."
      ] }
    ]
  },
  {
    topic: "transitions", emoji: "🔀", title: "When plans change suddenly",
    summary: "For some children an unexpected change is not an inconvenience. It is a loss.",
    sections: [
      { h: "Say it early, say it plainly", list: [
        "Tell them as soon as you know, not on the way.",
        "Name the change and the reason in one sentence: 'Swimming is cancelled — the pool is closed.'",
        "Say what stays the same: 'We still get chips afterwards.'",
        "Allow the reaction without trying to talk them out of it."
      ] },
      { h: "Build a plan B habit", list: [
        "Keep one small 'if plans change' card with two acceptable alternatives.",
        "Practise a change on a good day: swap a snack, change the route home, and praise the recovery.",
        "Avoid surprises as a kindness, not as a weakness — announcing is not the same as asking permission."
      ] },
      { h: "Say this", say: ["This is different from what I told you. That's allowed to be annoying.", "Here's what is still happening."] }
    ]
  },
  {
    topic: "school", emoji: "✉️", title: "Ask for a meeting in writing",
    summary: "A phone call disappears. An email creates a record that somebody has to answer.",
    sections: [
      { h: "Who to email", list: [
        "The class teacher and the SENCO together.",
        "Add the head or pastoral lead if this is the second or third time.",
        "Ask for a reply within five school days, and for the meeting to be minuted."
      ] },
      { h: "What to put in it", list: [
        "What you see at home, in plain examples with dates.",
        "What you have already tried.",
        "What you are asking for, in specific terms.",
        "One sentence about the impact: 'He is missing twenty minutes of every morning.'"
      ] },
      { h: "After the meeting", p: [
        "Email a short summary of what was agreed, who is doing it, and by when. If nobody replies, that email becomes the record that it was agreed and not done."
      ] }
    ]
  },
  {
    topic: "school", emoji: "🧰", title: "Adjustments worth asking for",
    summary: "Concrete, cheap, and usually within a school's power. Ask for these by name.",
    sections: [
      { h: "In class", list: [
        "Instructions given one at a time and left on the board or on a card.",
        "A quiet place to work, or headphones for noisier lessons.",
        "Movement jobs: handing out books, taking a note, sharpening pencils.",
        "Reduced copying from the board, or a photograph of the board instead.",
        "Extra time, or the option to type or dictate."
      ] },
      { h: "Around the school day", list: [
        "A named adult to go to when it is going wrong.",
        "A break card the child can use without explaining.",
        "Warning of timetable changes, supply teachers and fire drills.",
        "A quiet alternative to the playground at break, at least some days.",
        "Leaving class five minutes early to avoid corridor crowds."
      ] },
      { h: "How to frame it", p: [
        "Not 'he can't cope' but 'these are the reasonable adjustments that let him access the same lesson'. Schools respond to access language far better than to sympathy."
      ] }
    ]
  },
  {
    topic: "school", emoji: "📚", title: "Homework: shrink it before you fight it",
    summary: "If homework costs the whole evening and teaches nothing, it is not homework. It is a nightly argument with a worksheet attached.",
    sections: [
      { h: "Cut it down", list: [
        "Agree a time limit, not a page count: ten focused minutes, then stop.",
        "Ask the teacher to reduce or split it. Most will, if you ask in writing.",
        "Do the first question together, out loud, then step back.",
        "Write a note on unfinished work: 'Twenty minutes, then we stopped. This is what we managed.'"
      ] },
      { h: "Set the conditions", list: [
        "Same time, same place, after food and movement.",
        "Phone and tablet out of the room unless they are the tool.",
        "Body doubling helps: sit nearby doing your own quiet task, not watching.",
        "Timer visible, one subject at a time, everything else out of sight."
      ] },
      { h: "Try this", try: ["For two weeks, cap homework at the agreed time and record what happened. Take the record to the next meeting."] }
    ]
  },
  {
    topic: "school", emoji: "🚸", title: "When they can't get through the door",
    summary: "School refusal is rarely laziness. It is usually anxiety, demand avoidance, or something unsafe that has not been named.",
    sections: [
      { h: "First, find out which", list: [
        "Anxiety: stomach aches, tears, clinging, relief once home.",
        "Demand avoidance: refusal of the whole day as a demand, often worst on transition points.",
        "Bullying or unmet need: sudden change, missing belongings, new reluctance about a specific lesson.",
        "Sleep: a child who is awake until 1am cannot do a 7am start, however much they want to."
      ] },
      { h: "What helps", list: [
        "A graded return: part days, a safe base, one lesson at a time.",
        "A named adult to meet them at the gate.",
        "No punishment for the days they cannot — it deepens the fear.",
        "Ask the school for a reintegration plan in writing, and involve the GP if it lasts more than two weeks."
      ] },
      { h: "What to say to school", say: ["He is not refusing school. He is unable to get in the building at the moment. What is the plan for a graded return?"] }
    ]
  },
  {
    topic: "school", emoji: "📜", title: "SEN support in England, in plain terms",
    summary: "SENCO, SEN support, EHCP. Three words that unlock most of the system.",
    sections: [
      { h: "The ladder", list: [
        "SEN support: the school's own adjustments, led by the SENCO. No diagnosis needed.",
        "EHCP: an Education, Health and Care Plan — a legal document, for children whose needs cannot be met from the school's ordinary budget.",
        "You can request an EHCP assessment yourself. The local authority must decide within six weeks and the whole process should take 20 weeks.",
        "If the LA refuses, you can appeal to the SEND Tribunal. Independent advice is free: SENDIASS, IPSEA, Contact."
      ] },
      { h: "What to bring", list: [
        "Reports from school, GP, speech and language, occupational therapy, CAMHS — anything in writing.",
        "Your own dated notes of what happens at home.",
        "The child's views, in their words if possible.",
        "A clear list of needs and the support you think is required."
      ] },
      { h: "Keep going", p: [
        "The system rewards persistence and paperwork, which is unfair and true. Keep every email, note every phone call with the date and who said what, and ask for decisions in writing."
      ] }
    ]
  }
);

window.ZenSupport.entries.push(
  {
    topic: "sleep", emoji: "🕯️", title: "The wind-down hour",
    summary: "Sleep starts an hour before bed. By the time they are in the room, you are already too late.",
    sections: [
      { h: "What to build", list: [
        "Same order every night, even on weekends: drink, teeth, story, bed.",
        "Lights down and screens off at least 30 minutes before the routine starts.",
        "Heavy work helps: carrying, pushing, climbing, a bath, tight blankets.",
        "No new decisions after a set time. 'Choose your story' at 7:00, not 8:15."
      ] },
      { h: "Make the room boring", list: [
        "Dark, cool, quiet, and as free of 'things to do' as you can manage.",
        "Weighted blanket only with advice if the child is young or has breathing difficulties.",
        "White noise or an audiobook can be the thing that stops the brain racing.",
        "A clock they can read, or none at all — whichever creates less worry."
      ] },
      { h: "What to avoid", p: [
        "Long goodnight conversations. They are lovely and they teach the brain that bedtime is when the talking happens. Two minutes, then out."
      ] }
    ]
  },
  {
    topic: "sleep", emoji: "🌙", title: "Getting to sleep when the brain won't stop",
    summary: "Many children with ADHD are not defiant at bedtime. Their body clock is genuinely later.",
    sections: [
      { h: "The body clock", list: [
        "Delayed sleep phase is common: the child is not tired until late, and then cannot wake in the morning.",
        "Morning daylight and a consistent wake time shift the clock far better than an earlier bedtime.",
        "Try moving bedtime by 15 minutes every few nights rather than an hour at once.",
        "Keep the wake time fixed, even after a bad night. It is the anchor."
      ] },
      { h: "If it is worry", list: [
        "Write the worry down before bed and put it in a box, literal or otherwise.",
        "Practise the same short breathing pattern on good nights so it is familiar on bad ones.",
        "Answer the big question once, at 6pm, not at 9pm: 'Are we definitely going to Grandad's?'",
        "A dim nightlight and a known routine reduce the checks."
      ] },
      { h: "Melatonin", p: [
        "Only use melatonin if it has been prescribed for your child. Online melatonin is unregulated in the UK and doses vary wildly. Ask the GP or paediatrician."
      ] }
    ]
  },
  {
    topic: "sleep", emoji: "🌅", title: "Night waking and the 5am start",
    summary: "The goal is not a silent house. It is a child who can get back to sleep without needing you fully awake.",
    sections: [
      { h: "At night", list: [
        "Keep it boring: low light, few words, no screens, no negotiation.",
        "Walk them back to bed rather than lying down with them, if that is the goal.",
        "A 'yes' box by the bed — water, a book, a torch — reduces the reasons to get up.",
        "Co-sleeping is not a failure. If it is what your family needs to function, it is allowed."
      ] },
      { h: "Early waking", list: [
        "A toddler clock or a simple 'not before 6' rule with a reward that is not food.",
        "Blackout blinds, and check the room for light and noise at 4:30am.",
        "If they wake happy and ready, consider an earlier bedtime — overtired children often wake earlier."
      ] },
      { h: "When to ask for help", p: [
        "If sleep is affecting the whole family for more than a few weeks, or the child snores, stops breathing, or is exhausted in the day, ask the GP. Sleep apnoea and iron deficiency both look like ADHD."
      ] }
    ]
  },
  {
    topic: "food", emoji: "🥣", title: "Safe foods are not a phase to break",
    summary: "For many autistic children, a safe food is not a preference. It is the only thing that feels predictable enough to eat.",
    sections: [
      { h: "Why pressure fails", list: [
        "New foods are sensory unknowns: texture, smell, temperature, colour, and the sound of chewing.",
        "Pressure — 'one bite', bargaining, hiding vegetables — reliably narrows the list further.",
        "A safe food on the plate is better than a balanced meal they will not touch.",
        "Eating the same breakfast for three years is common and not a moral failure."
      ] },
      { h: "What helps", list: [
        "Keep one safe food available at every meal, so there is always something they can eat.",
        "Put a new food on the table without comment. No plate, no pressure, no praise.",
        "Change one variable at a time: same food, different brand; same brand, different shape.",
        "Keep the mealtime short and calm. Ten minutes is enough for most children."
      ] },
      { h: "Say this", say: ["There's bread on the table if you need it.", "You don't have to try it. It's just here."] }
    ]
  },
  {
    topic: "food", emoji: "🍽️", title: "Who decides what",
    summary: "The division of responsibility: you decide what and when. They decide whether and how much.",
    sections: [
      { h: "Your jobs", list: [
        "What is served, and when meals and snacks happen.",
        "A calm place to eat, with as few sensory distractions as possible.",
        "Not becoming a short-order cook, and not turning the table into a battlefield."
      ] },
      { h: "Their jobs", list: [
        "Whether to eat.",
        "How much to eat.",
        "Whether to try anything new. Always."
      ] },
      { h: "In practice", p: [
        "Serve one meal with at least one safe item on the table. If they eat only that, the meal is over and nobody comments. This is not giving in — it is removing the pressure that keeps the list short."
      ] }
    ]
  },
  {
    topic: "food", emoji: "🩺", title: "When food needs a professional",
    summary: "Fussy eating is common. A shrinking list, weight loss or a child who is frightened of food needs more than patience.",
    sections: [
      { h: "Ask for help if", list: [
        "The list of accepted foods is getting shorter rather than longer.",
        "They are losing weight, or dropping off their growth curve.",
        "Mealtimes take over an hour, or cause distress every day.",
        "They choke, gag, or avoid whole food groups for sensory reasons.",
        "They are tired, pale, or low in energy."
      ] },
      { h: "Who to ask", list: [
        "GP first — ask about growth, iron and vitamin levels.",
        "Ask for a referral to a paediatric dietitian with experience in ARFID or sensory feeding.",
        "Speech and language therapy can help with chewing and swallowing difficulties.",
        "School can record what is eaten at lunch, which is useful evidence."
      ] },
      { h: "Worth knowing", p: [
        "ARFID (avoidant/restrictive food intake disorder) is a real feeding difficulty, not attention-seeking, and it is treatable. It is not the same as fussy eating, and it is not about body image."
      ] }
    ]
  },
  {
    topic: "siblings", emoji: "⚖️", title: "Fair is not equal",
    summary: "One child needs more of your time, your patience and your money. The other child needs to hear why.",
    sections: [
      { h: "Name it out loud", list: [
        "Tell siblings the truth in child-sized pieces: 'His brain works differently, so loud places are harder for him.'",
        "Do not make them responsible for managing their brother or sister.",
        "Let them be angry about it. Anger is not disloyalty.",
        "Give them permission to have needs that take priority sometimes."
      ] },
      { h: "Practical fairness", list: [
        "One-to-one time on a schedule, not only when there is spare time — there never is.",
        "A door that locks, and headphones, and a place that is theirs.",
        "Do not always ask them to be the flexible one.",
        "Celebrate their things as loudly as you celebrate the other child's progress."
      ] },
      { h: "Say this", say: ["You are not less important because he needs more help. You are allowed to say when it is not fair."] }
    ]
  },
  {
    topic: "siblings", emoji: "🧸", title: "Ten minutes, child-led",
    summary: "The most efficient parenting intervention there is, and the first thing to disappear on a hard week.",
    sections: [
      { h: "How it works", list: [
        "Ten minutes, one child, no phone, no teaching, no correcting.",
        "They choose the activity. You follow their lead and describe what they are doing.",
        "Same time each day where possible. Predictable attention is worth more than a big day out.",
        "If it gets missed, say so and reschedule. Do not pretend it did not matter."
      ] },
      { h: "Why it works", p: [
        "Children get attention one way or another. Ten minutes of undivided, non-judgemental attention reduces the need to get it by other means — and it is the quickest way back after a rupture."
      ] },
      { h: "Try this", try: ["Put it in the calendar as if it were a dentist appointment. It is the one that gets cancelled first."] }
    ]
  },
  {
    topic: "siblings", emoji: "🫂", title: "The sibling who copes",
    summary: "The child who never causes trouble is often the one carrying the most.",
    sections: [
      { h: "Watch for", list: [
        "Being unusually good, quiet, or helpful — parentification in slow motion.",
        "Anxiety, perfectionism, or sudden school refusal.",
        "Hiding their own feelings to protect you.",
        "Being teased at school about their sibling, and not telling you."
      ] },
      { h: "What helps", list: [
        "Ask about their day first sometimes, before the crisis of the moment.",
        "Give them language: 'My brother is autistic' is theirs to share or not.",
        "Sibling groups and young carer support exist — ask the school or local offer.",
        "Tell them, regularly, that they are not responsible for keeping the peace."
      ] },
      { h: "Say this", say: ["You don't have to look after him. That's my job.", "What do you need that you haven't asked for?"] }
    ]
  }
);

window.ZenSupport.entries.push(
  {
    topic: "you", emoji: "🫖", title: "You are allowed to be exhausted",
    summary: "Parenting a child with additional needs is a second job with no days off. Burnout is an occupational hazard, not a character flaw.",
    sections: [
      { h: "What burnout looks like", list: [
        "Feeling numb rather than sad, or angry at the smallest thing.",
        "Dreading the school run, the evening, or the morning.",
        "Doing the tasks but feeling nothing while doing them.",
        "Getting ill more often, sleeping badly, or drinking more than you meant to."
      ] },
      { h: "What actually helps", list: [
        "One predictable break in the week, even if it is two hours, even if it costs money.",
        "Telling one person the truth about how it is going.",
        "Lowering the standard somewhere visible: the ironing, the matching plates, the birthday party.",
        "Moving your body, badly and briefly. Ten minutes counts."
      ] },
      { h: "Worth saying", p: [
        "You cannot pour from an empty cup is a cliché because it is true. The child's outcomes improve when the adult is supported, not when the adult tries harder."
      ] }
    ]
  },
  {
    topic: "you", emoji: "🛋️", title: "Respite is not a reward for coping",
    summary: "In the UK, support for the carer is a separate thing from support for the child. Ask for it by name.",
    sections: [
      { h: "What exists", list: [
        "A carer's assessment from your local authority — for you, not the child.",
        "Short breaks and sitting services, sometimes called 'respite' or 'short breaks'.",
        "Family Fund grants for equipment, breaks and household items.",
        "Charities specific to the condition: ADHD Foundation, National Autistic Society, Contact."
      ] },
      { h: "How to ask", list: [
        "Phone the local authority and say: 'I would like a carer's assessment.'",
        "Ask the school if they know of local parent groups — they usually do.",
        "Ask your GP to note that you are a carer. It appears on your record and opens doors.",
        "Say yes to specific offers. 'Let me know if you need anything' is not an offer; 'I'll take them Saturday morning' is."
      ] },
      { h: "Try this", try: ["Put one recurring break in the calendar this month, before you decide you cannot afford it."] }
    ]
  },
  {
    topic: "you", emoji: "🆘", title: "When you are at breaking point",
    summary: "If you are frightened of your own reactions, or you cannot see a way through, that is a medical situation, not a parenting failure.",
    sections: [
      { h: "Right now", list: [
        "Put the child somewhere safe and step outside the room for two minutes.",
        "Call someone — a partner, a friend, a parent, a neighbour.",
        "If you or your child are in immediate danger, call 999.",
        "If you feel you might harm yourself, call Samaritans on 116 123, free, any time. Or NHS 111 and choose the mental health option."
      ] },
      { h: "This week", list: [
        "Tell your GP how you are actually sleeping, eating and feeling. Ask for support for you.",
        "Ask the school for a meeting about the child — you should not be managing this alone.",
        "Ask about a carer's assessment and local crisis support.",
        "Tell one person the unedited version."
      ] },
      { h: "What not to do", p: [
        "Do not wait until it is unbearable to ask. Services move slowly, and the time to start is while you still have something left."
      ] }
    ]
  },
  {
    topic: "help", emoji: "🩺", title: "Start with the GP",
    summary: "The GP is the front door to most UK referrals, and a letter from them carries weight with school.",
    sections: [
      { h: "Before the appointment", list: [
        "Write down three specific examples with dates: what happened, how long, what helped.",
        "Ask school for a short written account of what they see. One page is plenty.",
        "Note sleep, eating, friendships, and anything the child says about themselves.",
        "Take someone with you if you can. Two sets of ears."
      ] },
      { h: "In the appointment", list: [
        "Say what you are worried about in one sentence, then give the examples.",
        "Ask directly: 'Can you refer us for an assessment?'",
        "Ask what happens next, and how long the wait is.",
        "Ask for the referral to be copied to you in writing."
      ] },
      { h: "Worth knowing", p: [
        "Waiting lists for ADHD and autism assessment are long in most of the UK. Ask to be referred anyway, and ask the school to put support in place now — support does not need a diagnosis."
      ] }
    ]
  },
  {
    topic: "help", emoji: "💳", title: "Private assessment: check before you pay",
    summary: "Private assessments can be faster. They are not automatically accepted by schools, the local authority, or the NHS.",
    sections: [
      { h: "Ask first", list: [
        "Will my GP accept this report and add it to the record?",
        "Will the school and local authority accept it for SEN support or an EHCP?",
        "Which professional is doing it, and what are their qualifications?",
        "What happens after diagnosis — medication, follow-up, shared care?"
      ] },
      { h: "Red flags", list: [
        "A diagnosis in one appointment with no school or nursery evidence.",
        "No written report, or a report with no detail about the child.",
        "Pressure to buy a treatment package alongside the assessment.",
        "Prices that are dramatically cheaper than local norms."
      ] },
      { h: "Worth knowing", p: [
        "A private diagnosis does not replace the school's duty to make reasonable adjustments. You can ask for support without any diagnosis at all."
      ] }
    ]
  },
  {
    topic: "help", emoji: "💷", title: "Money and practical help (UK)",
    summary: "There is money and support available that nobody tells you about. It is not charity; it is what the system is for.",
    sections: [
      { h: "Money", list: [
        "Disability Living Allowance (DLA) for under-16s — based on care and supervision needs, not diagnosis.",
        "Carer's Allowance if you care for someone 35+ hours a week and earn under the limit.",
        "Universal Credit carer element, and help with childcare costs.",
        "Family Fund grants for families with a disabled or seriously ill child.",
        "Local authority short breaks, and sometimes a direct payment."
      ] },
      { h: "Practical", list: [
        "A local offer website lists services in your area — search '(your council) local offer'.",
        "SENDIASS gives free, independent advice about school.",
        "Contact and IPSEA have free helplines and template letters.",
        "Your GP can add 'carer' to your record; the school can add 'young carer' for a sibling."
      ] },
      { h: "Worth knowing", p: [
        "DLA forms are long and repetitive. Ask a local advice service or a charity to help you fill one in. It is normal to need help with them."
      ] }
    ]
  },
  {
    topic: "help", emoji: "🗂️", title: "Keep a paper trail",
    summary: "The single most useful habit in the whole system, and the one that feels least like parenting.",
    sections: [
      { h: "Keep", list: [
        "A folder, digital or paper, with one file per professional.",
        "A running timeline: date, what happened, who said what.",
        "Every email and every letter, including the ones that say no."
      ] },
      { h: "Write", list: [
        "Email rather than phone, and follow a phone call with a summary email: 'Just to confirm what we agreed…'",
        "Ask for decisions in writing, and for reasons if the answer is no.",
        "Keep it short and factual. Emotion belongs in the conversation; dates belong in the record."
      ] },
      { h: "Why", p: [
        "Staff change, memories fade, and the person you speak to in September may not be there in March. The file is the continuity."
      ] }
    ]
  },
  {
    topic: "words", emoji: "🌱", title: "Telling your child",
    summary: "Children usually know something is different. Not telling them does not protect them; it leaves them to guess.",
    sections: [
      { h: "How to start", list: [
        "Pick a calm moment, not after a hard day.",
        "Use the words they already have: 'Your brain works in a way that…'",
        "Lead with strengths that are true, not flattery.",
        "Say what it is not: not an excuse, not a limit, not something to be ashamed of."
      ] },
      { h: "What to include", list: [
        "A simple explanation of what the diagnosis means for them specifically.",
        "What helps, and who knows.",
        "That it is theirs to share, or not, with friends.",
        "That you are learning too."
      ] },
      { h: "Say this", say: ["Your brain is brilliant at some things and needs help with others. Same as mine.", "You are not broken. You are wired differently, and we are going to build the week around that."] }
    ]
  },
  {
    topic: "words", emoji: "🗣️", title: "Words your child can use",
    summary: "Self-advocacy is a skill, and it is built out of short, practised sentences.",
    sections: [
      { h: "Practise these at home", list: [
        "'I need a break.'",
        "'It's too loud in here.'",
        "'Can you say that again more slowly?'",
        "'I don't understand yet.'",
        "'I need to finish this first.'"
      ] },
      { h: "Make it easy", list: [
        "A card in the pocket, or a note on the desk, so they do not have to speak.",
        "Role-play it once, when everyone is calm.",
        "Tell the teacher which words to listen for.",
        "Praise the child for using them, even when the timing is inconvenient."
      ] },
      { h: "Worth knowing", p: [
        "A child who can say 'I need a break' is far less likely to need to escalate to get one. The sentence is the intervention."
      ] }
    ]
  },
  {
    topic: "words", emoji: "📱", title: "Explaining this app to a child",
    summary: "ZenZac is a set of tools, not a test. It should feel like a drawer of things that help, not a report card.",
    sections: [
      { h: "How to introduce it", list: [
        "Show one page at a time, not the whole app.",
        "Start with something they will like: the game, the sounds, the spinning wheel.",
        "Let them choose the colours. Ownership matters more than design.",
        "Never use the Journal as evidence in an argument."
      ] },
      { h: "What to say", say: [
        "This is a toolbox. Nothing in here is a test.",
        "The faces are just a quick way to say how you are, without a big conversation.",
        "You can tell me to close it whenever you want."
      ] },
      { h: "What to keep private", p: [
        "The Grown-ups area is for you. If a child asks, it is fair to say: 'That part is for me, like my emails.' It is not a secret; it is just yours."
      ] }
    ]
  }
);

window.ZenSupport.entries.push(
  {
    topic: "nutrition", emoji: "🥣", title: "The beige diet, without the battle",
    summary: "A narrow diet is usually about safety and sensory certainty, not defiance. Pressure makes the list shorter.",
    sections: [
      { h: "What is actually happening", p: [
        "Many autistic and ADHD children eat a small range of foods because those foods are predictable: same brand, same texture, same colour, same crunch. A new food is not just a new taste — it is an unknown quantity in a body that already feels unreliable.",
        "The instinct to negotiate, hide vegetables or withhold pudding is understandable. It also teaches the child that eating is a contest, and contests are exhausting for everyone."
      ] },
      { h: "What helps more than pressure", list: [
        "Keep a safe food on the plate at every meal. New food sits beside it with no expectation.",
        "Serve new food in tiny amounts, repeatedly, without comment. Familiarity comes before tasting.",
        "Separate eating from behaviour. Do not use food as a reward or a punishment, and do not remove a safe food to force variety.",
        "Protect the routine: same plate, same seat, same time where possible. Predictability lowers the cost of eating.",
        "Ask about a dietitian if the range is shrinking, whole food groups have gone, or weight and energy are affected."
      ] },
      { h: "When it is more than fussy", p: [
        "Ask the GP specifically about ARFID (avoidant/restrictive food intake disorder) if the child is frightened of eating, avoids whole textures, or is losing weight. It is a recognised condition and it needs proper support, not a stricter table rule.",
        "In the meantime, a children's multivitamin may be worth asking about if the diet is very limited. Ask a pharmacist or GP rather than guessing at doses."
      ] },
      { h: "Say this", say: [
        "There is nothing wrong with liking what you like. Let's just keep the other thing on the plate, no pressure.",
        "You don't have to eat it. You can just leave it there."
      ] }
    ]
  },
  {
    topic: "nutrition", emoji: "🕓", title: "The after-school food window",
    summary: "A child who did not eat at school is not being fussy at 4pm. They are running on empty.",
    sections: [
      { h: "Why 4pm looks like a crisis", p: [
        "Lunch in a loud hall, a rushed ten minutes and unfamiliar food is a lot to ask. Many children eat very little at school and then arrive home starving, tired and unable to explain either.",
        "The meltdown at 4pm is often a blood-sugar and dehydration problem wearing a behaviour costume."
      ] },
      { h: "Plan the landing", list: [
        "Have food ready before they walk in — something with protein and carbohydrate, not just a biscuit.",
        "Offer a drink first. Two hours without a drink is enough to make anyone brittle.",
        "Do not ask about the day until they have eaten. Questions before food rarely go well.",
        "If dinner becomes impossible afterwards, make the after-school snack the substantial meal and keep dinner small and low-pressure.",
        "Check with school what is actually eaten, not what is served. Ask for a quiet table if the hall is the barrier."
      ] },
      { h: "Try this", try: [
        "A plate of toast, cheese and fruit on the table at 3.45pm, before anyone speaks.",
        "A named water bottle in the school bag, refilled at pick-up, every day."
      ] }
    ]
  },
  {
    topic: "health", emoji: "🩺", title: "Getting the GP to hear you",
    summary: "Appointments are short. A page of facts and one clear ask gets you further than a long story.",
    sections: [
      { h: "Before the appointment", list: [
        "Write three examples with dates: what happened, how long it lasted, what you tried, what happened next.",
        "Write the impact in one line: school missed, sleep lost, work affected, family at breaking point.",
        "Decide the one question you need answered today. Write it down and ask it early.",
        "Take the Journal download or your ABC notes with you. Patterns are hard to argue with.",
        "Take someone with you if you are likely to be emotional or rushed. Two sets of ears are better than one."
      ] },
      { h: "In the room", p: [
        "Lead with the pattern and the impact, not the diagnosis you have researched. 'For six weeks he has woken at 5am, and he has missed eleven days of school' lands harder than 'I think it might be ADHD'.",
        "It is fair to ask directly: 'What is the referral pathway, and how long is the wait?' and 'What should we do in the meantime?' Ask for the answer in writing — a text or a letter is fine."
      ] },
      { h: "If you are not heard", list: [
        "Ask for the practice's policy on referrals, and for the GP's reason for not referring to be recorded.",
        "You can ask for a second opinion, or to see another GP at the same practice.",
        "You can ask the practice manager for help if access is the problem.",
        "Keep every letter and date. A paper trail is what turns 'we have tried' into evidence.",
        "In the UK, charities such as IPSEA (SEN law) and Contact (benefits and support) offer free, specific advice."
      ] },
      { h: "Say this", say: [
        "I am not asking you to diagnose today. I am asking what happens next, and when.",
        "Can you record in my child's notes that I asked for a referral, and why it was not made?"
      ] }
    ]
  },
  {
    topic: "health", emoji: "💊", title: "Medication: monitoring, not just swallowing",
    summary: "A prescription is the start of a monitoring job. These are the things worth writing down from day one.",
    sections: [
      { h: "Questions before the first dose", list: [
        "What is it, what is it meant to change, and how will we know it is working?",
        "What time should it be taken, and what happens if we forget or it is refused?",
        "What are the common side effects, and which ones mean we should call someone?",
        "What do we monitor — appetite, sleep, height, weight, mood, blood pressure — and how often?",
        "Who reviews the dose, how do we reach them, and what is the plan for weekends and holidays?"
      ] },
      { h: "The first two weeks", p: [
        "Keep a simple daily note: time taken, appetite at lunch and dinner, bedtime, sleep, and one word for mood. It takes a minute and it is the difference between a useful review and a vague one.",
        "Appetite usually drops most at lunchtime. A substantial breakfast before the dose and a planned after-school snack are practical, not fussy.",
        "Never adjust or stop a dose without advice. If you are worried, phone the team that prescribed it — that is what they are there for."
      ] },
      { h: "A word about 'holidays'", p: [
        "Some families use medication only on school days; others use it every day. Both can be reasonable, but the decision should come from the prescriber who knows your child, not from a forum. Ask the question directly and get the answer recorded."
      ] },
      { h: "Try this", try: [
        "A one-page medication log on the fridge, with columns for time, food, sleep and mood.",
        "A photo of the label and the review date in your phone, so it is never a scramble."
      ] }
    ]
  },
  {
    topic: "activity", emoji: "🧱", title: "Burning energy without a fight",
    summary: "The goal is not fitness. It is a body that can sit down afterwards.",
    sections: [
      { h: "Move before the demand", p: [
        "Movement works best as a warm-up, not a reward. Ten minutes of heavy work before homework does more than an hour of running afterwards.",
        "Heavy work — pushing, pulling, carrying, wall presses — is calming for most children. Fast spinning and running are alerting, which is useful in the morning and unhelpful at bedtime."
      ] },
      { h: "The ten-minute rule", list: [
        "Pick movement that needs no changing, no equipment and no adult energy: stairs, wall pushes, animal walks, a balloon.",
        "Set a visible timer for ten minutes. A visible end makes starting easier.",
        "Join in for the first minute, then step back. Children move more when someone moves with them.",
        "Finish with something slow and quiet, so the body gets the message that the burst is over.",
        "Do not remove movement as a punishment. It is a need, not a privilege."
      ] },
      { h: "If they will not move", p: [
        "Offer two choices rather than an instruction: 'stairs or wall pushes?' Resistance often drops when the child has picked the route.",
        "If the refusal is total, try proprioceptive input instead: a tight blanket, a cushion sandwich, carrying the laundry, or pushing the trolley at the shop."
      ] }
    ]
  },
  {
    topic: "activity", emoji: "🎉", title: "Clubs and parties: preparation beats bravery",
    summary: "The child who falls apart at a party is usually the one who was not told what would happen.",
    sections: [
      { h: "Before", list: [
        "Ask for the plan: who will be there, what happens first, how long it lasts, where the quiet space is.",
        "Show photos of the venue or the coach if you can. Familiarity reduces the load.",
        "Agree an exit signal and a time limit before you arrive. Knowing they can leave makes staying more likely.",
        "Eat and drink before you go. A hungry child at a party is a predictable disaster.",
        "For clubs, ask for a trial session before paying for a block, and tell the coach one thing that helps."
      ] },
      { h: "During", p: [
        "Arrive early or late on purpose — whichever is quieter. The crowded doorway is often the hardest part.",
        "Find one job or one person. A child with a role to play does not have to improvise social contact.",
        "Do not insist on joining in. Watching from the edge is participation, and it often comes before joining."
      ] },
      { h: "After", p: [
        "Expect a crash. A party is a sensory marathon, and the bill arrives at home. Plan a quiet hour and food, and do not debrief the social performance.",
        "If it went badly, the lesson is about preparation and exit plans, not about the child's character."
      ] },
      { h: "Say this", say: [
        "We can stay for twenty minutes, and then we can go. I will show you the door we will leave by.",
        "You do not have to play. You can watch, and we can go whenever you give me the signal."
      ] }
    ]
  }
);
