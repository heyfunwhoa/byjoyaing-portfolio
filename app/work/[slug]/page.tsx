import { AccountIntelligenceCase } from "@/components/account-intelligence-case";
import { AtlasCase } from "@/components/atlas-case";
import { CompetitiveIntelligenceCase } from "@/components/competitive-intelligence-case";
import { CustomerFeedbackCase } from "@/components/customer-feedback-case";
import { FieldAssetCase } from "@/components/field-asset-case";
import { PageMain } from "@/components/page-main";
import { SampleRecordView } from "@/components/sample-record";
import { StatusBadge } from "@/components/status-badge";
import { projects } from "@/lib/portfolio";
import { findUseCase, salesProject, sampleFor } from "@/lib/sales";
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
  const project = salesProject(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `${project.title} — Kristen Joy Aing`,
    description: project.sales.salesQuestion,
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border py-8">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="max-w-2xl space-y-3 text-base leading-7 text-muted">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = salesProject(slug);
  if (!project) {
    notFound();
  }

  if (slug === "account-intelligence") {
    return <AccountIntelligenceCase />;
  }

  if (slug === "customer-feedback-intelligence") {
    return <CustomerFeedbackCase />;
  }

  if (slug === "competitive-intelligence-engine") {
    return <CompetitiveIntelligenceCase />;
  }

  if (slug === "detector-coverage-atlas") {
    return <AtlasCase />;
  }

  if (
    slug === "product-release-intelligence" ||
    slug === "truffle-camp" ||
    slug === "partner-gtm-engine"
  ) {
    return <FieldAssetCase slug={slug} />;
  }

  const { sales } = project;
  const useCase = sales.useCase ? findUseCase(sales.useCase) : undefined;
  const sample = sampleFor(slug);
  const related = sales.related.flatMap((relatedSlug) => {
    const match = salesProject(relatedSlug);
    return match ? [match] : [];
  });

  return (
    <PageMain>
      <div className="grid gap-12 border-b border-border py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <StatusBadge status={project.status} />
          {useCase ? (
            <p className="text-sm leading-6 text-muted">
              <Link
                href={`/projects#${useCase.id}`}
                className="link-rule font-medium text-foreground"
              >
                {useCase.title}
              </Link>
            </p>
          ) : (
            <p className="text-sm leading-6 text-muted">
              Not filed under a sales use case.
            </p>
          )}
          <p className="text-sm text-muted">Lifecycle: {project.phase}</p>
          <Link
            href="/projects"
            className="link-rule w-fit text-sm font-medium text-accent"
          >
            All four capabilities
          </Link>
        </aside>

        <article className="flex min-w-0 flex-col gap-8">
          <header className="flex flex-col gap-5">
            <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-foreground">
              {sales.salesQuestion}
            </p>
          </header>

          <dl className="grid max-w-2xl gap-5 text-base leading-7">
            <div>
              <dt className="font-medium text-foreground">Who uses it</dt>
              <dd className="text-muted">{sales.userMoment}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">
                Inputs → review → output
              </dt>
              <dd className="text-muted">{sales.pipeline}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">
                Decision it enables
              </dt>
              <dd className="text-muted">{sales.decision}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Working today</dt>
              <dd className="text-muted">{sales.workingToday}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Planned next</dt>
              <dd className="text-muted">{sales.plannedNext}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">
                Technologies in this repo or a linked project
              </dt>
              <dd className="text-muted">{sales.implementedTech}</dd>
            </div>
          </dl>

          <div className="grid gap-4">
            {sales.fieldAsset ? (
              <section className="border border-accent/50 bg-card p-5">
                <h2 className="text-sm font-medium text-accent">
                  What a team actually used
                </h2>
                <p className="mt-2 text-base leading-7 text-foreground">
                  {sales.fieldAsset}
                </p>
              </section>
            ) : null}
            {sales.proposedSoftware ? (
              <section className="border border-dashed border-foreground/30 p-5">
                <h2 className="text-sm font-medium text-foreground">
                  Proposed software, separate from that asset
                </h2>
                <p className="mt-2 text-base leading-7 text-muted">
                  {sales.proposedSoftware}
                </p>
              </section>
            ) : null}
          </div>

          <Block title="Where it stands">
            <p>{sales.maturityDetail}</p>
          </Block>

          <Block title="My role">
            <p>{sales.myRole}</p>
          </Block>

          <Block
            title={
              sales.result.kind === "measured"
                ? "What is on record"
                : "Metric to test"
            }
          >
            <p>{sales.result.text}</p>
          </Block>

          <Block title="Links">
            {sales.links.length === 0 ? (
              <p>No public demo or repository beyond this page.</p>
            ) : (
              <ul className="space-y-2">
                {sales.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="link-rule text-foreground"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      {link.label}
                      {link.href.startsWith("http") ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Block>

          {sample ? <SampleRecordView sample={sample} /> : null}

          <details className="border-t border-border py-5">
            <summary className="cursor-pointer text-lg font-semibold tracking-tight text-foreground">
              How it works
            </summary>
            <div className="mt-6 flex flex-col gap-6 text-base leading-7 text-muted">
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  The problem I kept seeing
                </h3>
                <p>{project.problem.summary}</p>
                <p>{project.problem.why}</p>
                <p>Without a repeatable answer: {project.problem.without}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  What I was working from
                </h3>
                <p>{project.evidence}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">Workflow</h3>
                <p>{project.workflow.join(" → ")}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  In plain language
                </h3>
                <p>{project.systemPlain.join(" → ")}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  Described stack — not what this repository runs
                </h3>
                <p>
                  Names below are a sketch. They are not completed integrations
                  unless the technology section says Built with.
                </p>
                <p>{project.systemTechnical.join(" · ")}</p>
                <p>{project.dataModel.join(" · ")}</p>
                <p>{project.prototype}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">Goals</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.goals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="font-medium text-foreground">Out of scope</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.nonGoals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  Smallest version
                </h3>
                <p>{project.mvp.version}</p>
                <p>Question that version tests: {project.mvp.question}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  Metrics I would watch
                </h3>
                <p>
                  These are not results unless the section above says they are
                  on record.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {project.metrics.operational.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {project.metrics.behavioral.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {project.metrics.business.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>{project.hypothesis}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">Tradeoffs</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.tradeoffs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">
                  What I would build next
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.next.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </details>

          {related.length > 0 ? (
            <nav
              aria-label="Related work"
              className="border-t border-border py-8"
            >
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Related
              </h2>
              <ul className="mt-4 grid gap-4">
                {related.map((item) => {
                  const relatedUseCase = item.sales.useCase
                    ? findUseCase(item.sales.useCase)
                    : undefined;
                  return (
                    <li
                      key={item.slug}
                      className="flex flex-col gap-2 border border-border p-4"
                    >
                      <StatusBadge status={item.status} />
                      <Link
                        href={`/work/${item.slug}`}
                        className="link-rule w-fit font-medium text-foreground hover:text-accent"
                      >
                        {item.title}
                      </Link>
                      {relatedUseCase ? (
                        <p className="text-sm text-muted">
                          {relatedUseCase.title}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </article>
      </div>
    </PageMain>
  );
}
