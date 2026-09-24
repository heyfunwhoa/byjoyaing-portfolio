import { AccountIntelligenceWorkflow } from "@/components/account-intelligence-workflow";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import { demoAccounts, demoSignals } from "@/lib/account-intelligence-demo";
import Link from "next/link";

const planned = ["Supabase", "Exa", "Sumble", "Claude"] as const;

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="text-sm font-medium text-muted">
      <span className="tabular-nums">{index}</span>
      <span className="px-2 text-border" aria-hidden="true">
        /
      </span>
      {children}
    </p>
  );
}

function Node({
  title,
  detail,
  state,
}: {
  title: string;
  detail: string;
  state: "demo" | "planned";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <span
          className={
            state === "demo"
              ? "rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
              : "rounded-full border border-dashed border-foreground/40 px-2 py-0.5 text-[11px] font-medium text-foreground"
          }
        >
          {state === "demo" ? "In this demo" : "Planned"}
        </span>
      </div>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
    </div>
  );
}

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

const columns = [
  {
    title: "Data collection",
    body: "Assignments would arrive from territory mapping or be typed in, then sit in this app’s own database. Exa and Sumble are the research sources in the design. None of those connections run here.",
    nodes: [
      { title: "Territory mapping", detail: "Would send account assignments. The partner page is a design, not a live webhook.", state: "planned" as const },
      { title: "Manual entry", detail: "A rep could add an account when no assignment exists.", state: "planned" as const },
      { title: "Supabase", detail: "Planned store for accounts, signals, and drafts. Not a dependency of this site.", state: "planned" as const },
      { title: "Exa and Sumble", detail: "Planned sources for public company changes. Not called from this repo.", state: "planned" as const },
    ],
  },
  {
    title: "Intelligence processing",
    body: "Events would be normalized, tied to an assigned account, classified, and stored. This page classifies four sample rows by hand.",
    nodes: [
      { title: "Normalize and classify", detail: "Funding, leadership, hiring, technology, or news. A person confirms the type.", state: "planned" as const },
      { title: "Account association", detail: "A signal stays attached to one assigned account. Unmatched items do not enter the feed.", state: "planned" as const },
      { title: "Signal storage", detail: "Planned records: signals and signal_feed_reads.", state: "planned" as const },
    ],
  },
  {
    title: "Sales activation",
    body: "The feed and the draft on this page are a browser walkthrough. Copy works locally. Claude is not called, and nothing is sent.",
    nodes: [
      { title: "Personal feed", detail: "The sample list in the walkthrough above.", state: "demo" as const },
      { title: "Claude draft", detail: "Planned. The demo swaps two local paragraphs instead.", state: "planned" as const },
      { title: "Human review", detail: "A rep checks the source before anyone sends.", state: "demo" as const },
      { title: "Copy", detail: "Copy draft writes the sample text to the clipboard.", state: "demo" as const },
    ],
  },
];

