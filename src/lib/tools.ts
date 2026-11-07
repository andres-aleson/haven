export type CategoryId =
  | "breathing"
  | "music"
  | "journaling"
  | "grounding"
  | "mindset";

export interface Category {
  id: CategoryId;
  label: string;
  accent: string;
}

export const categories: Category[] = [
  { id: "breathing", label: "Breathing", accent: "var(--color-accent-breathing)" },
  { id: "music", label: "Sounds & Music", accent: "var(--color-accent-music)" },
  { id: "journaling", label: "Journaling", accent: "var(--color-accent-journaling)" },
  { id: "grounding", label: "Grounding & Movement", accent: "var(--color-accent-grounding)" },
  { id: "mindset", label: "Clear Your Head", accent: "var(--color-accent-mindset)" },
];

export interface BreathingPhase {
  label: string;
  seconds: number;
  type: "in" | "hold" | "out";
}

export interface BreathingPattern {
  phases: BreathingPhase[];
  cycles: number;
}

export interface CopingTool {
  id: string;
  title: string;
  category: CategoryId;
  icon: string;
  time: string;
  blurb: string;
  steps: string[];
  breathingPattern?: BreathingPattern;
}

export const tools: CopingTool[] = [
  // Breathing
  {
    id: "box-breathing",
    title: "Box Breathing",
    category: "breathing",
    icon: "square",
    time: "80 sec",
    blurb: "A steady 4-4-4-4 pattern for general, all-purpose calm.",
    steps: [
      "Breathe in slowly through your nose for 4 counts.",
      "Hold your breath for 4 counts.",
      "Breathe out slowly through your mouth for 4 counts.",
      "Hold again for 4 counts.",
      "Repeat the cycle 4–6 times, or until you feel a bit calmer.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 4, type: "in" },
        { label: "Hold", seconds: 4, type: "hold" },
        { label: "Breathe Out", seconds: 4, type: "out" },
        { label: "Hold", seconds: 4, type: "hold" },
      ],
      cycles: 5,
    },
  },
  {
    id: "physiological-sigh",
    title: "Physiological Sigh",
    category: "breathing",
    icon: "bolt",
    time: "20 sec",
    blurb: "Two quick inhales, one long exhale — the fastest way to bring down a panic spike.",
    steps: [
      "Take a deep breath in through your nose.",
      "Without breathing out, take a second short, sharp inhale on top of it.",
      "Let out a long, slow exhale through your mouth.",
      "Repeat 1–3 times. Most people feel a shift after just one.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 2, type: "in" },
        { label: "Quick Second Inhale", seconds: 1, type: "in" },
        { label: "Long Exhale", seconds: 6, type: "out" },
      ],
      cycles: 2,
    },
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    category: "breathing",
    icon: "bedtime",
    time: "75 sec",
    blurb: "A slow, exhale-focused pattern that's great for winding down.",
    steps: [
      "Breathe in quietly through your nose for 4 counts.",
      "Hold your breath for 7 counts.",
      "Exhale completely through your mouth for 8 counts, like a soft whoosh.",
      "Repeat for 4 rounds.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 4, type: "in" },
        { label: "Hold", seconds: 7, type: "hold" },
        { label: "Breathe Out", seconds: 8, type: "out" },
      ],
      cycles: 4,
    },
  },
  {
    id: "belly-breathing",
    title: "Belly Breathing",
    category: "breathing",
    icon: "self_improvement",
    time: "80 sec",
    blurb: "Simple, deep breathing from your diaphragm — an easy place to start.",
    steps: [
      "Place one hand on your chest and one on your belly.",
      "Breathe in slowly through your nose, letting your belly rise while your chest stays still.",
      "Breathe out slowly through your mouth, letting your belly fall.",
      "Keep going for about a minute, at whatever pace feels comfortable.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 4, type: "in" },
        { label: "Breathe Out", seconds: 6, type: "out" },
      ],
      cycles: 8,
    },
  },
  {
    id: "breathing-countdown",
    title: "5-4-3-2-1 Breathing Countdown",
    category: "breathing",
    icon: "timer",
    time: "15 sec",
    blurb: "Breath paced to a gentle countdown, part breathing, part grounding.",
    steps: [
      "Breathe in for 5 counts.",
      "Breathe out for 4 counts.",
      "Breathe in for 3 counts.",
      "Breathe out for 2 counts.",
      "Breathe in for 1 count, then let it go.",
      "Notice how your body feels now compared to when you started.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 5, type: "in" },
        { label: "Breathe Out", seconds: 4, type: "out" },
        { label: "Breathe In", seconds: 3, type: "in" },
        { label: "Breathe Out", seconds: 2, type: "out" },
        { label: "Breathe In", seconds: 1, type: "in" },
      ],
      cycles: 1,
    },
  },
  {
    id: "pursed-lip-breathing",
    title: "Pursed-Lip Breathing",
    category: "breathing",
    icon: "air",
    time: "1 min",
    blurb: "Breathe out slowly through your lips to slow a racing heart and ease tight breathing.",
    steps: [
      "Relax your shoulders and unclench your jaw.",
      "Breathe in gently through your nose for 2 counts.",
      "Purse your lips like you're blowing out a candle.",
      "Breathe out slowly through your lips for 4 counts — twice as long as the inhale.",
      "Repeat for about a minute, or until your breathing feels easier.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 2, type: "in" },
        { label: "Breathe Out", seconds: 4, type: "out" },
      ],
      cycles: 10,
    },
  },

  {
    id: "five-finger-breathing",
    title: "Five-Finger Breathing",
    category: "breathing",
    icon: "back_hand",
    time: "40 sec",
    blurb: "Trace your hand as you breathe — calming, and no one around you will even notice.",
    steps: [
      "Hold one hand out with your fingers spread.",
      "With the pointer finger of your other hand, start at the base of your thumb.",
      "Slide up your thumb as you breathe in slowly for 4 counts.",
      "Slide down the other side as you breathe out for 4 counts.",
      "Keep going, finger by finger, until you've traced all five.",
    ],
    breathingPattern: {
      phases: [
        { label: "Breathe In", seconds: 4, type: "in" },
        { label: "Breathe Out", seconds: 4, type: "out" },
      ],
      cycles: 5,
    },
  },

  // Sounds & Music
  {
    id: "lofi-focus-sounds",
    title: "Lofi Focus Sounds",
    category: "music",
    icon: "headphones",
    time: "Any length",
    blurb: "Soft background beats for racing thoughts or restlessness.",
    steps: [
      "Press play below.",
      "Let it run in the background while you do something else — study, rest, or just sit.",
      "Press pause any time you're done.",
    ],
  },
  {
    id: "calming-nature-sounds",
    title: "Calming Nature Sounds",
    category: "music",
    icon: "spa",
    time: "Any length",
    blurb: "Rain, ocean, and forest ambience — good for overwhelm or bedtime.",
    steps: [
      "Press play below.",
      "Close your eyes if that feels okay, or keep them open — whatever's comfortable.",
      "Let it play for as long as you need. Press pause any time.",
    ],
  },

  // Journaling
  {
    id: "whats-on-your-mind",
    title: "What's on Your Mind?",
    category: "journaling",
    icon: "edit_note",
    time: "90 sec",
    blurb: "An open, unstructured space to write out whatever you're feeling.",
    steps: [
      "Find a quiet moment — a minute and a half is plenty.",
      "Start writing whatever comes to mind — no need to explain yourself or make it make sense.",
      "Don't worry about spelling, grammar, or whether it sounds \"good.\" No one else has to read it.",
      "Stop whenever it feels done. There's no length requirement.",
    ],
  },
  {
    id: "gratitude-check-in",
    title: "Gratitude Check-In",
    category: "journaling",
    icon: "wb_sunny",
    time: "1 min",
    blurb: "Jot down three good things — a quick, proven mood lift.",
    steps: [
      "Think of three things, big or small, that felt good today.",
      "Write each one down in a short sentence.",
      "For each one, jot down why it mattered — even just a few words.",
      "That's it. Short and simple works just as well as long and detailed.",
    ],
  },

  // Grounding & Movement
  {
    id: "54321-grounding",
    title: "5-4-3-2-1 Grounding",
    category: "grounding",
    icon: "visibility",
    time: "90 sec",
    blurb: "Notice what you can see, hear, and feel — a classic reset for panic.",
    steps: [
      "Name 5 things you can see around you.",
      "Name 4 things you can touch or feel.",
      "Name 3 things you can hear.",
      "Name 2 things you can smell.",
      "Name 1 thing you can taste.",
      "Go slowly. There's no rush.",
    ],
  },
  {
    id: "body-scan",
    title: "Body Scan",
    category: "grounding",
    icon: "accessibility_new",
    time: "90 sec",
    blurb: "A head-to-toe check-in that releases tension you didn't notice you were holding.",
    steps: [
      "Get comfortable, sitting or lying down.",
      "Start at your feet. Notice any tension there, and let it soften if you can.",
      "Move up quickly — legs, stomach, chest, shoulders, face — a few seconds each.",
      "You don't have to fix anything. Just notice.",
      "That's the whole thing. A quick pass is enough — about a minute and a half.",
    ],
  },
  {
    id: "shake-it-out",
    title: "Shake It Out",
    category: "grounding",
    icon: "directions_run",
    time: "1 min",
    blurb: "A short guided stretch and movement break for restless energy.",
    steps: [
      "Stand up if you can.",
      "Gently shake out your hands, then your arms.",
      "Shake out one leg, then the other.",
      "Roll your shoulders and neck a few times.",
      "Take one deep breath when you're done.",
    ],
  },

  {
    id: "cold-water-reset",
    title: "Cold Water Reset",
    category: "grounding",
    icon: "water_drop",
    time: "1 min",
    blurb: "A quick jolt of cold that pulls your attention out of a spiral and back into your body.",
    steps: [
      "Run cool water over your wrists or hands, or hold something cold, like a drink can.",
      "Focus on exactly how it feels — the temperature, the edges, the weight.",
      "Breathe out slowly and keep holding it for about 30 seconds.",
      "If cold doesn't feel comfortable or safe for you for any reason, skip this one and try another tool.",
    ],
  },
  {
    id: "tense-and-release",
    title: "Tense & Release",
    category: "grounding",
    icon: "fitness_center",
    time: "1 min",
    blurb: "Squeeze, then let go — a quick way to release tension that's built up in your body.",
    steps: [
      "Make tight fists and squeeze for 5 seconds — firmly, but never so hard it hurts.",
      "Let go all at once. Notice how different your hands feel.",
      "Shrug your shoulders up toward your ears for 5 seconds, then drop them.",
      "Scrunch your face tight for 5 seconds, then let it soften.",
      "Take one slow breath out.",
    ],
  },

  // Clear Your Head
  {
    id: "name-it-to-tame-it",
    title: "Name It to Tame It",
    category: "mindset",
    icon: "psychology",
    time: "1 min",
    blurb: "Put a word to what you're feeling — it genuinely takes the edge off.",
    steps: [
      "Pause for a moment.",
      "Ask yourself: what am I actually feeling right now?",
      "Put a name to it — even one word is enough. Anxious, angry, sad, overwhelmed.",
      "Just naming it, silently or out loud, can take some of the intensity out of it.",
    ],
  },
  {
    id: "worry-timer",
    title: "Worry Timer",
    category: "mindset",
    icon: "schedule",
    time: "1 min",
    blurb: "Write the worry down and schedule it for later, instead of spiraling now.",
    steps: [
      "Write down what's worrying you in a sentence or two.",
      "Write down a specific time later today or tomorrow to think about it again.",
      "Set the worry aside until then — it's on paper now, not just in your head.",
      "When that time comes, revisit it, or let it go if it doesn't feel urgent anymore.",
    ],
  },

  {
    id: "self-compassion-break",
    title: "Self-Compassion Break",
    category: "mindset",
    icon: "healing",
    time: "1 min",
    blurb: "Talk to yourself the way you'd talk to a friend who's having a rough time.",
    steps: [
      "Name what's happening: \"This is a hard moment.\"",
      "Remind yourself: \"Lots of people feel this way. I'm not the only one.\"",
      "Put a hand on your chest or arm and notice the warmth.",
      "Say something kind, like: \"It's okay. I'm doing my best.\"",
    ],
  },
  {
    id: "pick-one-thing",
    title: "Pick One Thing",
    category: "mindset",
    icon: "checklist",
    time: "1 min",
    blurb: "When everything feels urgent, shrink it down to one small next step.",
    steps: [
      "Quickly list everything on your plate. Messy is fine.",
      "Cross off anything that doesn't have to happen today.",
      "Circle just one thing — the smallest next step.",
      "Do only that. Everything else can wait.",
    ],
  },
  {
    id: "reach-out",
    title: "Reach Out",
    category: "mindset",
    icon: "chat_bubble",
    time: "1 min",
    blurb: "One low-pressure message to someone safe can make a heavy moment feel lighter.",
    steps: [
      "Think of one person who feels safe — a friend, a cousin, anyone you don't have to perform for.",
      "Send something small: \"thinking of you,\" a funny pic, or \"rough day, can we talk later?\"",
      "You don't have to explain everything or find the perfect words.",
      "No one comes to mind? That's okay — the Talk to someone now button is always here.",
    ],
  },
];

export function getToolById(id: string): CopingTool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: CategoryId): CopingTool[] {
  return tools.filter((tool) => tool.category === category);
}
