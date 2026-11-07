import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import { getFavoriteToolIds } from "@/lib/db";
import SoundToolCard from "@/components/SoundToolCard";
import ToolCard from "@/components/ToolCard";
import AppHeader from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppNav";

// Favorites can change between visits — never cache this page.
export const dynamic = "force-dynamic";

export default async function Library() {
  const favoriteToolIds = new Set(await getFavoriteToolIds().catch(() => [] as string[]));

  return (
    <>
      {/* Top App Bar */}
      <AppHeader active="/library" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Coping Library
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Pick whatever sounds right for this moment. There&apos;s no wrong
            choice.
          </p>
        </section>

        <Link
          href="/library/quiz"
          className="mb-stack-xl flex items-center gap-stack-md bg-secondary-container/30 border-[1.5px] border-secondary/20 rounded-xl p-stack-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
            <span
              className="material-symbols-outlined text-on-secondary-container"
              aria-hidden="true"
            >
              quiz
            </span>
          </div>
          <div className="flex-grow">
            <h2 className="text-headline-md font-headline-md text-on-surface">
              Not sure what you need?
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Take a 1-minute feelings quiz and we&apos;ll match you with tools
              that fit how you feel right now.
            </p>
          </div>
          <span
            className="material-symbols-outlined text-primary flex-shrink-0"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </Link>

        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.id);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category.id} className="mb-stack-xl">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-md">
                {category.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {categoryTools.map((tool) =>
                  category.id === "music" ? (
                    <SoundToolCard
                      key={tool.id}
                      tool={tool}
                      accent={category.accent}
                      favorited={favoriteToolIds.has(tool.id)}
                    />
                  ) : (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      accent={category.accent}
                      favorited={favoriteToolIds.has(tool.id)}
                    />
                  )
                )}
              </div>
            </section>
          );
        })}
      </main>

      <AppBottomNav active="/library" />
    </>
  );
}
