import {
  gtmRevenueWorkflows,
  projectActions,
  walkthroughAction,
} from "@/lib/project-presentation";
import Link from "next/link";

/**
 * One system story for the three public revenue write-ups.
 * The separate planner is not linked because this site has no public demo for it.
 */
export function GtmRevenueSystem({ current }: { current?: string }) {
  return (
    <section aria-labelledby="gtm-revenue-os-title" className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="editorial-eyebrow text-accent">One system</p>
      <h2 id="gtm-revenue-os-title" className="mt-2 font-display text-3xl tracking-tight">
        GTM Revenue OS
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Planning, coverage, and pipeline review for one fictional company. The figures are planning fixtures. These workflows belong to the same system, and each write-up stays on its own page.
      </p>
      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {gtmRevenueWorkflows.map((workflow) => {
          const action = projectActions[workflow.slug];
          const here = workflow.slug === current;
          return (
            <li key={workflow.slug} className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium text-muted">{workflow.name}</p>
              <p className="mt-2 text-sm leading-6">{workflow.detail}</p>
              {here ? (
                <p className="mt-3 text-sm font-medium">You are on this workflow.</p>
              ) : (
                <Link
                  href={action.href}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
                >
                  {action.label}
                  <span className="sr-only">: {workflow.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        The working planner is a separate app. These pages explain the decisions. They do not save a scenario, export a file, or open that app.
      </p>
      <Link
        href={walkthroughAction.href}
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
      >
        {walkthroughAction.label}
      </Link>
    </section>
  );
}
