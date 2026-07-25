import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getToolById, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ toolId: tool.id }));
}

export default async function ToolDetail({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) notFound();

  const category = categories.find((c) => c.id === tool.category);

  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-container-margin py-stack-xl gap-stack-md">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: category?.accent }}
        >
          <span className="material-symbols-outlined text-on-surface text-3xl" aria-hidden="true">
            {tool.icon}
          </span>
        </div>
        <h1 className="text-headline-lg font-headline-lg text-on-surface">
          {tool.title}
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md">
          {tool.blurb}
        </p>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-md">
          This exercise is still being built — check back soon.
        </p>
        <Link
          href="/library"
          className="mt-stack-md bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Back to Library
        </Link>
      </main>
    </>
  );
}
