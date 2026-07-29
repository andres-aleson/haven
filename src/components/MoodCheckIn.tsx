"use client";

import { useState } from "react";
import { getTodayLocalDateString } from "@/lib/streak";

type Emotion = {
  id: string;
  label: string;
  emoji: string;
  message: string;
};

const emotions: Emotion[] = [
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

export default function MoodCheckIn() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = emotions.find((e) => e.id === selectedId) ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
    fetch("/api/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: id, localDate: getTodayLocalDateString() }),
    }).catch(() => {
      // Check-in still works locally even if saving the streak fails.
    });
  }

  return (
    <section className="mt-stack-xl">
      <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-sm">
        How do you feel right now?
      </h2>
      <p className="text-body-md font-body-md text-on-surface-variant mb-stack-md">
        There&apos;s no rush, and no right or wrong answer.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-gutter">
        {emotions.map((emotion) => {
          const isSelected = emotion.id === selectedId;
          return (
            <button
              key={emotion.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(emotion.id)}
              className={`flex flex-col items-center gap-stack-sm p-stack-md rounded-xl border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? "bg-primary-container border-primary"
                  : "bg-surface-container-lowest border-primary/10 hover:border-primary/30"
              }`}
            >
              <span className="text-4xl" aria-hidden="true">
                {emotion.emoji}
              </span>
              <span
                className={`text-label-md font-label-md ${
                  isSelected ? "text-on-primary-container" : "text-on-surface"
                }`}
              >
                {emotion.label}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          role="status"
          className="mt-stack-lg bg-secondary-container/30 border-[1.5px] border-secondary/20 rounded-xl p-stack-lg flex flex-col items-start gap-stack-sm"
        >
          <span className="text-label-md font-label-md text-secondary uppercase tracking-widest">
            Feeling {selected.label.toLowerCase()}
          </span>
          <p className="text-body-lg font-body-lg text-on-surface">
            {selected.message}
          </p>
        </div>
      )}
    </section>
  );
}
