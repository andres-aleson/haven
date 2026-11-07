import AppHeader from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppNav";
import FeelingsQuiz from "@/components/FeelingsQuiz";

export default function QuizPage() {
  return (
    <>
      <AppHeader active="/library" />

      <main className="flex-grow w-full max-w-2xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            How are you feeling?
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Five quick questions, no right or wrong answers. We&apos;ll match you
            with tools that fit.
          </p>
        </section>

        <FeelingsQuiz />

        <p className="mt-stack-xl text-caption font-caption text-on-surface-variant">
          A quick check-in, not a diagnosis or a replacement for therapy.
        </p>
      </main>

      <AppBottomNav active="/library" />
    </>
  );
}
