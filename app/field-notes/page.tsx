import { completePageMetadata } from "@/lib/page-metadata";
import { riseIndex } from "@/lib/motion";
import { OrbitStudyIllustration } from "@/components/orbit-study-illustration";
import { PageMain } from "@/components/page-main";
import { marketingPlaybooks } from "@/lib/field-notes/marketing-playbooks";
import { salesPlaybooks } from "@/lib/field-notes/sales-playbooks";

const featuredSalesIds = new Set(["territory-planning", "discovery-qualification", "champion-development", "stalled-deal-recovery", "deal-inspection-forecasting"]);
const featuredSales = salesPlaybooks.filter((playbook) => featuredSalesIds.has(playbook.id));
const moreSales = salesPlaybooks.filter((playbook) => !featuredSalesIds.has(playbook.id));
const featuredMarketingIds = new Set(["partner-campaigns", "account-based-campaigns", "sales-activation"]);
const featuredMarketing = marketingPlaybooks.filter((playbook) => featuredMarketingIds.has(playbook.id));
const moreMarketing = marketingPlaybooks.filter((playbook) => !featuredMarketingIds.has(playbook.id));
import { CompactPlaybooks, PlaybookOutlines } from "@/components/field-notes/playbook-outlines";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

export const metadata: Metadata = completePageMetadata(
  {
  alternates: { canonical: "/field-notes" },
  openGraph: { url: "/field-notes" },
  title: "Field Notes",
  description: "Playbooks, frameworks, lessons learned, and operating systems for relationships, revenue, and teams.",
},
  "/field-notes",
);

const plannedTopics = ["Strategic account planning", "ICP and segmentation"] as const;

