import Link from "next/link";

const RESOURCES = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description:
      "Free, confidential support 24/7 for anyone in emotional distress or thinking about suicide — not just in a crisis.",
    icon: "support_agent",
    actions: [
      { label: "Call 988", href: "tel:988" },
      { label: "Text 988", href: "sms:988" },
    ],
  },
  {
    name: "Crisis Text Line",
    description:
      "Free, 24/7 support over text, if talking out loud doesn't feel possible right now.",
    icon: "sms",
    actions: [{ label: "Text HOME to 741741", href: "sms:741741" }],
  },
  {
    name: "The Trevor Project",
    description:
      "Crisis support for LGBTQ+ young people, available by phone or text, 24/7.",
    icon: "diversity_3",
    actions: [
      { label: "Call 1-866-488-7386", href: "tel:+18664887386" },
      { label: "Text START to 678678", href: "sms:678678" },
    ],
  },
];

export default function CrisisResources() {
  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <nav className="hidden md:flex gap-stack-lg items-center">
          <Link
            href="/"
            className="text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
          >
            Home
          </Link>
          <a
            className="text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
            href="#"
          >
            Safety
          </a>
          <a
            className="text-on-surface-variant text-label-md font-label-md py-1 hover:bg-surface-variant/50 transition-colors"
            href="#"
          >
            Privacy
          </a>
          <Link
            href="/crisis-resources"
            className="text-primary font-bold border-b-2 border-primary text-label-md font-label-md py-1"
          >
            Crisis Resources
          </Link>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl">
        <section className="mb-stack-xl text-center">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            You don&apos;t have to go through this alone
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            These are free, confidential, and available right now — no
            parent or school involved. If you&apos;re in immediate physical
            danger, please call 911.
          </p>
        </section>

        <div className="flex flex-col gap-gutter">
          {RESOURCES.map((resource) => (
            <div
              key={resource.name}
              className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-on-primary-container"
                    aria-hidden="true"
                  >
                    {resource.icon}
                  </span>
                </div>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  {resource.name}
                </h2>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant">
                {resource.description}
              </p>
              <div className="flex flex-wrap gap-gutter mt-stack-sm">
                {resource.actions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-stack-xl">
          <Link
            href="/"
            className="bg-transparent border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
