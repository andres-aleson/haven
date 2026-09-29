"use client";

import { useAmbientSound } from "@/hooks/useAmbientSound";

export default function SoundPlayButton({
  toolId,
  title,
}: {
  toolId: string;
  title: string;
}) {
  const { isPlaying, toggle } = useAmbientSound(toolId);

  return (
    <button
      type="button"
      onClick={toggle}
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
