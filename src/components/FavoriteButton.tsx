"use client";

import { useState } from "react";

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

  function toggle() {
    const next = !favorited;
    setFavorited(next);
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId, favorited: next }),
    }).catch(() => {
      setFavorited(!next);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={favorited}
      aria-label={
        favorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`
      }
      className={`absolute top-stack-lg right-stack-lg w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 ${
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
  );
}
