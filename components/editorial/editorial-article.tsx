import type { ReactNode } from "react";
import Link from "next/link";
import type { EvidenceStatus } from "@/components/editorial/source-and-evidence-panel";

const labels: Record<EvidenceStatus, string> = {
  "used-in-practice": "Used in practice",
  illustrative: "Illustrative model",
  exploring: "Exploring",
};

export function EditorialArticle({
  eyebrow,
  title,
  description,
  status,
  publishedAt,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  status: EvidenceStatus;
  publishedAt?: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <article className="min-w-0">
      <header className="border-b border-border py-10 sm:py-14">
        <Link href="/field-notes" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">← All Field Notes</Link>
        <p className="editorial-eyebrow mt-4 text-accent">{eyebrow}</p>
        <h1 className="editorial-title mt-3 max-w-[19ch]">{title}</h1>
        <p className="editorial-intro mt-5 text-muted">{description}</p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted" aria-label="Article information">
          <span>{labels[status]}</span>
          {publishedAt ? <span>Published <time dateTime={publishedAt}>{publishedAt}</time></span> : null}
          {updatedAt ? <span>Updated <time dateTime={updatedAt}>{updatedAt}</time></span> : null}
        </div>
      </header>
      <div className="min-w-0 py-8 sm:py-12">{children}</div>
    </article>
  );
}
