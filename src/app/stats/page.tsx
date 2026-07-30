import Link from "next/link";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";
import StatsContent from "@/components/StatsContent";

export default function Stats() {
  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/stats" />
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
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Progress
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            A simple record of showing up for yourself.
          </p>
        </section>

        <StatsContent />
      </main>

      <AppBottomNav active="/stats" />
    </>
  );
}
