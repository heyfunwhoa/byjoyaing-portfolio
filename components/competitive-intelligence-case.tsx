import { CompetitiveIntelligenceWorkflow } from "@/components/competitive-intelligence-workflow";
import { RelatedWork } from "@/components/related-work";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import { providers } from "@/lib/competitive-intelligence-demo";

function Arrow({ direction }: { direction: "right" | "down" }) {
  const horizontal = direction === "right";
  return (
    <svg
      aria-hidden="true"
      viewBox={horizontal ? "0 0 32 16" : "0 0 16 32"}
      className={horizontal ? "hidden h-4 w-8 shrink-0 text-muted lg:block" : "mx-auto h-8 w-4 text-muted lg:hidden"}
    >
      {horizontal ? (
        <path d="M1 8h22M18 3l8 5-8 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      ) : (
        <path d="M8 1v22M3 18l5 8 5-8" fill="none" stroke="currentColor" strokeWidth="1.25" />
      )}
    </svg>
  );
}

function Label({ index, children }: { index: string; children: string }) {
  return (
    <p className="text-sm font-medium text-muted">
      <span className="tabular-nums">{index}</span>
      <span className="px-2" aria-hidden="true">
        /
      </span>
      {children}
    </p>
  );
}

function Node({ title, detail, state }: { title: string; detail: string; state: "field" | "demo" | "planned" }) {
  const copy = state === "field" ? "Field system" : state === "demo" ? "In this demo" : "Planned";
  const style =
    state === "planned"
      ? "rounded-full border border-dashed border-foreground/40 px-2 py-0.5 text-[11px] font-medium"
      : "rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium">{title}</p>
        <span className={style}>{copy}</span>
      </div>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
    </div>
  );
}

const layers = [
  {
    title: "Source collection",
    body: "Field briefs were written from public pages and deal notes. This site does not collect those sources.",
    nodes: [
      { title: "Official websites", detail: "Read by hand for briefs. Not crawled here.", state: "field" as const },
      { title: "Product documentation", detail: "Planned input. Not connected.", state: "planned" as const },
      { title: "Release notes", detail: "Planned input. Not connected.", state: "planned" as const },
      { title: "Public GitHub repositories", detail: "One cited URL. No GitHub API client.", state: "demo" as const },
    ],
  },
  {
    title: "Change intelligence",
    body: "The walkthrough shows a hand-written pair of sentences. Nothing is scheduled, snapshotted, or classified by software.",
    nodes: [
      { title: "Scheduled monitoring", detail: "Not built.", state: "planned" as const },
      { title: "Source snapshots", detail: "Not stored.", state: "planned" as const },
      { title: "Change detection", detail: "Illustrative pair only. Not a diff.", state: "demo" as const },
      { title: "Classification", detail: "One category, chosen by hand.", state: "demo" as const },
      { title: "Source attribution", detail: "The public URL stays on the claim.", state: "demo" as const },
    ],
  },
  {
    title: "Human review",
    body: "Recommendations do not approve themselves. A model is not called.",
    nodes: [
      { title: "Evidence verification", detail: "Briefs used with teams were reviewed by a person. Those files are not in this repo.", state: "field" as const },
      { title: "Impact analysis", detail: "A written hypothesis you can mark reviewed.", state: "demo" as const },
      { title: "Approved findings", detail: "One teaching claim on this page.", state: "demo" as const },
      { title: "Recommendation review", detail: "A review queue is not built.", state: "planned" as const },
    ],
  },
  {
    title: "Field activation",
    body: "Battlecards were documents. Alerts, CRM context, and change history are later.",
    nodes: [
      { title: "Competitive profiles", detail: "Briefs and playbooks used with teams. Not this app.", state: "field" as const },
      { title: "Battlecards", detail: "The sample brief in the walkthrough.", state: "demo" as const },
      { title: "Alerts", detail: "Not built.", state: "planned" as const },
      { title: "Field feedback", detail: "A form that stays in the browser.", state: "demo" as const },
      { title: "Change history", detail: "Not stored.", state: "planned" as const },
    ],
  },
];

