import { CoverageExplorer } from "@/components/coverage-explorer";
import { CropFrame } from "@/components/crop-frame";
import { Index } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import { getProject, projects } from "@/lib/portfolio";
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
  return <p>{steps.join(" → ")}</p>;
}

function Fold({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <details className="border-t border-border py-5">
      <summary className="cursor-pointer text-base font-semibold tracking-tight text-foreground">
        <Index n={index} /> {title}
      </summary>
      <div className="mt-3 max-w-2xl space-y-3 text-base leading-7 text-muted">
        {children}
      </div>
    </details>
  );
}

function Heading({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-2 text-lg font-semibold tracking-tight text-foreground">
      <Index n={n} />
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const pull = project.metrics.business[0] ?? project.hypothesis;

  return (
    <PageMain>
      <div className="grid gap-12 border-b border-border py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <aside className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4 lg:sticky lg:top-24 lg:flex-col lg:flex-nowrap lg:self-start">
          <div className="flex flex-col gap-3">
            <StatusBadge status={project.status} />
            <p className="text-sm text-muted">{project.phase}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm leading-6 text-muted">
            <p>
              <span className="font-medium text-foreground">Primary. </span>
              {project.users.primary}
            </p>
            <p>
              <span className="font-medium text-foreground">Secondary. </span>
              {project.users.secondary}
            </p>
            <p>
              <span className="font-medium text-foreground">Job. </span>
              {project.users.job}
            </p>
          </div>
          <p className="text-sm leading-6 text-muted">
            <span className="font-medium text-foreground">Career signal. </span>
            {project.careerSignal}
          </p>
          <Link
            href="/projects"
            className="link-rule w-fit text-sm font-medium text-accent"
          >
            All projects
          </Link>
        </aside>

        <article className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-5 pb-10">
            <h1 className="font-display max-w-3xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              {project.problem.summary}
            </p>
          </header>

          {slug === "detector-coverage-atlas" ? (
            <div className="pb-10">
              <CropFrame>
                <CoverageExplorer />
              </CropFrame>
            </div>
          ) : null}

          <blockquote className="relative mb-10 pl-10 text-lg leading-8 text-foreground">
            <span
              aria-hidden="true"
              className="font-display absolute top-[-0.35em] left-0 text-5xl leading-none text-accent"
            >
              “
            </span>
            {pull}
          </blockquote>

          <section className="flex flex-col gap-3 border-t border-border py-8">
            <Heading n={1}>Problem</Heading>
            <div className="max-w-2xl space-y-3 text-base leading-7 text-muted">
              <p>{project.problem.why}</p>
              <p>Without this: {project.problem.without}</p>
            </div>
          </section>

          <section className="flex flex-col gap-3 border-t border-border py-8">
            <Heading n={2}>Evidence</Heading>
            <p className="max-w-2xl text-base leading-7 text-muted">
              {project.evidence}
            </p>
          </section>

          <section className="flex flex-col gap-3 border-t border-border py-8">
            <Heading n={3}>System</Heading>
            <div className="max-w-2xl space-y-3 text-base leading-7 text-muted">
              <Flow steps={project.systemPlain} />
              <p className="text-sm text-muted">
                Technical: {project.systemTechnical.join(" · ")}
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3 border-t border-border py-8">
            <Heading n={4}>Prototype</Heading>
            <div className="max-w-2xl space-y-3 text-base leading-7 text-muted">
              <p>{project.prototype}</p>
              <ul className="list-disc space-y-1 pl-5">
                {project.businessValue.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <Fold index={5} title="Goals and non-goals">
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
          </Fold>

          <Fold index={6} title="MVP">
            <p>{project.mvp.version}</p>
            <p>Question the MVP tests: {project.mvp.question}</p>
          </Fold>

          <Fold index={7} title="Workflow">
            <Flow steps={project.workflow} />
          </Fold>

          <Fold index={8} title="Data model">
            <p>{project.dataModel.join(" · ")}</p>
          </Fold>

          <Fold index={9} title="Metrics">
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
          </Fold>

          <Fold index={10} title="Tradeoffs">
            <ul className="list-disc space-y-1 pl-5">
              {project.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Fold>

          <Fold index={11} title="What I would build next">
            <ul className="list-disc space-y-1 pl-5">
              {project.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Fold>
        </article>
      </div>
    </PageMain>
  );
}
