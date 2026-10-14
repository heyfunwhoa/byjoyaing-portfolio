import { completePageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Academy } from "@/components/ai-academy/academy";
import {
  academyResources,
  availabilityLabels,
} from "@/lib/academy/lesson-guidance";

export const metadata: Metadata = completePageMetadata(
  {
    title: "Builder Academy",
    description:
      "Choose a learning path through AI basics, practical building, research and verification. Find available lessons, guides and practice labs.",
  },
  "/ai-academy",
);

export default function Page() {
  return (
    <Academy
      resources={
        <details className="mb-6 rounded-xl border border-border bg-card p-4">
          <summary className="min-h-11 cursor-pointer py-2 font-medium">
            Explore guides, labs and planned modules
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted">
            Short lessons are available in the catalog below. Guides are longer
            reading; simulations use fictional examples. Planned modules are
            outlines, not completed lessons.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {academyResources
              .filter((resource) => resource.availability !== "planned")
              .map((resource) => (
                <div
                  key={resource.href}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="text-xs font-medium text-muted">
                    {availabilityLabels[resource.availability]} ·{" "}
                    {resource.format}
                  </p>
                  <Link
                    href={resource.href}
                    className="mt-1 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
                  >
                    {resource.title}
                  </Link>
                  <p className="text-sm leading-6 text-muted">
                    {resource.detail}
                  </p>
                </div>
              ))}
          </div>
          {academyResources
            .filter((resource) => resource.availability === "planned")
            .map((resource) => (
              <div
                key={resource.id}
                className="mt-4 border-t border-border pt-4"
              >
                <p className="font-semibold">
                  {availabilityLabels[resource.availability]} · {resource.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {resource.detail}
                </p>
                <Link
                  href={resource.href}
                  className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                >
                  View the systems roadmap
                </Link>
              </div>
            ))}
        </details>
      }
    />
  );
}
