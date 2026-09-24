"use client";

import { ProjectCard } from "@/components/project-card";
import { ProjectRow } from "@/components/project-row";
import { StatusBadge } from "@/components/status-badge";
import { statusCopy, statusHelp, type ProjectStatus } from "@/lib/portfolio";
import {
  densityFor,
  projectsInUseCase,
  salesProjects,
  useCases,
} from "@/lib/sales";
import { useMemo, useState } from "react";

const maturityFilters: Array<ProjectStatus | "all"> = [
  "all",
  "field",
  "prototype",
  "designed",
  "exploring",
];

export function UseCaseBrowser() {
  const [maturity, setMaturity] = useState<ProjectStatus | "all">("all");
  const all = useMemo(() => salesProjects(), []);

  const visibleAll = all.filter(
    (project) => maturity === "all" || project.status === maturity,
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6 border-b border-border py-8">
        <nav aria-label="Sales use cases">
          <ul className="flex flex-col gap-2">
            {useCases.map((useCase) => (
              <li key={useCase.id}>
                <a
                  href={`#${useCase.id}`}
                  className="link-rule text-sm font-medium text-foreground hover:text-accent"
                >
                  {useCase.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <p
            id="maturity-filter-label"
            className="text-sm font-medium text-foreground"
          >
            Show by maturity
          </p>
          <div
            role="group"
            aria-labelledby="maturity-filter-label"
            className="flex flex-wrap gap-2"
          >
            {maturityFilters.map((filter) => {
              const selected = maturity === filter;
              const label =
                filter === "all" ? "All maturities" : statusCopy[filter];
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setMaturity(filter)}
                  className={
                    selected
                      ? "rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                      : "rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:border-accent"
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(statusHelp) as ProjectStatus[]).map((status) => (
            <li key={status} className="flex items-start gap-3">
              <StatusBadge status={status} />
              <p className="text-sm leading-6 text-muted">
                {statusHelp[status]}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {useCases.map((useCase) => {
        const items = projectsInUseCase(useCase.id).filter(
          (project) => maturity === "all" || project.status === maturity,
        );

        return (
          <section
            key={useCase.id}
            id={useCase.id}
            className="scroll-mt-24 border-b border-border py-12"
            aria-labelledby={`${useCase.id}-title`}
          >
            <div className="mb-6 flex max-w-3xl flex-col gap-3">
              <h2
                id={`${useCase.id}-title`}
                className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                {useCase.title}
              </h2>
              <p className="text-base leading-7 text-muted">
                {useCase.promise}
              </p>
              <p className="text-sm leading-6 text-foreground">
                {useCase.flow}
              </p>
            </div>
            {items.length === 0 ? (
              <p className="text-sm leading-6 text-muted">
                Nothing in this use case is at that maturity.
              </p>
            ) : (
              <ul
                className={
                  useCase.emphasis === "lead" || items.length === 1
                    ? "flex flex-col gap-4"
                    : "grid gap-4 lg:grid-cols-2"
                }
              >
                {items.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard
                      project={project}
                      density={densityFor(project.slug, project.status)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      <section
        id="all"
        className="scroll-mt-24 py-12"
        aria-labelledby="all-title"
      >
        <div className="mb-4 flex max-w-2xl flex-col gap-2">
          <h2
            id="all-title"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            All projects
          </h2>
          <p className="text-sm leading-6 text-muted">
            Lifecycle phase stays on each row as secondary context. Maturity is
            the status badge.
          </p>
        </div>
        {visibleAll.length === 0 ? (
          <p className="text-sm leading-6 text-muted">
            No projects at that maturity.
          </p>
        ) : (
          <ul>
            {visibleAll.map((project) => (
              <li key={project.slug} className="border-t border-border">
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
