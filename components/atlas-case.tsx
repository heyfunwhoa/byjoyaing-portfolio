import { PortfolioExample } from "@/components/portfolio-example";
import { portfolioExamples } from "@/lib/portfolio-examples";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { RelatedWork } from "@/components/related-work";
import { PageMain } from "@/components/page-main";
import { WorkCaseBreadcrumb } from "@/components/work-case-breadcrumb";
import { CaseStudyContents } from "@/components/case-study-contents";
import { ProjectKindLabel } from "@/components/project-kind-label";

export function AtlasCase() {
  return (
    <PageMain>
      <section className="border-b border-border py-16 lg:py-20">
        <div className="flex max-w-3xl flex-col gap-6">
          <WorkCaseBreadcrumb slug="detector-coverage-atlas" />
          <div className="flex flex-wrap items-center gap-3">
            <ProjectKindLabel slug="detector-coverage-atlas" />
          </div>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Compare coverage without calling a gray cell a gap.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            For security practitioners and technical sellers comparing secret-detection coverage, this sample makes the evidence easier to inspect. Compare three sources across five credential types, distinguish reviewed coverage from observations, and see what still needs investigation. My aim is to help people ask better security questions without turning missing evidence into a product claim.
          </p>
          <p className="text-sm leading-6 text-muted">I built this table and the rule that gray is not a gap.</p>
          <a href="#comparison" className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
            Try the example
          </a>
        </div>
      </section>

      <CaseStudyContents
        sections={[
          { id: "comparison", label: "Compare coverage" },
          { id: "read-the-cell", label: "Read a cell" },
          { id: "attribution", label: "Sources and attribution" },
          { id: "not-in-repository", label: "How it works" },
        ]}
      />

      <PortfolioExample key="detector-coverage-atlas" example={portfolioExamples["detector-coverage-atlas"]} />

      <ProjectTechnologyStack slug="detector-coverage-atlas" />

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

      <section id="read-the-cell" className="scroll-mt-24 border-b border-border py-16">
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

      <section id="attribution" className="scroll-mt-24 border-b border-border py-12">
        <p className="text-sm font-medium text-muted">04 / Open-source attribution and original contribution</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Independent catalog, credited upstream source.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Detector Coverage Atlas is my independent research and visualization project. Its detector facts are derived from public TruffleHog source code at pinned revisions; the TruffleHog detector engine and its implementations belong to their upstream project and contributors. This portfolio&apos;s comparison is a small static sample, not the full Atlas ingestion application.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          The upstream TruffleHog v3 repository identifies AGPL-3.0 as its license. Reading and attributing source is different from copying or modifying covered code. A future fork could explore Go detectors.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm">
          <a href="https://github.com/trufflesecurity/trufflehog" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline">Original TruffleHog project ↗</a>
          <a href="https://github.com/trufflesecurity/trufflehog/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline">Upstream license ↗</a>
          <a href="https://github.com/heyfunwhoa/detector-coverage-atlas" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline">Independent Atlas repository ↗</a>
        </div>
      </section>

      <section id="not-in-repository" className="scroll-mt-24 py-16">
        <p className="text-sm font-medium text-muted">05 / How it works</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">A static sample you can filter.</h2>
        <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-base leading-7 text-muted">
          <li>Three sources and five credential types, typed into this page.</li>
          <li>A browser filter.</li>
          <li>Notes elsewhere mention 910 parsed TruffleHog records and 14 enriched. Those rows are not in this table.</li>
        </ul>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Filter the example catalog and inspect the source notes. Unreviewed cells stay gray. The table reflects a fixed set of reviewed examples, maintained independently from Truffle Security.
        </p>
        <RelatedWork slug="detector-coverage-atlas" />
      </section>
    </PageMain>
  );
}

