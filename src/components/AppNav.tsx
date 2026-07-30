import Link from "next/link";

const ITEMS = [
  { href: "/home", label: "Home", icon: "home" },
  { href: "/library", label: "Library", icon: "grid_view" },
  { href: "/journal", label: "Journal", icon: "auto_stories" },
  { href: "/stats", label: "Stats", icon: "insights" },
];

export function AppTopNav({ active }: { active: string }) {
  return (
    <nav className="hidden md:flex gap-stack-lg items-center">
      {ITEMS.map((item) => {
        const isActive = item.href === active;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? "text-primary font-bold border-b-2 border-primary text-label-md font-label-md py-1"
                : "text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppBottomNav({ active }: { active: string }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_20px_0_rgba(74,101,73,0.06)] flex justify-around items-center px-4 py-2 rounded-t-xl">
      {ITEMS.map((item) => {
        const isActive = item.href === active;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200 transition-transform"
                : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
            }
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-caption font-caption">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
