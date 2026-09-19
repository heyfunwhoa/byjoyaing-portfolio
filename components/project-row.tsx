import { Index } from "@/components/kicker";
import { StatusBadge } from "@/components/status-badge";
import type { Project } from "@/lib/portfolio";
import Link from "next/link";

export function ProjectRow({
  project,
  showPhase = false,
  index,
}: {
  project: Project;
  showPhase?: boolean;
  index?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid grid-cols-1 items-baseline gap-2 py-5 md:grid-cols-[2.25rem_7rem_minmax(11rem,0.9fr)_minmax(0,1.2fr)_auto] md:gap-6"
    >
      <span className="hidden md:block">
        {index != null ? <Index n={index} /> : null}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <span className="md:hidden">{index != null ? <Index n={index} /> : null}</span>
        <StatusBadge status={project.status} />
        {showPhase ? (
          <span className="text-sm text-muted">{project.phase}</span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
        {project.title}
      </h3>
      <p className="text-base leading-7 text-muted">{project.problem.summary}</p>
      <span className="link-rule w-fit shrink-0 text-sm font-medium text-accent md:justify-self-end">
        Case study
      </span>
    </Link>
  );
}
