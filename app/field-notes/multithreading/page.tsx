import { completePageMetadata } from "@/lib/page-metadata";
import { FieldNoteBreadcrumb } from "@/components/collection-breadcrumb";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { PageMain } from "@/components/page-main";
import { StakeholderPlayground } from "@/components/field-notes/stakeholder-playground";
import { fieldNoteBodies } from "@/lib/field-notes/bodies.ts";
import type { Metadata } from "next";
import Link from "next/link";

const note = fieldNoteBodies.multithreading;
const section = note.sections;
const links = note.links;
const principles = [section.who, section.validated, section.conversation];

export const metadata: Metadata = completePageMetadata({
  alternates: { canonical: "/field-notes/multithreading" },
  openGraph: { url: "/field-notes/multithreading" },
  title: note.title,
  description: note.metaDescription,
}, "/field-notes/multithreading");

export default function MultithreadingPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-14">
        <FieldNoteBreadcrumb title={note.title} />
        <p className="mt-8 text-xs font-medium tracking-wider text-muted uppercase">
          {note.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          {note.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          {note.standfirst}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {section.seller.body}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted"><strong>Use this when:</strong> {section["use-when"].body}</p>
        <Link href={links.experience.href} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">{links.experience.label}</Link>
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
          {section.principles.heading}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.heading} className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">{principle.heading}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{principle.body}</p>
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
        <h2 className="font-display text-2xl">{section.coaching.heading}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {section.coaching.body}
        </p>
      </section>
      <section
        id="deeper-access"
        className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          {section.access.kicker}
        </p>
        <h2 className="mt-2 font-display text-3xl">
          {section.access.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {section.access.body}
        </p>
        <Link
          href={links.request.href}
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
        >
          {links.request.label}
        </Link>
        <p className="mt-3 text-xs leading-5 text-muted">
          {section.access.note}
        </p>
      </section>
      <section id="research" className="scroll-mt-24 py-8">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          {section.research.body}{" "}
          <Link
            href={links.deal.href}
            className="text-accent underline underline-offset-4"
          >
            {links.deal.label}
          </Link>
        </p>
      </section>
      <SourceAndEvidencePanel
        status="illustrative"
        limitations={note.limitations}
      />
      <RelatedWork
        items={[
          {
            href: links["related-note"].href,
            title: links["related-note"].label,
            category: "Field Notes",
          },
          {
            href: links["related-work"].href,
            title: links["related-work"].label,
            category: "Work",
          },
        ]}
      />
    </PageMain>
  );
}
