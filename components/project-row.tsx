import { StatusBadge } from "@/components/status-badge";
import { findUseCase, salesFor, type SalesProject } from "@/lib/sales";
import type { Project } from "@/lib/portfolio";
import Link from "next/link";

export function ProjectRow({ project }: { project: Project | SalesProject }) {
  const sales = "sales" in project ? project.sales : salesFor(project.slug);
  const useCase = sales.useCase ? findUseCase(sales.useCase) : undefined;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid grid-cols-1 items-baseline gap-2 py-5 md:grid-cols-[9.5rem_minmax(12rem,0.8fr)_minmax(0,1.2fr)] md:gap-6"
    >
      <span className="flex flex-col items-start gap-2">
        <StatusBadge status={project.status} />
        <span className="text-xs text-muted">{project.phase}</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
          {project.title}
        </span>
        {useCase ? (
          <span className="text-xs text-muted">{useCase.title}</span>
        ) : (
          <span className="text-xs text-muted">Outside the six sales jobs</span>
        )}
      </span>
      <span className="text-base leading-7 text-muted">
        {sales.salesQuestion}
      </span>
    </Link>
  );
}
