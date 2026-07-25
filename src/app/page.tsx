import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Top App Bar */}
      <header className="bg-background flex justify-between items-center w-full px-container-margin py-stack-sm max-w-7xl mx-auto z-50">
        <div className="text-headline-md font-headline-md text-primary">
          Haven
        </div>
        <nav className="hidden md:flex gap-stack-lg items-center">
          <a
            className="text-primary font-bold border-b-2 border-primary text-label-md font-label-md py-1"
            href="#"
          >
            Home
          </a>
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
        </nav>
        <div className="flex items-center gap-stack-md">
          <button
            aria-label="Favorites"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            favorite
          </button>
          <button
            aria-label="History"
            className="material-symbols-outlined text-primary p-2 hover:bg-surface-variant/50 rounded-full transition-all"
          >
            history
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden pt-stack-xl pb-stack-xl px-container-margin md:pt-32 md:pb-48">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-stack-xl items-center relative z-10">
            <div className="flex flex-col gap-stack-md max-w-xl">
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface leading-tight">
                A private space for your mind — no sign-ups with your name,
                no parents involved, totally free.
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant opacity-80 mt-2">
                Find calm, explore your feelings, and get support without the
                noise of social media or the clinical feel of a doctor&apos;s
                office.
              </p>
              <div className="flex flex-col sm:flex-row gap-gutter mt-stack-md">
                <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200">
                  Get Started
                </button>
                <button className="bg-transparent border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-video lg:aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50 scale-110" />
              <Image
                alt="Haven Illustration"
                width={800}
                height={800}
                className="w-full h-full object-contain relative z-20 drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJPldWBJQmrACXYE-wecYWE1LVu7q1bIDr0-qVimnwWxaQ7l6DmyPT1F8bBEjitH1cDbhhLnxSLO_X2d5DJBSIPJjwmFAE12RgXAuiV9iw1au9QmADTKKf3FZlp5C-j-hJuYjxZipDEnaD3MRIgiEyM4mMpL3Mnd0L7-DGNao-6fS2vOEZ5OXavGsKc-J8_5c5Y8aqkH8P4_HLoJ4d-tu5WmWnGHetyG2qDi1qsydruHe4ZgEwasW5z7daJLA9sBzLHMVro8BNO8gJ"
                priority
              />
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="bg-surface-container-low py-stack-xl px-container-margin">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-stack-lg">
              <span className="text-label-md font-label-md text-primary uppercase tracking-widest mb-stack-sm">
                Your Safety First
              </span>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Designed for Complete Privacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="bg-surface-container-lowest p-stack-lg rounded-xl soft-glow-shadow border-[1.5px] border-primary/10 flex flex-col gap-stack-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container mb-2">
                  <span className="material-symbols-outlined">
                    shield_person
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface">
                  100% anonymous
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  We never ask for your real name, phone number, or ID. Your
                  journey here is for your eyes only.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-stack-lg rounded-xl soft-glow-shadow border-[1.5px] border-primary/10 flex flex-col gap-stack-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container mb-2">
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface">
                  Free forever
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Access all tools and breathing exercises without ever
                  seeing a paywall or an ad.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-stack-lg rounded-xl soft-glow-shadow border-[1.5px] border-primary/10 flex flex-col gap-stack-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container mb-2">
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface">
                  No school or parent access
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  What you share here stays here. No reports sent to school
                  portals or notifications for parents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="py-stack-xl px-container-margin bg-background">
          <div className="max-w-4xl mx-auto bg-primary-container/30 rounded-xl p-stack-xl text-center flex flex-col items-center gap-stack-md">
            <h2 className="text-headline-md font-headline-md text-on-primary-container">
              Ready for a breath of fresh air?
            </h2>
            <p className="text-body-lg font-body-lg text-on-primary-container/80 max-w-lg">
              Join thousands of others finding their calm in a world that
              never stops moving.
            </p>
            <button className="bg-primary text-on-primary px-12 py-4 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 transition-all mt-stack-md">
              Start Your Haven
            </button>
          </div>
        </section>
      </main>

      {/* Bottom nav (mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_-4px_20px_0_rgba(74,101,73,0.06)] flex justify-around items-center px-4 py-2 rounded-t-xl">
        <a
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200 transition-transform"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="text-caption font-caption">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-caption font-caption">Library</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">insights</span>
          <span className="text-caption font-caption">Stats</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-caption font-caption">Profile</span>
        </a>
      </nav>

      {/* Footer (desktop only) */}
      <footer className="hidden md:block py-stack-lg px-container-margin border-t border-outline-variant/30 mt-auto bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-label-md font-label-md text-on-surface-variant">
            © 2026 Haven Project. Non-judgemental support.
          </div>
          <div className="flex gap-stack-md">
            <a
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Crisis Resources
            </a>
            <a
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
