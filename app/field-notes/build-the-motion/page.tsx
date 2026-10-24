import { completePageMetadata } from "@/lib/page-metadata";
import { FieldNoteBreadcrumb } from "@/components/collection-breadcrumb";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
    alternates: { canonical: "/field-notes/build-the-motion" },
    openGraph: { url: "/field-notes/build-the-motion" },
    title: "How I'd Build a Motion at Your Stage",
    description:
      "A gated, sell-first plan for building an early sales motion: prove the deal, make it repeatable, then scale what is proven.",
  },
  "/field-notes/build-the-motion",
);

const phases = [
  {
    id: "prove",
    window: "Months 0–3",
    title: "Prove the deal",
    work: [
      "Run the full cycle myself: outbound, discovery, POC and close.",
      "Pressure-test the ICP against real conversations, not the pitch deck.",
    ],
    gate: "First closed deals, plus a repeatable first-meeting-to-opportunity rate.",
  },
  {
    id: "repeat",
    window: "Months 3–9",
    title: "Make it repeatable",
    work: [
      "Turn what is working into a written playbook: discovery questions, objection handling and POC criteria.",
      "Tighten the loop with product and marketing on what buyers actually ask for.",
    ],
    gate: "A second person (rep, SE or founder) can run the playbook and get similar results.",
  },
  {
    id: "scale",
    window: "Months 9–12",
    title: "Scale what is proven",
    work: [
      "Hire or onboard against the playbook, with a ramp plan built from my own first 90 days.",
      "Set pipeline coverage and forecast rhythm before adding headcount.",
    ],
    gate: "Predictable pipeline and a ramp time the team can plan around.",
  },
] as const;

export default function BuildTheMotionPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-14">
        <FieldNoteBreadcrumb title="How I'd Build a Motion at Your Stage" />
        <p className="mt-8 text-xs font-medium tracking-wider text-muted uppercase">
          Field practice · Illustrative model · Short read
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Sell first. Build from what closes.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Each phase has a gate, and nothing scales until that gate is passed.
          I keep carrying a number throughout, so the playbook stays honest
          because I&apos;m still using it.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          For a founder, that means the first seller is also building the
          motion. For a sales leader, it means the playbook comes from real
          deals rather than a slide.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          <strong>Use this when:</strong> an early team needs its first
          repeatable sales motion and has to decide when to add headcount.
        </p>
      </header>
      <section
        id="phases"
        className="scroll-mt-24 py-10"
        aria-labelledby="phases-title"
      >
        <h2 id="phases-title" className="font-display text-2xl">
          Three phases, three gates.
        </h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {phases.map((phase) => (
            <li
              key={phase.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="text-xs font-medium text-muted">{phase.window}</p>
              <h3 className="mt-2 font-display text-xl">{phase.title}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {phase.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6">
                <strong>Gate:</strong> {phase.gate}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section id="conversation" className="scroll-mt-24 border-t border-border py-10">
        <h2 className="font-display text-2xl">Talk through your stage</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          The timeline flexes with the team, the market and how much pipeline
          already exists. I&apos;m happy to walk through how the gates would
          apply to a specific company.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
        >
          Get in touch →
        </Link>
      </section>
      <SourceAndEvidencePanel
        status="illustrative"
        limitations="This is a proposed operating approach, not a record of results at a specific company. Timelines are illustrative and depend on stage, market and existing pipeline. Verified selling outcomes are in Work."
      />
      <RelatedWork
        items={[
          {
            href: "/field-notes/enterprise-deal",
            title: "Enterprise deal anatomy",
            category: "Field Notes",
          },
          {
            href: "/work",
            title: "Enterprise sales and team leadership",
            category: "Work",
          },
        ]}
      />
    </PageMain>
  );
}
