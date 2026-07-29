import Link from "next/link";
import MoodCheckIn from "@/components/MoodCheckIn";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

export default function HomeDashboard() {
  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/home" />
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

      <AppBottomNav active="/home" />
    </>
  );
}
