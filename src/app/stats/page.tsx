import Link from "next/link";
import { getRecentCheckIns } from "@/lib/db";
import { computeStreak, getCheckInDateSet, getWeekView } from "@/lib/streak";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

// Streak/week depend on "today," so this page must never be cached at build time.
export const dynamic = "force-dynamic";

export default function Stats() {
  const checkIns = getRecentCheckIns();
  const dateSet = getCheckInDateSet(checkIns);
  const streak = computeStreak(dateSet);
  const week = getWeekView(dateSet);
  const checkInsThisWeek = checkIns.filter(
    (c) => c.created_at.slice(0, 10) >= week[0].date
  ).length;
  const hasAnyCheckIns = checkIns.length > 0;

  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/stats" />
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

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Progress
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            A simple record of showing up for yourself.
          </p>
        </section>

        {hasAnyCheckIns ? (
          <div className="flex flex-col gap-gutter">
            <div className="bg-secondary-container text-on-secondary-container p-stack-lg rounded-xl soft-glow-shadow flex items-center gap-stack-md">
              <span
                className="material-symbols-outlined text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                local_fire_department
              </span>
              <div>
                <div className="text-headline-lg font-headline-lg">
                  {streak} day{streak === 1 ? "" : "s"}
                </div>
                <p className="text-body-md font-body-md opacity-80">
                  {streak > 0
                    ? "Current check-in streak"
                    : "Check in today to start a new streak"}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg">
              <div className="flex justify-between items-center mb-stack-md">
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  This Week
                </h2>
                <span className="text-label-md font-label-md text-on-surface-variant">
                  {checkInsThisWeek} check-in{checkInsThisWeek === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-gutter">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className="flex flex-col items-center gap-stack-sm"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-label-md font-label-md transition-all ${
                        day.checked
                          ? "bg-primary text-on-primary"
                          : "border-[1.5px] border-primary/20 text-on-surface-variant"
                      } ${day.isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest" : ""}`}
                    >
                      {day.checked ? (
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          check
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <span className="text-caption font-caption text-on-surface-variant">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-xl text-center flex flex-col items-center gap-stack-md">
            <span
              className="material-symbols-outlined text-5xl text-primary"
              aria-hidden="true"
            >
              local_fire_department
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              No check-ins yet
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              Head back to Home and check in with how you&apos;re feeling —
              that&apos;s all it takes to start your streak.
            </p>
            <Link
              href="/home"
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>

      <AppBottomNav active="/stats" />
    </>
  );
}
