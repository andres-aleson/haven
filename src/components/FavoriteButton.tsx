"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({
  toolId,
  title,
  initialFavorited,
}: {
  toolId: string;
  title: string;
  initialFavorited: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [saveFailed, setSaveFailed] = useState(false);

  // Let the "couldn't save" note fade on its own — retrying is just
  // tapping the heart again, so there's nothing to keep it around for.
  useEffect(() => {
    if (!saveFailed) return;
    const timer = setTimeout(() => setSaveFailed(false), 4000);
    return () => clearTimeout(timer);
  }, [saveFailed]);

  async function toggle() {
    const next = !favorited;
    setFavorited(next);
    setSaveFailed(false);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, favorited: next }),
      });
      // fetch() only rejects on a network failure — an HTTP error status
      // still resolves, so this has to be checked explicitly too.
      if (!res.ok) throw new Error("Favorite save failed");
    } catch {
      setFavorited(!next);
      setSaveFailed(true);
    }
  }

  return (
    <div className="absolute top-stack-lg right-stack-lg">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={favorited}
        aria-label={
          favorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`
        }
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 ${
          favorited
            ? "bg-primary text-on-primary"
            : "bg-surface-container-low text-primary hover:bg-primary/10"
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
          aria-hidden="true"
        >
          favorite
        </span>
      </button>

      {saveFailed && (
        <span
          role="alert"
          className="absolute top-full right-0 mt-1 whitespace-nowrap bg-tertiary-container text-on-tertiary-container text-caption font-caption px-3 py-1 rounded-full shadow-md z-10"
        >
          Couldn&apos;t save — tap to retry
        </span>
      )}
    </div>
  );
}
