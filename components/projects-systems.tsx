"use client";

import { systemLayers, directoryProjects } from "@/lib/project-directory";
import { salesFor } from "@/lib/sales";
import Link from "next/link";
import { useState } from "react";

export function ProjectsSystems() {
  const [slug, setSlug] = useState<string>(systemLayers[0].slugs[0]);
  const project = directoryProjects.find((item) => item.slug === slug) ?? directoryProjects[0];
  const sales = salesFor(project.slug);
  const related = sales.related.flatMap((relatedSlug) => {
    const match = directoryProjects.find((item) => item.slug === relatedSlug);
    return match ? [match] : [];
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
      <div className="flex flex-col gap-3">
        {systemLayers.map((layer, index) => (
          <div key={layer.title}>
            {index > 0 ? (
              <svg aria-hidden="true" viewBox="0 0 16 24" className="mx-auto h-6 w-4 text-muted">
                <path d="M8 1v16M3 13l5 6 5-6" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1.25" />
              </svg>
            ) : null}
            <div className="rounded-2xl border border-dashed border-foreground/30 p-3">
              <h3 className="px-1 text-xs font-medium tracking-wide text-muted">{layer.title}</h3>
              <ul className={`mt-3 grid gap-2 ${layer.slugs.length > 1 ? "sm:grid-cols-3" : ""}`}>
                {layer.slugs.map((layerSlug) => {
                  const item = directoryProjects.find((entry) => entry.slug === layerSlug);
                  if (!item) return null;
                  const selected = item.slug === project.slug;
                  return (
                    <li key={item.slug}>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSlug(item.slug)}
                        className={
                          selected
                            ? "h-full w-full rounded-xl border border-accent bg-card p-3 text-left"
                            : "h-full w-full rounded-xl border border-border bg-card p-3 text-left hover:border-accent"
                        }
                      >
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted">{item.summary}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
        <p className="text-xs leading-5 text-muted">Dashed links are a conceptual map. These projects do not exchange data.</p>
      </div>
      <aside className="h-fit rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted">{project.phase}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{project.title}</h3>
        <dl className="mt-4 space-y-3 text-sm leading-6">
          <div>
            <dt className="font-medium">Primary inputs</dt>
            <dd className="text-muted">{sales.intake}</dd>
          </div>
          <div>
            <dt className="font-medium">Core workflow</dt>
            <dd className="text-muted">{sales.pipeline}</dd>
          </div>
          <div>
            <dt className="font-medium">Intended output</dt>
            <dd className="text-muted">{sales.produces}</dd>
          </div>
          <div>
            <dt className="font-medium">Related projects</dt>
            <dd className="text-muted">
              {related.length === 0
                ? "None linked."
                : related.map((item) => item.title).join(", ")}
            </dd>
          </div>
        </dl>
        <Link href={project.caseStudyUrl} className="mt-4 inline-flex text-sm font-medium text-accent">
          View case study
        </Link>
      </aside>
    </div>
  );
}
