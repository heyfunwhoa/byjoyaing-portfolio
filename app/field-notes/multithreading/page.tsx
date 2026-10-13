import { completePageMetadata } from "@/lib/page-metadata";
import { FieldNoteBreadcrumb } from "@/components/collection-breadcrumb";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { PageMain } from "@/components/page-main";
import { StakeholderPlayground } from "@/components/field-notes/stakeholder-playground";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata({
  alternates: { canonical: "/field-notes/multithreading" },
  openGraph: { url: "/field-notes/multithreading" },
  title: "Multithreading & Stakeholder Mapping",
  description:
    "How I think about complex buying groups: a short field note, an interactive stakeholder example, and a deeper walkthrough by request.",
}, "/field-notes/multithreading");

export default function MultithreadingPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-14">
        <FieldNoteBreadcrumb title="Multithreading & Stakeholder Mapping" />
        <p className="mt-8 text-xs font-medium tracking-wider text-muted uppercase">
          Field practice · Illustrative model · Short read
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Map the people behind the decision.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Complex deals depend on more than a strong champion. My approach is to
          map decision roles, validate influence, and give each stakeholder a
          relevant reason to join the conversation.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          For the seller, that means a clearer next conversation. For the sales
          leader, it means a practical way to coach gaps in access and
          alignment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#coverage-lab"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            Explore the example ↓
          </a>
          <a
            href="#deeper-access"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium"
          >
            Request a walkthrough
          </a>
        </div>
      </header>
      <section
        id="method"
        className="scroll-mt-24 py-10"
        aria-labelledby="principles-title"
      >
        <h2 id="principles-title" className="font-display text-2xl">
          Three questions guide the work.
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            [
              "Who matters?",
              "Map decision roles and affected teams, beyond the people already in the meeting.",
            ],
            [
              "What is validated?",
              "Separate access from influence. A responsive contact is not automatically a champion or budget owner.",
            ],
            [
              "Why another conversation?",
              "Connect each introduction to a stakeholder’s priorities and the decision the group needs to make.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="coverage-lab"
        className="scroll-mt-24 border-b border-border pb-10"
      >
        <StakeholderPlayground />
      </section>
      <section id="coaching" className="scroll-mt-24 py-10">
        <h2 className="font-display text-2xl">What the example reveals</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          The security champion and technical evaluator are engaged, but budget
          authority is still unvalidated. I would use the next conversation to
          understand the approval path and earn a business-outcome discussion.
          As a coach, I would ask what evidence supports that introduction and
          who owns the next action.
        </p>
      </section>
      <section
        id="deeper-access"
        className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          A closer look · Reviewed individually
        </p>
        <h2 className="mt-2 font-display text-3xl">
          Go deeper into the approach.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Request a conversation about stakeholder planning, champion
          validation, and how I would coach the next move. I’ll review the
          request and confirm which walkthrough or sanitized materials I can
          share.
        </p>
        <Link
          href="/contact?playbook=multithreading#access"
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
        >
          Request a deeper walkthrough →
        </Link>
        <p className="mt-3 text-xs leading-5 text-muted">
          Requests do not automatically unlock files. Detailed materials are
          shared separately after review, where available.
        </p>
      </section>
      <section id="research" className="scroll-mt-24 py-8">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Account research can suggest who to involve; customer conversations
          validate their priorities and influence.{" "}
          <Link
            href="/field-notes/enterprise-deal"
            className="text-accent underline underline-offset-4"
          >
            See where this fits in an enterprise deal →
          </Link>
        </p>
      </section>
      <SourceAndEvidencePanel
        status="illustrative"
        limitations="Stakeholders, relationships and access states are fictional. This preview does not read private account systems. Coverage does not prove influence, budget approval or purchase intent."
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
