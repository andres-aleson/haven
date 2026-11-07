import Link from "next/link";
import { AppTopNav } from "./AppNav";
import TalkToSomeoneButton from "./TalkToSomeoneButton";

export default function AppHeader({ active }: { active: string }) {
  return (
    <header className="bg-background flex justify-between items-center gap-stack-sm w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
      <Link href="/" className="text-headline-md font-headline-md text-primary">
        Haven
      </Link>
      <AppTopNav active={active} />
      <div className="flex items-center gap-stack-sm">
        <TalkToSomeoneButton variant="header" />
        <Link
          href="/favorites"
          aria-label="Favorites"
          className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          style={
            active === "/favorites"
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          favorite
        </Link>
      </div>
    </header>
  );
}