export function CompetitiveIntelligenceCase() {
  const reviewed = providers.filter((provider) => provider.lastReviewed !== "Not reviewed").length;
  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-16 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-muted">Project 03</p>
            <Label index="01">Competitive strategy and GTM systems</Label>
            <StatusBadge status="field" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Competitive Intelligence Engine</p>
            <h1 className="mt-2 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Know what changed. Understand why it matters. Act with confidence.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted">
            A competitive system that would track product and market changes, keep the source on the claim, and turn that into guidance a seller can use. Sales, Product, and Product Marketing would share one reviewed loop. The briefs were used in the field. Monitoring is designed, not running.
          </p>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium">Role</dt>
              <dd className="mt-1 leading-6 text-muted">Competitive strategy, GTM enablement, and product systems.</dd>
            </div>
            <div>
              <dt className="font-medium">Stage</dt>
              <dd className="mt-1 leading-6 text-muted">Field-system foundation. Monitoring is designed, not software in this repository.</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#workflow" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
              Explore the workflow
            </a>
            <a href="#architecture" className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium">
              View technical architecture
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium tracking-wide text-muted">Intelligence workspace</p>
            <p className="text-[11px] text-muted">Illustrative demo data</p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-muted">Example providers</dt>
              <dd className="mt-1 text-2xl font-semibold">{providers.length}</dd>
            </div>
            <div>
              <dt className="text-muted">Sources reviewed here</dt>
              <dd className="mt-1 text-2xl font-semibold">{reviewed}</dd>
            </div>
            <div>
              <dt className="text-muted">Live monitors</dt>
              <dd className="mt-1 text-2xl font-semibold">0</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl border border-border bg-background p-4 text-sm leading-6">
            <p className="text-[11px] font-medium text-muted">Recent example</p>
            <p className="mt-1 font-medium">TruffleHog · product capability</p>
            <p className="mt-2 text-muted">An illustrative sentence pair, not a historical vendor change. Review status: needs a person.</p>
            <p className="mt-2 text-muted">Available brief: Detection is not verification.</p>
            <a href="#workflow" className="mt-3 inline-flex text-sm font-medium text-accent">
              View details
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <Label index="02">The intelligence problem</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Competitive knowledge changes. Static battlecards do not.
        </h2>
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="rounded-2xl border border-dashed border-foreground/30 p-5">
            <h3 className="text-sm font-medium text-muted">Before</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              <li>Competitor notes scattered across deals</li>
              <li>Decks that go stale after the meeting</li>
              <li>Claims with no source and no date</li>
              <li>The useful detail stuck with one seller</li>
              <li>The same public page read twice</li>
            </ul>
          </div>
          <svg aria-hidden="true" viewBox="0 0 48 120" className="mx-auto hidden h-28 w-12 text-muted lg:block">
            <path d="M4 60h40M32 48l12 12-12 12" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-accent">Designed system</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              <li>A profile per provider, with what is not evaluated left blank</li>
              <li>A short list of public sources, not the whole web</li>
              <li>The original page and review date kept on the claim</li>
              <li>Field guidance only after a person approves it</li>
              <li>One brief another rep can teach</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-border py-16">
        <Label index="03">Product experience</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          From a competitor change to field execution.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Five steps in the browser. Providers are examples. Only TruffleHog has a reviewed public source in this sample. Nothing here monitors a site.
        </p>
        <div className="mt-8">
          <CompetitiveIntelligenceWorkflow />
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-b border-border py-16">
        <Label index="04">System architecture</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          How the intelligence system would work.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Solid pills are the field habit or this sample. Dashed pills are planned. This repository does not use Firecrawl, Exa, a GitHub API client, or a model.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-start lg:gap-3">
          {layers.map((layer, index) => (
            <div key={layer.title} className="contents">
              {index > 0 ? (
                <>
                  <Arrow direction="down" />
                  <div className="hidden pt-10 lg:block">
                    <Arrow direction="right" />
                  </div>
                </>
              ) : null}
              <article className="min-w-0 flex-1 rounded-2xl border border-border p-4">
                <h3 className="text-base font-semibold">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{layer.body}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {layer.nodes.map((node) => (
                    <li key={node.title}>
                      <Node {...node} />
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16">
        <Label index="05">Product decisions</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Designing for trustworthy intelligence.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Evidence before interpretation", "A claim keeps the original source and the review date. A sentence without those two is not ready for the field."],
            ["A person approves the guidance", "Change detection can point at a diff. It cannot approve what a seller is allowed to say."],
            ["A short list before broad coverage", "Start with a few providers and sources that can be checked. An empty cell stays empty."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
        <details className="mt-6 rounded-2xl border border-border p-5">
          <summary className="cursor-pointer font-semibold">Technical notes</summary>
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-6 text-muted">
            <p>
              <span className="font-medium text-foreground">Planned records. </span>
              Competitor, Claim, Change, Impact, Recommendation, Deal context.
            </p>
            <p>
              <span className="font-medium text-foreground">MVP question. </span>
              Does a shared brief change how a deal is run more than a one-off deck?
            </p>
            <p>
              <span className="font-medium text-foreground">Out of scope. </span>
              Scraping the entire internet, and automated public attack content.
            </p>
          </div>
        </details>
      </section>

      <section className="border-b border-border py-16">
        <Label index="06">Outcomes and roadmap</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Measuring intelligence quality and field adoption.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Proposed success criteria. Nothing below has been measured in this repository.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["System reliability", ["Source monitoring coverage", "Change detection latency", "Evidence completeness"]],
            ["Intelligence quality", ["Time to human review", "Percentage of findings approved", "Battlecard freshness"]],
            ["Field adoption", ["Brief usage", "Field feedback submissions", "Competitive opportunity usage"]],
          ].map(([title, items]) => (
            <article key={title as string} className="rounded-2xl border border-border p-5">
              <h3 className="text-sm font-medium text-muted">{title as string}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium">Proposed. Not measured.</p>
            </article>
          ))}
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Field system now", ["Structured competitor profiles", "Source-backed battlecards", "Reusable field briefs"]],
            ["Next", ["Scheduled source snapshots", "Change detection", "Human-reviewed updates"]],
            ["Later", ["Field alerts", "CRM opportunity context", "Product feedback integration", "Historical change analytics"]],
          ].map(([when, items]) => (
            <li key={when as string} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-medium">{when as string}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <RelatedWork slug="competitive-intelligence-engine" />
    </PageMain>
  );
}
