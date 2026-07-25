"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CopingTool } from "@/lib/tools";
import { SOUND_LOOP_FACTORIES, type SoundLoop } from "@/lib/ambientSound";

export default function SoundToolCard({
  tool,
  accent,
}: {
  tool: CopingTool;
  accent: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const loopRef = useRef<SoundLoop | null>(null);

  useEffect(() => {
    return () => {
      loopRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  function togglePlay() {
    const factory = SOUND_LOOP_FACTORIES[tool.id];
    if (!factory) return;

    if (isPlaying) {
      loopRef.current?.stop();
      loopRef.current = null;
      setIsPlaying(false);
      return;
    }

    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    const loop = factory(ctxRef.current);
    loop.start();
    loopRef.current = loop;
    setIsPlaying(true);
  }

  return (
    <div className="relative bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm transition-all hover:-translate-y-1 duration-200">
      <Link href={`/library/${tool.id}`} className="flex flex-col gap-stack-sm pr-12">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-stack-sm"
          style={{ backgroundColor: accent }}
        >
          <span className="material-symbols-outlined text-on-surface" aria-hidden="true">
            {tool.icon}
          </span>
        </div>
        <h3 className="text-headline-md font-headline-md text-on-surface">
          {tool.title}
        </h3>
        <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
          {tool.blurb}
        </p>
        <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low w-fit px-3 py-1 rounded-full">
          {tool.time}
        </span>
      </Link>

      <button
        type="button"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `Pause ${tool.title}` : `Play ${tool.title}`}
        className={`absolute top-stack-lg right-stack-lg w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 ${
          isPlaying
            ? "bg-primary text-on-primary"
            : "bg-surface-container-low text-primary hover:bg-primary/10"
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>
    </div>
  );
}
