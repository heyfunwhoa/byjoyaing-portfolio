import type { ReactNode } from "react";

/**
 * Project pages share one job: name the problem, the contribution, and one
 * example a visitor can use. Status and implementation detail stay later.
 */
export function ProjectStoryLead({
  problem,
  why,
  without,
  contribution,
  example,
}: {
  problem: string;
  why: string;
  without: string;
  contribution: string;
  example: ReactNode;
}) {
  return (
    <div className="grid gap-10">
      <section id="problem" className="scroll-mt-24" aria-labelledby="problem-title">
        <h2 id="problem-title" className="text-lg font-semibold tracking-tight text-foreground">
          The problem
        </h2>
        <div className="mt-3 max-w-2xl space-y-3 text-base leading-7 text-muted">
          <p>{problem}</p>
          <p>{why}</p>
          <p>Without a repeatable answer: {without}</p>
        </div>
      </section>
      <section id="contribution" className="scroll-mt-24" aria-labelledby="contribution-title">
        <h2 id="contribution-title" className="text-lg font-semibold tracking-tight text-foreground">
          My contribution
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{contribution}</p>
      </section>
      <section id="example" className="scroll-mt-24" aria-labelledby="example-title">
        <h2 id="example-title" className="text-lg font-semibold tracking-tight text-foreground">
          One example
        </h2>
        <div className="mt-3 max-w-2xl">{example}</div>
      </section>
    </div>
  );
}
