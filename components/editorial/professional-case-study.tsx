import type { ReactNode } from "react";
import Link from "next/link";

type CaseSection = { heading: string; content: ReactNode };

export function ProfessionalCaseStudy({
  title,
  context,
  role,
  execution,
  evidence,
  reflection,
  relatedHref,
  relatedLabel = "Explore related Field Notes",
}: {
  title: string;
  context: ReactNode;
  role: ReactNode;
  execution: ReactNode;
  evidence: ReactNode;
  reflection: ReactNode;
  relatedHref?: string;
  relatedLabel?: string;
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
      <h3 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h3>
      <dl className="mt-6 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.heading} className="min-w-0 border-t border-border pt-3">
            <dt className="text-sm font-semibold text-foreground">{section.heading}</dt>
            <dd className="editorial-prose mt-2 text-sm text-muted">{section.content}</dd>
          </div>
        ))}
      </dl>
      {relatedHref ? <Link href={relatedHref} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">{relatedLabel} →</Link> : null}
    </article>
  );
}
