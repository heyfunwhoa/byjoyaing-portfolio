import { EditorialProjectCard } from "@/components/editorial-project-card";
import type { LabProject } from "@/lib/design-lab";

export function ProjectBento({ projects }: { projects: LabProject[] }) {
  if (projects.length === 0) {
    return (
      <p role="status" className="rounded-2xl border border-dashed border-foreground/30 p-5 text-sm leading-6 text-muted">
        Nothing in the directory matches this view. Categories were not added to force a result.
      </p>
    );
  }

  return (
    <ul className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      {projects.map((project) => (
        <li key={project.slug} className={project.featured ? "min-w-0 md:col-span-2 lg:col-span-4" : "min-w-0 lg:col-span-2"}>
          <EditorialProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
