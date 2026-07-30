import Link from "next/link";
import type { CopingTool } from "@/lib/tools";
import FavoriteButton from "./FavoriteButton";

export default function ToolCard({
  tool,
  accent,
  favorited,
}: {
  tool: CopingTool;
  accent: string;
  favorited: boolean;
}) {
  return (
    <div className="relative bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm transition-all hover:-translate-y-1 duration-200">
      <Link href={`/library/${tool.id}`} className="flex flex-col gap-stack-sm pr-12">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-stack-sm"
          style={{ backgroundColor: accent }}
        >
          <span className="material-symbols-outlined text-on-surface" aria-hidden="true">
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
      <FavoriteButton toolId={tool.id} title={tool.title} initialFavorited={favorited} />
    </div>
  );
}
