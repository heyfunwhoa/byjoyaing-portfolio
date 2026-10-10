import { PageMain } from "@/components/page-main";
import { StakeholderPlayground } from "@/components/field-notes/stakeholder-playground";
import { connectedSources } from "@/lib/field-notes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multithreading & Stakeholder Mapping — Field Notes",
  description: "A seller and sales leader playbook for mapping complex buying groups, validating champions, and inspecting relationship gaps.",
};

const moves = [
  ["01", "Start with the buying problem", "Identify the problem owner, consequences of inaction, affected teams and a credible reason to engage."],
  ["02", "Map the roles, not just names", "Identify champion, economic buyer, technical evaluators, executive sponsor, procurement, security assurance and possible blockers."],
  ["03", "Validate influence", "Test whether the champion can mobilize stakeholders, explain the approval path, and sponsor access to decision makers."],
  ["04", "Earn additional conversations", "Give each stakeholder an outcome-specific reason to participate. Avoid asking for intros merely to increase contact count."],
  ["05", "Coordinate decisions", "Align technical success criteria, business outcomes, risk reviews, budget, procurement and mutual milestones."],
  ["06", "Inspect and adapt", "Review access gaps and evidence after meaningful meetings. Update the plan when power, priority or timing changes."],
] as const;

export default function MultithreadingPage() {
  return <PageMain>
    <header className="border-b border-border py-14">
      <Link href="/field-notes" className="text-sm font-medium text-accent">← Field Notes</Link>
      <p className="mt-8 text-xs font-medium uppercase tracking-wider text-muted">Playbook · Illustrative model</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">Multithreading is about alignment, not a contact count.</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted">A practical framework for navigating a complex enterprise buying group—from champion development to executive alignment—with a separate coaching lens for sales leaders.</p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/field-notes/enterprise-deal" className="font-medium text-accent">See the deal anatomy →</Link><a href="#coverage-lab" className="font-medium text-accent">Try the coverage lab ↓</a></div>
    </header>
    <section className="border-b border-border py-12">
      <h2 className="font-display text-3xl">The six moves</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-2">{moves.map(([number, title, description]) => <li key={number} className="rounded-2xl border border-border p-5"><p className="text-xs text-muted">{number}</p><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></li>)}</ol>
    </section>
    <section id="coverage-lab" className="scroll-mt-24 border-b border-border py-12"><StakeholderPlayground /></section>
    <section className="border-b border-border py-12">
      <h2 className="font-display text-3xl">How I would coach this across a sales team</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{[
        ["Inspect evidence", "Ask who holds budget and decision rights, what validates champion influence, and where access is missing."],
        ["Coach the next move", "Identify a compelling reason to connect with each stakeholder; role-play executive outreach and sponsor requests."],
        ["Build the operating cadence", "Review coverage at stage changes and before forecast commits; track next steps and owners without turning coverage into an arbitrary probability."],
      ].map(([title, body]) => <article key={title} className="rounded-2xl border border-border p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></article>)}</div>
    </section>
    <section className="py-12">
      <h2 className="font-display text-3xl">Connected research and tools</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">These connections describe how the playbook could draw on projects in my portfolio. This page does not read other repositories at runtime or ingest live account data.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{connectedSources.map((source) => <article key={source.name} className="rounded-2xl border border-border p-5">
        <h3 className="font-semibold">{source.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{source.capability}</p>
        <p className="mt-3 text-sm leading-6">{source.application}</p>
        <p className="mt-3 text-xs text-muted">{source.stage}</p>
        {"url" in source && <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-accent">View public project ↗</a>}
      </article>)}</div>
      <p className="mt-5 text-sm text-muted">Future integrations should use explicit consent, source provenance, least-privilege access, review before CRM writes, redaction and tenant isolation. Private repository data is not part of this public demonstration.</p>
    </section>
  </PageMain>;
}
