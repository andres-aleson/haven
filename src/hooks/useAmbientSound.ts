"use client";

import { useEffect, useRef, useState } from "react";
import { SOUND_LOOP_FACTORIES, type SoundLoop } from "@/lib/ambientSound";
import {
  getCurrentlyPlayingId,
  startPlaying,
  stopPlaying,
  subscribeToNowPlaying,
} from "@/lib/audioManager";

export function useAmbientSound(toolId: string) {
  const [isPlaying, setIsPlaying] = useState(
    () => getCurrentlyPlayingId() === toolId
  );
  const ctxRef = useRef<AudioContext | null>(null);
  const loopRef = useRef<SoundLoop | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToNowPlaying((playingId) => {
      setIsPlaying(playingId === toolId);
      if (playingId !== toolId) {
        // Someone else (or another tab) is now playing — our loop was
        // already stopped via the callback we registered; just drop the ref.
        loopRef.current = null;
      }
    });

    return () => {
      unsubscribe();
      loopRef.current?.stop();
      ctxRef.current?.close();
      stopPlaying(toolId);
    };
  }, [toolId]);

  function toggle() {
    const factory = SOUND_LOOP_FACTORIES[toolId];
    if (!factory) return;

    if (isPlaying) {
      loopRef.current?.stop();
      loopRef.current = null;
      stopPlaying(toolId);
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
    startPlaying(toolId, () => loop.stop());
  }

  return { isPlaying, toggle };
}
