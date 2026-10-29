"use client";

import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { ProjectEvidence } from "@/components/project-evidence";
import { ProjectStatusPill } from "@/components/project-status-pill";
import {
  activeProjects,
  categorySlugs,
  directoryStatus,
  directoryCategories,
  lifecycleStages,
  type DirectoryCategory,
} from "@/lib/project-directory";
import type { LifecyclePhase } from "@/lib/portfolio";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function ProjectsDirectory({
  initialCategory = "All work",
  initialStage = "All",
  initialQuery = "",
}: {
  initialCategory?: DirectoryCategory;
  initialStage?: LifecyclePhase | "All";
  initialQuery?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<DirectoryCategory>(initialCategory);
  const [stage, setStage] = useState<LifecyclePhase | "All">(initialStage);
  const [query, setQuery] = useState(initialQuery);
  const projects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return activeProjects().filter((project) => {
      const categoryMatch =
        category === "All work" || project.categories.includes(category);
      const stageMatch = stage === "All" || project.phase === stage;
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          project.title,
          project.summary,
          project.role,
          directoryStatus(project.status).label,
          project.phase,
          ...project.categories,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return categoryMatch && stageMatch && searchMatch;
    });
  }, [category, stage, query]);

  function updateFilters(
    nextCategory: DirectoryCategory,
    nextStage: LifecyclePhase | "All",
    nextQuery = query,
  ) {
    setCategory(nextCategory);
    setStage(nextStage);
    const params = new URLSearchParams();
    const slug = Object.entries(categorySlugs).find(
      ([, value]) => value === nextCategory,
    )?.[0];
    if (slug) params.set("category", slug);
    if (nextStage !== "All") params.set("stage", nextStage);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    router.replace(`/projects${params.size ? `?${params}` : ""}#directory`, {
      scroll: false,
    });
  }
  return (
    <div>
      <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-surface-sage p-4 sm:p-5">
        <label className="flex min-w-0 flex-col gap-2 text-sm font-medium sm:max-w-md">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, keyword, or role"
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3 text-base font-normal"
          />
        </label>
        <div className="grid gap-3 sm:hidden">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Project focus
            <select
              value={category}
              onChange={(event) =>
                updateFilters(event.target.value as DirectoryCategory, stage)
              }
              className="min-h-12 w-full rounded-lg border border-border bg-card px-3 text-base"
            >
              {directoryCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Lifecycle stage
            <select
              value={stage}
              onChange={(event) =>
                updateFilters(
                  category,
                  event.target.value as LifecyclePhase | "All",
                )
              }
              className="min-h-12 w-full rounded-lg border border-border bg-card px-3 text-base"
            >
              {(["All", ...lifecycleStages] as const).map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All stages" : item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          role="group"
          aria-label="Project categories"
          className="hidden min-w-0 flex-wrap gap-2 sm:flex"
        >
          {directoryCategories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => updateFilters(item, stage)}
                className={
                  selected
                    ? "min-h-11 shrink-0 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                    : "min-h-11 shrink-0 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-accent"
                }
              >
                {item}
              </button>
            );
          })}
        </div>
        <div
          role="group"
          aria-label="Lifecycle stage"
          className="hidden min-w-0 flex-wrap gap-2 sm:flex"
        >
          {(["All", ...lifecycleStages] as const).map((item) => {
            const selected = stage === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => updateFilters(category, item)}
                className={
                  selected
                    ? "min-h-11 shrink-0 rounded-md border border-foreground px-2.5 py-1.5 text-xs font-medium"
                    : "min-h-11 shrink-0 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted hover:border-accent hover:text-foreground"
                }
              >
                {item === "All" ? "All stages" : item}
              </button>
            );
          })}
        </div>
      </div>
      {category !== "All work" || stage !== "All" || query.trim() ? (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            updateFilters("All work", "All", "");
          }}
          className="mt-4 inline-flex min-h-11 items-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-accent"
        >
          Clear filters
        </button>
      ) : null}
      <p role="status" aria-live="polite" className="mt-5 text-sm text-muted">
        {projects.length} matching{" "}
        {projects.length === 1 ? "project" : "projects"}
      </p>
      {projects.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-foreground/30 p-5 text-sm leading-6 text-muted">
          No projects match these filters. Try a different search or clear the filters to see all projects.
        </p>
      ) : (
        <ul className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="flex min-w-0">
              <article className="flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusPill status={project.status} />
                  <span className="text-xs text-muted">
                    {project.categories[0]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    <Link
                      href={project.caseStudyUrl}
                      className="link-rule hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-6 text-muted">
                    {project.summary}
                  </p>
                  <p className="text-sm leading-6">{project.role}</p>
                </div>
                <details className="rounded-xl border border-border bg-background p-3">
                  <summary className="cursor-pointer py-1 text-sm font-medium">
                    Preview and tools
                  </summary>
                  <div className="mt-3">
                    <ProjectEvidence kind={project.preview} compact />
                    <ProjectTechnologyStack
                      slug={project.slug}
                      className="mt-3"
                      presentation="compact"
                    />
                  </div>
                </details>
                <Link
                  href={project.caseStudyUrl}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
                >
                  View case study
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
