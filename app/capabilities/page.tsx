import { CollectionBreadcrumb } from "@/components/collection-breadcrumb";
import { completePageMetadata } from "@/lib/page-metadata";
import { PageMain } from "@/components/page-main";
import { capabilityViews } from "@/lib/capabilities";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata({
  title: "Capabilities",
  description:
    "Revenue strategy, GTM engineering, revenue operations, AI product systems, and sales enablement, shown through existing portfolio work.",
}, "/capabilities");

export default function CapabilitiesPage() {
  return (
    <PageMain>
      <section className="border-b border-border py-12">
        <CollectionBreadcrumb items={[{"href":"/","label":"Home"},{"href":"/work","label":"Work"},{"label":"Capabilities"}]} />
          <p className="text-sm font-medium text-muted">Capabilities</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Commercial judgment. Practical systems.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Explore how I approach enterprise selling, people development and repeatable GTM work. Each area connects professional experience with clearly labeled independent examples.
        </p>
      </section>
      <ul className="grid gap-4 py-12 md:grid-cols-2">
        {capabilityViews.map((view) => (
          <li key={view.slug}>
            <Link href={`/capabilities/${view.slug}`} className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 hover:border-accent">
              <h2 className="text-xl font-semibold tracking-tight">{view.title}</h2>
              <p className="text-sm leading-6 text-muted">{view.summary}</p>
              <span className="mt-auto text-sm font-medium text-accent">Explore the evidence →</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageMain>
  );
}
