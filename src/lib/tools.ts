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

export interface CopingTool {
  id: string;
  title: string;
  category: CategoryId;
  icon: string;
  time: string;
  blurb: string;
  steps: string[];
}

export const tools: CopingTool[] = [
  // Breathing
  {
    id: "box-breathing",
    title: "Box Breathing",
    category: "breathing",
    icon: "square",
    time: "3 min",
    blurb: "A steady 4-4-4-4 pattern for general, all-purpose calm.",
    steps: [
      "Breathe in slowly through your nose for 4 counts.",
      "Hold your breath for 4 counts.",
      "Breathe out slowly through your mouth for 4 counts.",
      "Hold again for 4 counts.",
      "Repeat the cycle 4–6 times, or until you feel a bit calmer.",
    ],
  },
  {
    id: "physiological-sigh",
    title: "Physiological Sigh",
    category: "breathing",
    icon: "bolt",
    time: "1 min",
    blurb: "Two quick inhales, one long exhale — the fastest way to bring down a panic spike.",
    steps: [
      "Take a deep breath in through your nose.",
      "Without breathing out, take a second short, sharp inhale on top of it.",
      "Let out a long, slow exhale through your mouth.",
      "Repeat 1–3 times. Most people feel a shift after just one.",
    ],
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    category: "breathing",
    icon: "bedtime",
    time: "3 min",
    blurb: "A slow, exhale-focused pattern that's great for winding down.",
    steps: [
      "Breathe in quietly through your nose for 4 counts.",
      "Hold your breath for 7 counts.",
      "Exhale completely through your mouth for 8 counts, like a soft whoosh.",
      "Repeat for 4 rounds.",
    ],
  },
  {
    id: "belly-breathing",
    title: "Belly Breathing",
    category: "breathing",
    icon: "self_improvement",
    time: "2 min",
    blurb: "Simple, deep breathing from your diaphragm — an easy place to start.",
    steps: [
      "Place one hand on your chest and one on your belly.",
      "Breathe in slowly through your nose, letting your belly rise while your chest stays still.",
      "Breathe out slowly through your mouth, letting your belly fall.",
      "Keep going for 1–2 minutes, at whatever pace feels comfortable.",
    ],
  },
  {
    id: "breathing-countdown",
    title: "5-4-3-2-1 Breathing Countdown",
    category: "breathing",
    icon: "timer",
    time: "3 min",
    blurb: "Breath paced to a gentle countdown, part breathing, part grounding.",
    steps: [
      "Breathe in for 5 counts.",
      "Breathe out for 4 counts.",
      "Breathe in for 3 counts.",
      "Breathe out for 2 counts.",
      "Breathe in for 1 count, then let it go.",
      "Notice how your body feels now compared to when you started.",
    ],
  },
  {
    id: "pursed-lip-breathing",
    title: "Pursed-Lip Breathing",
    category: "breathing",
    icon: "air",
    time: "2 min",
    blurb: "Breathe out slowly through your lips to slow a racing heart and ease tight breathing.",
    steps: [
      "Relax your shoulders and unclench your jaw.",
      "Breathe in gently through your nose for 2 counts.",
      "Purse your lips like you're blowing out a candle.",
      "Breathe out slowly through your lips for 4 counts — twice as long as the inhale.",
      "Repeat for 1–2 minutes, or until your breathing feels easier.",
    ],
  },

  // Sounds & Music
  {
    id: "lofi-focus-sounds",
    title: "Lofi Focus Sounds",
    category: "music",
    icon: "headphones",
    time: "10 min",
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
    time: "10 min",
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
    time: "5 min",
    blurb: "An open, unstructured space to write out whatever you're feeling.",
    steps: [
      "Find a quiet moment, even just a minute or two.",
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
    time: "3 min",
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
    time: "3 min",
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
    time: "5 min",
    blurb: "A head-to-toe check-in that releases tension you didn't notice you were holding.",
    steps: [
      "Get comfortable, sitting or lying down.",
      "Start at your feet. Notice any tension there, and let it soften if you can.",
      "Slowly move your attention up — legs, stomach, chest, arms, shoulders, neck, face.",
      "You don't have to fix anything. Just notice.",
      "Take your time. The whole scan can take a few minutes.",
    ],
  },
  {
    id: "shake-it-out",
    title: "Shake It Out",
    category: "grounding",
    icon: "directions_run",
    time: "2 min",
    blurb: "A short guided stretch and movement break for restless energy.",
    steps: [
      "Stand up if you can.",
      "Gently shake out your hands, then your arms.",
      "Shake out one leg, then the other.",
      "Roll your shoulders and neck a few times.",
      "Take one deep breath when you're done.",
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
    time: "2 min",
    blurb: "Write the worry down and schedule it for later, instead of spiraling now.",
    steps: [
      "Write down what's worrying you in a sentence or two.",
      "Write down a specific time later today or tomorrow to think about it again.",
      "Set the worry aside until then — it's on paper now, not just in your head.",
      "When that time comes, revisit it, or let it go if it doesn't feel urgent anymore.",
    ],
  },
];

export function getToolById(id: string): CopingTool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: CategoryId): CopingTool[] {
  return tools.filter((tool) => tool.category === category);
}
