import AppHeader from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppNav";
import StatsContent from "@/components/StatsContent";

export default function Stats() {
  return (
    <>
      <AppHeader active="/stats" />

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
