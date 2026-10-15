import { completePageMetadata } from "@/lib/page-metadata";
import { PageMain } from "@/components/page-main";
import { EditorialArticle } from "@/components/editorial/editorial-article";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { DealJourney } from "@/components/field-notes/deal-journey";
import { fieldNoteBodies } from "@/lib/field-notes/bodies.ts";
import Link from "next/link";
import type { Metadata } from "next";

const note = fieldNoteBodies["enterprise-deal"];
const section = note.sections;
const links = note.links;

export const metadata: Metadata = completePageMetadata({
  alternates: { canonical: "/field-notes/enterprise-deal" },
  title: note.title,
  description: note.metaDescription,
}, "/field-notes/enterprise-deal");

export default function EnterpriseDealPage() {
  return (
    <PageMain>
      <EditorialArticle
        eyebrow={note.eyebrow}
        title={note.title}
        description={note.standfirst}
        status="illustrative"
      >
        <p className="mb-3 text-base leading-7"><strong>Use this when:</strong> {section["use-when"].body}</p>
        <p className="mb-3 text-sm leading-6 text-muted">{section.orientation.body}</p>
        <Link href={links.experience.href} className="mb-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">{links.experience.label}</Link>
        <p className="mb-6 text-sm leading-7 text-muted">{section.disclaimer.body}</p>
        <section aria-label="Illustrative deal walkthrough" className="min-w-0 border-y border-border py-8">
          <DealJourney />
        </section>
        <section className="mt-10">
          <h2 className="font-display text-3xl">{section.learning.heading}</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {section.learning.body}
          </p>
          <Link href={links.playbook.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">
            {links.playbook.label}
          </Link>
        </section>
        <Link href={links.request.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">{links.request.label}</Link>
        <SourceAndEvidencePanel
          status="illustrative"
          limitations={note.limitations}
        />
      </EditorialArticle>
      <RelatedWork items={[
        { href: links["related-note"].href, title: links["related-note"].label, category: "Field Notes" },
        { href: links["related-work"].href, title: links["related-work"].label, category: "Work" },
      ]} />
    </PageMain>
  );
}
