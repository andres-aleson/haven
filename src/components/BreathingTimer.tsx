"use client";

import { useEffect, useState } from "react";
import type { BreathingPattern } from "@/lib/tools";

const GROW_SCALE = 1;
const SHRINK_SCALE = 0.55;

type Status = "idle" | "running" | "paused" | "done";

interface BreathingState {
  status: Status;
  cycleIndex: number;
  phaseIndex: number;
  secondsLeft: number;
  circleScale: number;
}

function initialState(pattern: BreathingPattern): BreathingState {
  return {
    status: "idle",
    cycleIndex: 0,
    phaseIndex: 0,
    secondsLeft: pattern.phases[0].seconds,
    circleScale: SHRINK_SCALE,
  };
}

export default function BreathingTimer({ pattern }: { pattern: BreathingPattern }) {
  const { phases, cycles } = pattern;
  const [state, setState] = useState<BreathingState>(() => initialState(pattern));

  // Ticks the countdown once a second, entirely within the updater so every
  // derived value (phase, cycle, circle scale, completion) stays in sync in
  // one atomic update rather than a separate effect reacting to state.
  useEffect(() => {
    if (state.status !== "running") return;
    const id = setInterval(() => {
      setState((prev) => {
        if (prev.status !== "running") return prev;
        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        }

        const nextPhaseIndex = prev.phaseIndex + 1 < phases.length ? prev.phaseIndex + 1 : 0;
        const nextCycleIndex = nextPhaseIndex === 0 ? prev.cycleIndex + 1 : prev.cycleIndex;

        if (nextCycleIndex >= cycles) {
          return {
            ...prev,
            status: "done",
            cycleIndex: nextCycleIndex,
            phaseIndex: nextPhaseIndex,
            secondsLeft: 0,
            circleScale: SHRINK_SCALE,
          };
        }

        const nextPhase = phases[nextPhaseIndex];
        const nextScale =
          nextPhase.type === "in"
            ? GROW_SCALE
            : nextPhase.type === "out"
              ? SHRINK_SCALE
              : prev.circleScale; // "hold" leaves the circle exactly where it is

        return {
          ...prev,
          cycleIndex: nextCycleIndex,
          phaseIndex: nextPhaseIndex,
          secondsLeft: nextPhase.seconds,
          circleScale: nextScale,
        };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [state.status, phases, cycles]);

  function start() {
    const firstPhase = phases[0];
    setState({
      status: "running",
      cycleIndex: 0,
      phaseIndex: 0,
      secondsLeft: firstPhase.seconds,
      // Every breathing pattern opens on an "in" phase, so this is the
      // value that actually needs to change from the resting circle for
      // a transition to fire — setting it back to SHRINK_SCALE (the same
      // value it's already resting at) was why the very first breath
      // never visibly moved until the second cycle changed it for real.
      circleScale: firstPhase.type === "in" ? GROW_SCALE : SHRINK_SCALE,
    });
  }

  function pause() {
    setState((prev) => ({ ...prev, status: "paused" }));
  }

  function resume() {
    setState((prev) => ({ ...prev, status: "running" }));
  }

  function restart() {
    setState(initialState(pattern));
  }

  const phase = phases[state.phaseIndex];

  return (
    <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-xl flex flex-col items-center gap-stack-lg">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full motion-reduce:transition-none"
          style={{
            backgroundColor: "var(--color-accent-breathing)",
            transform: `scale(${state.circleScale})`,
            transitionProperty: "transform",
            transitionDuration: `${phase.seconds}s`,
            transitionTimingFunction: "ease-in-out",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-1 px-4 text-center">
          {state.status === "running" || state.status === "paused" ? (
            <>
              <span
                aria-live="polite"
                className="text-label-md font-label-md text-on-surface uppercase tracking-widest"
              >
                {state.status === "paused" ? "Paused" : phase.label}
              </span>
              <span className="text-headline-lg font-headline-lg text-on-surface">
                {state.secondsLeft}
              </span>
            </>
          ) : state.status === "done" ? (
            <span className="text-headline-md font-headline-md text-on-surface">
              Nice work 🌿
            </span>
          ) : (
            <span className="material-symbols-outlined text-4xl text-on-surface" aria-hidden="true">
              air
            </span>
          )}
        </div>
      </div>

      {cycles > 1 && (state.status === "running" || state.status === "paused") && (
        <p className="text-caption font-caption text-on-surface-variant">
          Cycle {Math.min(state.cycleIndex + 1, cycles)} of {cycles}
        </p>
      )}

      <div className="flex items-center gap-gutter">
        {state.status === "idle" && (
          <button
            type="button"
            onClick={start}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Start
          </button>
        )}
        {state.status === "running" && (
          <button
            type="button"
            onClick={pause}
            className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-all duration-200"
          >
            Pause
          </button>
        )}
        {state.status === "paused" && (
          <>
            <button
              type="button"
              onClick={resume}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={restart}
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Restart
            </button>
          </>
        )}
        {state.status === "done" && (
          <button
            type="button"
            onClick={start}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Do It Again
          </button>
        )}
      </div>
    </div>
  );
}
