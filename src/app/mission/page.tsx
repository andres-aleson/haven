import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";

const PRINCIPLES = [
  {
    icon: "lock",
    title: "Anonymous by design",
    body: "No sign-up, no real name, no parent or school in the loop. You can get support here without worrying about being judged or outed to anyone.",
  },
  {
    icon: "bolt",
    title: "Help the moment you need it",
    body: "No appointment, no waiting list. When anxiety hits — at 2pm or 2am — the tools are already here, ready in a couple of taps.",
  },
  {
    icon: "insights",
    title: "Progress that's yours to see",
    body: "A simple way to check in and track your mood over time, so managing your anxiety starts to feel like something you're in control of — not something just happening to you.",
  },
];

export default function Mission() {
  return (
    <>
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <Link href="/" className="text-headline-md font-headline-md text-primary">
          Haven
        </Link>
        <MarketingNav active="/mission" />
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin py-stack-xl">
        <section className="mb-stack-xl text-center">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">
            Why We Built Haven
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            Not another wellness app. A response to a very specific problem.
          </p>
        </section>

        <section className="flex flex-col gap-stack-md mb-stack-xl">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            The problem
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Therapy costs money, and it usually requires a parent&apos;s
            insurance, a parent&apos;s permission, or both. School counselors
            can help, but they aren&apos;t always confidential — some are
            required to loop in a parent or an administrator, especially for
            anything serious. And even when support is available, it runs on
            someone else&apos;s schedule. Anxiety doesn&apos;t.
          </p>
          <p className="text-body-md font-body-md text-on-surface-variant">
            For a teenager without steady money, without a therapist, and
            without an adult they can safely bring this to, that leaves a
            real gap: somewhere to go the moment anxiety actually hits, with
            no strings attached.
          </p>
        </section>

        <section className="flex flex-col gap-stack-md mb-stack-xl">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            Who we built this for
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Haven is built for a teenager managing anxiety mostly on their
            own — not because they don&apos;t want help, but because the
            usual paths to it (a school counselor, a paid therapist, a
            parent) aren&apos;t always safe, available, or affordable.
            Someone who needs a way to calm down in the moment, not a
            six-week waitlist. Someone who wants to feel like they&apos;re
            getting better at managing this, not like it&apos;s something
            only happening to them.
          </p>
        </section>

        <section className="flex flex-col gap-stack-md mb-stack-xl">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            What that means for Haven
          </h2>
          <div className="flex flex-col gap-gutter">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="bg-surface-container-lowest rounded-xl border-[1.5px] border-primary/10 soft-glow-shadow p-stack-lg flex flex-col gap-stack-sm"
              >
                <div className="flex items-center gap-stack-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-on-primary-container"
                      aria-hidden="true"
                    >
                      {principle.icon}
                    </span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-on-surface">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center flex flex-col sm:flex-row gap-gutter justify-center">
          <Link
            href="/home"
            className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Get Started
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
