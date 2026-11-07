export type Emotion = {
  id: string;
  label: string;
  emoji: string;
  message: string;
};

export const emotions: Emotion[] = [
  {
    id: "anxious",
    label: "Anxious",
    emoji: "😰",
    message:
      "Whatever you're going through, it'll be okay. We're here to help you calm down.",
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    message: "It's okay to feel sad. Let yourself feel it — we're here with you.",
  },
  {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    message: "It's okay to feel angry. Let's find a way to let it out safely.",
  },
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    emoji: "😵‍💫",
    message: "One thing at a time. You don't have to carry it all right now.",
  },
  {
    id: "scared",
    label: "Scared",
    emoji: "😨",
    message: "You're safe right now. Let's take this one breath at a time.",
  },
  {
    id: "lonely",
    label: "Lonely",
    emoji: "😔",
    message: "You're not alone here. We're glad you showed up today.",
  },
  {
    id: "stressed",
    label: "Stressed",
    emoji: "😣",
    message: "Take a breath. You're doing better than you think.",
  },
  {
    id: "numb",
    label: "Numb",
    emoji: "😶",
    message:
      "It's okay to not know how you feel. We're here whenever you're ready.",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "🙂",
    message: "That's a great place to be. Let's keep that feeling going.",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    message: "Love that for you. Keep noticing what's going well.",
  },
];

export function getEmotionById(id: string): Emotion | undefined {
  return emotions.find((e) => e.id === id);
}
