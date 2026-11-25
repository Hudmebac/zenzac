/* ZenZac content - plain data + tiny helpers. No network needed. */
window.ZenData = (function () {
  "use strict";

  /* Ordered best first on purpose: a child should meet the happiest face first,
     not the cross one. Values stay the same so saved check-ins still read right. */
  var moods = [
    { v: 5, key: "happy",  label: "Happy",  color: "#5eead4", hint: "Lovely. Let's keep that feeling." },
    { v: 4, key: "calm",   label: "Calm",   color: "#7ee2c4", hint: "Nice and steady. Keep it going." },
    { v: 3, key: "ok",     label: "OK",     color: "#ffd166", hint: "Right in the middle. That's okay." },
    { v: 2, key: "wobbly", label: "Wobbly", color: "#ffb86b", hint: "A bit wobbly. A slow breath might help." },
    { v: 1, key: "cross",  label: "Cross",  color: "#ff8f8a", hint: "Big feelings. Let's let some steam out." }
  ];

  function mood(v) {
    for (var i = 0; i < moods.length; i++) if (moods[i].v === v) return moods[i];
    return moods[2];
  }

  /* Simple, friendly faces drawn inline so they work offline and scale cleanly. */
  function face(v) {
    var m = mood(v), c = m.color, eyes, mouth;

    if (v >= 5) {
      eyes = '<path d="M11.5 16.6c1.6-1.9 4.1-1.9 5.7 0M22.8 16.6c1.6-1.9 4.1-1.9 5.7 0"/>';
      mouth = '<path d="M11.8 23.4c1.9 3.4 4.7 5.1 8.2 5.1s6.3-1.7 8.2-5.1"/>';
    } else if (v === 4) {
      eyes = '<path d="M11.5 16.8c1.6-1.6 4.1-1.6 5.7 0M22.8 16.8c1.6-1.6 4.1-1.6 5.7 0"/>';
      mouth = '<path d="M13.5 24.4c1.6 2.4 3.8 3.6 6.5 3.6s4.9-1.2 6.5-3.6"/>';
    } else if (v === 3) {
      eyes = '<circle cx="14.2" cy="16.4" r="1.5" fill="' + c + '"/><circle cx="25.8" cy="16.4" r="1.5" fill="' + c + '"/>';
      mouth = '<path d="M14.5 25.2h11"/>';
    } else if (v === 2) {
      eyes = '<circle cx="14.2" cy="16.6" r="1.5" fill="' + c + '"/><circle cx="25.8" cy="16.6" r="1.5" fill="' + c + '"/>';
      mouth = '<path d="M13.6 25.6c1.7-1.8 3.4 1.8 5.1 0s3.4 1.8 5.1 0 3.4 1.8 5 0"/>';
    } else {
      eyes = '<path d="M11.8 14.6l5 2.6M28.2 14.6l-5 2.6"/><circle cx="14.4" cy="18.3" r="1.4" fill="' + c + '"/><circle cx="25.6" cy="18.3" r="1.4" fill="' + c + '"/>';
      mouth = '<path d="M14 27c1.7-2.6 3.7-3.8 6-3.8s4.3 1.2 6 3.8"/>';
    }

    return '<svg viewBox="0 0 40 40" role="img" aria-label="' + m.label + ' face">' +
      '<circle cx="20" cy="20" r="17.2" fill="' + c + '" fill-opacity="0.16" stroke="' + c + '" stroke-width="1.7"/>' +
      '<g fill="none" stroke="' + c + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      eyes + mouth + '</g></svg>';
  }

  var routineChips = [
    { name: "Wake up",      emoji: "☀️" },
    { name: "Brush teeth",  emoji: "🦷" },
    { name: "Get dressed",  emoji: "👕" },
    { name: "Breakfast",    emoji: "🥣" },
    { name: "Pack bag",     emoji: "🎒" },
    { name: "School",       emoji: "🏫" },
    { name: "Homework",     emoji: "✏️" },
    { name: "Outside time", emoji: "🌳" },
    { name: "Dinner",       emoji: "🍽️" },
    { name: "Bath",         emoji: "🛁" },
    { name: "Pyjamas",      emoji: "🧦" },
    { name: "Story",        emoji: "📖" },
    { name: "Bed",          emoji: "🌙" },
    { name: "Screen time",  emoji: "📱" },
    { name: "Tidy up",      emoji: "🧸" }
  ];

  var triggers = [
    "Change of plan", "Noise", "Being told no", "Tired", "Hungry",
    "Crowds", "Screen off", "Homework", "Siblings", "Bedtime", "Morning rush", "Transition"
  ];

  var helps = [
    "Space & quiet", "A timer", "Movement", "Snack & drink", "Slow breathing",
    "A cuddle", "Ear defenders", "Fresh air", "Fidget toy", "Talking it out", "Music", "Early night"
  ];

  /* 14 short, silly, child-safe sounds that already live in /Fart */
  var farts = [
    { name: "Small Fart",     file: "Small Fart.mp3",     emoji: "🐭" },
    { name: "Long Fart",      file: "Long Fart.mp3",      emoji: "📏" },
    { name: "Long Fart II",   file: "Long Fart II.mp3",   emoji: "🐘" },
    { name: "Triple Fart",    file: "Triple Fart.mp3",    emoji: "🎳" },
    { name: "Squeeze",        file: "Squeeze.mp3",        emoji: "🤏" },
    { name: "Wet",            file: "Wet.mp3",            emoji: "💦" },
    { name: "Trumpet",        file: "Trumpet.mp3",        emoji: "🎺" },
    { name: "Stinky",         file: "Stinky.mp3",         emoji: "🧦" },
    { name: "Chilli",         file: "Chilli.mp3",         emoji: "🌶️" },
    { name: "Real Deal",      file: "Real Deal.mp3",      emoji: "🎯" },
    { name: "Cloud",          file: "Cloud.mp3",          emoji: "☁️" },
    { name: "Funny",          file: "Funny.mp3",          emoji: "😂" },
    { name: "Proud",          file: "Proud.mp3",          emoji: "🦚" },
    { name: "Happy Birthday", file: "Happy Birthday.mp3", emoji: "🎂" }
  ];

  var ambience = [
    { id: "waves",     name: "Ocean waves",    file: "waves.mp3",         emoji: "🌊", vol: 0.55 },
    { id: "rain",      name: "Rain on glass",  file: "",                  emoji: "🌧️", vol: 0.4, synth: "rain" },
    { id: "white",     name: "White noise",    file: "white_noise.mp3",   emoji: "☁️", vol: 0.35 },
    { id: "breath",    name: "Slow breathing", file: "slow-breathing.mp3", emoji: "🫧", vol: 0.5 },
    { id: "tranquil",  name: "Tranquil music", file: "tranquil.mp3",      emoji: "🎵", vol: 0.35 },
    { id: "wind",      name: "Soft wind",      file: "wind_sounds.mp3",   emoji: "🍃", vol: 0.35 },
    { id: "whale",     name: "Whale song",     file: "whale_sounds.mp3",  emoji: "🐋", vol: 0.3 }
  ];

  var jokes = [
    { setup: "Lettuce",   punchline: "Lettuce in, it's freezing out here!" },
    { setup: "Cow says",  punchline: "Cow says who? No silly, cow says mooo!" },
    { setup: "Atch",      punchline: "Bless you!" },
    { setup: "Tank",      punchline: "You're welcome!" },
    { setup: "Olive",     punchline: "Olive you and I miss you!" },
    { setup: "Boo",       punchline: "Boo who? Don't cry, it's just a joke!" },
    { setup: "Dishes",    punchline: "Dishes the police! Open up!" },
    { setup: "Harry",     punchline: "Harry up and answer the door!" },
    { setup: "Nobel",     punchline: "No bell, that's why I knocked!" },
    { setup: "Orange",    punchline: "Orange you glad I didn't say banana?" },
    { setup: "Annie",     punchline: "Annie thing you can do, I can do better!" },
    { setup: "Alpaca",    punchline: "Alpaca the suitcase, you load up the car!" },
    { setup: "Cereal",    punchline: "Cereal-ously, who is it?" },
    { setup: "Ice cream", punchline: "Ice cream every time I see a scary movie!" },
    { setup: "Wendy",     punchline: "Wendy, you want to go outside?" },
    { setup: "Butter",    punchline: "Butter let me in or I'll freeze!" },
    { setup: "Ketchup",   punchline: "Ketchup with me and I'll tell you!" },
    { setup: "Honeydew",  punchline: "Honeydew you know how much I miss you?" },
    { setup: "Dwayne",    punchline: "Dwayne the bathtub, I'm drowning!" },
    { setup: "Luke",      punchline: "Luke through the peephole and find out!" },
    { setup: "Turnip",    punchline: "Turnip the volume, I can't hear you!" },
    { setup: "Tooth",     punchline: "Tooth be told, I miss you!" },
    { setup: "Gorilla",   punchline: "Gorilla me a burger, I'm starving!" },
    { setup: "Wood",      punchline: "Wood you be my friend?" },
    { setup: "Donut",     punchline: "Donut ask me, I forgot!" },
    { setup: "Mustache",  punchline: "Mustache you a question, but I'll shave it for later." },
    { setup: "Kenya",     punchline: "Kenya believe it's me?" },
    { setup: "Cargo",     punchline: "Cargo beep beep!" },
    { setup: "Igloo",     punchline: "Igloo my fingers to the doorbell." },
    { setup: "Kanga",     punchline: "Kanga who? Actually, it's kangaroo!" },
    { setup: "Ivy",       punchline: "Ivy got a question for you!" },
    { setup: "Bean",      punchline: "Bean waiting to see you!" },
    { setup: "Marsha",    punchline: "Marsha marshmallow before it burns!" },
    { setup: "Sunny",     punchline: "Sunny you going to let me in?" },
    { setup: "Tuba",      punchline: "Tuba toothpaste, please!" },
    { setup: "Claire",    punchline: "Claire the way, I'm coming through!" },
    { setup: "Feline",    punchline: "Feline okay? You look a bit poorly!" },
    { setup: "Amos",      punchline: "Amos the only one out here!" },
    { setup: "Needle",    punchline: "Needle little help with this door!" },
    { setup: "Owl",       punchline: "Owl be waiting right here!" },
    { setup: "Waddle",    punchline: "Waddle you do if I don't open up?" },
    { setup: "Smore",     punchline: "Smore please, I'm hungry!" },
    { setup: "Fig",       punchline: "Fig-ure it out, I'm freezing out here!" },
    { setup: "Yule",      punchline: "Yule be sorry if you don't let me in!" },
    { setup: "Cassette",  punchline: "Cassette me free, I'm stuck in here!" }
  ];

  var guides = [
    {
      emoji: "🫧", tag: "Wellbeing", title: "Breathing that actually helps",
      summary: "Long, slow breaths out tell the body it is safe. That is the whole trick.",
      points: [
        "Breathe in through the nose for about 4 seconds.",
        "Out through the mouth for 6 - longer out than in is what calms the nervous system.",
        "Two minutes is plenty. Little and often beats one big session.",
        "Count on your fingers, or trace up and down each finger, if counting in your head is hard.",
        "If breathing games make your child dizzy or anxious, stop and try cold hands, a stretch or a walk instead."
      ]
    },
    {
      emoji: "🌊", tag: "Wellbeing", title: "Sensory overload: early signs",
      summary: "Meltdowns usually have a build-up. Catching it early makes it much shorter.",
      points: [
        "Watch for hands over ears, squinting, rocking, going very quiet or very wriggly.",
        "Reduce input first: dim lights, turn off background noise, move to a smaller space.",
        "Use fewer words. Short sentences, one instruction at a time.",
        "Offer a choice of two things - choice returns a sense of control.",
        "Keep a calm corner with a cushion, ear defenders and one familiar toy."
      ]
    },
    {
      emoji: "🌙", tag: "Health", title: "A wind-down that works",
      summary: "Same order, same time, dim lights. Predictability does more than any gadget.",
      points: [
        "Start 45 minutes before bed, and keep the last 20 minutes screen-free.",
        "Do the same three steps every night - bath, pyjamas, story.",
        "Use a visual now-and-next strip so bedtime is not a surprise.",
        "No screens in the bedroom; a dim lamp is better than a bright ceiling light.",
        "If sleep is a persistent problem, talk to your GP or health visitor - it is a common ADHD and autism issue and there is help."
      ]
    },
    {
      emoji: "🍎", tag: "Food", title: "Food and mood",
      summary: "Steady fuel steadies behaviour. Blood sugar dips look a lot like 'bad behaviour'.",
      points: [
        "Try to include protein at breakfast - eggs, yoghurt, beans, nut butter.",
        "Regular snacks beat one big meal for most children, especially after school.",
        "Keep water visible and refilled; thirst masquerades as grumpiness.",
        "New foods are easier alongside a safe food, without pressure to eat.",
        "Never use pudding as a reward for eating vegetables - it teaches that the veg is the punishment."
      ]
    },
    {
      emoji: "🥣", tag: "Food", title: "Packing a lunch they will actually eat",
      summary: "Predictable, easy to open, and not too much. A tired child will not negotiate at school.",
      points: [
        "One safe favourite, one protein, one fruit, one crunchy thing.",
        "Practise opening the box and the packets at home before term starts.",
        "Cut sandwiches small if the child finds big bites overwhelming.",
        "A frozen water bottle keeps the box cool and gives cold water later.",
        "Ask the school about a quiet place to eat if the dining hall is too loud."
      ]
    },
    {
      emoji: "🏃", tag: "Activities", title: "Five minutes to reset",
      summary: "Movement changes how a body feels faster than talking does.",
      points: [
        "Wall pushes: hands on the wall, push for ten slow counts.",
        "Animal walks across the room - bear, crab, frog.",
        "Carry something heavy and safe from one room to another.",
        "Blow a cotton ball across the table with a straw.",
        "Star jumps, then shake out arms and legs like wet noodles."
      ]
    },
    {
      emoji: "🧠", tag: "Grown-ups", title: "Instructions that land",
      summary: "Working memory and processing speed vary hugely day to day. Make the ask smaller.",
      points: [
        "Say the child's name, wait for eye contact, then give one instruction.",
        "Ask them to repeat it back - 'what's the plan?'",
        "Use 'first… then…' instead of 'if you don't…'.",
        "Put the instruction somewhere visible: a whiteboard, a sticky note, a picture.",
        "Praise the effort you can see, not just the result."
      ]
    },
    {
      emoji: "💬", tag: "Grown-ups", title: "When you are the one losing it",
      summary: "You cannot co-regulate if you are already flooded. Pause first, parent second.",
      points: [
        "Lower your voice rather than raising it; it is contagious in both directions.",
        "Say the true thing out loud: 'I need a minute, I'm getting cross.'",
        "Step out of the room if it is safe, and breathe where you cannot see the trigger.",
        "Drop the lesson for now. Repair later, when you are both calm.",
        "Log what happened afterwards in the Journal - patterns are easier to spot than single incidents."
      ]
    },
    {
      emoji: "🧸", tag: "Activities", title: "A calm corner that gets used",
      summary: "It has to be somewhere they choose to go, not somewhere they are sent.",
      points: [
        "Put it somewhere with low foot traffic and no screens.",
        "Add a cushion, a blanket, ear defenders, a fidget and one book.",
        "Practise using it when calm, so it is familiar before it is needed.",
        "Never use it as a punishment, or it stops being safe.",
        "Let them leave when they are ready - that is the point."
      ]
    },
    {
      emoji: "📋", tag: "Grown-ups", title: "Rewards that do not backfire",
      summary: "Reward the behaviour you want repeated, immediately and specifically.",
      points: [
        "Describe what you saw: 'you put your shoes on when I asked'.",
        "Small and often beats big and rare - a sticker now, not a trip next month.",
        "Reward starting, not just finishing, if starting is the hard part.",
        "Never remove a reward already earned; that teaches the system is unfair.",
        "Keep the reward close to the behaviour - same day, ideally within minutes."
      ]
    },
    {
      emoji: "🍽️", tag: "Food", title: "The plate that actually gets eaten",
      summary: "Nutrition advice fails when it assumes a calm, hungry child at a table. Start from what they will eat.",
      points: [
        "Aim for a protein, a carbohydrate and a fruit or vegetable across the day - not on every plate.",
        "Keep one safe food on the plate every time. New food sits beside it, never instead of it.",
        "Water on the table before anything else. A thirsty child reads as a grumpy one.",
        "Regular times matter as much as contents: blood sugar dips look exactly like bad behaviour.",
        "If the range of foods is shrinking rather than growing, ask the GP about a dietitian referral. Do not wait for a crisis."
      ]
    },
    {
      emoji: "🤸", tag: "Activities", title: "Movement snacks, not exercise",
      summary: "Two minutes of movement, several times a day, beats one big workout nobody agrees to.",
      points: [
        "Put movement before the demand, not after: ten star jumps, then homework.",
        "Heavy work calms faster than running - pushing, carrying, pulling, wall presses.",
        "Keep a short list on the fridge: five things that take under two minutes.",
        "Join in for the first minute. A child is far more likely to move if you are moving too.",
        "Finish with something slow - a stretch, a drink, a lie-down - so the body knows it is over."
      ]
    },
    {
      emoji: "🌡️", tag: "Grown-ups", title: "What to say to the GP",
      summary: "Ten minutes goes further with dates, examples and one clear ask written down first.",
      points: [
        "Take three examples with dates: what happened, how long it lasted, what you tried.",
        "Say the impact, not just the symptom: 'he has not slept before 11pm for six weeks and cannot get to school.'",
        "Ask one clear question: 'Can we be referred, and what happens next?'",
        "Ask for the outcome in writing, and for the name of who decides next.",
        "You can ask for a second opinion, and you can take someone with you. Both are allowed."
      ]
    }
  ];

  /* Spinner choices. Eight at a time, big enough to read across a room. */
  var spinTopics = [
    { id: "mix", name: "Surprise", emoji: "🎲", note: "A bit of everything.", items: [] },
    { id: "foods", name: "Foods", emoji: "🍕", note: "What shall we eat?", items: [
      { e: "🍕", n: "Pizza" }, { e: "🍝", n: "Pasta" }, { e: "🍟", n: "Chips" },
      { e: "🍛", n: "Curry" }, { e: "🍣", n: "Sushi" }, { e: "🥞", n: "Pancakes" },
      { e: "🍎", n: "Apples" }, { e: "🍿", n: "Popcorn" }, { e: "🧀", n: "Cheese" },
      { e: "🍦", n: "Ice cream" }, { e: "🥪", n: "Sandwich" }, { e: "🍌", n: "Banana" }
    ] },
    { id: "sports", name: "Sports", emoji: "⚽", note: "Something to burn it off.", items: [
      { e: "⚽", n: "Football" }, { e: "🏊", n: "Swimming" }, { e: "🚲", n: "Cycling" },
      { e: "🏀", n: "Basketball" }, { e: "🏃", n: "Running" }, { e: "🛹", n: "Skating" },
      { e: "🤸", n: "Trampoline" }, { e: "💃", n: "Dancing" }, { e: "🎾", n: "Tennis" },
      { e: "🧗", n: "Climbing" }, { e: "🏓", n: "Table tennis" }, { e: "🥋", n: "Martial arts" }
    ] },
    { id: "colours", name: "Colours", emoji: "🎨", note: "Pick a colour for the day.", items: [
      { e: "🔴", n: "Red" }, { e: "🟠", n: "Orange" }, { e: "🟡", n: "Yellow" },
      { e: "🟢", n: "Green" }, { e: "🔵", n: "Blue" }, { e: "🟣", n: "Purple" },
      { e: "🟤", n: "Brown" }, { e: "⚫", n: "Black" }, { e: "⚪", n: "White" },
      { e: "💗", n: "Pink" }, { e: "🟦", n: "Aqua" }, { e: "🟥", n: "Scarlet" }
    ] },
    { id: "animals", name: "Animals", emoji: "🦊", note: "Eight animals, one winner.", items: [
      { e: "🐶", n: "Dog" }, { e: "🐱", n: "Cat" }, { e: "🦊", n: "Fox" },
      { e: "🐼", n: "Panda" }, { e: "🐧", n: "Penguin" }, { e: "🐬", n: "Dolphin" },
      { e: "🦁", n: "Lion" }, { e: "🐸", n: "Frog" }, { e: "🦉", n: "Owl" },
      { e: "🐢", n: "Turtle" }, { e: "🐝", n: "Bee" }, { e: "🦈", n: "Shark" }
    ] },
    { id: "computer", name: "Computer", emoji: "💻", note: "Gadgets and games.", items: [
      { e: "💻", n: "Laptop" }, { e: "⌨️", n: "Keyboard" }, { e: "🤖", n: "Robot" },
      { e: "🎮", n: "Game" }, { e: "🧑‍💻", n: "Code" }, { e: "🎧", n: "Headphones" },
      { e: "🚀", n: "Rocket" }, { e: "🔋", n: "Battery" }, { e: "📶", n: "Wifi" },
      { e: "🐛", n: "Bug" }, { e: "🖨️", n: "Printer" }, { e: "🕹️", n: "Joystick" }
    ] },
    { id: "silly", name: "Silly", emoji: "🤪", note: "Nonsense, on purpose.", items: [
      { e: "🧦", n: "Sock" }, { e: "🍌", n: "Banana" }, { e: "🫧", n: "Bubbles" },
      { e: "🟩", n: "Slime" }, { e: "🥔", n: "Potato" }, { e: "🦄", n: "Unicorn" },
      { e: "🎈", n: "Balloon" }, { e: "🥒", n: "Pickle" }, { e: "🪁", n: "Yo-yo" },
      { e: "🐙", n: "Octopus" }, { e: "🦶", n: "Stinky foot" }, { e: "🌈", n: "Rainbow" }
    ] }
  ];

  /* Official and charity sources. The app quotes none of them word for word;
     these are the doors to the people who actually set the guidance. */
  var sources = [
    {
      group: "Health & diagnosis",
      items: [
        { name: "NHS - ADHD", url: "https://www.nhs.uk/conditions/attention-deficit-hyperactivity-disorder-adhd/", note: "Symptoms, assessment and treatment, in plain English." },
        { name: "NHS - Autism", url: "https://www.nhs.uk/conditions/autism/", note: "What autism is, signs, and how to ask for an assessment." },
        { name: "NICE NG87 - ADHD", url: "https://www.nice.org.uk/guidance/ng87", note: "The clinical guidance NHS teams and schools work from." },
        { name: "NICE CG170 - Autism", url: "https://www.nice.org.uk/guidance/cg170", note: "Support and management for autistic children and young people." }
      ]
    },
    {
      group: "Charities that answer the phone",
      items: [
        { name: "National Autistic Society", url: "https://www.autism.org.uk/", note: "Autism information, helplines and parent-to-parent support." },
        { name: "ADHD Foundation", url: "https://www.adhdfoundation.org.uk/", note: "Neurodiversity training, support and family resources." },
        { name: "ADHD UK", url: "https://adhduk.co.uk/", note: "Practical help, webinars and a parent community." },
        { name: "YoungMinds", url: "https://www.youngminds.org.uk/", note: "Mental health support for children, young people and parents." },
        { name: "Mind", url: "https://www.mind.org.uk/", note: "For your own mental health, not just your child's." }
      ]
    },
    {
      group: "School, money & your rights (UK)",
      items: [
        { name: "IPSEA", url: "https://www.ipsea.org.uk/", note: "Free, legally based advice on SEN and EHCPs." },
        { name: "Contact", url: "https://contact.org.uk/", note: "Benefits, grants and support for families with additional needs." },
        { name: "Autism Education Trust", url: "https://www.autismeducationtrust.org.uk/", note: "What good school support for autistic pupils looks like." },
        { name: "Cerebra", url: "https://cerebra.org.uk/", note: "Legal advice, grants and sleep support for families." }
      ]
    },
    {
      group: "Everyday health",
      items: [
        { name: "NHS - The Eatwell Guide", url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/", note: "What a balanced day of food looks like." },
        { name: "NHS - Sleep and tiredness", url: "https://www.nhs.uk/live-well/sleep-and-tiredness/", note: "How much sleep children need, and what helps." },
        { name: "NHS - Vitamins for children", url: "https://www.nhs.uk/live-well/vitamin-supplements/vitamins-for-children/", note: "Which vitamins, who needs them, and how much." },
        { name: "NHS - Physical activity guidelines", url: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/physical-activity-guidelines-children-and-young-people/", note: "How much movement children need at each age." }
      ]
    },
  ];

  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* ------------------------- profiles & themes ------------------------- */

  var themes = [
    { id: "dusk",     name: "Dusk",      note: "Deep blue with mint. Low glare for evenings.",  sw: ["#0b1422", "#4fe3c1", "#8fb4ff", "#f2f7fb", "#a4b6cc"], ink: "#f2f7fb", mute: "#a4b6cc", accentInk: "#062421", panel: "#142235" },
    { id: "meadow",   name: "Meadow",    note: "Soft daylight, sage and cream. The gentlest light.", sw: ["#f7f2e8", "#2f8f78", "#a9c7a0", "#28322c", "#55625a"], ink: "#28322c", mute: "#55625a", accentInk: "#0e2a23", panel: "#fffdf7" },
    { id: "blossom",  name: "Blossom",   note: "Warm blush and lilac. Quiet, not babyish.", sw: ["#fbf1f2", "#a4597a", "#b79ad6", "#3a2c33", "#665059"], ink: "#3a2c33", mute: "#665059", accentInk: "#2c1420", panel: "#fffafa" },
    { id: "seaglass", name: "Sea glass", note: "Cool aqua and pale sand. Easy on bright days.", sw: ["#edf5f4", "#2b7f8c", "#8fbccb", "#233437", "#51686d"], ink: "#233437", mute: "#51686d", accentInk: "#06272b", panel: "#fcfefe" },
    { id: "twilight", name: "Twilight",  note: "Plum and lavender. Dim, soft and low-contrast.", sw: ["#15111f", "#c9b6ff", "#ffb3c7", "#f4efff", "#b5a8cb"], ink: "#f4efff", mute: "#b5a8cb", accentInk: "#211636", panel: "#241e33" },
    { id: "forest",   name: "Forest",    note: "Deep green with moss and amber. Very low glare.", sw: ["#0d1712", "#9adcb0", "#e6c07a", "#eef7ef", "#adc0b1"], ink: "#eef7ef", mute: "#adc0b1", accentInk: "#0c2318", panel: "#16241c" }
  ];

  var modes = [
    { id: "adhd",   name: "ADHD",          emoji: "⚡", note: "Big energy, wandering attention. Needs movement, short chunks, visible time and quick praise." },
    { id: "autism", name: "Autism",        emoji: "🧩", note: "Needs predictability, clear language, sensory care and warning before anything changes." },
    { id: "both",   name: "ADHD + autism", emoji: "🌗", note: "Both sets of needs, often pulling opposite ways. Routine as the frame, movement inside it." },
    { id: "unsure", name: "Not sure yet",   emoji: "🌱", note: "Start with calm, structure and observation. Change it as you learn what helps." }
  ];

  function mode(id) {
    for (var i = 0; i < modes.length; i++) if (modes[i].id === id) return modes[i];
    return null;
  }

  var ageBands = ["4-6", "7-9", "10-12", "13-15", "16+", "For me (adult)"];

  var hardBits = [
    { id: "morning",  label: "Mornings",       emoji: "🌅" },
    { id: "change",   label: "Changes of plan", emoji: "🔀" },
    { id: "homework", label: "Homework",       emoji: "✏️" },
    { id: "bedtime",  label: "Bedtime",        emoji: "🌙" },
    { id: "waiting",  label: "Waiting",        emoji: "⏳" },
    { id: "noise",    label: "Loud places",    emoji: "🔊" },
    { id: "screens",  label: "Screens off",    emoji: "📱" },
    { id: "feelings", label: "Big feelings",   emoji: "🌊" },
    { id: "school",   label: "School",         emoji: "🏫" },
    { id: "food",     label: "Food",           emoji: "🍽️" },
    { id: "sleep",    label: "Sleep",          emoji: "😴" },
    { id: "friends",  label: "Friends",        emoji: "👋" }
  ];

  var helpChips = [
    { id: "timer",    label: "Timers",          emoji: "⏱️" },
    { id: "visual",   label: "Visual lists",    emoji: "🖼️" },
    { id: "movement", label: "Movement",        emoji: "🤸" },
    { id: "quiet",    label: "A quiet space",   emoji: "🛋️" },
    { id: "ears",     label: "Ear defenders",   emoji: "🎧" },
    { id: "fidget",   label: "Fidgets",         emoji: "🌀" },
    { id: "warning",  label: "Warnings",        emoji: "🕔" },
    { id: "routine",  label: "Routine",         emoji: "📋" },
    { id: "reward",   label: "Rewards",         emoji: "⭐" },
    { id: "music",    label: "Music",           emoji: "🎵" },
    { id: "pressure", label: "Deep pressure",   emoji: "🤗" },
    { id: "drawing",  label: "Drawing",         emoji: "✏️" }
  ];

  var sensoryChips = [
    { id: "noise",       label: "Noise",            emoji: "🔊" },
    { id: "light",       label: "Bright light",     emoji: "💡" },
    { id: "touch",       label: "Touch & clothing",  emoji: "🧦" },
    { id: "smell",       label: "Smells",           emoji: "👃" },
    { id: "crowds",      label: "Crowds",           emoji: "👥" },
    { id: "foodtexture", label: "Food textures",    emoji: "🥣" },
    { id: "heat",        label: "Heat",             emoji: "🌡️" },
    { id: "none",        label: "Nothing obvious",   emoji: "✅" }
  ];

  var hardTools = {
    morning:  { href: "#/routine",    emoji: "🌅", title: "Morning strip",   note: "Three steps, same order." },
    change:   { href: "#/routine",    emoji: "🔀", title: "Warning routine", note: "Show what stays the same." },
    homework: { href: "#/focus",      emoji: "⏳", title: "Ten-minute start", note: "Small chunk, visible timer." },
    bedtime:  { href: "#/calm",       emoji: "🌙", title: "Wind-down",       note: "Breathe, dim, same order." },
    waiting:  { href: "#/focus",      emoji: "🎯", title: "Waiting practice", note: "Seconds first, not minutes." },
    noise:    { href: "#/calm",       emoji: "🎧", title: "Quiet input",      note: "Soft sound and low light." },
    screens:  { href: "#/routine",    emoji: "📱", title: "Screen handover",  note: "Warn, then show what's next." },
    feelings: { href: "#/calm",       emoji: "🌊", title: "Calm first",       note: "Body before words." },
    school:   { href: "#/compendium", emoji: "🏫", title: "School toolkit",   note: "Profiles, soft starts, break." },
    food:     { href: "#/compendium", emoji: "🍎", title: "Food without fights", note: "Safe foods and steady fuel." },
    sleep:    { href: "#/compendium", emoji: "😴", title: "Sleep help",       note: "Same order, boring room." },
    friends:  { href: "#/play",       emoji: "🤝", title: "Connection first", note: "Ten minutes, child-led." }
  };

  /* House rules offered in setup. `on` is the default for that profile. */
  var ruleDefaults = [
    { id: "one-thing",       text: "One instruction at a time.", why: "Working memory is smaller when a child is already trying hard.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "warning",         text: "A 10-minute warning before anything changes.", why: "Change is much easier when it is not a surprise.", modes: ["autism", "both"], on: true },
    { id: "choices",         text: "Two choices, not an open question.", why: "Choice gives control without removing the boundary.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "move",            text: "Movement before sitting still.", why: "A body that has moved can concentrate for longer.", modes: ["adhd", "both"], on: true },
    { id: "praise-start",    text: "We praise starting, not just finishing.", why: "Starting is usually the hardest part of the task.", modes: ["adhd", "both"], on: true },
    { id: "repair",          text: "We repair after a hard moment. No shame.", why: "The relationship comes before the lesson.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "calm-corner",     text: "The calm corner is never a punishment.", why: "It has to stay somewhere the child chooses to go.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "ask-first",       text: "Ask before hugging or tickling.", why: "Touch can be overwhelming, even from people we love.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "say-what-you-mean", text: "Say what you mean. No sarcasm when things are hard.", why: "Literal language is kinder for everyone under stress.", modes: ["autism", "both", "unsure"], on: true },
    { id: "screen-warning",  text: "Screens go off with a warning, never a surprise.", why: "Stopping is a transition too.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "same-order",      text: "Same order for the boring bits: shoes, bag, coat.", why: "Predictable sequences use less thinking.", modes: ["autism", "both"], on: true },
    { id: "time-visible",    text: "Show how long a task is, not just what it is.", why: "Time is invisible until you make it visible.", modes: ["adhd", "both"], on: true },
    { id: "quiet-voice",     text: "Lower the voice instead of raising it.", why: "Calm is contagious in both directions.", modes: ["adhd", "autism", "both", "unsure"], on: true },
    { id: "break-free",      text: "A break does not have to be earned.", why: "Rest is a need, not a reward.", modes: ["autism", "both"], on: true }
  ];

  return {
    moods: moods, mood: mood, face: face,
    routineChips: routineChips, triggers: triggers, helps: helps,
    farts: farts, ambience: ambience, jokes: jokes,
    guides: guides, dayNames: dayNames,
    themes: themes, modes: modes, mode: mode, ageBands: ageBands,
    hardBits: hardBits, helpChips: helpChips, sensoryChips: sensoryChips,
    hardTools: hardTools, ruleDefaults: ruleDefaults,
    spinTopics: spinTopics, sources: sources
  };
})();
