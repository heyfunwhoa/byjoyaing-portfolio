import { PageMain } from "@/components/page-main";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { capabilityBySlug, capabilityViews, projectsForCapability } from "@/lib/capabilities";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return capabilityViews.map((view) => ({ slug: view.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const view = capabilityBySlug(slug);
  if (!view) return { title: "Capabilities — Kristen Joy Aing" };
  return {
    title: `${view.title} — Kristen Joy Aing`,
    description: view.summary,
  };
}

export default async function CapabilityPage({ params }: PageProps) {
  const { slug } = await params;
  const view = capabilityBySlug(slug);
  if (!view) notFound();
  const projects = projectsForCapability(view);

  return (
    <PageMain>
      <section className="border-b border-border py-12">
        <p className="text-sm font-medium text-muted">
          <Link href="/capabilities" className="hover:text-foreground">Capabilities</Link>
          {" / "}
          {view.title}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">{view.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{view.summary}</p>
      </section>
      <ul className="flex flex-col gap-4 py-12">
        {projects.map((project) => (
          <li key={project.slug}>
            <article className="rounded-2xl border border-border p-5">
              <div className="flex flex-wrap items-center gap-2">
                <ProjectStatusPill status={project.status} />
                <span className="text-xs text-muted">{project.categories[0]}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
              <p className="mt-2 text-sm leading-6">{project.role}</p>
              <Link href={project.caseStudyUrl} className="mt-4 inline-flex text-sm font-medium text-accent">
                View case study
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <p className="pb-12 text-sm">
        <Link href="/projects" className="font-medium text-accent">Back to all projects</Link>
      </p>
    </PageMain>
  );
}
