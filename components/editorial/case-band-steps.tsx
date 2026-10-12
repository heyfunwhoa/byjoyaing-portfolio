"use client";

import { useId, useState, type ReactNode } from "react";

type Step = { heading: string; content: ReactNode };

/**
 * Five columns from 1024px. Below that, a vertical rail where each step shows two
 * lines until the reader expands the story. Clamping is visual only: the full text
 * stays in the accessibility tree.
 */
export function CaseBandSteps({ steps, title }: { steps: readonly Step[]; title: string }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  return (
    <>
      <ol id={listId} className="mt-6 grid border-l border-border pl-6 lg:grid-cols-5 lg:border-t lg:border-l-0 lg:pl-0">
        {steps.map((step) => (
          <li key={step.heading} className="group relative min-w-0 py-2.5 lg:px-3 lg:pt-6 lg:pb-0 lg:first:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-[1.05rem] -left-[1.8125rem] size-2.5 rounded-full border border-accent bg-card lg:-top-[0.3125rem] lg:left-3 lg:group-first:left-0"
            />
            <h4 className="text-sm font-semibold text-foreground">{step.heading}</h4>
            <div className={`editorial-prose mt-1.5 text-sm text-muted lg:mt-2 lg:line-clamp-none ${expanded ? "" : "line-clamp-2"}`}>
              {step.content}
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((value) => !value)}
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4 lg:hidden"
      >
        {expanded ? "Show less" : "Read the full story"}
        <span className="sr-only">: {title}</span>
      </button>
    </>
  );
}
