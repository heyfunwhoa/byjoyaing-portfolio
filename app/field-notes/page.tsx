import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Field Notes — Kristen Joy Aing",
  description: "Playbooks, frameworks, lessons learned, and operating systems for relationships, revenue, and teams.",
};

const collections = [
  {
    title: "Playbooks",
    description: "Practical approaches to strategic account planning, buying-committee alignment, deal execution, and coaching.",
    examples: ["Multithreading & stakeholder mapping (seller + coach perspectives)", "Strategic account planning", "Deal inspection"],
  },
  {
    title: "Frameworks",
    description: "Decision tools for exploring markets, evaluating tradeoffs, and finding the right problems to solve.",
    examples: ["ICP and segmentation", "Opportunity qualification", "Prioritization"],
  },
  {
    title: "Operating Systems",
    description: "Repeatable rhythms and processes that connect strategy to execution. These are operating models, not claims of deployed software.",
    examples: ["Pipeline and forecast cadence", "GTM account planning", "Coaching and onboarding rhythms"],
  },
  {
    title: "Lessons Learned",
    description: "Reflections on field experience, collaboration, experiments, and what I would do differently.",
    examples: ["Building trust across teams", "Making technical complexity useful", "Learning through iteration"],
  },
] as const;

export default function FieldNotesPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-16">
        <p className="text-sm font-medium text-muted">How I think · How I operate</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight tracking-tight sm:text-6xl">Thinking out loud. Building in practice.</h1>
        <p className="mt-4 text-lg font-medium">Field Notes</p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Playbooks, frameworks, operating systems, and lessons from the intersection of revenue,
          go-to-market strategy, people, and technology. A place to show the thinking behind the work,
          not just the finished output.
        </p>
        <nav aria-label="Field Notes sections" className="mt-7 flex flex-wrap gap-3 text-sm font-medium"><a className="text-accent underline underline-offset-4" href="#featured">Featured guides</a><a className="text-accent underline underline-offset-4" href="#approach">Approach</a><a className="text-accent underline underline-offset-4" href="#collections">Collections</a><a className="text-accent underline underline-offset-4" href="#private">Private work</a></nav>
      </header>
      <section id="featured" className="scroll-mt-24 border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-3xl tracking-tight">Start with the work</h2><span className="text-xs text-muted">Two interactive field guides · Synthetic demonstrations</span></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Strategic Enterprise Deal Anatomy",
              description: "A transparent walkthrough of the account hypothesis, buying group, technical evaluation, and commercial decision—with seller and leader views.",
              href: "/field-notes/enterprise-deal",
              label: "Illustrative framework",
            },
            {
              title: "Multithreading & Stakeholder Mapping",
              description: "An interactive buying-committee coverage exercise plus a coaching playbook, connected conceptually to other portfolio research projects.",
              href: "/field-notes/multithreading",
              label: "Interactive playbook",
            },
          ].map((note) => (
            <Link key={note.href} href={note.href} className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <p className="text-xs font-medium text-muted">{note.label}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{note.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{note.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-accent">Explore the guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <section id="approach" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">A way of working, not a set of job titles</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["Strategist", "Look for patterns, understand buyers, and ask better questions."],
            ["Leader", "Build trust, create alignment, and develop people."],
            ["Builder", "Translate ideas into useful and repeatable systems."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="collections" className="scroll-mt-24 py-12">
        <h2 className="font-display text-3xl tracking-tight">Browse the collections</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Collection outlines are starting points, not published case studies or claims of measured results.
          Specific examples will be added with sources and clear evidence labels: Used in practice, Illustrative model, or Exploring.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {collections.map((collection) => (
            <article key={collection.title} className="rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold">{collection.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{collection.description}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">Topics to develop</p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-sm">
                {collection.examples.map((example) => <li key={example}>{example}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section id="private" className="scroll-mt-24 border-t border-border py-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">Deeper, permissioned material</p>
        <Link href="/private-work" className="mb-8 block rounded-2xl border border-border bg-card p-5 hover:border-accent">
          <h2 className="text-xl font-semibold">Private case studies</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Some detailed deal and operating artifacts require approval. See what can be requested and how access will work.</p>
          <span className="mt-3 inline-block text-sm font-medium text-accent">About private access →</span>
        </Link>
        <h2 className="font-display text-3xl tracking-tight">See the work behind the ideas</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Professional experience and independently built projects have different evidence and confidentiality boundaries. Frameworks demonstrate an approach; real selling and leadership outcomes belong in Work.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
          <Link href="/experience" className="text-accent">Professional experience</Link>
          <Link href="/projects" className="text-accent">Explore builds and projects</Link>
          <Link href="/contact" className="text-accent">Get in touch</Link>
        </div>
      </section>
    </PageMain>
  );
}
