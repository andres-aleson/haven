import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";

const POINTS = [
  {
    icon: "no_accounts",
    title: "No sign-up, no real name",
    body: "There's no account to create. We never ask for your real name, email address, phone number, or any form of ID — not at sign-up, and not ever.",
  },
  {
    icon: "domain_disabled",
    title: "Nothing shared with parents or schools",
    body: "There's no portal, report, or notification sent anywhere. What you do in Haven stays in Haven — no one else gets to see it.",
  },
  {
    icon: "money_off",
    title: "No ads, nothing sold",
    body: "Haven is free forever. We don't show ads, and we don't sell your information to advertisers or anyone else.",
  },
  {
    icon: "shield",
    title: "No tracking",
    body: "We don't use tracking cookies or ad trackers to follow you around the web. Haven isn't watching what you do outside this app.",
  },
];

export default function Privacy() {
  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <MarketingNav active="/privacy" />
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl">
        <section className="mb-stack-xl text-center">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Privacy, Protected
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            Anonymity isn&apos;t a feature we bolted on — it&apos;s the whole
            point. Here&apos;s exactly what that means.
          </p>
        </section>

        <div className="flex flex-col gap-gutter">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-on-secondary-container"
                    aria-hidden="true"
                  >
                    {point.icon}
                  </span>
                </div>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  {point.title}
                </h2>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant">
                {point.body}
              </p>
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
