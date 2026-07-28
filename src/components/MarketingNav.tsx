import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/safety", label: "Safety" },
  { href: "/privacy", label: "Privacy" },
  { href: "/crisis-resources", label: "Crisis Resources" },
];

export default function MarketingNav({ active }: { active: string }) {
  return (
    <nav className="hidden md:flex gap-stack-lg items-center">
      {NAV_ITEMS.map((item) => {
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
