import Link from "next/link";

export default function LibraryPlaceholder() {
  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-container-margin py-stack-xl gap-stack-md">
        <span className="material-symbols-outlined text-5xl text-primary" aria-hidden="true">
          grid_view
        </span>
        <h1 className="text-headline-lg font-headline-lg text-on-surface">
          The Coping Library is on its way
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
          We&apos;re still building this space. Come back soon for breathing
          exercises, grounding tools, and more.
        </p>
        <Link
          href="/"
          className="mt-stack-md bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
