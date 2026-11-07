export type QuizEmotionId =
  | "anxious"
  | "overwhelmed"
  | "sad"
  | "angry"
  | "lonely"
  | "numb"
  | "calm";

export interface QuizOption {
  label: string;
  scores: Partial<Record<QuizEmotionId, number>>;
}

export interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    prompt: "What's your body doing right now?",
    options: [
      { label: "Heart racing, chest tight", scores: { anxious: 3, overwhelmed: 1 } },
      { label: "Heavy and tired", scores: { sad: 3, numb: 1 } },
      { label: "Hot and tense, ready to snap", scores: { angry: 3, overwhelmed: 1 } },
      { label: "Kind of blank, can't feel much", scores: { numb: 3, sad: 1 } },
      { label: "Loose and steady", scores: { calm: 3 } },
    ],
  },
  {
    prompt: "What's your mind doing?",
    options: [
      { label: "Spinning \"what if\" thoughts", scores: { anxious: 3 } },
      { label: "Juggling too many things at once", scores: { overwhelmed: 3, anxious: 1 } },
      { label: "Wishing someone understood", scores: { lonely: 3, sad: 1 } },
      { label: "Foggy and far away", scores: { numb: 3 } },
      { label: "Pretty clear", scores: { calm: 3 } },
    ],
  },
  {
    prompt: "How do you feel around other people right now?",
    options: [
      { label: "Alone, even when people are nearby", scores: { lonely: 3, sad: 1 } },
      { label: "Frustrated or annoyed with someone", scores: { angry: 3 } },
      { label: "Hurt or let down", scores: { sad: 3, angry: 1 } },
      { label: "Like everyone wants something from me", scores: { overwhelmed: 3, anxious: 1 } },
      { label: "Supported and okay", scores: { calm: 3 } },
    ],
  },
  {
    prompt: "How's your energy?",
    options: [
      { label: "Wired. I can't slow down", scores: { anxious: 3, overwhelmed: 1 } },
      { label: "Drained. I just want to lie down", scores: { sad: 2, numb: 1, overwhelmed: 1 } },
      { label: "Flat. Not high, not low, just off", scores: { numb: 3 } },
      { label: "Restless and irritable", scores: { angry: 3, anxious: 1 } },
      { label: "Steady and okay", scores: { calm: 3 } },
    ],
  },
  {
    prompt: "What would help most right now?",
    options: [
      { label: "To slow my breathing and calm my body", scores: { anxious: 3 } },
      { label: "To get everything out of my head", scores: { overwhelmed: 3 } },
      { label: "To feel less alone", scores: { lonely: 3 } },
      { label: "To feel comforted or cared for", scores: { sad: 3 } },
      { label: "I'm okay. Just a little pause", scores: { calm: 3 } },
    ],
  },
];

// When two feelings tie, lean toward the one that needs more support
// ("calm" last), so the quiz never talks someone out of how they feel.
const TIE_BREAK_ORDER: QuizEmotionId[] = [
  "anxious",
  "overwhelmed",
  "sad",
  "angry",
  "lonely",
  "numb",
  "calm",
];

export function isQuizEmotionId(value: string): value is QuizEmotionId {
  return (TIE_BREAK_ORDER as string[]).includes(value);
}

/** `answers[i]` is the index of the option chosen for question i. */
export function scoreQuiz(answers: number[]): QuizEmotionId {
  const totals: Record<QuizEmotionId, number> = {
    anxious: 0,
    overwhelmed: 0,
    sad: 0,
    angry: 0,
    lonely: 0,
    numb: 0,
    calm: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const option = QUIZ_QUESTIONS[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [emotion, points] of Object.entries(option.scores)) {
      totals[emotion as QuizEmotionId] += points ?? 0;
    }
  });

  return TIE_BREAK_ORDER.reduce((best, emotion) =>
    totals[emotion] > totals[best] ? emotion : best
  );
}

export const QUIZ_RESULTS: Record<
  QuizEmotionId,
  { blurb: string; toolIds: string[] }
> = {
  anxious: {
    blurb: "Your body and mind are on high alert. These help you slow things down.",
    toolIds: ["physiological-sigh", "box-breathing", "54321-grounding", "worry-timer"],
  },
  overwhelmed: {
    blurb: "There's a lot going on at once. These help you shrink it into something manageable.",
    toolIds: ["pick-one-thing", "belly-breathing", "whats-on-your-mind", "calming-nature-sounds"],
  },
  sad: {
    blurb: "Things feel heavy right now. These are gentle ways to be kind to yourself.",
    toolIds: ["self-compassion-break", "whats-on-your-mind", "reach-out", "calming-nature-sounds"],
  },
  angry: {
    blurb: "There's a lot of heat and energy in you. These help you let it out safely.",
    toolIds: ["tense-and-release", "shake-it-out", "pursed-lip-breathing", "cold-water-reset"],
  },
  lonely: {
    blurb: "You're feeling cut off from people. These can help you feel a little more connected.",
    toolIds: ["reach-out", "self-compassion-break", "whats-on-your-mind", "lofi-focus-sounds"],
  },
  numb: {
    blurb: "Things feel flat or far away. These can help you feel more present.",
    toolIds: ["cold-water-reset", "54321-grounding", "shake-it-out", "name-it-to-tame-it"],
  },
  calm: {
    blurb: "You're in a steady place. These help you keep it going.",
    toolIds: ["gratitude-check-in", "whats-on-your-mind", "lofi-focus-sounds", "body-scan"],
  },
};
