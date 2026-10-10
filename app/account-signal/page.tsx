import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { loadLimaCharlieSnapshot } from "@/lib/account-signal/limacharlie";
import { ingestPublicSnapshot } from "@/lib/account-signal/pipeline";
import { MemoryResearchStore } from "@/lib/account-signal/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LimaCharlie research brief — prototype",
  description:
    "A source-grounded brief from one public LimaCharlie documentation page. Prototype, not a live account feed.",
  robots: { index: false, follow: false },
};

export default function AccountSignalPage() {
  const result = ingestPublicSnapshot(loadLimaCharlieSnapshot(), new MemoryResearchStore());
  if (result.status !== "stored") {
    return (
      <PageMain>
        <section className="py-16">
          <h1 className="font-display text-4xl text-foreground">Research brief unavailable</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {result.status === "rejected" ? result.reason : "The snapshot did not store."}
          </p>
        </section>
      </PageMain>
    );
  }

  const { brief, contentHash, provenanceNote } = result.record;

  return (
    <PageMain>
      <article className="flex flex-col gap-12 py-16">
        <header className="flex flex-col gap-4">
          <Kicker>Prototype</Kicker>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-5xl">
            LimaCharlie, from one public documentation page
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            This brief is built only from a saved snapshot. Verified lines are quotations.
            A hypothesis is an inference and is labeled. Missing business facts stay missing.
            No paid search API and no language model ran for this page.
          </p>
        </header>

        <section className="flex flex-col gap-3" aria-labelledby="subject-heading">
          <h2 id="subject-heading" className="text-lg font-semibold text-foreground">
            Company
          </h2>
          <p className="text-base leading-7 text-foreground">
            {brief.subject.name} ({brief.subject.domain}). Identity in this snapshot:{" "}
            {brief.subject.resolution}.
          </p>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="text-lg font-semibold text-foreground">
            Verified from the source
          </h2>
          <ul className="flex flex-col gap-6">
            {brief.verifiedFacts.map((fact) => (
              <li key={fact.quote} className="flex flex-col gap-2">
                <p className="text-base leading-7 text-foreground">{fact.statement}</p>
                <blockquote className="border-l border-accent pl-4 text-base leading-7 text-muted">
                  {fact.quote}
                </blockquote>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="hypothesis-heading">
          <h2 id="hypothesis-heading" className="text-lg font-semibold text-foreground">
            Hypothesis
          </h2>
          <ul className="flex flex-col gap-4">
            {brief.hypotheses.map((item) => (
              <li key={item.statement} className="flex flex-col gap-2">
                <p className="text-base leading-7 text-foreground">{item.statement}</p>
                <p className="text-sm leading-6 text-muted">{item.basis}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="unavailable-heading">
          <h2 id="unavailable-heading" className="text-lg font-semibold text-foreground">
            Not in this source
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-muted">
            {brief.unavailable.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3 border-t border-border pt-8" aria-labelledby="provenance-heading">
          <h2 id="provenance-heading" className="text-lg font-semibold text-foreground">
            Provenance
          </h2>
          <dl className="grid gap-4 text-sm leading-6 text-muted">
            <div>
              <dt className="font-medium text-foreground">Source</dt>
              <dd>
                <a className="link-rule text-foreground" href={brief.source.url}>
                  {brief.source.url}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Extracted</dt>
              <dd>{brief.source.retrievedAt}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Content hash</dt>
              <dd className="break-all font-mono text-xs">{contentHash}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">How this copy was kept</dt>
              <dd className="max-w-2xl text-base leading-7">{provenanceNote}</dd>
            </div>
          </dl>
        </section>
      </article>
    </PageMain>
  );
}
