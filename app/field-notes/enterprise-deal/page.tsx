import { PageMain } from "@/components/page-main";
import { DealJourney } from "@/components/field-notes/deal-journey";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Enterprise Deal Anatomy — Field Notes",
  description: "A structured approach to enterprise deal execution and sales-leader coaching.",
};

export default function EnterpriseDealPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-14">
        <Link href="/field-notes" className="text-sm font-medium text-accent">← Field Notes</Link>
        <p className="mt-8 text-xs font-medium uppercase tracking-wider text-muted">Illustrative framework · Not a customer case study</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Strategic Enterprise Deal Anatomy</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
          A field-to-leadership view of complex deal strategy: why an account matters,
          how the buying group reaches alignment, and how technical evaluation and
          commercial review connect. Steps can overlap and are not a guaranteed sales sequence.
        </p>
        <Link href="/field-notes/multithreading" className="mt-5 inline-block text-sm font-medium text-accent">
          Explore the multithreading playbook →
        </Link>
      </header>
      <section className="border-b border-border py-12"><DealJourney /></section>
      <section className="py-12">
        <h2 className="font-display text-3xl">From deal execution to team learning</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          A future verified case study would explain the actual problem, my responsibilities,
          collaborators, stakeholder dynamics, evaluation and decision process, supported outcome,
          and lessons. The current page is a method illustration with no claimed deal result.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm">
          <Link href="/field-notes/multithreading" className="font-medium text-accent">Multithreading playbook →</Link>
          <Link href="/experience" className="font-medium text-accent">Professional experience →</Link>
        </div>
      </section>
    </PageMain>
  );
}
