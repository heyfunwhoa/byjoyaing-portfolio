import { ProjectStatusPill } from "@/components/project-status-pill";
import { completePageMetadata } from "@/lib/page-metadata";
import { BrandAvatar } from "@/components/brand-avatar";
import { PageMain } from "@/components/page-main";
import { ProjectsDirectory } from "@/components/projects-directory";
import { ProjectsSystems } from "@/components/projects-systems";
import { categoryFromSlug,
  lifecycleStages, roadmapProjects,
} from "@/lib/project-directory";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
  title: "Projects",
  description:
    "Revenue, account, enablement, customer, and technical GTM systems, labeled as prototype, field practice, design, or concept.",
},
  "/projects",
);

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; stage?: string; q?: string }>;
}) {
  const { category, stage, q } = await searchParams;
  const initialStage =
    lifecycleStages.find((value) => value === stage) ?? "All";
  const roadmap = roadmapProjects();

  return (
    <PageMain>
      <section className="grid items-center gap-7 border-b border-border py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="min-w-0">
        <p className="editorial-eyebrow text-accent">Builds · Side Quests</p>
        <h1 className="editorial-title mt-3 max-w-3xl">
          Systems for how a revenue team plans, sells, and learns.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          I design and build GTM systems that turn fragmented information into structured intelligence and workflows a person can use. The work joins enterprise sales, product thinking, and technical implementation, from competitive intelligence and customer feedback to security research, enablement, and account-based GTM.
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
          Each project is a prototype, professional field system, design, or concept. The label is the implementation status, not a production claim.
        </p>
        </div>
        <div className="mx-auto w-full max-w-[8rem] md:max-w-[12rem]"><BrandAvatar variant="builder" /><p className="editorial-eyebrow mt-3 text-center text-muted">Builder / Side Quests</p>
        </div>
      </section>

      <section id="directory" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Explore all projects</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Filter by focus or lifecycle stage, then open a project to see what exists today, your contribution, and the supporting evidence.
        </p>
        <div className="mt-6">
          <ProjectsDirectory
            key={`${category ?? "all"}-${stage ?? "All"}-${q ?? ""}`}
            initialCategory={categoryFromSlug(category)}
            initialStage={initialStage}
            initialQuery={q}
          />
        </div>
      </section>

      <section id="systems" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Connected GTM systems</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">From market intelligence to customer execution.</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          These projects cover different parts of the same motion. Selecting one shows its inputs and output. The lines are a map, not a data integration.
        </p>
        <details className="mt-5 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            Explore how the systems connect
          </summary>
          <div className="mt-4">
          <ProjectsSystems />
        </div>
        </details>
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
