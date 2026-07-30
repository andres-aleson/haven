import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import { getFavoriteToolIds } from "@/lib/db";
import SoundToolCard from "@/components/SoundToolCard";
import ToolCard from "@/components/ToolCard";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

// Favorites can change between visits — never cache this page.
export const dynamic = "force-dynamic";

export default function Library() {
  const favoriteToolIds = new Set(getFavoriteToolIds());

  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/library" />
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
            Coping Library
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Pick whatever sounds right for this moment. There&apos;s no wrong
            choice.
          </p>
        </section>

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
