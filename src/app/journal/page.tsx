import Link from "next/link";
import { getJournalEntries } from "@/lib/db";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";
import JournalEntryCard from "@/components/JournalEntryCard";

// New entries land here immediately — never cache this page.
export const dynamic = "force-dynamic";

export default function Journal() {
  const entries = getJournalEntries();

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

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-lg">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Journal 📓
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl">
            A private place to get things off your chest — no one else ever
            sees this.
          </p>
        </section>

        <Link
          href="/journal/new"
          className="mb-stack-xl bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            edit_note
          </span>
          New Entry
        </Link>

        {entries.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-xl text-center flex flex-col items-center gap-stack-md">
            <span
              className="material-symbols-outlined text-5xl text-primary"
              aria-hidden="true"
            >
              auto_stories
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              No entries yet
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              Whenever you want to write something down, this is the place.
              Tap &quot;New Entry&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-gutter">
            {entries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </main>

      <AppBottomNav active="/journal" />
    </>
  );
}
