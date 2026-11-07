import MoodCheckIn from "@/components/MoodCheckIn";
import AppHeader from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppNav";

export default function HomeDashboard() {
  return (
    <>
      {/* Top App Bar */}
      <AppHeader active="/home" />

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
