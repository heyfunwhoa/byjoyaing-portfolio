import { PageMain } from "@/components/page-main";
import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { ProjectsDirectory } from "@/components/projects-directory";
import { ProjectsSystems } from "@/components/projects-systems";
import { categoryFromSlug, featuredProjects, roadmapProjects } from "@/lib/project-directory";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Kristen Joy Aing",
  description:
    "Revenue, account, enablement, customer, and technical GTM systems, labeled as prototype, field practice, design, or concept.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const featured = featuredProjects();
  const roadmap = roadmapProjects();

  return (
    <PageMain>
      <section className="border-b border-border py-10 sm:py-12">
        <p className="text-sm font-medium text-muted">Projects / Selected work</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Systems for how a revenue team plans, sells, and learns.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          I design and build GTM systems that turn fragmented information into structured intelligence, actionable workflows, and measurable business outcomes. The work joins enterprise sales, product thinking, and technical implementation, from competitive intelligence and customer feedback to security research, enablement, and account-based GTM.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm">
          {["Enterprise sales", "GTM systems", "Product and technical execution"].map((item) => (
            <li key={item} className="rounded-full border border-border px-3 py-1">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
          Each project is a prototype, professional field system, design, or concept. The label is the implementation status, not a production claim.
        </p>
      </section>

      <section id="featured" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Selected projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          A closer look at systems I have designed, built, and applied across cybersecurity, enterprise sales, and GTM operations.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          {featured.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <article key={project.slug} className="grid min-w-0 grid-cols-1 items-center gap-6 rounded-2xl border border-border p-4 sm:p-6 lg:grid-cols-2">
                <div className={flipped ? "lg:order-2" : undefined}>
                  <div className="flex flex-wrap items-center gap-2">
                    <ProjectStatusPill status={project.status} />
                    <span className="text-xs text-muted">{project.categories.join(" · ")}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{project.summary}</p>
                  <p className="mt-3 text-sm leading-6">
                    <span className="font-medium">My contribution. </span>
                    {project.role}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    <span className="font-medium text-foreground">Technology. </span>
                    {project.technologies}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                    <Link href={project.caseStudyUrl} className="text-accent">
                      View case study
                    </Link>
                    {project.demoUrl ? (
                      <Link href={project.demoUrl} className="text-accent">
                        Open the live sample
                      </Link>
                    ) : null}
                    {project.githubUrl ? (
                      <a href={project.githubUrl} className="text-accent" target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className={flipped ? "min-w-0 lg:order-1" : "min-w-0"}>
                  <ProjectPreview kind={project.preview} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="directory" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Explore all projects</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Lifecycle stages are a second filter. A project can sit in more than one functional category. Revenue Intelligence is the Measure prototype. The other case studies still carry their own metrics. A hypothesis is not a measured outcome.
        </p>
        <div className="mt-6">
          <ProjectsDirectory key={category ?? "all"} initialCategory={categoryFromSlug(category)} />
        </div>
      </section>

      <section id="systems" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Connected GTM systems</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">From market intelligence to customer execution.</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          These projects cover different parts of the same motion. Selecting one shows its inputs and output. The lines are a map, not a data integration.
        </p>
        <div className="mt-8">
          <ProjectsSystems />
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-24 py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">On the roadmap</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">Ideas and operating models I am exploring next.</p>
        <ul className="mt-6 flex flex-col gap-3">
          {roadmap.map((project) => (
            <li key={project.slug}>
              <article className="flex flex-col gap-2 rounded-xl border border-dashed border-foreground/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{project.title}</h3>
                    <ProjectStatusPill status={project.status} />
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted">{project.summary}</p>
                </div>
                <Link href={project.caseStudyUrl} className="shrink-0 text-sm font-medium text-accent">
                  View note
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </PageMain>
  );
}
