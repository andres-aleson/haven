import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppNav";
import SoundToolCard from "@/components/SoundToolCard";
import ToolCard from "@/components/ToolCard";
import TalkToSomeoneButton from "@/components/TalkToSomeoneButton";
import { getEmotionById } from "@/lib/emotions";
import { getFavoriteToolIds } from "@/lib/db";
import { QUIZ_RESULTS, isQuizEmotionId } from "@/lib/quiz";
import { categories, tools } from "@/lib/tools";

// Reads favorites from the database and the result from the URL.
export const dynamic = "force-dynamic";

export default async function QuizResult({
  searchParams,
}: {
  searchParams: Promise<{ emotion?: string }>;
}) {
  const { emotion: emotionParam } = await searchParams;
  const emotionId = emotionParam && isQuizEmotionId(emotionParam) ? emotionParam : null;
  const emotion = emotionId ? getEmotionById(emotionId) : undefined;
  if (!emotionId || !emotion) redirect("/library/quiz");

  const { blurb, toolIds } = QUIZ_RESULTS[emotionId];
  const favoriteIds = new Set(await getFavoriteToolIds().catch(() => [] as string[]));
  const matched = toolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <AppHeader active="/library" />

      <main className="flex-grow w-full max-w-4xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl flex flex-col items-center text-center gap-stack-sm">
          <span className="text-label-md font-label-md text-secondary uppercase tracking-widest">
            Your result
          </span>
          <span className="text-6xl" aria-hidden="true">
            {emotion.emoji}
          </span>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">
            It sounds like you&apos;re feeling {emotion.label.toLowerCase()}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface max-w-xl">
            {emotion.message}
          </p>
          <p className="text-caption font-caption text-on-surface-variant max-w-md">
            A quick check-in, not a diagnosis or a replacement for therapy.
          </p>
        </section>

        <section className="mb-stack-xl">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-sm">
            Tools picked for you
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mb-stack-md">
            {blurb}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {matched.map((tool) => {
              const accent =
                categories.find((c) => c.id === tool.category)?.accent ??
                "var(--color-primary-container)";
              return tool.category === "music" ? (
                <SoundToolCard
                  key={tool.id}
                  tool={tool}
                  accent={accent}
                  favorited={favoriteIds.has(tool.id)}
                />
              ) : (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  accent={accent}
                  favorited={favoriteIds.has(tool.id)}
                />
              );
            })}
          </div>
        </section>

        {emotionId !== "calm" && (
          <section className="mb-stack-xl bg-secondary-container/30 border-[1.5px] border-secondary/20 rounded-xl p-stack-lg flex flex-col items-start gap-stack-sm">
            <h2 className="text-headline-md font-headline-md text-on-surface">
              Want to talk to a real person?
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Tools help, and so can people. It&apos;s free, and you don&apos;t
              have to explain everything.
            </p>
            <TalkToSomeoneButton variant="inline" />
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-gutter justify-center">
          <Link
            href="/library/quiz"
            className="border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md text-center hover:bg-primary/5 transition-all duration-200"
          >
            Retake the quiz
          </Link>
          <Link
            href="/library"
            className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md text-center soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Browse the full library
          </Link>
        </div>
      </main>

      <AppBottomNav active="/library" />
    </>
  );
}
