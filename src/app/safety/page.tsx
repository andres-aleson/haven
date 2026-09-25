import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";

const POINTS = [
  {
    icon: "verified_user",
    title: "A judgment-free space",
    body: "Nothing you do here is monitored, graded, or reported. There's no counselor reviewing what you write, and no record that follows you anywhere else.",
  },
  {
    icon: "health_and_safety",
    title: "This isn't emergency care",
    body: "Haven's tools can help with everyday anxiety and stress, but they're not a substitute for professional help. If you're in crisis or thinking about harming yourself, please use our Crisis Resources — free, confidential, and available right now.",
  },
  {
    icon: "toggle_on",
    title: "You're always in control",
    body: "Skip anything that doesn't feel right. Stop an exercise halfway through. Write one word or a hundred. There's no pressure to finish or to feel a certain way.",
  },
  {
    icon: "group_off",
    title: "No ads, no strangers",
    body: "Haven doesn't show ads and doesn't have public profiles, comments, or messaging. It's just you and the tools — no one else can see or contact you here.",
  },
];

export default function Safety() {
  return (
    <>
      <MarketingHeader active="/safety" />

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl">
        <section className="mb-stack-xl text-center">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Your Safety Comes First
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            Haven is built to be a calm, judgment-free place. Here&apos;s
            exactly what that means.
          </p>
        </section>

        <div className="flex flex-col gap-gutter">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm"
            >
              <div className="flex items-center gap-stack-sm">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-on-primary-container"
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

        <div className="text-center mt-stack-xl flex flex-col sm:flex-row gap-gutter justify-center">
          <Link
            href="/crisis-resources"
            className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Need help right now?
          </Link>
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
