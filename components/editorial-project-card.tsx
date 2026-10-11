import { ProjectStatusPill } from "@/components/project-status-pill";
import type { LabProject } from "@/lib/design-lab";
import Link from "next/link";

/**
 * One destination per card. The title is the link. A stretched hit area
 * makes the whole card clickable without nesting a second link.
 */
export function EditorialProjectCard({ project }: { project: LabProject }) {
  const featured = project.featured;

  return (
    <article
      className={`group editorial-panel relative flex h-full min-w-0 flex-col p-5 transition-colors focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ring sm:p-6 ${
        featured
          ? "bg-foreground text-background hover:bg-[#303A32]"
          : "bg-card hover:border-accent"
      }`}
    >
      {project.figure ? (
        <p
          className={`mb-4 rounded-xl border px-3 py-3 text-sm leading-6 ${
            featured ? "border-[#D4CEC4]/40 text-[#D4CEC4]" : "border-border text-muted"
          }`}
        >
          {project.figure}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <ProjectStatusPill status={project.status} />
      </div>
      <p className={`editorial-eyebrow mt-4 ${featured ? "text-[#F3EFE6]" : "text-accent"}`}>{project.category}</p>
      <h3 className={`mt-2 font-display tracking-tight ${featured ? "text-3xl leading-tight" : "text-xl"}`}>
        <Link
          href={project.href}
          className="focus-visible:outline-none after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
          <span className="sr-only">. {project.destinationLabel}</span>
        </Link>
      </h3>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-[#D4CEC4]" : "text-muted"}`}>{project.summary}</p>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-[#E4DED4]" : "text-foreground"}`}>{project.technologies}</p>
      <p className={`editorial-link mt-auto inline-flex min-h-11 items-end pt-5 text-sm font-semibold underline ${featured ? "" : "text-accent"}`}>
        {project.destinationLabel}
        <span aria-hidden="true" className="nudge-link ml-2 inline-block">→</span>
      </p>
    </article>
  );
}
