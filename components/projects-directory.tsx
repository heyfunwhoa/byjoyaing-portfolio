"use client";

import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import {
  activeProjects,
  directoryCategories,
  lifecycleStages,
  type DirectoryCategory,
} from "@/lib/project-directory";
import type { LifecyclePhase } from "@/lib/portfolio";
import Link from "next/link";
import { useMemo, useState } from "react";

export function ProjectsDirectory() {
  const [category, setCategory] = useState<DirectoryCategory>("All work");
  const [stage, setStage] = useState<LifecyclePhase | "All">("All");
  const projects = useMemo(() => {
    return activeProjects().filter((project) => {
      const categoryMatch = category === "All work" || project.categories.includes(category);
      const stageMatch = stage === "All" || project.phase === stage;
      return categoryMatch && stageMatch;
    });
  }, [category, stage]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div role="group" aria-label="Project categories" className="flex gap-2 overflow-x-auto pb-1">
          {directoryCategories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={
                  selected
                    ? "shrink-0 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                    : "shrink-0 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-accent"
                }
              >
                {item}
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Lifecycle stage" className="flex gap-2 overflow-x-auto pb-1">
          {(["All", ...lifecycleStages] as const).map((item) => {
            const selected = stage === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setStage(item)}
                className={
                  selected
                    ? "shrink-0 rounded-md border border-foreground px-2.5 py-1.5 text-xs font-medium"
                    : "shrink-0 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted hover:border-accent hover:text-foreground"
                }
              >
                {item === "All" ? "All stages" : item}
              </button>
            );
          })}
        </div>
      </div>
      {projects.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-foreground/30 p-5 text-sm leading-6 text-muted">
          No active project is tagged {stage === "All" ? category : stage}. Future concepts stay in the roadmap below.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="flex">
              <article className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4">
                <ProjectPreview kind={project.preview} compact />
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusPill status={project.status} />
                  <span className="text-xs text-muted">{project.categories[0]}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    <Link href={project.caseStudyUrl} className="link-rule hover:text-accent">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-6 text-muted">{project.summary}</p>
                  <p className="text-sm leading-6">{project.role}</p>
                </div>
                <Link href={project.caseStudyUrl} className="text-sm font-medium text-accent">
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
