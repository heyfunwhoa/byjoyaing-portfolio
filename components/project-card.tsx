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
          ? "flex flex-col gap-3 border border-dashed border-foreground/30 p-5 transition-colors hover:border-accent"
          : "flex flex-col gap-3 border border-border bg-card p-5 transition-colors hover:border-accent sm:p-6"
      }
    >
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
            <dt className="font-medium text-foreground">Contribution</dt>
            <dd>{project.sales.myRole}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm leading-6 text-muted">{project.sales.myRole}</p>
      )}
      <details className="rounded-xl border border-border p-3">
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium">How it works</summary>
        <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
          <p>Recorded stage: {project.phase}. {project.sales.maturityDetail}</p>
          <p>{project.sales.workingToday}</p>
          <p>{project.sales.implementedTech}</p>
          {density === "full" ? <p>{project.sales.result.text}</p> : null}
        </div>
      </details>
    </article>
  );
}
