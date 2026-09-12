import { PageMain } from "@/components/page-main";
import { getProject, projects, statusCopy } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `${project.title} — Kristen Joy Aing`,
    description: project.problem.summary,
  };
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
      {steps.map((step, index) => (
        <li
          key={`${step}-${index}`}
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
        >
          {index > 0 ? (
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              →
            </span>
          ) : null}
          <span className="rounded-md border border-border bg-card px-2 py-1 text-foreground">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-b border-border py-10">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="max-w-2xl space-y-3 text-sm leading-6 text-muted">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  return (
    <PageMain>
        <header className="flex flex-col gap-4 border-b border-border py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            {project.phase} · {statusCopy[project.status]}
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">{project.problem.summary}</p>
          <p className="text-sm text-muted">Career signal: {project.careerSignal}</p>
          <Link
            href="/projects"
            className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            All projects
          </Link>
        </header>

        <Section title="1. Problem">
          <p>{project.problem.summary}</p>
          <p>{project.problem.why}</p>
          <p>Without this: {project.problem.without}</p>
        </Section>

        <Section title="2. Users">
          <p>Primary: {project.users.primary}</p>
          <p>Secondary: {project.users.secondary}</p>
          <p>Job: {project.users.job}</p>
        </Section>

        <Section title="3. Evidence">
          <p>{project.evidence}</p>
        </Section>

        <Section title="4. Goals and non-goals">
          <p className="font-medium text-foreground">Goals</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.goals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="font-medium text-foreground">Non-goals</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.nonGoals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="5. MVP">
          <p>{project.mvp.version}</p>
          <p>Question the MVP tests: {project.mvp.question}</p>
        </Section>

        <Section title="6. Workflow">
          <Flow steps={project.workflow} />
        </Section>

        <Section title="7. System design">
          <p className="font-medium text-foreground">Plain language</p>
          <Flow steps={project.systemPlain} />
          <p className="font-medium text-foreground">Technical</p>
          <Flow steps={project.systemTechnical} />
        </Section>

        <Section title="8. Data model">
          <ul className="flex flex-wrap gap-2">
            {project.dataModel.map((entity) => (
              <li
                key={entity}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground"
              >
                {entity}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="9. Metrics">
          <p className="font-medium text-foreground">Operational</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.metrics.operational.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="font-medium text-foreground">Behavioral</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.metrics.behavioral.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="font-medium text-foreground">Business</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.metrics.business.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="10. Business impact hypothesis">
          <p>{project.hypothesis}</p>
        </Section>

        <Section title="11. Tradeoffs">
          <ul className="list-disc space-y-1 pl-5">
            {project.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="12. Prototype">
          <p>{project.prototype}</p>
          <p className="font-medium text-foreground">Intended value</p>
          <ul className="list-disc space-y-1 pl-5">
            {project.businessValue.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="13. What I would build next">
          <ul className="list-disc space-y-1 pl-5">
            {project.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
    </PageMain>
  );
}
