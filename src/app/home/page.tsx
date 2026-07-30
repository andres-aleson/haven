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
          <Link
            href="/favorites"
            aria-label="Favorites"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            favorite
          </Link>
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

        <MoodCheckIn />
      </main>

      <AppBottomNav active="/home" />
    </>
  );
}
