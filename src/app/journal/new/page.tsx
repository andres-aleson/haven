"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

const SUGGESTED_PROMPTS = [
  "What's on my mind right now",
  "Three good things about today",
  "What's weighing on me",
  "Something I'm proud of",
  "What I need right now",
];

const fieldClasses =
  "bg-surface-container-lowest border-[1.5px] border-primary/10 rounded-xl px-4 py-3 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all";

export default function NewJournalEntry() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Give it a title and a few words, and you're good.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, prompt, body }),
      });
      if (!res.ok) throw new Error("failed");
      router.push("/journal");
      router.refresh();
    } catch {
      setError("Something went wrong saving that. Mind trying again?");
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/journal" />
        <div className="flex items-center gap-stack-md">
          <Link
            href="/favorites"
            aria-label="Favorites"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            favorite
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-2xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            New Entry ✍️
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Write whatever you want — there&apos;s no wrong way to do this.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-lg">
          <div className="flex flex-col gap-stack-sm">
            <span className="text-label-md font-label-md text-on-surface-variant">
              Prompt (optional)
            </span>
            <div className="flex flex-wrap gap-stack-sm">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPrompt(p)}
                  className={`text-label-md font-label-md px-4 py-2 rounded-full border-[1.5px] transition-all ${
                    prompt === p
                      ? "bg-secondary-container border-secondary text-on-secondary-container"
                      : "bg-surface-container-lowest border-primary/10 text-on-surface-variant hover:border-primary/30"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Or write your own prompt"
              className={fieldClasses}
            />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <label htmlFor="title" className="text-label-md font-label-md text-on-surface-variant">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a title"
              className={fieldClasses}
            />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <label htmlFor="body" className="text-label-md font-label-md text-on-surface-variant">
              What&apos;s on your mind?
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Type whatever you want..."
              className={`${fieldClasses} resize-none`}
            />
          </div>

          {error && (
            <p role="alert" className="text-body-md font-body-md text-error">
              {error}
            </p>
          )}

          <div className="flex gap-gutter">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? "Saving..." : "Save Entry"}
            </button>
            <Link
              href="/journal"
              className="bg-transparent border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-all duration-200 flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>

      <AppBottomNav active="/journal" />
    </>
  );
}
