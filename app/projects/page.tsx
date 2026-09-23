import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { UseCaseBrowser } from "@/components/use-case-browser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Four capabilities — Kristen Joy Aing",
  description:
    "Account intelligence, competitive and product intelligence, enablement, and GTM workflow design, labeled by what is built, used in the field, designed, or still an idea.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <section className="grid gap-6 border-b border-border py-16 sm:py-20 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-12">
        <Kicker>Use cases</Kicker>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
            Four capabilities. The label says what is real.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Competitive briefs were used with teams. The coverage sample is the
            only prototype in this repository. The other pages are designs or
            notes. A stack named inside a case study is not a finished
            integration.
          </p>
        </div>
      </section>
      <UseCaseBrowser />
    </PageMain>
  );
}
