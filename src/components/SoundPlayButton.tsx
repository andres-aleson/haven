"use client";

import { useEffect, useRef, useState } from "react";
import { SOUND_LOOP_FACTORIES, type SoundLoop } from "@/lib/ambientSound";

export default function SoundPlayButton({
  toolId,
  title,
}: {
  toolId: string;
  title: string;
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
    const factory = SOUND_LOOP_FACTORIES[toolId];
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
    <button
      type="button"
      onClick={togglePlay}
      aria-pressed={isPlaying}
      className="mt-stack-md bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 1" }}
        aria-hidden="true"
      >
        {isPlaying ? "pause" : "play_arrow"}
      </span>
      {isPlaying ? `Pause ${title}` : `Play ${title}`}
    </button>
  );
}
