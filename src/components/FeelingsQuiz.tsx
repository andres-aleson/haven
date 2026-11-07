"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, scoreQuiz } from "@/lib/quiz";

export default function FeelingsQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[step];

  // Move focus to the new question so keyboard and screen-reader users land
  // on it instead of on a button that just disappeared.
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function choose(optionIndex: number) {
    // Re-answering after going Back replaces this answer and drops any later ones.
    const next = [...answers.slice(0, step), optionIndex];
    if (step + 1 < total) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      router.push(`/library/quiz/result?emotion=${scoreQuiz(next)}`);
    }
  }

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="flex flex-col gap-stack-sm">
        <div className="flex items-center justify-between text-label-md font-label-md text-on-surface-variant">
          <span>
            Question {step + 1} of {total}
          </span>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_back
              </span>
              Back
            </button>
          )}
        </div>
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step + 1}
          className="h-2 rounded-full bg-surface-container-high overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-headline-md font-headline-md text-on-surface outline-none"
      >
        {question.prompt}
      </h2>

      <div className="flex flex-col gap-stack-sm">
        {question.options.map((option, i) => {
          const isSelected = answers[step] === i;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => choose(i)}
              className={`text-left text-body-lg font-body-lg px-stack-md py-stack-md rounded-xl border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? "bg-primary-container border-primary text-on-primary-container"
                  : "bg-surface-container-lowest border-primary/10 text-on-surface hover:border-primary/30"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
