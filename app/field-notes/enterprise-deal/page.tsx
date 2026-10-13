import { completePageMetadata } from "@/lib/page-metadata";
import { PageMain } from "@/components/page-main";
import { EditorialArticle } from "@/components/editorial/editorial-article";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { DealJourney } from "@/components/field-notes/deal-journey";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = completePageMetadata({
  alternates: { canonical: "/field-notes/enterprise-deal" },
  title: "Strategic Enterprise Deal Anatomy",
  description: "A structured illustrative approach to enterprise deal execution and sales-leader coaching.",
}, "/field-notes/enterprise-deal");

export default function EnterpriseDealPage() {
  return (
    <PageMain>
      <EditorialArticle
        eyebrow="Field Notes / Enterprise deal strategy"
        title="Strategic Enterprise Deal Anatomy"
        description="A field-to-leadership view of complex deal strategy: why an account matters, how the buying group reaches alignment, and how technical evaluation and commercial review connect. Steps can overlap and are not a guaranteed sales sequence."
        status="illustrative"
      >
        <p className="mb-3 text-base leading-7"><strong>Use this when:</strong> a technical evaluation needs a shared view of the business case, buying group and commercial decision.</p>
        <p className="mb-3 text-sm leading-6 text-muted">Start with the account hypothesis, then inspect one stakeholder or evaluation gap. The goal is a better next conversation, not a fixed sequence for every deal.</p>
        <Link href="/work#enterprise-sales" className="mb-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">See my enterprise-selling experience →</Link>
        <p className="mb-6 text-sm leading-7 text-muted">This walkthrough is an original method illustration, not a customer case study or evidence of a completed deal.</p>
        <section aria-label="Illustrative deal walkthrough" className="min-w-0 border-y border-border py-8">
          <DealJourney />
        </section>
        <section className="mt-10">
          <h2 className="font-display text-3xl">From deal execution to team learning</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            A verified case study would explain the actual problem, my responsibilities,
            collaborators, stakeholder dynamics, evaluation and decision process, supported outcome,
            and lessons. This page deliberately does not claim a deal result.
          </p>
          <Link href="/field-notes/multithreading" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">
            Explore the multithreading playbook →
          </Link>
        </section>
        <Link href="/contact?playbook=enterprise-deal" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Request a deeper walkthrough →</Link>
        <SourceAndEvidencePanel
          status="illustrative"
          limitations="Synthetic method and buying journey; no live customer deal, completed procurement, or numerical outcome is represented. No external research sources are claimed for this original exercise."
        />
      </EditorialArticle>
      <RelatedWork items={[
        { href: "/field-notes/multithreading", title: "Stakeholder mapping playbook", category: "Field Notes" },
        { href: "/work", title: "Professional Work", category: "Work" },
      ]} />
    </PageMain>
  );
}
