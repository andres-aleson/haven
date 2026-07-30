"use client";

import { useState } from "react";
import type { JournalEntry } from "@/lib/db";

export default function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const [deleted, setDeleted] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (deleted) return null;

  const date = new Date(entry.created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleDelete() {
    setDeleted(true);
    try {
      const res = await fetch(`/api/journal?id=${entry.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
    } catch {
      setDeleted(false);
    }
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm">
      <div className="flex items-start justify-between gap-stack-sm">
        <div className="flex flex-col gap-stack-sm">
          {entry.prompt && (
            <span className="text-caption font-caption text-secondary bg-secondary-container/30 w-fit px-3 py-1 rounded-full">
              {entry.prompt}
            </span>
          )}
          <h3 className="text-headline-md font-headline-md text-on-surface">
            {entry.title}
          </h3>
        </div>

        {confirming ? (
          <div className="flex items-center gap-stack-sm flex-shrink-0">
            <button
              type="button"
              onClick={handleDelete}
              className="text-label-md font-label-md text-error"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="text-label-md font-label-md text-on-surface-variant"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label={`Delete "${entry.title}"`}
            className="material-symbols-outlined text-on-surface-variant hover:text-error p-1 rounded-full transition-colors flex-shrink-0"
          >
            delete
          </button>
        )}
      </div>

      <p className="text-body-md font-body-md text-on-surface-variant whitespace-pre-wrap line-clamp-4">
        {entry.body}
      </p>

      <span className="text-caption font-caption text-on-surface-variant/70">
        {date}
      </span>
    </div>
  );
}
