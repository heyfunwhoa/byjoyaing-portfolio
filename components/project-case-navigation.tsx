"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CollectionBreadcrumb } from "@/components/breadcrumb-trail";
import type { TrailItem } from "@/lib/collection-trail";
import { categoryFromSlug, filterDirectoryProjects, lifecycleStages } from "@/lib/project-directory";

function directoryFilters(params: { get: (key: string) => string | null } | null) {
  const filters = new URLSearchParams();
  if (params?.get("from") === "projects") {
    for (const key of ["category", "stage", "q"]) {
      const value = params.get(key);
      if (value) filters.set(key, value);
    }
  }
  return filters;
}

export function ProjectCaseBreadcrumb({ items }: { items: readonly TrailItem[] }) {
  const params = useSearchParams();
  const query = directoryFilters(params).toString();
  const href = `/projects${query ? `?${query}` : ""}#directory`;
  return <CollectionBreadcrumb items={items.map(item =>
    item.label === "Projects" ? { ...item, href } : item
  )} />;
}

export function ProjectSequence({ slug }: { slug: string }) {
  const params = useSearchParams();
  if (params?.get("from") !== "projects") return null;
  const filters = directoryFilters(params);
  const category = categoryFromSlug(filters.get("category") ?? undefined);
  const stage = lifecycleStages.find(value => value === filters.get("stage")) ?? "All";
  const projects = filterDirectoryProjects(category, stage, filters.get("q") ?? "");
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0 || projects.length < 2) return null;
  const context = new URLSearchParams({ from: "projects" });
  filters.forEach((value, key) => context.set(key, value));
  return (
    <nav aria-label="Project results" className="mt-8 grid min-w-0 gap-4 border-t border-border pt-6 sm:grid-cols-2">
      {[{ project: projects[index - 1], label: "Previous" }, { project: projects[index + 1], label: "Next" }].map(({ project, label }) =>
        project ? (
          <Link key={label} href={`${project.caseStudyUrl}?${context.toString()}`}
            className={`flex min-h-11 min-w-0 flex-col gap-1 rounded-lg border border-border p-4 text-accent hover:border-accent ${label === "Next" ? "sm:col-start-2" : ""}`}>
            <span className="text-sm">{label}</span>
            <span className="break-words font-medium">{project.title}</span>
          </Link>
        ) : null
      )}
    </nav>
  );
}
