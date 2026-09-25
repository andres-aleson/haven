import Link from "next/link";
import MarketingNav from "./MarketingNav";

export default function MarketingHeader({ active }: { active: string }) {
  return (
    <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
      <Link href="/" className="text-headline-md font-headline-md text-primary">
        Haven
      </Link>
      <MarketingNav active={active} />
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
  );
}