export default function FieldNotesPage() {
  return (
    <PageMain>
      <header className="grid items-center gap-8 border-b border-border py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="min-w-0">
        <p className="orbital-section-label text-sm font-medium text-muted">How I think · How I operate</p>
        <h1 className="editorial-title mt-3 max-w-3xl">Thinking out loud. Building in practice.</h1>
        <p className="mt-4 text-lg font-medium">Field Notes</p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Practical thinking and useful frameworks for revenue, people, and
          go-to-market work. Start with the sales motion, enterprise deal or
          coaching question you want to explore.
        </p>
        <nav aria-label="Field Notes sections" className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#featured">Published guides</a>
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#sales-playbooks">Sales playbooks</a>
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#marketing-playbooks">Marketing playbooks</a>
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#private">Private work</a>
        </nav>
        </div>
        <div className="mx-auto w-full max-w-[12rem]"><OrbitStudyIllustration variant="field-notes" /></div>
      </header>
      <section id="featured" className="section-enter scroll-mt-24 border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-3xl tracking-tight">Start with these three</h2><span className="text-xs text-muted">Published guides · Illustrative frameworks</span></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "How I'd Build a Motion at Your Stage",
              description: "A sell-first plan in three gated phases, with the team I'd build at each stage and the trigger for the first hire. I keep carrying a number throughout.",
              href: "/field-notes/build-the-motion",
              label: "Illustrative model",
              when: "Use when an early team needs its first repeatable sales motion and a plan for the team that will run it.",
            },
            {
              title: "Strategic Enterprise Deal Anatomy",
              description: "A transparent walkthrough of the account hypothesis, buying group, technical evaluation, and commercial decision, with seller and leader views.",
              href: "/field-notes/enterprise-deal",
              label: "Illustrative framework",
              when: "Use when technical evaluation, stakeholder alignment and commercial review need a shared plan.",
            },
            {
              title: "Multithreading & Stakeholder Mapping",
              description: "An interactive buying-committee coverage exercise plus a coaching playbook, connected conceptually to other portfolio research projects.",
              href: "/field-notes/multithreading",
              label: "Interactive playbook",
              when: "Use when a deal depends on one contact or the buying group is unclear.",
            },
            {
              title: "From Technical Evaluation to Buying Decision",
              description: "An original fictional case study with a POC scorecard, executive brief, mutual action plan, procurement and security checklists, and a decision readout. Opens the repository toolkit.",
              href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/case-study.md",
              label: "Illustrative model · Reading and templates",
              when: "Use when an evaluation needs measurable criteria, shared commitments and a clear buying decision.",
            },
            {
              title: "The Developer Workstation Is the New Soft Target",
              description: "A point of view on why developer machines and CI became a primary attack path, who owns the problem, and how I'd test a motion around it.",
              href: "/field-notes/developer-workstations",
              label: "Point of view · Exploring",
              when: "Use when deciding where a security product fits current buyer pain, or which segment to test next.",
            },
          ].map((note, index) => (
            <Fragment key={note.href}>
              {index === 3 ? <h3 className="mt-6 border-t border-border pt-6 font-display text-xl md:col-span-2">More published reading</h3> : null}
            <Link href={note.href} style={riseIndex(index)} className={`card-lift rise-in group block rounded-2xl border border-border p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${index === 0 ? "md:col-span-2" : ""} ${index < 3 ? "bg-surface-clay" : "bg-card"}`}>
              <p className="text-xs font-medium text-muted">{note.label}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{note.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted"><strong>When to use it:</strong> {note.when}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{note.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-accent">Explore the guide →</span>
            </Link>
            </Fragment>
          ))}
        </div>
      </section>
      <section id="sales-playbooks" aria-labelledby="sales-playbooks-heading" className="scroll-mt-24 border-b border-border py-12">
        <p className="text-xs font-medium text-muted">Exploring · Playbook outlines</p>
        <h2 id="sales-playbooks-heading" className="mt-3 font-display text-3xl tracking-tight">Sales, from account choice to buyer progress</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Practical starting points for account planning, conversations, deal
          decisions and coaching. The five outlined below include the evidence
          to move forward and when to pause. The rest are listed more briefly,
          each with a connection to the work behind it.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Connected work links to public project stories or source material.
          The connections show how the ideas support each other.
        </p>
        <PlaybookOutlines playbooks={featuredSales} />
        <CompactPlaybooks title="More sales playbooks" playbooks={moreSales} />
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          For business cases, technical evaluations, mutual action plans,
          procurement, negotiation and handoffs, start with the{' '}
          <Link href="https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/README.md" className="text-accent underline underline-offset-4">existing evaluation toolkit</Link>.
        </p>
      </section>
      <section id="marketing-playbooks" aria-labelledby="marketing-playbooks-heading" className="scroll-mt-24 border-b border-border py-12">
        <p className="text-xs font-medium text-muted">Exploring · Playbook outlines</p>
        <h2 id="marketing-playbooks-heading" className="mt-3 font-display text-3xl tracking-tight">Marketing, from idea to follow-through</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Starting points for connecting audience value, campaign execution and
          sales follow-through. Each outline covers preparation, delivery and
          learning, with an artifact to build next.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Start with one audience, one useful outcome and a named owner. Define
          the measures before launch, including the source, time window,
          denominator and what is still unknown.
        </p>
        <PlaybookOutlines playbooks={featuredMarketing} />
        <CompactPlaybooks title="More marketing playbooks" playbooks={moreMarketing} />
      </section>
      <section id="coming-later" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Notes still in outline</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Future frameworks for developing one account in depth and defining
          the segments worth pursuing. These will complement the playbooks above.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {plannedTopics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      </section>
      <section id="private" className="scroll-mt-24 border-t border-border py-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">Deeper, permissioned material</p>
        <Link href="/contact" className="card-lift mb-8 block rounded-2xl border border-border bg-surface-mist p-5 hover:border-accent">
          <h2 className="text-xl font-semibold">Request a walkthrough</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Detailed deal and operating examples aren&apos;t public. Ask, and I&apos;ll walk you through what I can share.</p>
          <span className="mt-3 inline-block text-sm font-medium text-accent">Get in touch →</span>
        </Link>
        <h2 className="font-display text-3xl tracking-tight">See the work behind the ideas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Professional experience and independently built projects have different evidence and confidentiality boundaries. Frameworks demonstrate an approach; real selling and leadership outcomes belong in Work.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
          <Link href="/work" className="inline-flex min-h-11 items-center text-accent">Professional work</Link>
          <Link href="/side-quests" className="inline-flex min-h-11 items-center text-accent">Explore Side Quests</Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center text-accent">Get in touch</Link>
        </div>
      </section>
    </PageMain>
  );
}
