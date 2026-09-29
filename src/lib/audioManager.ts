/**
 * Ensures at most one ambient sound plays at a time — across every card and
 * detail page in this tab, and across other tabs too (via BroadcastChannel),
 * since two calming sounds overlapping is the opposite of calming.
 */

type StopFn = () => void;
type NowPlaying = { toolId: string; stop: StopFn } | null;

let current: NowPlaying = null;
const listeners = new Set<(toolId: string | null) => void>();

const channel =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("haven-ambient-audio")
    : null;

channel?.addEventListener("message", (event) => {
  if (event.data?.type === "playing") {
    // Another tab started playing — stop ours (it already knows it's playing).
    current?.stop();
    current = null;
    notify();
  }
});

function notify() {
  for (const listener of listeners) listener(current?.toolId ?? null);
}

export function getCurrentlyPlayingId(): string | null {
  return current?.toolId ?? null;
}

export function subscribeToNowPlaying(
  listener: (toolId: string | null) => void
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function startPlaying(toolId: string, stop: StopFn): void {
  current?.stop();
  current = { toolId, stop };
  notify();
  channel?.postMessage({ type: "playing", toolId });
}

export function stopPlaying(toolId: string): void {
  if (current?.toolId === toolId) {
    current = null;
    notify();
  }
}
