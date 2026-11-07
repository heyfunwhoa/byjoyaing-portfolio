import { PortfolioExample } from "@/components/portfolio-example";
import { portfolioExamples } from "@/lib/portfolio-examples";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { PageMain } from "@/components/page-main";
import { RelatedWork } from "@/components/related-work";
import { SampleRecordView } from "@/components/sample-record";
import { WorkCaseBreadcrumb } from "@/components/work-case-breadcrumb";
import { CaseStudyContents } from "@/components/case-study-contents";
import { ProjectStoryLead } from "@/components/project-story-lead";
import { ProjectKindLabel } from "@/components/project-kind-label";
import { StatusBadge } from "@/components/status-badge";
import { salesProject, sampleFor } from "@/lib/sales";
import { notFound } from "next/navigation";

export function FieldAssetCase({
  slug,
}: {
  slug: "product-release-intelligence" | "truffle-camp" | "partner-gtm-engine";
}) {
  const project = salesProject(slug);
  if (!project) notFound();
  const sample = sampleFor(slug);

  return (
    <PageMain>
      <section className="border-b border-border py-16">
        <WorkCaseBreadcrumb slug={slug} />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <ProjectKindLabel slug={slug} />
          <StatusBadge status={project.status} />
          <p className="text-sm text-muted">{project.phase}</p>
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{project.sales.salesQuestion}</p>
      </section>
      <CaseStudyContents
        sections={[
          { id: "problem", label: "The problem" },
          { id: "contribution", label: "My contribution" },
          { id: "example", label: "One example" },
          { id: "used-in-field", label: "Field evidence" },
          { id: "where-it-stands", label: "Current status" },
          { id: "outcome", label: "Outcome" },
        ]}
      />
      <section className="border-b border-border py-12">
        <ProjectStoryLead
          problem={project.problem.summary}
          why={project.problem.why}
          without={project.problem.without}
          contribution={project.sales.myRole}
          example={
            sample ? (
              <SampleRecordView sample={sample} />
            ) : (
              <p className="text-base leading-7 text-muted">
                {project.sales.fieldAsset ?? project.mvp.version}
              </p>
            )
          }
        />
      </section>

      {slug === "truffle-camp" ? <PortfolioExample key={slug} example={portfolioExamples[slug]} /> : null}
      <ProjectTechnologyStack slug={slug} />

      <section id="used-in-field" className="scroll-mt-24 grid gap-4 border-b border-border py-12 md:grid-cols-2">
        {sample ? (
          <article className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-medium">What was used in the field</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {project.sales.fieldAsset ?? "No separate field asset. This page is the note."}
            </p>
          </article>
        ) : null}
        <article className="rounded-2xl border border-dashed border-foreground/30 p-5">
          <h2 className="text-sm font-medium">What remains a design</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.sales.proposedSoftware ?? "No software is proposed beyond this note."}
          </p>
        </article>
      </section>

      <section id="where-it-stands" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="text-lg font-semibold">Where it stands</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{project.sales.maturityDetail}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{project.sales.workingToday}</p>
      </section>

      <section id="outcome" className="scroll-mt-24 py-12">
        <p className="max-w-2xl text-sm leading-6 text-muted">{project.sales.result.text}</p>
        <RelatedWork slug={slug} />
      </section>
    </PageMain>
  );
}
