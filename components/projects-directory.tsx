"use client";

import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { ProjectEvidence } from "@/components/project-evidence";
import { ProjectStatusPill } from "@/components/project-status-pill";
import {
  filterDirectoryProjects,
  categorySlugs,
  categoryFromSlug,
  directoryStatus,
  directoryCategories,
  lifecycleStages,
  type DirectoryCategory,
} from "@/lib/project-directory";
import type { LifecyclePhase } from "@/lib/portfolio";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export function ProjectsDirectory({
  initialCategory = "All work",
  initialStage = "All",
  initialQuery = "",
}: {
  initialCategory?: DirectoryCategory;
  initialStage?: LifecyclePhase | "All";
  initialQuery?: string;
}) {
  const searchParams = useSearchParams();
  const category = searchParams
    ? categoryFromSlug(searchParams.get("category") ?? undefined)
    : initialCategory;
  const stage = searchParams
    ? lifecycleStages.find((value) => value === searchParams.get("stage")) ?? "All"
    : initialStage;
  const urlQuery = searchParams ? searchParams.get("q") ?? "" : initialQuery;
  const [query, setQuery] = useState(urlQuery);
  const [previousUrlQuery, setPreviousUrlQuery] = useState(urlQuery);
  // Text entry must update synchronously; Next's history notification is a transition.
  // Reconcile external URL changes (including Back) without remounting the input.
  if (urlQuery !== previousUrlQuery) {
    setPreviousUrlQuery(urlQuery);
    setQuery(urlQuery);
  }
  const hasFilters = category !== "All work" || stage !== "All" || query.length > 0;
  const projects = useMemo(
    () => filterDirectoryProjects(category, stage, query),
    [category, stage, query],
  );

  // Carry only directory controls, not unrelated URL parameters or arbitrary return URLs.
  const directoryContext = new URLSearchParams({ from: "projects" });
  const categorySlug = Object.entries(categorySlugs).find(([, value]) => value === category)?.[0];
  if (categorySlug) directoryContext.set("category", categorySlug);
  if (stage !== "All") directoryContext.set("stage", stage);
  if (query) directoryContext.set("q", query);
  const caseStudyHref = (href: string) => `${href}?${directoryContext.toString()}`;

  function updateFilters(
    nextCategory: DirectoryCategory,
    nextStage: LifecyclePhase | "All",
    nextQuery = query,
  ) {
    setQuery(nextQuery);
    const url = new URL(window.location.href);
    const params = url.searchParams;
    for (const key of ["category", "stage", "q"]) params.delete(key);
    const slug = Object.entries(categorySlugs).find(
      ([, value]) => value === nextCategory,
    )?.[0];
    if (slug) params.set("category", slug);
    if (nextStage !== "All") params.set("stage", nextStage);
    if (nextQuery) params.set("q", nextQuery);
    // Next syncs useSearchParams with native history without a route transition.
    // Preserve the current fragment, focus, scroll and mounted card disclosures.
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
  return (
    <div>
      <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-surface-sage p-4 sm:p-5">
        <label className="flex min-w-0 flex-col gap-2 text-sm font-medium sm:max-w-md">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(event) => updateFilters(category, stage, event.target.value)}
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
      <button
        type="button"
        aria-disabled={!hasFilters}
        onClick={() => {
          if (hasFilters) updateFilters("All work", "All", "");
        }}
        className="mt-4 inline-flex min-h-11 items-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-accent aria-disabled:cursor-default aria-disabled:opacity-50"
      >
        Clear filters
      </button>
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
              <article className="flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent focus-within:border-accent motion-reduce:transition-none sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusPill status={project.status} />
                  <span className="text-xs text-muted">
                    {project.categories[0]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    <Link
                      href={caseStudyHref(project.caseStudyUrl)}
                      className="link-rule hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-6 text-muted">
                    {project.summary}
                  </p>
                  <p className="text-sm leading-6"><span className="font-medium">My role: </span>{project.role}</p>
                </div>
                <details className="rounded-xl border border-border bg-background p-3">
                  <summary className="min-h-11 cursor-pointer content-center rounded-sm py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
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
                  href={caseStudyHref(project.caseStudyUrl)}
                  className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span>Read case study<span className="sr-only">: {project.title}</span></span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
