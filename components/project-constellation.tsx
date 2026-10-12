import { constellationNotes, constellationSlugs } from "@/lib/constellation";
import { statusCopy } from "@/lib/portfolio";
import { kindBySlug, type PortfolioKind } from "@/lib/portfolio-registry";
import { directoryProjects } from "@/lib/project-directory";
import Link from "next/link";

const kindLabel: Record<PortfolioKind, string> = {
  work: "Work",
  "side-quest": "Side quest",
};

/**
 * Keyboard links plus a visible sentence for each edge.
 * The dots are decoration. The list is the diagram in words.
 */
export function ProjectConstellation() {
  const nodes = constellationSlugs.map((slug) => {
    const project = directoryProjects.find((item) => item.slug === slug);
    if (!project) {
      throw new Error(`Missing constellation project ${slug}`);
    }
    return project;
  });
  const [primary, ...supporting] = nodes;
  if (!primary) {
    throw new Error("Missing constellation center");
  }

  return (
    <div className="mt-10">
      <h3 className="font-display text-2xl tracking-tight">Three projects, one field question</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        The marks show a relationship a reader can also follow as a link. Nothing in this diagram is a live integration, a shared database, or an employer deployment.
      </p>
      <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
        <li className="relative border-l border-border pl-4 md:col-span-2 md:mx-auto md:w-full md:max-w-md md:border-l-0 md:border-b md:pb-4 md:pl-0">
          <span aria-hidden="true" className="absolute top-5 -left-1 h-2 w-2 rounded-full bg-accent md:top-auto md:-bottom-1 md:left-1/2 md:-translate-x-1/2" />
          <ConstellationLink project={primary} />
        </li>
        {supporting.map((project) => (
          <li key={project.slug} className="relative border-l border-border pl-4 md:border-l-0 md:pl-0 md:pt-3">
            <span aria-hidden="true" className="absolute top-5 -left-1 h-1.5 w-1.5 rounded-full bg-foreground md:top-1 md:left-0" />
            <ConstellationLink project={project} />
          </li>
        ))}
      </ul>
      <h3 className="mt-8 text-sm font-semibold">The same links, in words</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {constellationNotes.map((note) => (
          <li key={`${note.from}-${note.to}`}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}

function ConstellationLink({
  project,
}: {
  project: (typeof directoryProjects)[number];
}) {
  const kind = kindBySlug[project.slug];
  return (
    <Link
      href={project.caseStudyUrl}
      className="flex min-h-11 flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="editorial-eyebrow text-accent">
        {kindLabel[kind]} · {statusCopy[project.status]}
      </span>
      <span className="mt-2 font-semibold tracking-tight">{project.title}</span>
    </Link>
  );
}
