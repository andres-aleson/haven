"use client";

import { useId, useRef } from "react";
import Link from "next/link";

export default function TalkToSomeoneButton({
  variant = "header",
}: {
  variant?: "header" | "inline";
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const triggerClasses =
    variant === "header"
      ? "flex items-center gap-1 whitespace-nowrap bg-primary text-on-primary px-3 py-2 sm:px-4 rounded-full text-caption sm:text-label-md font-caption sm:font-label-md hover:scale-105 active:scale-95 transition-all duration-200"
      : "flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md soft-glow-shadow hover:scale-105 active:scale-95 transition-all duration-200";

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={triggerClasses}
      >
        <span
          className="material-symbols-outlined text-[18px] sm:text-[20px]"
          aria-hidden="true"
        >
          support_agent
        </span>
        Talk to someone now
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // A click on the backdrop lands on the <dialog> itself; clicks inside
        // land on the padded wrapper below, so this only closes from outside.
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl p-0 bg-surface-container-lowest text-on-surface shadow-xl backdrop:bg-black/40"
      >
        <div className="p-stack-lg flex flex-col gap-stack-md">
          <div className="flex items-start justify-between gap-stack-sm">
            <h2
              id={titleId}
              className="text-headline-md font-headline-md text-on-surface"
            >
              Talk to someone now
            </h2>
            <form method="dialog">
              <button
                aria-label="Close"
                className="material-symbols-outlined p-1 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-colors"
              >
                close
              </button>
            </form>
          </div>

          <p className="text-body-md font-body-md text-on-surface-variant">
            These are real people, free and open 24/7. You don&apos;t have to
            explain everything — just say hi.
          </p>

          <div className="flex flex-col gap-stack-sm">
            <a
              href="tel:988"
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md text-center hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              Call 988
            </a>
            <a
              href="sms:988"
              className="border-2 border-primary text-primary px-6 py-3 rounded-full font-label-md text-label-md text-center hover:bg-primary/5 transition-colors"
            >
              Text 988
            </a>
            <a
              href="sms:741741"
              className="border-2 border-primary text-primary px-6 py-3 rounded-full font-label-md text-label-md text-center hover:bg-primary/5 transition-colors"
            >
              Text HOME to 741741 (Crisis Text Line)
            </a>
          </div>

          <p className="text-caption font-caption text-on-surface-variant">
            In immediate danger? Call 911.{" "}
            <Link
              href="/crisis-resources"
              className="text-primary font-bold underline"
            >
              See all crisis resources
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}
