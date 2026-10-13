import type { ReactNode } from "react";
import Link from "next/link";
import { CaseBandSteps } from "./case-band-steps";

type CaseSection = { heading: string; content: ReactNode };

type CaseConnection = { href: string; label: string; category: string };

export function ProfessionalCaseStudy({
  title,
  context,
  scope,
  collaboration,
  role,
  execution,
  evidence,
  reflection,
  requestHref,
  relatedHref,
  relatedLabel = "Explore related Field Notes",
  relatedItems,
}: {
  title: string;
  context: ReactNode;
  scope?: ReactNode;
  collaboration?: ReactNode;
  role: ReactNode;
  execution: ReactNode;
  evidence: ReactNode;
  reflection: ReactNode;
  requestHref?: string;
  relatedHref?: string;
  relatedLabel?: string;
  relatedItems?: readonly CaseConnection[];
}) {
  const sections: CaseSection[] = [
    { heading: "Context", content: context },
    { heading: "My contribution", content: role },
    { heading: "Execution and decisions", content: execution },
    { heading: "Evidence and limitations", content: evidence },
    { heading: "What I learned", content: reflection },
  ];
  return (
    <article className="editorial-panel bg-card p-5 sm:p-8" aria-label={title}>
      <h3 className="font-display text-2xl leading-tight sm:text-3xl">
        {title}
      </h3>
      {scope || collaboration ? <dl className="mt-4 grid gap-3 border-b border-border pb-4 text-sm sm:grid-cols-2">
        {scope ? <div><dt className="font-semibold">Scope of responsibility</dt><dd className="mt-1 leading-6 text-muted">{scope}</dd></div> : null}
        {collaboration ? <div><dt className="font-semibold">Who the work involved</dt><dd className="mt-1 leading-6 text-muted">{collaboration}</dd></div> : null}
      </dl> : null}
      <CaseBandSteps
        steps={sections}
        title={title}
        connections={
          relatedItems && relatedItems.length > 0 ? (
            <nav
              aria-label={`Explore connections for ${title}`}
              className="mt-7 border-t border-border pt-5"
            >
              <p className="editorial-eyebrow text-accent">Connect the story</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {relatedItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-12 flex-col justify-center rounded-lg border border-border bg-background px-4 py-3 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="text-xs text-muted">
                        {item.category}
                      </span>
                      <span className="mt-1 text-sm font-semibold text-accent">
                        {item.label} →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : relatedHref ? (
            <Link
              href={relatedHref}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
            >
              {relatedLabel} →
            </Link>
          ) : null
        }
      />
      {requestHref ? <Link href={requestHref} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Request more context →</Link> : null}
    </article>
  );
}
