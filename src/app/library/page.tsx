import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import SoundToolCard from "@/components/SoundToolCard";

export default function Library() {
  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <nav className="hidden md:flex gap-stack-lg items-center">
          <Link
            href="/home"
            className="text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/library"
            className="text-primary font-bold border-b-2 border-primary text-label-md font-label-md py-1"
          >
            Library
          </Link>
          <span className="text-on-surface-variant/50 text-label-md font-label-md py-1 cursor-not-allowed">
            Stats
          </span>
          <span className="text-on-surface-variant/50 text-label-md font-label-md py-1 cursor-not-allowed">
            Profile
          </span>
        </nav>
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

      {/* Bottom nav (mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_20px_0_rgba(74,101,73,0.06)] flex justify-around items-center px-4 py-2 rounded-t-xl">
        <Link
          href="/home"
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-caption font-caption">Home</span>
        </Link>
        <Link
          href="/library"
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200 transition-transform"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            grid_view
          </span>
          <span className="text-caption font-caption">Library</span>
        </Link>
        <span className="flex flex-col items-center justify-center text-on-surface-variant/50">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-caption font-caption">Stats</span>
        </span>
        <span className="flex flex-col items-center justify-center text-on-surface-variant/50">
          <span className="material-symbols-outlined">person</span>
          <span className="text-caption font-caption">Profile</span>
        </span>
      </nav>
    </>
  );
}
