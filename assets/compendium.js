/* ==========================================================================
   ZenZac — compendium.js
   The reference shelf: short, practical entries grouped by what is hard,
   not by diagnosis. Content only — the app renders it. No network needed.
   ========================================================================== */
window.ZenCompendium = {
  categories: [
    { id: "regulation", name: "Big feelings & regulation", emoji: "🌊", blurb: "What to do in the first minute, and what to do afterwards." },
    { id: "sensory",     name: "Sensory needs",            emoji: "🎧", blurb: "Noise, light, touch, movement and the senses nobody talks about." },
    { id: "routine",     name: "Routines & transitions",   emoji: "📋", blurb: "Predictability, warnings and getting out of the door." },
    { id: "focus",       name: "Focus, homework & waiting",emoji: "🎯", blurb: "Starting, sticking and stopping — in child-sized pieces." },
    { id: "communication", name: "Communication",          emoji: "💬", blurb: "Fewer words, more time, and other things that actually land." },
    { id: "sleep",       name: "Sleep & evenings",         emoji: "🌙", blurb: "Wind-downs, night waking and the 6am start." },
    { id: "food",        name: "Food & nutrition",         emoji: "🍎", blurb: "What goes on the plate, safe foods, and when to ask for help." },
    { id: "school",      name: "School & learning",        emoji: "🏫", blurb: "Scripts, profiles and adjustments worth asking for." },
    { id: "out",         name: "Out & about",              emoji: "🚌", blurb: "Trips, shops, haircuts and birthday parties." },
    { id: "connection",  name: "Play & connection",        emoji: "🧸", blurb: "Ten minutes that do more than an hour of talking." },
    { id: "grownups",    name: "For grown-ups",            emoji: "🫖", blurb: "You are part of the system too. These are for you." },
    { id: "understand",  name: "Understanding & rights",   emoji: "🧭", blurb: "What is happening, why it is not naughtiness, and what you can ask for." },
    { id: "health",      name: "Health & body",             emoji: "🩺", blurb: "Tummies, headaches, ears, medication and growing up." },
    { id: "activity",    name: "Activities & movement",     emoji: "🤸", blurb: "How to burn energy, by age, in a small house or a big park." },
    { id: "behaviour",   name: "Behaviour & tracking",      emoji: "📝", blurb: "ABC notes, patterns and records that get taken seriously." },
  ],

  entries: [
    /* ---------------- regulation ---------------- */
    {
      cat: "regulation", emoji: "🫧", title: "The three-step reset",
      summary: "When a child is already flooded, logic does not work. Connection, then a body fix, then words.",
      steps: [
        "Get low and close, and say one short true thing: 'I'm here.' Nothing else yet.",
        "Change the body first — a drink, a walk, a heavy blanket, slow breathing out, or simply sitting down together.",
        "Only when the storm has passed, ask one question: 'What would help now?' Not 'why did you do that?'",
        "Save the teaching for later. A flooded brain is not taking notes."
      ],
      link: { href: "#/calm", label: "Open Calm" }
    },
    {
      cat: "regulation", emoji: "🤝", title: "Co-regulation comes before self-regulation",
      summary: "Children borrow calm from the adults around them long before they can make it themselves.",
      steps: [
        "Slow your own breathing and drop your voice lower than usual — it is contagious in both directions.",
        "Sit beside rather than opposite. Side-by-side takes the pressure off eye contact.",
        "Do something rhythmic together: stacking, drawing, walking, folding washing.",
        "Name your own state honestly: 'I'm getting cross, so I'm going to breathe for a minute.'"
      ]
    },
    {
      cat: "regulation", emoji: "🏷️", title: "Name it to tame it — but keep it small",
      summary: "A feeling with a word is easier to carry than a feeling with no shape.",
      steps: [
        "Offer a guess, not a diagnosis: 'That looks like really cross' or 'That was a shock.'",
        "Let them correct you. Being wrong is useful — it hands them the label.",
        "Keep it to one or two words when things are hot. Save the full vocabulary for calm times.",
        "Use the mood faces on Home as a low-pressure way to check in without a conversation."
      ],
      link: { href: "#/home", label: "Mood check-in" }
    },
    {
      cat: "regulation", emoji: "🗺️", title: "Write a calm-down plan while everyone is calm",
      summary: "A plan made in the middle of a meltdown is a plan made by the meltdown.",
      steps: [
        "Pick three steps that have worked before — for example: quiet room, ear defenders, then a drink.",
        "Name one person and one place. Write them down where the child can see.",
        "Practise it on a good day, all the way through, so the route is familiar.",
        "Review it after a hard week. Cross out what has stopped working without judgement."
      ]
    },
    {
      cat: "regulation", emoji: "⏱️", title: "The first sixty seconds",
      summary: "What you do in the first minute decides whether the next twenty are recovery or escalation.",
      steps: [
        "Reduce everything: noise off, lights down, bystanders out, words to a minimum.",
        "Do not block, restrain or crowd unless there is immediate danger. Space is a strategy, not a reward.",
        "Keep one safe adult nearby and quiet. Silence is company too.",
        "When the noise stops, wait. Recovery has its own clock; rushing it restarts the storm."
      ]
    },
    {
      cat: "regulation", emoji: "🩹", title: "Repair, don't relitigate",
      summary: "After a hard moment, the relationship needs fixing before the behaviour does.",
      steps: [
        "Go back when both of you are calm. Say what you saw and that you are glad it is over.",
        "Own your part out loud: 'I shouted. That was mine, not yours.'",
        "Ask what would help next time, and write the answer down.",
        "Do not use the repair to deliver a lecture. One sentence of learning is plenty."
      ]
    },
    {
      cat: "regulation", emoji: "🎒", title: "Drop-off tears",
      summary: "Goodbyes are transitions, and transitions are the hardest part of the day for many children.",
      steps: [
        "Keep the goodbye short, warm and identical every day. Long goodbyes teach that leaving is dangerous.",
        "Give a concrete return point: 'After lunch, I'll be at the gate.'",
        "Ask the school for a job at the door — putting the register out beats standing in the corridor.",
        "Do not sneak away. Being left without a goodbye is worse than being left after one."
      ]
    },
    {
      cat: "regulation", emoji: "🔥", title: "Anger is information",
      summary: "Underneath most explosive behaviour is a need, a boundary, a sensory problem or a missing skill.",
      steps: [
        "Ask four questions afterwards: was it too loud, too sudden, too hard, or too much?",
        "Look for the pattern across a week rather than a single incident — use the Journal.",
        "Fix the environment before you try to fix the child.",
        "Teach the missing skill in peacetime, in one-minute rehearsals, not mid-conflict."
      ],
      link: { href: "#/journal", label: "Open Journal" }
    },

    /* ---------------- sensory ---------------- */
    {
      cat: "sensory", emoji: "🎧", title: "Ear defenders: when and how",
      summary: "They are a tool, not a crutch. Used well they prevent overload; used all day they can mask the problem.",
      steps: [
        "Use them for predictable loud events — assemblies, supermarkets, fireworks, hand dryers.",
        "Take them off in quiet periods so the child stays connected to conversation.",
        "Let the child control them. Having the option is often enough to make a place survivable.",
        "Pair them with a plan: 'defenders on at the door, off at the car.'"
      ]
    },
    {
      cat: "sensory", emoji: "🔊", title: "Noise hurts before it annoys",
      summary: "For many autistic children, sound is not preference — it is physical pain or static that never stops.",
      steps: [
        "Notice the build-up: hands over ears, a fixed stare, going very still or very wriggly.",
        "Turn off background sources first — the TV nobody is watching is still input.",
        "Choose quieter times and quieter routes rather than avoiding the place entirely.",
        "Give warning before unavoidable noise: 'The bell goes in one minute.'"
      ]
    },
    {
      cat: "sensory", emoji: "💡", title: "Light and visual clutter",
      summary: "A bright, busy room costs attention before a single instruction is given.",
      steps: [
        "Swap overhead lighting for a lamp where you can. Fluorescent flicker is a common trigger.",
        "Clear one surface completely — the table where homework happens is a good start.",
        "Use one colour of storage, and put things away by category, not by mood.",
        "Let the child choose a dimmer, warmer setup for their own room."
      ]
    },
    {
      cat: "sensory", emoji: "🏋️", title: "Heavy work that calms",
      summary: "Pushing, carrying and pulling send strong feedback to joints and muscles, which settles many bodies fast.",
      steps: [
        "Wall pushes for ten slow counts, hands flat at shoulder height.",
        "Carry the shopping, the laundry basket, or a bag of books from room to room.",
        "Animal walks across the floor: bear, crab, frog, seal.",
        "Do it before the hard thing, not after the explosion — it is prevention, not punishment."
      ],
      link: { href: "#/focus", label: "Movement tools" }
    },
    {
      cat: "sensory", emoji: "🫀", title: "Interoception: the sense nobody mentions",
      summary: "Noticing hunger, thirst, a full bladder or a rising heart rate is a sense, and it can be delayed.",
      steps: [
        "Build in regular drink and toilet prompts rather than waiting to be asked.",
        "Use a visual scale for body signals: hot, tight, wobbly, hungry, tired.",
        "Teach one signal at a time over a week, in the moment it happens.",
        "Assume a sudden meltdown at 4pm is low fuel until proven otherwise."
      ]
    },
    {
      cat: "sensory", emoji: "🧦", title: "Tags, seams and socks",
      summary: "Tactile sensitivity is real, consistent and not fussiness. Change the clothing, not the child.",
      steps: [
        "Cut tags out, or buy seamless and label-free where you can.",
        "Let the child try clothes on for ten minutes at home before a full day.",
        "Wash new clothes twice — sizing and softness both change.",
        "Offer two acceptable outfits, not the whole wardrobe. Choice within limits."
      ]
    },
    {
      cat: "sensory", emoji: "🌀", title: "Stimming is regulation",
      summary: "Rocking, flapping, humming and spinning are doing a job. Stop them only if they are unsafe.",
      steps: [
        "Ask what it is helping with — excitement, overwhelm, concentration, pain?",
        "Protect the time and space for it, especially after school.",
        "Replace unsafe stims with a safer version of the same movement rather than banning it.",
        "Never shame it. A child who is embarrassed about regulating loses the tool."
      ]
    },

    /* ---------------- routine ---------------- */
    {
      cat: "routine", emoji: "🖼️", title: "A visual timetable that gets used",
      summary: "A picture strip is worth more than a repeated sentence, especially at 7am.",
      steps: [
        "Keep it to the next three or four things, not the whole day.",
        "Use photos of your own house and your own things where possible.",
        "Move the card together, so the change is something the child does, not something done to them.",
        "Put it where the transition happens — by the door, not in a folder."
      ],
      link: { href: "#/routine", label: "Build a now & next" }
    },
    {
      cat: "routine", emoji: "1️⃣", title: "First–then, not if–then",
      summary: "'First shoes, then iPad' is a sequence. 'If you don't put your shoes on…' is a threat.",
      steps: [
        "Keep the first thing small and certain: 'First shoes.'",
        "Name the second thing the child actually wants, not a reward you invented.",
        "Show it rather than say it — two pictures, two words.",
        "Follow through calmly. A first–then that sometimes happens is just noise."
      ]
    },
    {
      cat: "routine", emoji: "🕔", title: "Countdowns instead of surprises",
      summary: "Time is abstract. A countdown makes it visible and gives the brain a chance to switch.",
      steps: [
        "Give a five-minute warning, then a two-minute one, then a one-minute one.",
        "Use a visible timer where you can — the child should not have to trust your sense of time.",
        "Say what is ending and what is starting: 'Two minutes of game, then bath.'",
        "For big changes, warn in days, not minutes. Cross them off a calendar."
      ]
    },
    {
      cat: "routine", emoji: "📋", title: "Now & next in real life",
      summary: "Two slots are enough. A full schedule is often just decoration.",
      steps: [
        "Decide the one thing that must happen now, and the one thing after it.",
        "Put a time on the now task and let a timer end it, not you.",
        "Celebrate the finish with a sticker or a chime — the ending needs to feel like something.",
        "Reset the strip at the same point each day so it becomes part of the furniture."
      ],
      link: { href: "#/routine", label: "Open Now & Next" }
    },
    {
      cat: "routine", emoji: "🏠", title: "Weekend anchors",
      summary: "Unstructured days are harder than school days for many children. Keep a skeleton.",
      steps: [
        "Keep wake, meals and bed within an hour of the weekday times.",
        "Plan one anchor in the morning and one in the afternoon, and leave the middle loose.",
        "Write the day's two or three things on the same board you use in the week.",
        "Build in a quiet hour after anything exciting — recovery is part of the plan."
      ]
    },
    {
      cat: "routine", emoji: "🔀", title: "When the plan changes",
      summary: "The change is rarely the problem. The surprise is.",
      steps: [
        "Say it as soon as you know, even if the answer is 'I don't know yet.'",
        "Say what stays the same: 'Same car, same route, different shop.'",
        "Give a new version of the plan, not just the cancellation of the old one.",
        "Allow the disappointment. Fixing it quickly can teach that feelings are not allowed."
      ]
    },

    /* ---------------- focus ---------------- */
    {
      cat: "focus", emoji: "⏳", title: "The ten-minute start",
      summary: "Most of the effort is in starting. Make the first chunk hilariously small.",
      steps: [
        "Agree ten minutes on a visible timer. The child may stop when it rings.",
        "Sit nearby without supervising — presence, not pressure.",
        "At the bell, offer a two-minute movement break before deciding whether to continue.",
        "Write down what got done. Finishing is easier when you can see progress."
      ],
      link: { href: "#/focus", label: "Open Focus timer" }
    },
    {
      cat: "focus", emoji: "👥", title: "Body doubling",
      summary: "Working alongside someone — even silently — makes starting much easier for many ADHD brains.",
      steps: [
        "Do your own quiet task at the same table, not theirs.",
        "Agree the deal in advance: 'I'll do emails, you do maths, ten minutes.'",
        "Keep your phone face down and out of reach. Modelling matters.",
        "End together. A shared finish is a natural reward."
      ]
    },
    {
      cat: "focus", emoji: "✏️", title: "Homework: smaller, shorter, earlier",
      summary: "An hour of fighting is worse than ten minutes of work. Aim for the ten minutes.",
      steps: [
        "Do it after a snack and a run around, not straight off the bus.",
        "Break it into numbered chunks on paper and tick them off.",
        "Ask the school for a reduced or timed version if the full task is unrealistic.",
        "Stop at the agreed time even if it is unfinished, and tell the teacher why."
      ]
    },
    {
      cat: "focus", emoji: "🧍", title: "Waiting skills, practised in tiny doses",
      summary: "Waiting is a skill, not a personality trait. It is built in seconds, not minutes.",
      steps: [
        "Start with five seconds and a visual cue, then build slowly.",
        "Give the hands something to do — a fidget, a job, holding the list.",
        "Narrate the wait: 'Two more minutes, then it's your turn.'",
        "Never use waiting as a test. If it fails, the step was too big."
      ]
    },
    {
      cat: "focus", emoji: "📄", title: "One page, one job",
      summary: "A worksheet full of questions looks like a wall. Fold it, cover it, or cut it up.",
      steps: [
        "Cover everything except the current question with a blank sheet.",
        "Number the questions and do them out of order if that helps.",
        "Use a coloured overlay or larger print if reading is effortful.",
        "Put the finished page away immediately — visible backlog is demoralising."
      ]
    },
    {
      cat: "focus", emoji: "🤸", title: "Movement breaks that don't derail",
      summary: "The break needs a clear start and end, or it becomes the new activity.",
      steps: [
        "Choose two or three breaks in advance and write them on the plan.",
        "Use a timer for the break as well as the work.",
        "Pick movement that raises the heart rate without leaving the room: star jumps, wall pushes, dancing.",
        "Return to the same seat, same page. Novelty is the enemy of restarting."
      ]
    },

    /* ---------------- communication ---------------- */
    {
      cat: "communication", emoji: "🤫", title: "Say less, pause more",
      summary: "Long explanations are extra processing, not extra help.",
      steps: [
        "Get attention first: name, wait, then speak.",
        "Use one instruction per sentence, and no more than two sentences.",
        "Pause for at least ten seconds after asking. Silence is processing time, not defiance.",
        "Repeat the same words rather than rephrasing — new words mean starting again."
      ]
    },
    {
      cat: "communication", emoji: "💭", title: "Declarative language",
      summary: "Comments invite. Questions and commands demand. Swap some of the second for the first.",
      steps: [
        "Instead of 'Put your shoes on', try 'I can see the shoes by the door.'",
        "Instead of 'What did you do at school?', try 'I wonder if the sand tray was out today.'",
        "Leave a gap after the comment. The child can choose to pick it up.",
        "This is especially useful for children who experience demands as pressure."
      ]
    },
    {
      cat: "communication", emoji: "⏸️", title: "The ten-second rule",
      summary: "Processing speed varies. A fast repeat feels like pressure and often shuts down the answer.",
      steps: [
        "Ask once, then count to ten in your head.",
        "Keep your face relaxed. Watch for the answer starting, even if it is not words.",
        "If nothing comes, offer a choice of two rather than repeating the question.",
        "Write the question down if speaking is the hard part."
      ]
    },
    {
      cat: "communication", emoji: "🖐️", title: "Pictures, signs and AAC",
      summary: "Speech is one channel, not the only one. Offering another does not stop talking — it reduces frustration.",
      steps: [
        "Keep a few core pictures where the child spends most time: help, stop, more, break.",
        "Model the pictures yourself as you speak, so they are normal rather than a last resort.",
        "Accept pointing, signing, leading you by the hand, or a device — all count as communication.",
        "Never remove a communication method as a reward or withhold it during a meltdown."
      ]
    },
    {
      cat: "communication", emoji: "⚖️", title: "Choice boards for impossible questions",
      summary: "'What do you want?' is a big open question. Two visible options is a fair one.",
      steps: [
        "Offer two, and make them genuinely different: this or that, not yes or no.",
        "Show the options as pictures or objects, not just words.",
        "Accept the choice immediately, even if you think it is the wrong one.",
        "Build up to three options only when two is reliably easy."
      ]
    },
    {
      cat: "communication", emoji: "🔇", title: "Shutdown is not the silent treatment",
      summary: "Some children lose speech under stress. Waiting quietly is support; demanding words is not.",
      steps: [
        "Stop asking questions. Offer presence, water, a blanket, or a quiet space.",
        "Use yes/no or a thumbs up if you need to check something.",
        "Do not insist on an apology or an explanation while the words are gone.",
        "Afterwards, ask what would make talking easier next time — a note, a text, a drawing."
      ]
    },

    /* ---------------- sleep ---------------- */
    {
      cat: "sleep", emoji: "🌙", title: "The same order, every night",
      summary: "Predictability lowers arousal faster than any sleep aid. The sequence is the medicine.",
      steps: [
        "Pick three steps and keep them identical: bath, pyjamas, story.",
        "Start 45 minutes before lights out, and keep the last 20 screen-free.",
        "Use the same words and the same lamp every night.",
        "Put the sequence on a picture strip so you are not the only reminder."
      ]
    },
    {
      cat: "sleep", emoji: "🫁", title: "Breathing for sleep without the performance",
      summary: "Breathing exercises can create pressure. Try them as a story, not a task.",
      steps: [
        "Lie down and put a toy on the tummy. Watch it rise and fall — no counting required.",
        "Breathe out for longer than in, through the mouth, with a soft 'shh' sound.",
        "Try five rounds, then stop whether or not it worked.",
        "If it becomes a fight, drop it and read aloud in a low voice instead."
      ],
      link: { href: "#/calm", label: "Open breathing" }
    },
    {
      cat: "sleep", emoji: "🛏️", title: "The bedroom is for sleep, not storage",
      summary: "A room full of interesting things is a room that keeps the brain awake.",
      steps: [
        "Move toys and screens out, or cover them at night.",
        "Keep one comfort object and one book, and make everything else boring.",
        "Use a dim, warm lamp for the last half hour instead of a ceiling light.",
        "Weighted blankets only with professional advice, especially for younger children."
      ]
    },
    {
      cat: "sleep", emoji: "🌅", title: "Early waking and night waking",
      summary: "A 5am start is common and exhausting. Aim to shift the pattern, not to win the morning.",
      steps: [
        "Keep the wake time fixed and move bedtime 15 minutes earlier for a week at a time.",
        "Make the room boring at dawn: blackout where safe, nothing to play with.",
        "Use a simple 'okay to get up' clock or lamp the child can read without you.",
        "If sleep problems persist for months, ask the GP or health visitor — this is a recognised issue with real help available."
      ]
    },

    /* ---------------- food ---------------- */
    {
      cat: "food", emoji: "🥣", title: "Safe foods, no pressure",
      summary: "A safe food is a bridge, not a failure. Pressure turns a liked food into a battleground.",
      steps: [
        "Always put one safe food on the plate, whatever else is served.",
        "Do not comment on what is eaten or not eaten. Neutral is the goal.",
        "Offer new food beside familiar food, without requiring a bite.",
        "Keep mealtimes short. Twenty minutes is plenty; hunger returns."
      ]
    },
    {
      cat: "food", emoji: "🚨", title: "When restriction needs help",
      summary: "Extreme restriction, fear of choking, or a shrinking list of foods is not fussiness.",
      steps: [
        "Note weight, energy, and how many foods are still accepted over a couple of weeks.",
        "Ask the GP about a paediatric dietitian referral, especially if foods are dropping fast.",
        "Do not use hunger or withholding to force a food. It deepens the fear.",
        "ARFID is a recognised eating disorder and needs specialist support, not a reward chart."
      ]
    },
    {
      cat: "food", emoji: "🍳", title: "Steady fuel for a steady brain",
      summary: "Blood sugar dips look exactly like bad behaviour: tears, rage, inability to cope.",
      steps: [
        "Aim for protein at breakfast — eggs, yoghurt, beans, nut butter.",
        "Add a scheduled snack after school before homework, not after the argument.",
        "Keep water visible and refill it without asking.",
        "Notice the 4pm pattern. If it is always the same time, it is often fuel."
      ]
    },
    {
      cat: "food", emoji: "🍱", title: "A lunchbox that opens",
      summary: "A hungry child with a sealed pot is a child who does not eat.",
      steps: [
        "Practise opening the box, the flask and the packets at home before term.",
        "One safe favourite, one protein, one fruit, one crunchy thing. That is enough.",
        "Cut things small if big bites are overwhelming.",
        "Ask the school about a quiet place to eat if the dining hall is too loud."
      ]
    },

    /* ---------------- school ---------------- */
    {
      cat: "school", emoji: "📄", title: "The one-page pupil profile",
      summary: "Teachers get a page, not a file. Make it the page that changes the day.",
      steps: [
        "Headline: what the child needs you to know in one sentence.",
        "Then four short sections: what helps, what hurts, early warning signs, what to do in a crisis.",
        "Add one thing that is working already, so it does not read as a list of problems.",
        "Give a copy to every adult who covers the child, and review it each term."
      ]
    },
    {
      cat: "school", emoji: "🌤️", title: "Ask for a soft start",
      summary: "The first ten minutes of school can decide the whole day.",
      steps: [
        "Ask for a quiet arrival: a job, a book, or coming in five minutes early.",
        "Ask for one named adult to greet the child at the door.",
        "Keep the same routine every day, including supply days.",
        "Put the request in writing, politely, and copy the SENCO."
      ]
    },
    {
      cat: "school", emoji: "📚", title: "Homework that fits the child",
      summary: "The point is learning, not endurance. Ask for the version that proves the learning.",
      steps: [
        "Agree a time cap — often 20 minutes is plenty — and let the school know it was used.",
        "Ask for typed work, fewer questions, or a photograph of practical work instead.",
        "Do not do it for them. Do help them start and stop.",
        "If homework causes distress most nights, that is data for a conversation, not a discipline problem."
      ]
    },
    {
      cat: "school", emoji: "🍽️", title: "Break and lunch are the hard part",
      summary: "Unstructured time with noise and crowds is often harder than lessons.",
      steps: [
        "Ask about a quieter club or a supervised room at break.",
        "A lunchtime job — library helper, equipment monitor — gives structure without stigma.",
        "Check where the child actually goes, not where they are supposed to go.",
        "Ask for a named adult to check in once at the start of lunch."
      ]
    },
    {
      cat: "school", emoji: "📝", title: "Exams and access arrangements",
      summary: "Extra time, a quiet room and rest breaks are reasonable adjustments, not advantages.",
      steps: [
        "Ask the SENCO early — access arrangements often need evidence and deadlines.",
        "Typical options: extra time, a separate room, rest breaks, a reader or a scribe.",
        "Practise the arrangement before the real exam so it is familiar.",
        "In the UK, talk to the school about SEN Support and, if needs are ongoing, an EHCP needs assessment."
      ]
    },

    /* ---------------- out ---------------- */
    {
      cat: "out", emoji: "🗺️", title: "A social story before the trip",
      summary: "Knowing what will happen removes most of the fear of the unknown.",
      steps: [
        "Write four or five short sentences in the first person: where, what, how long, what if.",
        "Include the boring bits — the queue, the toilet, the way back.",
        "Read it the night before and again in the car.",
        "Bring the story with you so the plan is available when anxiety rises."
      ]
    },
    {
      cat: "out", emoji: "🛒", title: "Supermarket survival",
      summary: "Shops combine noise, light, crowds, waiting and choices. It is a sensory assault course.",
      steps: [
        "Go at the quietest time, with a list and a photo of the list.",
        "Give a job: pushing the trolley, holding the bananas, ticking off items.",
        "Agree the finish line and the reward before you go in.",
        "Use ear defenders without apology. Leave if you need to; the shopping can wait."
      ]
    },
    {
      cat: "out", emoji: "💇", title: "Haircuts and dentists",
      summary: "These are not vanity or cooperation problems. They are sensory and control problems.",
      steps: [
        "Visit beforehand just to sit in the chair and meet the person, no cutting.",
        "Ask for a quiet time, a home visit, or a mobile hairdresser.",
        "Bring ear defenders and a preferred distraction, and agree a signal for stop.",
        "Break it into stages and pay for the stage, not the finished haircut."
      ]
    },
    {
      cat: "out", emoji: "🎂", title: "Birthday parties",
      summary: "Parties are loud, unpredictable and full of demands. A short visit is a full success.",
      steps: [
        "Ask the host for the plan: food, games, timings.",
        "Agree in advance how long you will stay, and tell the child.",
        "Bring a quiet exit route and a familiar snack.",
        "Leaving early is not failure. Ten good minutes beats an hour of overload."
      ]
    },

    /* ---------------- connection ---------------- */
    {
      cat: "connection", emoji: "⭐", title: "Special interest time",
      summary: "Time inside the child's interest is connection, regulation and learning at once.",
      steps: [
        "Give it a name and a place in the day so it is protected, not earned.",
        "Let the child lead. Ask one curious question, then mostly listen.",
        "Use the interest as a bridge to other things: maths with trains, reading with dinosaurs.",
        "Never threaten to take it away. It is often the thing keeping the day workable."
      ]
    },
    {
      cat: "connection", emoji: "🎲", title: "Ten minutes, child-led",
      summary: "Ten minutes of following their lead does more for behaviour than an hour of instructions.",
      steps: [
        "Put your phone away and sit on the floor.",
        "Narrate rather than direct: 'You're building a tower.'",
        "Do not correct, teach or improve the game.",
        "End at the timer, warmly, so it stays a good thing rather than a trap."
      ]
    },
    {
      cat: "connection", emoji: "🤪", title: "Silly rituals",
      summary: "A private joke is a fast route back to connection after a hard day.",
      steps: [
        "Invent one small routine that is only yours: a silly handshake, a word, a song.",
        "Use it at reunions, not just at bedtime.",
        "Keep it going through hard weeks — especially hard weeks.",
        "Let the child change it. Rituals that cannot evolve become rules."
      ],
      link: { href: "#/play", label: "Jokes & play" }
    },
    {
      cat: "connection", emoji: "👏", title: "Praise that lands",
      summary: "Specific, immediate and about effort. Generic praise slides off.",
      steps: [
        "Say what you saw: 'You got your shoes when I asked.'",
        "Praise starting as well as finishing, if starting is the hard part.",
        "Keep it small and often — a sticker now, not a trip next month.",
        "Never take back a reward already earned. It teaches the system is unfair."
      ]
    },

    /* ---------------- grownups ---------------- */
    {
      cat: "grownups", emoji: "🫖", title: "You cannot pour from empty",
      summary: "Parental burnout is common, real, and not a character flaw.",
      steps: [
        "Pick one thing to drop this week. Not improve — drop.",
        "Tell one other adult the truth about how you are, not the polite version.",
        "Ask your GP about support for yourself, including carer support and talking therapy.",
        "Lower the bar on the days that are already too full. Nobody is grading the house."
      ]
    },
    {
      cat: "grownups", emoji: "⏸️", title: "The five-minute reset for parents",
      summary: "Step out before you say the thing you will have to repair later.",
      steps: [
        "Say the true thing: 'I need a minute, I'm getting cross.'",
        "Go somewhere you cannot see the trigger, and breathe out longer than you breathe in.",
        "Cold water on the wrists, or hold something cold for thirty seconds.",
        "Come back and start with one short sentence, not a summary of everything."
      ]
    },
    {
      cat: "grownups", emoji: "🧾", title: "Share the load with a script",
      summary: "Vague asks get vague help. Specific asks get done.",
      steps: [
        "Name the task, the time and the standard: 'Can you do bath Thursday, teeth included?'",
        "Keep a visible list of what the week actually contains.",
        "Trade whole areas rather than individual jobs, so nobody has to ask twice.",
        "Say thank you for the thing, not for 'helping'. It is not help; it is the job."
      ]
    },
    {
      cat: "grownups", emoji: "📊", title: "Keep a pattern log, not a diary",
      summary: "Three columns for two weeks beats a year of trying to remember.",
      steps: [
        "Log the time, what happened before, and how long recovery took.",
        "Add sleep, food and sensory notes — those are usually the real causes.",
        "Look for repeats once a week, not after every incident.",
        "Take the log to school or the GP. Patterns are evidence; stories are not."
      ],
      link: { href: "#/journal", label: "Open Journal" }
    },
    {
      cat: "grownups", emoji: "🗣️", title: "Talking to family who don't get it",
      summary: "You will not argue someone into understanding. You can set the terms instead.",
      steps: [
        "Lead with one specific need, not the diagnosis: 'Please don't tickle him without asking.'",
        "Give a script they can use, so they do not have to invent one.",
        "Set the boundary once, calmly, and hold it. Explanations can become negotiations.",
        "Find your people elsewhere if you have to. You are not required to convince everyone."
      ]
    },

    /* ---------------- understand ---------------- */
    {
      cat: "understand", emoji: "⚡", title: "ADHD is not naughtiness",
      summary: "It is a difference in attention, impulse and time perception — not a choice or a discipline gap.",
      steps: [
        "Expect inconsistency. A skill that works on Tuesday may vanish on Friday.",
        "Externalise memory: lists, timers, pictures and alarms, not reminders alone.",
        "Reward immediately. Delayed consequences do not connect for a brain that lives in now.",
        "Assume effort is present even when the output is not."
      ]
    },
    {
      cat: "understand", emoji: "🧩", title: "Autism is not a behaviour",
      summary: "The behaviour you see is often the visible edge of sensory, communication or change-related stress.",
      steps: [
        "Look for the trigger in the environment before the child.",
        "Prefer predictability and warning over rewards and sanctions.",
        "Take interests seriously. They are often the route to learning and to joy.",
        "Do not require eye contact as proof of listening."
      ]
    },
    {
      cat: "understand", emoji: "🚧", title: "Demand avoidance, in plain terms",
      summary: "For some children, an instruction triggers a genuine threat response — even a wanted one.",
      steps: [
        "Reduce the number of direct demands and offer more choices.",
        "Use indirect language: 'The bin is full' instead of 'Empty the bin'.",
        "Build in escape routes and breaks that do not have to be earned.",
        "Avoid rewards that turn something they love into a demand."
      ]
    },
    {
      cat: "understand", emoji: "🎭", title: "Masking and the cost of coping",
      summary: "A child who holds it together all day may fall apart the moment they get home.",
      steps: [
        "Expect the after-school collapse and plan for it: snack, quiet, no questions.",
        "Do not treat home behaviour as proof that school is fine.",
        "Ask the school what they see at break, not just in lessons.",
        "Give permission to not be okay, and time with no demands."
      ]
    },
    {
      cat: "understand", emoji: "🚪", title: "School refusal is communication",
      summary: "A child who cannot go in is usually telling you the environment is not survivable today.",
      steps: [
        "Ask what part is hardest: the bus, the gate, the noise, a lesson, a person.",
        "Get the school and, if needed, the GP involved early. Avoid a standoff.",
        "Build a graded return with a named adult and a quiet place to land.",
        "In the UK, ask about SEN Support, an EHCP needs assessment, and local authority attendance support."
      ]
    },
    {
      cat: "understand", emoji: "⚖️", title: "What you can ask school for",
      summary: "Support is not a favour. It is an adjustment to remove a barrier.",
      steps: [
        "Start with the SENCO and put the request in writing.",
        "Name the barrier and the adjustment: 'Noise at lunch — a quiet room, please.'",
        "Ask for outcomes to be recorded and reviewed, not just agreed verbally.",
        "If needs are long-term and complex, ask the local authority for an EHC needs assessment."
      ]
    },

    /* ---------------- food & nutrition ---------------- */
    {
      cat: "food", emoji: "🍽️", title: "What a balanced day looks like",
      summary: "You do not need a perfect plate. You need a shape to the day that survives a tired child.",
      steps: [
        "Base meals on starchy carbohydrates — bread, pasta, rice, potatoes — and choose wholegrain when it is accepted.",
        "Aim for five portions of fruit and vegetables across the day, not five at dinner. Juice counts once.",
        "Include beans, pulses, fish, eggs, meat or another protein at two meals if you can.",
        "Dairy or a fortified alternative gives calcium. Children over one need about 10 micrograms of vitamin D a day.",
        "Six to eight drinks a day, water first. Sweets and crisps are fine in small amounts — they are not a moral failure."
      ]
    },
    {
      cat: "food", emoji: "🍳", title: "Protein at breakfast changes the morning",
      summary: "A sugary breakfast peaks fast and crashes by assembly. Protein flattens the curve.",
      steps: [
        "Easy wins: eggs, Greek yoghurt, beans on toast, peanut butter, cheese, or last night's leftovers.",
        "Pair carbohydrate with protein rather than removing the carbohydrate — the combination is what sustains.",
        "If breakfast is refused, offer a protein snack at break instead of fighting at 7am.",
        "Keep the same two or three breakfasts on rotation. Decision-making is expensive in the morning.",
        "Watch the 10am meltdown: if it happens most days, breakfast is the first thing to change."
      ]
    },
    {
      cat: "food", emoji: "💧", title: "Water, before anything else",
      summary: "Mild dehydration looks like grumpiness, headache and poor concentration — not thirst.",
      steps: [
        "Put a named bottle where the child can see it, and refill it at the same times each day.",
        "Offer a drink with every snack and every transition, not only with meals.",
        "Fizzy, squash and juice all count as fluid, but water is the one that does not add sugar.",
        "More in heat, and more after sport. A headache after school is often a water problem.",
        "If a child barely drinks, try a straw, a special cup, or ice — the method matters more than the lecture."
      ]
    },
    {
      cat: "food", emoji: "🥩", title: "Iron, tiredness and 'lazy' afternoons",
      summary: "Low iron is common and mimics ADHD symptoms: tired, foggy, irritable, unable to settle.",
      steps: [
        "Iron-rich foods: red meat, beans, lentils, fortified cereal, dark green vegetables, eggs.",
        "Vitamin C with the meal helps absorption — a glass of orange juice or some fruit alongside.",
        "Tea and coffee block iron. Keep them well away from meals for children.",
        "Persistent tiredness, pallor or breathlessness deserves a GP conversation and a blood test.",
        "Do not start iron supplements without advice; too much is harmful."
      ]
    },
    {
      cat: "food", emoji: "💊", title: "Vitamins and supplements, without the hype",
      summary: "A supplement can fill a gap. It cannot replace food, and more is not better.",
      steps: [
        "NHS advice: children aged 6 months to 5 years should take a daily supplement with vitamins A, C and D.",
        "Children over one, and adults, should consider 10 micrograms of vitamin D daily, especially in autumn and winter.",
        "Avoid mega-doses and 'focus' blends. Check with a pharmacist before combining products.",
        "If a child eats a very limited range of foods, ask the GP or dietitian rather than guessing.",
        "Keep all supplements out of reach — iron tablets in particular are dangerous to children."
      ]
    },
    {
      cat: "food", emoji: "🥪", title: "A packed lunch that comes home empty",
      summary: "The best lunch is the one that gets eaten in a loud hall in ten minutes.",
      steps: [
        "Small portions, easy-open packets, and nothing that needs assembling at the table.",
        "One safe favourite, one protein, one fruit, one crunchy thing. Repeat it without shame.",
        "Practise opening the box and the wrappers at home before term starts.",
        "Cut sandwiches small if big bites are overwhelming, and avoid strong smells near other children.",
        "Ask the school about a quiet place to eat if the dining hall is the reason lunch is skipped."
      ]
    },
    {
      cat: "food", emoji: "📉", title: "When eating needs more than patience",
      summary: "Picky eating is common. A shrinking diet with distress and weight loss is different.",
      steps: [
        "Keep a two-week note of what is actually eaten, not what is offered. Patterns beat memory.",
        "Ask the GP about a dietitian referral if the range is shrinking, or if whole food groups have gone.",
        "Ask specifically about ARFID — avoidant/restrictive food intake disorder — if fear or sensory distress is driving it.",
        "Do not remove safe foods to force variety. That reliably makes the list shorter.",
        "Growth, energy and weight matter more than the colour of the plate. Say so at appointments."
      ]
    },

    /* ---------------- health & body ---------------- */
    {
      cat: "health", emoji: "🩺", title: "When to ask the GP",
      summary: "You do not need a diagnosis in mind to book. Persistent change is reason enough.",
      steps: [
        "Book if something lasts weeks, keeps returning, or is changing school, sleep or eating.",
        "Write three examples with dates before you go: what happened, how long, what you tried.",
        "Say the impact out loud — missed school, no sleep, family falling apart — not just the symptom.",
        "Ask one clear question: what happens next, who decides, and when should we come back?",
        "You can ask for a second opinion, and you can take someone with you. Both are allowed."
      ]
    },
    {
      cat: "health", emoji: "🫄", title: "Tummy aches and constipation",
      summary: "Recurring tummy pain in children is often constipation — even when parents are sure it is not.",
      steps: [
        "Ask about poo: how often, what it looks like, and whether it hurts. Water and fibre help, but so does routine.",
        "Toilet time after meals, feet supported, no rush and no audience. A stool softener may be needed.",
        "Keep a note of pain, food, poo and mood for two weeks. It is far more useful than a description.",
        "See the GP if there is blood, weight loss, fever, pain that wakes them, or pain in a fixed spot.",
        "Tummy aches that appear before school every day are worth taking seriously in both directions — body and worry."
      ]
    },
    {
      cat: "health", emoji: "🤕", title: "Headaches: the boring checklist first",
      summary: "Most childhood headaches are fluid, food, sleep and screens. Check those before worrying.",
      steps: [
        "Water, a proper meal, and an earlier night for three days — then judge.",
        "Screens close to the face and late at night are a common trigger. Try a screen curfew for a week.",
        "Note time of day, what was eaten, and how much sleep. Bring the note to the GP.",
        "See the GP if headaches wake the child, happen most days, or come with sickness, vision changes or weakness.",
        "Painkillers more than a couple of days a week can cause rebound headaches. Ask before using them regularly."
      ]
    },
    {
      cat: "health", emoji: "👂", title: "Ears, eyes and hearing",
      summary: "A child who cannot hear the instruction is not ignoring it. Rule it out.",
      steps: [
        "Glue ear is common and fluctuating — behaviour can look worse on bad hearing days.",
        "Ask for a hearing test if speech is unclear, the TV is always loud, or they watch faces intently.",
        "A vision check matters too: headaches, squinting, and losing their place when reading.",
        "In the UK, NHS sight tests are free for children, and school hearing checks happen at reception age.",
        "Tell school if hearing fluctuates, so seating and instructions can be adjusted."
      ]
    },
    {
      cat: "health", emoji: "💊", title: "ADHD medication: the questions to ask",
      summary: "Medication is a family decision. These are the questions that make it an informed one.",
      steps: [
        "What is being prescribed, what is it meant to change, and how will we know it is working?",
        "What about appetite, sleep, headaches, mood and growth? What do we monitor, and how often?",
        "Who reviews the dose, how do we reach them, and what do we do on a day we forget?",
        "Can we stop for weekends or holidays, and what does the guidance say about that?",
        "Ask for the plan in writing. This is general information — not advice to start or stop anything."
      ]
    },
    {
      cat: "health", emoji: "🌱", title: "Puberty, hygiene and growing up",
      summary: "Autistic and ADHD children often need the facts earlier, more literally, and in smaller pieces.",
      steps: [
        "Start before the changes, not after. Short, factual sentences beat one big talk.",
        "Build a private, repeatable routine: shower, deodorant, clean clothes — same order every day.",
        "Prepare for periods, wet dreams and body hair with plain language and visual supports.",
        "Mood changes are real, but do not attribute everything to hormones. Keep the usual supports.",
        "Ask the GP or school nurse about puberty resources if you are not sure where to start."
      ]
    },

    /* ---------------- activities & movement ---------------- */
    {
      cat: "activity", emoji: "📏", title: "How much movement, by age",
      summary: "The official guidelines are simpler than the internet suggests. Aim for the shape, not the number.",
      steps: [
        "Under 5: about three hours of active play a day, spread across the day, including walking and climbing.",
        "5 to 18: an average of 60 minutes a day of moderate-to-vigorous activity, and strengthening play three days a week.",
        "Anything counts: scooting to school, trampolining, dancing, carrying shopping, climbing trees.",
        "Split it up. Three twenty-minute bursts beat one hour nobody will agree to.",
        "Some movement is always better than none, especially on a hard day."
      ]
    },
    {
      cat: "activity", emoji: "🧱", title: "Heavy work in five minutes",
      summary: "Pushing, pulling and carrying calms a body faster than running does — and needs no equipment.",
      steps: [
        "Wall presses: hands flat, push for ten slow counts, three times.",
        "Carry something safe and heavy from one room to another — a bag of books, a water bottle crate.",
        "Push the shopping trolley, or help carry the laundry basket up the stairs.",
        "Cushion sandwich: roll the child in a blanket and press gently along arms and legs, if they like it.",
        "Do it before the demand, not as a punishment after. Movement is the warm-up, not the consequence."
      ]
    },
    {
      cat: "activity", emoji: "⚡", title: "Movement snacks",
      summary: "Two minutes, several times a day, keeps the wriggles from turning into a crisis.",
      steps: [
        "Ten star jumps, ten wall pushes, or ten squats between lessons — count out loud together.",
        "Animal walks across the room: bear, crab, frog, frog with a jump.",
        "Blow a cotton ball across the table with a straw. Slow, hard breathing is the point.",
        "Dance one song, then stop. A defined end makes starting much easier.",
        "Keep a short list on the fridge so nobody has to invent an idea at the worst moment."
      ]
    },
    {
      cat: "activity", emoji: "⚽", title: "Clubs that survive the first term",
      summary: "The right club is the one the child wants to go back to. That is not always the obvious one.",
      steps: [
        "Ask for a trial session before paying for a block of anything.",
        "Check the practical things: noise, waiting time, changing rooms, one named coach.",
        "Tell the coach what helps — a warning before transitions, a job to do while waiting.",
        "Have an exit plan agreed before the first session: a signal, and no shame in leaving early.",
        "One activity at a time. Three clubs is a schedule, not a childhood."
      ]
    },
    {
      cat: "activity", emoji: "🏠", title: "Rainy day, small room",
      summary: "You do not need a garden or a trampoline. You need a route and a rule.",
      steps: [
        "Cushion obstacle course: over, under, around, then back again. Time it and beat the time.",
        "Balloon volleyball with a line down the middle of the room. Slow, floaty and hard to break.",
        "Freeze dance: when the music stops, the body stops. Great for transitions practice.",
        "Rolled-up socks into a bucket, from further and further back.",
        "Finish with a lie-down and a story. The stop is part of the activity."
      ]
    },
    {
      cat: "activity", emoji: "🚶", title: "The everyday movement nobody counts",
      summary: "The school run, the shop and the stairs do more than a formal exercise plan.",
      steps: [
        "Walk or scoot part of the journey rather than all of it — the last ten minutes counts.",
        "Give a carrying job on every trip. Purpose makes walking possible.",
        "Take the stairs, park further away, and let the child lead the route home.",
        "Use a visual timer for 'outside time' so it has a shape and an end.",
        "Bad weather is not a reason to cancel movement; it is a reason to choose an indoor version."
      ]
    },

    /* ---------------- behaviour & tracking ---------------- */
    {
      cat: "behaviour", emoji: "📝", title: "ABC: the three columns",
      summary: "Antecedent, Behaviour, Consequence. Three columns turn a horrible afternoon into usable information.",
      steps: [
        "Antecedent — what happened just before: hunger, noise, a transition, being told no, a change of plan.",
        "Behaviour — what you actually saw: shouted, hit the door, ran upstairs, went silent. Describe, do not judge.",
        "Consequence — what happened next: adult attention, removal, a snack, the demand dropped, a hug.",
        "Log it the same day, in five minutes, or it will not happen. The Journal's Tricky moments tab does this.",
        "Look for the antecedent that repeats. That is usually the one you can actually change."
      ],
      link: { href: "#/journal", label: "Log a moment" }
    },
    {
      cat: "behaviour", emoji: "✍️", title: "Write facts, not verdicts",
      summary: "A record that says 'defiant' cannot be used. A record that says what happened can.",
      steps: [
        "Replace adjectives with behaviour: not 'aggressive' but 'threw a shoe at the door'.",
        "Write the time, the place, who was there, and how long it lasted.",
        "Note what you tried and what happened next. That is the part professionals ask for.",
        "Keep it factual even when you are furious. You can vent elsewhere; this is evidence.",
        "Do not delete the good days. A record of only crises tells half the story."
      ]
    },
    {
      cat: "behaviour", emoji: "📊", title: "Frequency, duration, intensity",
      summary: "Three numbers turn 'it is getting worse' into something you can check and challenge.",
      steps: [
        "Frequency: how many times this week. A tally on the fridge is enough.",
        "Duration: roughly how long each one lasted. Minutes, not feelings.",
        "Intensity: a simple 1 to 3 — needed a hug, needed a room, needed a professional.",
        "Track for two weeks before drawing a conclusion. One terrible Tuesday is not a pattern.",
        "Bring the numbers to school and GP meetings. They change the conversation immediately."
      ]
    },
    {
      cat: "behaviour", emoji: "🔍", title: "Read the pattern, then change one thing",
      summary: "Most behaviour is communication about a condition, not a character flaw. Find the condition.",
      steps: [
        "Is it always the same time of day? Then look at hunger, tiredness and transitions first.",
        "Is it always the same place or person? Then look at sensory load and demand.",
        "Is it always after screens or after school? Then plan a landing, not a lecture.",
        "Change the antecedent before you change the consequence. It is kinder and it works better.",
        "Change one thing for two weeks. Two changes at once and you will not know which one helped."
      ]
    },
    {
      cat: "behaviour", emoji: "🗂️", title: "Taking your records to school or the GP",
      summary: "Patterns beat anecdotes in every meeting. Bring the pattern.",
      steps: [
        "Print or download the Journal from the Grown-ups tab, or write a one-page summary.",
        "Lead with dates and frequency, then two short examples, then the impact on school and sleep.",
        "Say what you have already tried, so nobody suggests it as though it were new.",
        "Ask for the outcome in writing, and for a review date before you leave the room.",
        "Keep a copy. Schools change staff; your record does not."
      ],
      link: { href: "#/journal", label: "Open the Journal" }
    }
  ]
};
