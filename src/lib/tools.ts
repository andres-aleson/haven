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
  },
  {
    id: "physiological-sigh",
    title: "Physiological Sigh",
    category: "breathing",
    icon: "bolt",
    time: "1 min",
    blurb: "Two quick inhales, one long exhale — the fastest way to bring down a panic spike.",
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    category: "breathing",
    icon: "bedtime",
    time: "3 min",
    blurb: "A slow, exhale-focused pattern that's great for winding down.",
  },
  {
    id: "belly-breathing",
    title: "Belly Breathing",
    category: "breathing",
    icon: "self_improvement",
    time: "2 min",
    blurb: "Simple, deep breathing from your diaphragm — an easy place to start.",
  },
  {
    id: "breathing-countdown",
    title: "5-4-3-2-1 Breathing Countdown",
    category: "breathing",
    icon: "timer",
    time: "3 min",
    blurb: "Breath paced to a gentle countdown, part breathing, part grounding.",
  },

  // Sounds & Music
  {
    id: "lofi-focus-sounds",
    title: "Lofi Focus Sounds",
    category: "music",
    icon: "headphones",
    time: "10 min",
    blurb: "Soft background beats for racing thoughts or restlessness.",
  },
  {
    id: "calming-nature-sounds",
    title: "Calming Nature Sounds",
    category: "music",
    icon: "spa",
    time: "10 min",
    blurb: "Rain, ocean, and forest ambience — good for overwhelm or bedtime.",
  },

  // Journaling
  {
    id: "whats-on-your-mind",
    title: "What's on Your Mind?",
    category: "journaling",
    icon: "edit_note",
    time: "5 min",
    blurb: "An open, unstructured space to write out whatever you're feeling.",
  },
  {
    id: "gratitude-check-in",
    title: "Gratitude Check-In",
    category: "journaling",
    icon: "wb_sunny",
    time: "3 min",
    blurb: "Jot down three good things — a quick, proven mood lift.",
  },

  // Grounding & Movement
  {
    id: "54321-grounding",
    title: "5-4-3-2-1 Grounding",
    category: "grounding",
    icon: "visibility",
    time: "3 min",
    blurb: "Notice what you can see, hear, and feel — a classic reset for panic.",
  },
  {
    id: "body-scan",
    title: "Body Scan",
    category: "grounding",
    icon: "accessibility_new",
    time: "5 min",
    blurb: "A head-to-toe check-in that releases tension you didn't notice you were holding.",
  },
  {
    id: "shake-it-out",
    title: "Shake It Out",
    category: "grounding",
    icon: "directions_run",
    time: "2 min",
    blurb: "A short guided stretch and movement break for restless energy.",
  },

  // Clear Your Head
  {
    id: "name-it-to-tame-it",
    title: "Name It to Tame It",
    category: "mindset",
    icon: "psychology",
    time: "1 min",
    blurb: "Put a word to what you're feeling — it genuinely takes the edge off.",
  },
  {
    id: "worry-timer",
    title: "Worry Timer",
    category: "mindset",
    icon: "schedule",
    time: "2 min",
    blurb: "Write the worry down and schedule it for later, instead of spiraling now.",
  },
];

export function getToolById(id: string): CopingTool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: CategoryId): CopingTool[] {
  return tools.filter((tool) => tool.category === category);
}
