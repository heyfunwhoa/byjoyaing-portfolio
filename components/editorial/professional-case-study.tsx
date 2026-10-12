import type { ReactNode } from "react";
import Link from "next/link";
import { CaseBandSteps } from "./case-band-steps";

type CaseSection = { heading: string; content: ReactNode };

type CaseConnection = { href: string; label: string; category: string };

export function ProfessionalCaseStudy({
  title,
  context,
  role,
  execution,
  evidence,
  reflection,
  relatedHref,
  relatedLabel = "Explore related Field Notes",
  relatedItems,
}: {
  title: string;
  context: ReactNode;
  role: ReactNode;
  execution: ReactNode;
  evidence: ReactNode;
  reflection: ReactNode;
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
    </article>
  );
}
