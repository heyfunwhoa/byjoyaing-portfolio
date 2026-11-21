import { SystemsIllustrations } from "@/components/academy/systems-illustrations";
import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { completePageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = completePageMetadata(
  {
    title: "Systems Engineering",
    description:
      "Learn systems architecture, research pipelines, evidence and operations through applied exercises.",
  },
  "/ai-academy/systems",
);

export default function SystemsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-6xl px-5 py-12 sm:px-8"
    >
      <AcademyBreadcrumb title="Systems Engineering" />

      <p className="mt-8 text-xs font-semibold tracking-widest text-muted uppercase">
        Builder Academy · Learning pathway
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Engineering connected systems
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Explore how software, data, research, security and operations fit
        together. Start with the mental model, try a synthetic exercise, then
        apply it to a portfolio project.
      </p>
      <SystemsIllustrations />
      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">
          Capstone: research you can trust
        </h2>
        <p className="mt-3 text-sm text-muted">
          Use public or synthetic cybersecurity sources to map source → capture
          → hash → entity → claim → review → downstream product. Never confuse a
          provider result with independently verified evidence.
        </p>
        <p className="mt-3 text-sm">
          Start with the Account Signal Engine Research Hub and its RSS /
          Firecrawl foundation; add paid providers only after security, cost and
          quality evaluation.
        </p>
      </section>
    </main>
  );
}
