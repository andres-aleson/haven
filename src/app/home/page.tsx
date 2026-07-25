import Link from "next/link";
import MoodCheckIn from "@/components/MoodCheckIn";

export default function HomeDashboard() {
  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <nav className="hidden md:flex gap-stack-lg items-center">
          <Link
            href="/home"
            className="text-primary font-bold border-b-2 border-primary text-label-md font-label-md py-1"
          >
            Home
          </Link>
          <Link
            href="/library"
            className="text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
          >
            Library
          </Link>
          <span className="text-on-surface-variant/50 text-label-md font-label-md py-1 cursor-not-allowed">
            Stats
          </span>
          <span className="text-on-surface-variant/50 text-label-md font-label-md py-1 cursor-not-allowed">
            Profile
          </span>
        </nav>
        <div className="flex items-center gap-stack-md">
          <button
            aria-label="Favorites"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            favorite
          </button>
          <button
            aria-label="History"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            history
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Hey there 👋
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Take a moment for yourself. Whenever you&apos;re ready, we&apos;re
            here.
          </p>
        </section>

        {/* Primary action: Coping Tools Library */}
        <Link
          href="/library"
          className="group block relative overflow-hidden bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow transition-all hover:-translate-y-1 active:scale-[0.99] duration-200"
        >
          <div className="p-stack-xl flex flex-col gap-stack-md">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Explore the Coping Library
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-md">
              Find a quick exercise for anxiety, stress, or a moment of calm —
              whenever you need it.
            </p>
            <div className="flex items-center gap-unit text-primary font-bold">
              <span className="text-label-md font-label-md">
                Open Library
              </span>
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>

        <MoodCheckIn />
      </main>

      {/* Bottom nav (mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_20px_0_rgba(74,101,73,0.06)] flex justify-around items-center px-4 py-2 rounded-t-xl">
        <Link
          href="/home"
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200 transition-transform"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="text-caption font-caption">Home</span>
        </Link>
        <Link
          href="/library"
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-caption font-caption">Library</span>
        </Link>
        <span className="flex flex-col items-center justify-center text-on-surface-variant/50">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-caption font-caption">Stats</span>
        </span>
        <span className="flex flex-col items-center justify-center text-on-surface-variant/50">
          <span className="material-symbols-outlined">person</span>
          <span className="text-caption font-caption">Profile</span>
        </span>
      </nav>
    </>
  );
}
