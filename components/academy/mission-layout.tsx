"use client";

import { useRef, type ReactNode } from "react";

/** Navigation stays available even when a check is unanswered. */
export function MissionLayout({
  steps,
  step,
  onStep,
  children,
  embedded = false,
  headingId = "mission-step",
}: {
  steps: readonly string[];
  step: number;
  onStep: (step: number) => void;
  children: ReactNode;
  /** Embedded lessons follow an h3 and use a compact navigation row. */
  embedded?: boolean;
  headingId?: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const Heading = embedded ? "h4" : "h2";
  function go(next: number) {
    onStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return (
    <div
      className={`grid min-w-0 ${embedded ? "mt-6 gap-5" : "mt-8 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]"}`}
    >
      <nav aria-label="Mission steps">
        <ol
          className={`grid grid-cols-2 gap-2 ${embedded ? "sm:grid-cols-4" : "lg:grid-cols-1"}`}
        >
          {steps.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={step === i ? "step" : undefined}
                className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors motion-reduce:transition-none ${step === i ? "border-accent bg-card font-semibold" : "border-border hover:bg-card"}`}
              >
                <span className="mr-2 text-accent">{i + 1}.</span> {label}
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs leading-5 text-muted">
          Explore in any order. Reading is never locked behind a quiz.
        </p>
      </nav>
      <section
        aria-labelledby={headingId}
        className={`min-w-0 rounded-2xl border border-border bg-card ${embedded ? "p-4 sm:p-5" : "p-5 sm:p-8"}`}
      >
        <p className="text-xs font-semibold tracking-wider text-accent uppercase">
          Step {step + 1} of {steps.length}
        </p>
        <Heading
          id={headingId}
          ref={heading}
          tabIndex={-1}
          className={`mt-2 font-display ${embedded ? "text-2xl" : "text-3xl"}`}
        >
          {steps[step]}
        </Heading>
        <div className="mt-6 space-y-5">{children}</div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-5">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => go(step - 1)}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            >
              Continue to {steps[step + 1]}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(0)}
              className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm"
            >
              Review from the beginning
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
