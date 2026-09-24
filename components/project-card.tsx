import { StatusBadge } from "@/components/status-badge";
import type { SalesProject } from "@/lib/sales";
import Link from "next/link";

export function ProjectCard({
  project,
  density,
}: {
  project: SalesProject;
  density: "full" | "compact" | "quiet";
}) {
  const quiet = density === "quiet";

  return (
    <article
      className={
        quiet
          ? "flex flex-col gap-3 border border-dashed border-foreground/30 p-5"
          : "flex flex-col gap-3 border border-border bg-card p-5 sm:p-6"
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <span className="text-xs text-muted">{project.phase}</span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        <Link
          href={`/work/${project.slug}`}
          className="link-rule hover:text-accent"
        >
          {project.title}
          <span className="sr-only"> case study</span>
        </Link>
      </h3>
      <p className="text-base leading-7 text-foreground">
        {project.sales.salesQuestion}
      </p>
      {density === "full" ? (
        <dl className="grid gap-3 text-sm leading-6 text-muted">
          <div>
            <dt className="font-medium text-foreground">Who uses it</dt>
            <dd>{project.sales.userMoment}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Inputs → review → output
            </dt>
            <dd>{project.sales.pipeline}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Working today</dt>
            <dd>{project.sales.workingToday}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Planned next</dt>
            <dd>{project.sales.plannedNext}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              In this repo or a linked project
            </dt>
            <dd>{project.sales.implementedTech}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm leading-6 text-muted">
          {project.sales.workingToday}
        </p>
      )}
      {density === "full" ? (
        <p className="text-sm leading-6 text-muted">
          <span className="font-medium text-foreground">
            {project.sales.result.kind === "measured"
              ? "On record. "
              : "Metric to test. "}
          </span>
          {project.sales.result.text}
        </p>
      ) : null}
      {density === "quiet" ? (
        <p className="text-sm font-medium text-foreground">
          Concept. Not built.
        </p>
      ) : null}
    </article>
  );
}
