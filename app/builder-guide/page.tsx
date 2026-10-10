import type { Metadata } from "next";
import { PageMain } from "@/components/page-main";
import { BuilderGuide } from "@/components/builder-guide";

export const metadata: Metadata = {
  title: "Builder Guide — Kristen Joy Aing",
  description: "Find the commercial leadership work, practical builds, and story behind joy.",
};

export default function BuilderGuidePage() {
  return (
    <PageMain>
      <section className="py-12 sm:py-16">
        <p className="text-sm font-medium text-muted">joy. / a curious way in</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          A little curiosity goes a long way.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          I'm Kristen Joy Aing: a commercial leader in enterprise cybersecurity who likes building useful things.
          Pick a direction to explore my work, approach, and independent projects.
        </p>
        <div className="mt-8">
          <BuilderGuide />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          This is a guided set of links, not an AI chatbot. It uses curated public portfolio content only.
        </p>
      </section>
    </PageMain>
  );
}
