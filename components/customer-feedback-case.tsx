import { CustomerFeedbackWorkflow } from "@/components/customer-feedback-workflow";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

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
  const copy = state === "field" ? "Used in the field" : state === "demo" ? "In this demo" : "Planned";
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
    title: "Feedback sources",
    body: "Sales conversations at Truffle are the field habit. This site does not read CRM, calls, success notes, or tickets.",
    nodes: [
      { title: "CRM", detail: "Planned source. Not connected.", state: "planned" as const },
      { title: "Call records", detail: "Planned source. Not connected.", state: "planned" as const },
      { title: "Customer Success notes", detail: "Planned source. Not connected.", state: "planned" as const },
      { title: "Support tickets", detail: "Planned source. Not connected.", state: "planned" as const },
    ],
  },
  {
    title: "Intelligence processing",
    body: "The demo shows a suggested theme you can correct. Ingestion and deduplication are not built. No model runs.",
    nodes: [
      { title: "Ingestion", detail: "Planned. The sample is hardcoded.", state: "planned" as const },
      { title: "Structured extraction", detail: "Fields are designed. Nothing extracts them.", state: "planned" as const },
      { title: "Classification", detail: "You can confirm or edit a suggestion locally.", state: "demo" as const },
      { title: "Deduplication", detail: "Planned. The sample is already grouped by hand.", state: "planned" as const },
      { title: "Evidence preservation", detail: "The original sentence stays on the card.", state: "demo" as const },
    ],
  },
  {
    title: "Product intelligence",
    body: "Themes, accounts, and a review a person confirms. Confirming the demo does not update a roadmap.",
    nodes: [
      { title: "Normalized feedback", detail: "Five sample records.", state: "demo" as const },
      { title: "Account context", detail: "Fictional accounts stay on each note.", state: "demo" as const },
      { title: "Feedback themes", detail: "Two sample themes with filters.", state: "demo" as const },
      { title: "Product review", detail: "A local confirm. It does not persist.", state: "demo" as const },
      { title: "Decision tracking", detail: "Planned record of who accepted what.", state: "planned" as const },
    ],
  },
  {
    title: "Closed loop",
    body: "A follow-up draft you can edit and copy. It does not send, and a shipped feature would not close every request.",
    nodes: [
      { title: "Product status updates", detail: "Local status only. Not a release.", state: "demo" as const },
      { title: "Release information", detail: "Planned join to Product Release Intelligence.", state: "planned" as const },
      { title: "Account owner review", detail: "Designed step. No owner inbox here.", state: "planned" as const },
      { title: "Customer follow-up", detail: "Draft you can copy. It does not email.", state: "demo" as const },
    ],
  },
];