export function AccountIntelligenceCase() {
  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <SectionLabel index="01">GTM systems</SectionLabel>
            <StatusBadge status="designed" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Account Intelligence</p>
            <h1 className="mt-2 max-w-xl font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-6xl">
              Turn account signals into timely, relevant outreach.
            </h1>
          </div>
          <div className="max-w-xl space-y-3 text-base leading-7 text-muted">
            <p>
              A personal workspace for an enterprise rep: assigned accounts, a classified change, and a draft that cites that change.
            </p>
            <p>
              The walkthrough below is sample data in this portfolio. It is not a deployed feed, and it does not call a model.
            </p>
          </div>
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-medium text-foreground">My role</dt>
              <dd className="mt-1 leading-6 text-muted">Product design and GTM systems</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Scope</dt>
              <dd className="mt-1 leading-6 text-muted">Personal feed. Not a team admin console.</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Technology</dt>
              <dd className="mt-1 leading-6 text-muted">
                Next.js for this walkthrough. {planned.join(", ")} are planned, not running here.
              </dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#workflow"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground"
            >
              Explore the workflow
            </a>
            <a
              href="#architecture"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-foreground"
            >
              View technical architecture
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
            <p className="text-xs font-medium tracking-wide text-muted">Account intelligence</p>
            <p className="text-[11px] text-muted">Illustrative demo data</p>
          </div>
          <div className="mt-4 flex gap-6 text-sm">
            <p>
              <span className="block text-2xl font-semibold">{demoAccounts.length}</span>
              <span className="text-muted">Sample accounts</span>
            </p>
            <p>
              <span className="block text-2xl font-semibold">{demoSignals.length}</span>
              <span className="text-muted">Sample signals</span>
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-[11px] font-medium text-muted">Leadership change</p>
            <p className="mt-1 font-medium">Acme Corp</p>
            <p className="mt-1 text-sm leading-6 text-muted">New VP of Application Security appointed.</p>
            <p className="mt-3 text-xs text-muted">Hypothesis, not a fact: they may review current tooling.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16" aria-labelledby="problem-title">
        <SectionLabel index="02">The problem</SectionLabel>
        <h2 id="problem-title" className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          The problem isn&apos;t finding information. It&apos;s turning information into action.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          A rep already has news, job posts, and CRM notes. What they lack is one place that says which assigned account changed, what was actually observed, and what to do next.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-foreground/30 p-5">
            <h3 className="text-sm font-medium text-muted">Before</h3>
            <ul className="mt-4 space-y-3 text-base leading-7">
              <li>Research split across feeds, sites, and CRM</li>
              <li>The same accounts checked by hand every week</li>
              <li>Territory list disconnected from the reason to call</li>
              <li>Outreach that could have been sent to anyone</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-accent">Designed outcome</h3>
            <ul className="mt-4 space-y-3 text-base leading-7">
              <li>A book limited to assigned accounts</li>
              <li>A change tagged as funding, leadership, hiring, technology, or news</li>
              <li>The observed fact kept separate from the hypothesis</li>
              <li>A draft the rep can edit and copy, not an email that sends itself</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-border py-16" aria-labelledby="workflow-title">
        <SectionLabel index="03">Product experience</SectionLabel>
        <h2 id="workflow-title" className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          From account assignment to a draft a person still has to send.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Four steps a rep would take. Territory mapping would decide which accounts belong here. This demo only shows when and why someone might reach out.
        </p>
        <div className="mt-8">
          <AccountIntelligenceWorkflow />
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-b border-border py-16" aria-labelledby="architecture-title">
        <SectionLabel index="04">System architecture</SectionLabel>
        <h2 id="architecture-title" className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          How the system would work.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Account Intelligence and territory mapping would keep separate databases and pass assignments between them. Solid pills are what this page actually does. Dashed pills are the planned product.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-start lg:gap-3">
          {columns.map((column, index) => (
            <div key={column.title} className="contents">
              {index > 0 ? (
                <>
                  <Arrow direction="down" />
                  <div className="hidden pt-10 lg:block">
                    <Arrow direction="right" />
                  </div>
                </>
              ) : null}
              <article className="min-w-0 flex-1 rounded-2xl border border-border p-4">
                <h3 className="text-base font-semibold">{column.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{column.body}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {column.nodes.map((node) => (
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

      <section className="border-b border-border py-16" aria-labelledby="decisions-title">
        <SectionLabel index="05">Product decisions</SectionLabel>
        <h2 id="decisions-title" className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Designing for a focused MVP.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Personal feed before team admin",
              body: "The first version is one rep’s book and their drafts. Manager views and shared settings wait.",
            },
            {
              title: "Its own database",
              body: "Territory mapping and this feed would each keep their own records, and pass assignments across. Either one can exist if the other is down.",
            },
            {
              title: "Copy a draft before a sequencer",
              body: "The test is whether a rep uses a draft that cites a real event. Nooks or Outreach comes after that, not in v1.",
            },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{card.body}</p>
            </article>
          ))}
        </div>
        <details className="mt-6 rounded-2xl border border-border p-5">
          <summary className="cursor-pointer text-base font-semibold">Technical notes</summary>
          <div className="mt-4 max-w-2xl space-y-4 text-sm leading-6 text-muted">
            <p>
              <span className="font-medium text-foreground">Planned records. </span>
              accounts, rep_assignments, signals, signal_feed_reads, outreach_drafts.
            </p>
            <p>
              <span className="font-medium text-foreground">MVP question. </span>
              Does a personal feed make outreach cite a specific event, or do reps still send the generic note?
            </p>
            <p>
              <span className="font-medium text-foreground">Out of scope for v1. </span>
              Live Nooks or Outreach, multi-rep admin, and Salesforce IDs.
            </p>
          </div>
        </details>
      </section>

      <section className="border-b border-border py-16" aria-labelledby="outcomes-title">
        <SectionLabel index="06">Outcomes and roadmap</SectionLabel>
        <h2 id="outcomes-title" className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Measuring what matters.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Proposed success metrics. I do not have usage data. The comparison I would run: similar accounts, one note that cites a documented signal and one that does not, then look at reply quality — not just sends.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "System reliability",
              items: ["Assignment sync succeeds", "A reviewed signal keeps the right type and account"],
            },
            {
              title: "Rep adoption",
              items: ["Reps open the feed", "Drafts copied after a person edits them", "Less time rebuilding the same account brief"],
            },
            {
              title: "Business outcomes",
              items: ["Share of notes that cite a signal", "Reply and positive-reply rate", "Meetings from those threads"],
            },
          ].map((group) => (
            <article key={group.title} className="rounded-2xl border border-border p-5">
              <h3 className="text-sm font-medium text-muted">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium text-foreground">Proposed. Not measured.</p>
            </article>
          ))}
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              when: "Designed now",
              items: ["Personal feed", "Classified signals", "Source kept next to the event", "A draft a person reviews"],
            },
            {
              when: "Next",
              items: ["Better ranking of signals", "More public sources", "A sequencer only after drafts get used"],
            },
            {
              when: "Later",
              items: ["Multi-rep view", "Team analytics", "CRM identifiers"],
            },
          ].map((phase) => (
            <li key={phase.when} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-medium">{phase.when}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-muted">
          “Designed now” is the scope of the concept. The only part you can click is the sample walkthrough on this page.
        </p>
      </section>

      <section className="py-16" aria-labelledby="connected-title">
        <h2 id="connected-title" className="text-lg font-semibold tracking-tight">
          Connected GTM systems
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/work/partner-gtm-engine" className="rounded-2xl border border-border bg-card p-5 hover:border-accent">
            <p className="text-xs font-medium text-muted">Territory and ownership</p>
            <p className="mt-2 text-lg font-semibold">Partner GTM Engine</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The channel design for who owns an account. It would hand assignments to this feed. It is not deployed.
            </p>
          </Link>
          <a href="#workflow" className="rounded-2xl border border-border p-5 hover:border-accent">
            <p className="text-xs font-medium text-muted">When and why to engage</p>
            <p className="mt-2 text-lg font-semibold">Account Intelligence</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              This page. It watches the assigned book and turns one observed change into a draft the rep still has to send.
            </p>
          </a>
        </div>
        <p className="mt-8">
          <Link href="/projects#account" className="link-rule text-sm font-medium text-accent">
            Back to account and industry intelligence
          </Link>
        </p>
      </section>
    </PageMain>
  );
}
