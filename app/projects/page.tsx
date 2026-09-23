import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { UseCaseBrowser } from "@/components/use-case-browser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales use cases — Kristen Joy Aing",
  description:
    "Account intelligence, competitive evidence, partner workflows, enablement, and product-to-field systems, labeled by what was used, prototyped, designed, or still an idea.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <section className="grid gap-6 border-b border-border py-16 sm:py-20 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-12">
        <Kicker>Use cases</Kicker>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
            Browse by the sales job, then by how real it is.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            I sell enterprise cybersecurity and design the systems around the
            deal. Competitive briefs and playbooks were used with teams. The
            coverage catalog is a prototype you can inspect. The rest are
            designs or ideas, and they are labeled that way.
          </p>
        </div>
      </section>
      <UseCaseBrowser />
    </PageMain>
  );
}
