import { CoverageExplorer } from "@/components/coverage-explorer";
import { RelatedWork } from "@/components/related-work";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";

export function AtlasCase() {
  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-muted">Project 01</p>
            <StatusBadge status="prototype" />
          </div>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Compare coverage without calling a gray cell a gap.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            A working sample of a detector catalog. Three sources, five credential types, and a filter. AWS keys and GitHub PATs are Covered for TruffleHog. Slack, GitLab, and GCP are Observed because those public detector folders exist. Verification for those three was not fully reviewed. Betterleaks and Kingfisher stay Not evaluated.
          </p>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium">Role</dt>
              <dd className="mt-1 leading-6 text-muted">I built this table and the rule that gray is not a gap.</dd>
            </div>
            <div>
              <dt className="font-medium">Stage</dt>
              <dd className="mt-1 leading-6 text-muted">Working prototype. Not a production scanner and not a Truffle Security product.</dd>
            </div>
          </dl>
          <a href="#comparison" className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
            Use the comparison
          </a>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-sm leading-6">
          <p className="text-xs font-medium text-muted">What this repository runs</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>3 sources, typed into the page</li>
            <li>5 credential types</li>
            <li>A browser filter</li>
            <li>No parser, database, or refresh job</li>
          </ul>
          <p className="mt-4 text-xs text-muted">Notes mention 910 parsed TruffleHog records and 14 enriched. Those rows are not in this table.</p>
        </div>
      </section>

      <section id="comparison" className="scroll-mt-24 border-b border-border py-16">
        <p className="text-sm font-medium text-muted">02 / The sample</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-5xl">The table you can filter.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Covered, Observed, and Not evaluated are different claims. The scroll on a narrow screen is the table, not the page.
        </p>
        <div className="mt-8">
          <CoverageExplorer />
        </div>
      </section>

      <section className="border-b border-border py-16">
        <p className="text-sm font-medium text-muted">03 / How to read a cell</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">Gray is not a gap.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Covered", "Reviewed for this sample. Only TruffleHog AWS keys and GitHub PATs."],
            ["Observed", "A public TruffleHog detector folder exists. Slack, GitLab, and GCP. Verification was not fully reviewed."],
            ["Not evaluated", "No review. Betterleaks and Kingfisher, and any type not in this table."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <p className="text-sm font-medium text-muted">04 / Not in this repository</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">The parser is a note, not a job.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          A later version would read public detector files at a pinned commit and leave unreviewed cells gray. That code is not here. This page does not call GitHub, and it does not refresh itself.
        </p>
        <RelatedWork slug="detector-coverage-atlas" />
      </section>
    </PageMain>
  );
}
