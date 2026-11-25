import type { ReactNode } from "react";

type Step = { heading: string; content: ReactNode };

/** A Work card already controls disclosure. Its complete story reads in one place. */
export function CaseBandSteps({
  steps,
  title,
  connections,
}: {
  steps: readonly Step[];
  title: string;
  connections?: ReactNode;
}) {
  return (
    <>
      <dl aria-label={`Story details: ${title}`} className="mt-5 grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.heading}
            className={
              step.heading === "Evidence and limitations"
                ? "min-w-0 rounded-xl border border-border bg-surface-sage p-4 sm:col-span-2"
                : "min-w-0"
            }
          >
            <dt className="text-sm font-semibold">{step.heading}</dt>
            <dd className="editorial-prose mt-2 text-sm leading-6 text-muted [overflow-wrap:anywhere]">
              {step.content}
            </dd>
          </div>
        ))}
      </dl>
      {connections}
    </>
  );
}
