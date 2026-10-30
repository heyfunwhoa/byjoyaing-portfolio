import { AiLoop } from "@/components/ai-loop";
import { ToolkitExplorer } from "@/components/toolkit-explorer";
import { toolkitSections } from "@/lib/portfolio/toolkit-sections";
import { siteHowBuilt } from "@/lib/portfolio/toolkit-registry";

export function ToolsMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-5">
      <ToolkitExplorer sections={toolkitSections} compact={compact} />
      {compact ? null : (
        <div className="space-y-4">
          <section className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="editorial-eyebrow text-accent">Behind the build</p>
            <h3 className="mt-2 text-xl font-semibold">How this site is built</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              This portfolio is an independent build where I practice turning ideas into clear content,
              useful interactions, and reusable resources.
            </p>
            <details className="mt-4 rounded-xl border border-border bg-background px-4 open:border-accent">
              <summary className="min-h-11 cursor-pointer rounded-sm py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                Build notes
              </summary>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label="Core site technologies">
                {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((name) => (
                  <li key={name} className="max-w-full break-words rounded-full border border-border px-3 py-1 text-sm">
                    {name}
                  </li>
                ))}
              </ul>
              <dl className="mt-5 grid gap-3 text-sm leading-6 md:grid-cols-3">
                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                  <dt className="font-medium">Pages and interactions</dt>
                  <dd className="mt-2 text-muted">Next.js organizes the site. React builds the reusable interface pieces.</dd>
                </div>
                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                  <dt className="font-medium">Structure and visual consistency</dt>
                  <dd className="mt-2 text-muted">TypeScript helps check code assumptions. Tailwind CSS provides the styling utilities behind the layouts.</dd>
                </div>
                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                  <dt className="font-medium">Source and hosting</dt>
                  <dd className="mt-2 text-muted">GitHub holds the source and change history. Vercel hosts the portfolio.</dd>
                </div>
              </dl>
              <p className="mt-4 max-w-2xl pb-4 text-sm leading-6 text-muted">{siteHowBuilt}</p>
            </details>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <a href="https://github.com/heyfunwhoa/byjoyaing-portfolio" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">
                View portfolio source
              </a>
              <a href="/side-quests" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">
                Explore Side Quests
              </a>
            </div>
          </section>
          <details
            id="ai"
            className="scroll-mt-24 rounded-2xl border border-border bg-card px-4 open:border-accent"
          >
            <summary className="min-h-11 cursor-pointer rounded-sm py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              My approach to AI · Learning
            </summary>
            <div className="pb-4 pt-2">
              <AiLoop embedded />
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