export function CustomerFeedbackCase() {
  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-16 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-muted">Project 02</p>
            <Label index="01">Product and GTM systems</Label>
            <StatusBadge status="designed" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Customer Feedback Intelligence</p>
            <h1 className="mt-2 font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
              Turn customer conversations into product decisions.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted">
            An intelligence workspace that would connect feedback across Sales, Customer Success, and Support to show recurring product needs, account context, and commercial impact. From the first request to a product decision and a customer follow-up, the design keeps a traceable loop. This page is a sample. It does not read live systems.
          </p>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium">Role</dt>
              <dd className="mt-1 leading-6 text-muted">Product strategy, GTM systems, and workflow design.</dd>
            </div>
            <div>
              <dt className="font-medium">Stage</dt>
              <dd className="mt-1 leading-6 text-muted">Designed system / proposed MVP. The field loop at Truffle is not this app.</dd>
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
            <p className="text-xs font-medium tracking-wide text-muted">Feedback workspace</p>
            <p className="text-[11px] text-muted">Illustrative figures, not results</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <p><span className="block text-2xl font-semibold">24</span><span className="text-muted">Sample signals</span></p>
            <p><span className="block text-2xl font-semibold">8</span><span className="text-muted">Sample themes</span></p>
            <p><span className="block text-2xl font-semibold">5</span><span className="text-muted">Sample accounts</span></p>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-[11px] font-medium text-muted">Featured theme</p>
            <p className="mt-1 font-medium">Enterprise identity and provisioning</p>
            <p className="mt-2 text-sm leading-6 text-muted">Four sample notes, three fictional accounts. One closed-lost line mentions SCIM. That is context, not revenue.</p>
            <a href="#workflow" className="mt-3 inline-flex text-sm font-medium text-accent">
              View details
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <Label index="02">The feedback problem</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Customer feedback is everywhere. Product context is not.
        </h2>
        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Sales", "New admins wait days for console access."],
              ["Customer Success", "SCIM was named in the pilot and never turned on."],
              ["Support", "SSO works. Contractor roles do not."],
              ["Closed-lost", "Security review required SCIM."],
            ].map(([source, quote]) => (
              <li key={source} className="rounded-xl border border-dashed border-foreground/30 p-4">
                <p className="text-xs font-medium text-muted">{source}</p>
                <p className="mt-2 text-sm leading-6">{quote}</p>
              </li>
            ))}
          </ul>
          <svg aria-hidden="true" viewBox="0 0 48 160" className="mx-auto hidden h-40 w-12 text-muted lg:block">
            <path d="M4 20h28M32 20H44M4 60h40M4 100h40M4 140h28M32 140H44" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium text-accent">One theme, after review</p>
            <h3 className="mt-2 text-xl font-semibold">Enterprise identity and provisioning</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <li>4 related sample signals</li>
              <li>Harbor Bank, Lumen Health, Northline Freight</li>
              <li>Opportunity context: a lost expansion that named SCIM. Not a dollar figure.</li>
              <li>Each original sentence stays attached as evidence.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-border py-16">
        <Label index="03">Product experience</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          From a customer signal to a decision a person still has to make.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Five steps in the browser. Accounts are fictional. Confirming a theme does not create a roadmap item.
        </p>
        <div className="mt-8">
          <CustomerFeedbackWorkflow />
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-b border-border py-16">
        <Label index="04">System architecture</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          How the feedback loop would work.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Solid pills are what this page does with sample notes. Dashed pills are planned. Nothing here calls a CRM, a ticket system, or a model.
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
          Designing for a focused MVP.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Account context over raw volume", "Four notes from three accounts, including a loss, matter more than forty identical upvotes with no account."],
            ["A person confirms the roadmap", "A suggestion can group notes. It cannot promise a customer that something will ship."],
            ["Sit beside the tools that already hold the notes", "CRM, success notes, and the backlog stay where they are. This layer points at them. It does not replace them."],
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
              Signal, Theme, Account, Evidence, Persona, Outcome.
            </p>
            <p>
              <span className="font-medium text-foreground">MVP question. </span>
              Does a theme with the account attached change what Product reviews, faster than a raw request list?
            </p>
            <p>
              <span className="font-medium text-foreground">Out of scope. </span>
              Replacing the backlog tool, and auto-committing roadmap items from a model.
            </p>
          </div>
        </details>
      </section>

      <section className="border-b border-border py-16">
        <Label index="06">Outcomes and roadmap</Label>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Measuring what matters.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Proposed metrics. Nothing below has been measured in this repository.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Data quality", ["Feedback classification accuracy", "Account association accuracy", "Time to identify recurring themes"]],
            ["Product adoption", ["Product review rate", "Share of themes with a recorded decision"]],
            ["Business outcomes", ["Closed-loop communication rate", "Follow-ups that match the decision, without claiming every request is done"]],
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
            ["Designed now", ["Manual import of notes", "A normalized theme", "A board", "The account left on the note"]],
            ["Next", ["CRM and call-note intake", "Tighter duplicate detection", "A decision log"]],
            ["Later", ["Join to release intelligence", "Account-specific updates", "More sources"]],
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

      <section className="py-16">
        <h2 className="text-lg font-semibold">Connected GTM systems</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link href="/work/product-release-intelligence" className="rounded-2xl border border-border bg-card p-5 hover:border-accent">
            <p className="text-xs text-muted">When a theme ships</p>
            <p className="mt-2 font-semibold">Product Release Intelligence</p>
            <p className="mt-2 text-sm leading-6 text-muted">The design for telling the field what changed. Not a live join, and not a promise that every request is done.</p>
          </Link>
          <a href="#workflow" className="rounded-2xl border border-border p-5 hover:border-accent">
            <p className="text-xs text-muted">What customers asked</p>
            <p className="mt-2 font-semibold">Customer Feedback Intelligence</p>
            <p className="mt-2 text-sm leading-6 text-muted">This page. The field loop is real. The workspace is a sample.</p>
          </a>
        </div>
        <p className="mt-8">
          <Link href="/projects#workflow" className="link-rule text-sm font-medium text-accent">
            Back to GTM workflow design
          </Link>
        </p>
      </section>
    </PageMain>
  );
}
