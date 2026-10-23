import { completePageMetadata } from "@/lib/page-metadata";
import { OrbitStudyIllustration } from "@/components/orbit-study-illustration";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
  alternates: { canonical: "/field-notes" },
  openGraph: { url: "/field-notes" },
  title: "Field Notes",
  description: "Playbooks, frameworks, lessons learned, and operating systems for relationships, revenue, and teams.",
},
  "/field-notes",
);

const plannedTopics = [
  "Strategic account planning",
  "Deal inspection",
  "ICP and segmentation",
  "Opportunity qualification",
  "Pipeline and forecast cadence",
  "Coaching and onboarding rhythms",
] as const;

export default function FieldNotesPage() {
  return (
    <PageMain>
      <header className="grid items-center gap-8 border-b border-border py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="min-w-0">
        <p className="orbital-section-label text-sm font-medium text-muted">How I think · How I operate</p>
        <h1 className="editorial-title mt-3 max-w-3xl">Thinking out loud. Building in practice.</h1>
        <p className="mt-4 text-lg font-medium">Field Notes</p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Playbooks, frameworks, operating systems, and lessons from the intersection of revenue,
          go-to-market strategy, people, and technology. A place to show the thinking behind the work,
          not just the finished output.
        </p>
        <nav aria-label="Field Notes sections" className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#featured">Published guides</a>
          <a className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href="#private">Private work</a>
        </nav>
        </div>
        <div className="mx-auto w-full max-w-[12rem]"><OrbitStudyIllustration variant="field-notes" /></div>
      </header>
      <section id="featured" className="section-enter scroll-mt-24 border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-3xl tracking-tight">The published notes</h2><span className="text-xs text-muted">Guides and toolkit · Synthetic demonstrations</span></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "From Technical Evaluation to Buying Decision",
              description: "An original fictional case study with a POC scorecard, executive brief, mutual action plan, procurement and security checklists, and a decision readout. Opens the repository toolkit.",
              href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/case-study.md",
              label: "Illustrative model · Reading and templates",
              when: "Use when an evaluation needs measurable criteria, shared commitments and a clear buying decision.",
            },
            {
              title: "Strategic Enterprise Deal Anatomy",
              description: "A transparent walkthrough of the account hypothesis, buying group, technical evaluation, and commercial decision—with seller and leader views.",
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
          ].map((note) => (
            <Link key={note.href} href={note.href} className="group block rounded-2xl border border-border bg-surface-clay p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <p className="text-xs font-medium text-muted">{note.label}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{note.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted"><strong>When to use it:</strong> {note.when}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{note.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-accent">Explore the guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <section id="coming-later" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Notes still in outline</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          These topics are not articles. They are subjects I may write later, each labeled Used in practice, Illustrative model, or Exploring when they exist. Nothing below is clickable on purpose.
        </p>
        <details className="mt-4 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            View topics in outline
          </summary>
          <ul className="mt-4 max-w-xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {plannedTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        </details>
      </section>
      <section id="private" className="scroll-mt-24 border-t border-border py-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">Deeper, permissioned material</p>
        <Link href="/private-work" className="mb-8 block rounded-2xl border border-border bg-surface-mist p-5 hover:border-accent">
          <h2 className="text-xl font-semibold">Private case studies</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Some detailed deal and operating artifacts require approval. See what can be requested and how access will work.</p>
          <span className="mt-3 inline-block text-sm font-medium text-accent">About private access →</span>
        </Link>
        <h2 className="font-display text-3xl tracking-tight">See the work behind the ideas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Professional experience and independently built projects have different evidence and confidentiality boundaries. Frameworks demonstrate an approach; real selling and leadership outcomes belong in Work.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
          <Link href="/work" className="text-accent">Professional work</Link>
          <Link href="/side-quests" className="text-accent">Explore Side Quests</Link>
          <Link href="/contact" className="text-accent">Get in touch</Link>
        </div>
      </section>
    </PageMain>
  );
}
