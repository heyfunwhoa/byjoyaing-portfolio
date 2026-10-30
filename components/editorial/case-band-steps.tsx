import type { ReactNode } from "react";

type Step = { heading: string; content: ReactNode };

/** Core contribution and evidence stay visible; longer execution unfolds explicitly. */
export function CaseBandSteps({
  steps,
  title,
  connections,
}: {
  steps: readonly Step[];
  title: string;
  connections?: ReactNode;
}) {
  const visible = steps.filter((step) =>
    ["Context", "My contribution", "Evidence and limitations"].includes(
      step.heading,
    ),
  );
  const detail = steps.filter((step) => !visible.includes(step));

  return (
    <>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {visible.map((step) => (
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
      <details className="mt-5 rounded-xl border border-border bg-background p-4">
        <summary className="min-h-11 cursor-pointer content-center rounded-sm py-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          Read the full story<span className="sr-only">: {title}</span>
        </summary>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {detail.map((step) => (
            <div key={step.heading}>
              <dt className="text-sm font-semibold">{step.heading}</dt>
              <dd className="editorial-prose mt-2 text-sm leading-6 text-muted [overflow-wrap:anywhere]">
                {step.content}
              </dd>
            </div>
          ))}
        </dl>
        {connections}
      </details>
    </>
  );
}
