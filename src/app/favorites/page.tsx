import Link from "next/link";
import { categories, tools } from "@/lib/tools";
import { getFavoriteToolIds } from "@/lib/db";
import SoundToolCard from "@/components/SoundToolCard";
import ToolCard from "@/components/ToolCard";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

// Favorites can change between visits — never cache this page.
export const dynamic = "force-dynamic";

export default function Favorites() {
  const favoriteToolIds = getFavoriteToolIds();
  const favoriteIdSet = new Set(favoriteToolIds);
  const favoriteTools = favoriteToolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/favorites" />
        <div className="flex items-center gap-stack-md">
          <Link
            href="/favorites"
            aria-label="Favorites"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin py-stack-xl pb-32 md:pb-stack-xl">
        <section className="mb-stack-xl">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Favorites
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            The tools you&apos;ve saved to come back to.
          </p>
        </section>

        {favoriteTools.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-xl text-center flex flex-col items-center gap-stack-md">
            <span
              className="material-symbols-outlined text-5xl text-primary"
              aria-hidden="true"
            >
              favorite
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              No favorites yet
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              Tap the heart on any tool in the Library to save it here for
              next time.
            </p>
            <Link
              href="/library"
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Open Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {favoriteTools.map((tool) => {
              const category = categories.find((c) => c.id === tool.category);
              const accent = category?.accent ?? "var(--color-primary-container)";
              return tool.category === "music" ? (
                <SoundToolCard
                  key={tool.id}
                  tool={tool}
                  accent={accent}
                  favorited={favoriteIdSet.has(tool.id)}
                />
              ) : (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  accent={accent}
                  favorited={favoriteIdSet.has(tool.id)}
                />
              );
            })}
          </div>
        )}
      </main>

      <AppBottomNav active="/favorites" />
    </>
  );
}
