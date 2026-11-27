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
          <p className="text-sm leading-6 text-muted">I built the live catalog and this comparison example, with the rule that gray is not a gap.</p>
          <a href="#comparison" className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
            Try the example
          </a>
          <a href="https://detector-coverage-atlas.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit items-center text-sm font-semibold text-accent underline underline-offset-4">
            Open the live catalog<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="text-sm leading-6 text-muted">The live catalog links detector and analyzer facts to pinned source. The comparison below is a fixed teaching example.</p>
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
        <aside aria-labelledby="atlas-evidence-guide" className="mt-7 rounded-xl border border-border bg-surface-sage p-4 sm:p-5">
          <h3 id="atlas-evidence-guide" className="text-base font-semibold">What this comparison can tell you</h3>
          <dl className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <dt className="text-sm font-semibold">What you can inspect</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">A fixed example of three sources and five credential types, with distinct review states.</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">What it does not establish</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">Live detection, complete coverage, verified product gaps, or continuous monitoring.</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">How to interpret it</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">Filter a credential type, then read the cell definitions and source attribution before drawing conclusions.</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <a href="#read-the-cell" className="inline-flex min-h-11 items-center text-accent underline">Read the evidence states</a>
            <a href="#attribution" className="inline-flex min-h-11 items-center text-accent underline">Inspect source attribution</a>
          </div>
        </aside>
        <div className="mt-8">
          <CoverageExplorer />
        </div>
        <div className="mt-8 max-w-2xl">
          <h3 id="what-covered-means" className="scroll-mt-24 font-display text-2xl tracking-tight">
            What does “covered” mean in a secret-scanning evaluation?
          </h3>
          <p className="mt-3 leading-7 text-muted">
            In this table, “Covered” means I reviewed the evidence for that credential type.
            I marked Slack “Observed” because I found a detector folder in the public TruffleHog source.
            I’d still want to check which Slack token types it recognizes and whether it can verify that a match is active.
          </p>
          <p className="mt-3 leading-7 text-muted">
            If a buyer asked, “Would you catch our Slack tokens?” I’d say, “Which kind of token are you worried about?
            I’ll check detection and verification with our solutions engineer so you know what your team would actually see in an alert.”
          </p>
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
          <a href="https://detector-coverage-atlas.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline">Live Atlas catalog ↗</a>
        </div>
      </section>

      <section id="not-in-repository" className="scroll-mt-24 py-16">
        <p className="text-sm font-medium text-muted">05 / How it works</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">A static sample you can filter.</h2>
        <details className="mt-5 max-w-2xl rounded-xl border border-border bg-card p-4">
          <summary className="flex min-h-11 cursor-pointer items-center py-2 font-medium text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            How the sample is built
          </summary>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
            <li>Three sources and five credential types, typed into this page.</li>
            <li>A browser filter. Unreviewed cells stay gray.</li>
          </ul>
          <p className="mt-3 text-base leading-7 text-muted">
            The table reflects a fixed set of reviewed examples, maintained independently from Truffle Security.
          </p>
        </details>
        <RelatedWork slug="detector-coverage-atlas" />
      </section>
    </PageMain>
  );
}

