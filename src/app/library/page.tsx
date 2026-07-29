import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import SoundToolCard from "@/components/SoundToolCard";
import { AppTopNav, AppBottomNav } from "@/components/AppNav";

export default function Library() {
  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <AppTopNav active="/library" />
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
                    <SoundToolCard key={tool.id} tool={tool} accent={category.accent} />
                  ) : (
                    <Link
                      key={tool.id}
                      href={`/library/${tool.id}`}
                      className="group bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm transition-all hover:-translate-y-1 active:scale-[0.99] duration-200"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-stack-sm"
                        style={{ backgroundColor: category.accent }}
                      >
                        <span
                          className="material-symbols-outlined text-on-surface"
                          aria-hidden="true"
                        >
                          {tool.icon}
                        </span>
                      </div>
                      <h3 className="text-headline-md font-headline-md text-on-surface">
                        {tool.title}
                      </h3>
                      <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                        {tool.blurb}
                      </p>
                      <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low w-fit px-3 py-1 rounded-full">
                        {tool.time}
                      </span>
                    </Link>
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
