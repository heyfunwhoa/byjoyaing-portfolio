import type { CaseBandStep } from "@/lib/design-lab-compositions";

export function CaseBand({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: readonly CaseBandStep[] }) {
  return (
    <article className="editorial-panel mt-6 bg-card p-5 sm:p-8" aria-label={title}>
      <p className="editorial-eyebrow text-accent">{eyebrow}</p>
      <h4 className="mt-2 font-display text-xl leading-tight sm:text-2xl">{title}</h4>
      <ol className="mt-6 grid border-l border-border pl-6 lg:grid-cols-5 lg:border-t lg:border-l-0 lg:pl-0">
        {steps.map((step) => (
          <li key={step.heading} className="group relative min-w-0 py-3 lg:px-3 lg:pt-6 lg:pb-0 lg:first:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-[1.15rem] -left-[1.8125rem] size-2.5 rounded-full border border-accent bg-card lg:-top-[0.3125rem] lg:left-3 lg:group-first:left-0"
            />
            <p className="text-sm font-semibold text-foreground">{step.heading}</p>
            <p className="editorial-prose mt-2 text-sm text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
