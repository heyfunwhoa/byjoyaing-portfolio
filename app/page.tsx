import { BrandAvatar } from "@/components/brand-avatar";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { CropFrame } from "@/components/crop-frame";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import {
  findUseCase,
  homepageFeatures,
  salesProject,
  salesProof,
} from "@/lib/sales";
import { avatar } from "@/lib/portfolio";
import Link from "next/link";

export default function Home() {
  const features = homepageFeatures.map((feature) => {
    const project = salesProject(feature.slug);
    const useCase = findUseCase(feature.useCase);
    if (!project || !useCase) {
      throw new Error(`Missing homepage feature ${feature.slug}`);
    }
    const also = feature.also.flatMap((slug) => {
      const match = salesProject(slug);
      return match ? [match] : [];
    });
    return {
      project,
      useCase,
      also,
      showTable: feature.slug === "detector-coverage-atlas",
    };
  });

  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-[16rem] lg:mx-0">
          <BrandAvatar />
        </div>
        <div className="flex flex-col gap-6">
          <Kicker>{avatar.label}</Kicker>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-balance text-foreground sm:text-6xl">
            {avatar.line}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            {avatar.support}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Explore the four capabilities
            </Link>
            <Link
              href="/about#experience"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              View enterprise sales experience
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-b border-border py-12"
        aria-labelledby="proof-title"
      >
        <h2 id="proof-title" className="text-sm font-medium text-muted">
          Sales record
        </h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {salesProof.map((item) => (
            <li key={item.value} className="flex flex-col gap-2">
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {item.value}
              </p>
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
          These figures are from my role history. Truffle quota attainment is
          not stated because I do not have a figure to publish. The full
          timeline is on{" "}
          <Link href="/about#experience" className="link-rule text-foreground">
            Experience
          </Link>
          .
        </p>
      </section>

      <section className="py-12" aria-labelledby="capabilities-title">
        <div className="mb-8 flex max-w-2xl flex-col gap-3">
          <h2
            id="capabilities-title"
            className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Four capabilities
          </h2>
          <p className="text-base leading-7 text-muted">
            Each one names what is working and what is only planned. The
            coverage table is the only prototype in this repository.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {features.map(({ project, useCase, also, showTable }) => (
            <article
              key={project.slug}
              id={showTable ? "atlas" : undefined}
              className={
                project.slug === "truffle-camp"
                  ? "scroll-mt-24 border border-dashed border-foreground/30 p-5 sm:p-6"
                  : "scroll-mt-24 border border-border bg-card p-5 sm:p-6"
              }
            >
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-muted">
                  {useCase.title}
                </p>
                <StatusBadge status={project.status} />
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  <Link
                    href={`/work/${project.slug}`}
                    className="link-rule hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="max-w-3xl text-base leading-7 text-foreground">
                  {project.sales.salesQuestion}
                </p>
                <dl className="grid max-w-3xl gap-3 text-sm leading-6 text-muted">
                  <div>
                    <dt className="font-medium text-foreground">Who uses it</dt>
                    <dd>{project.sales.userMoment}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      Inputs → review → output
                    </dt>
                    <dd>{project.sales.pipeline}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      Working today
                    </dt>
                    <dd>{project.sales.workingToday}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      Planned next
                    </dt>
                    <dd>{project.sales.plannedNext}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      In this repo or a linked project
                    </dt>
                    <dd>{project.sales.implementedTech}</dd>
                  </div>
                </dl>
                {showTable ? (
                  <div>
                    <p className="mb-3 max-w-2xl text-sm leading-6 text-muted">
                      Independent research — not an official Truffle Security
                      product. Not evaluated is written out. It is not a
                      confirmed gap.
                    </p>
                    <CropFrame>
                      <CoverageExplorer />
                    </CropFrame>
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  {project.sales.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        className="link-rule w-fit text-sm font-medium text-accent"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="link-rule w-fit text-sm font-medium text-accent"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                  <Link
                    href={`/work/${project.slug}`}
                    className="link-rule w-fit text-sm font-medium text-accent"
                  >
                    Read the case
                  </Link>
                  <Link
                    href={`/projects#${useCase.id}`}
                    className="link-rule w-fit text-sm font-medium text-foreground"
                  >
                    {useCase.title}
                  </Link>
                  {also.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/work/${item.slug}`}
                      className="link-rule w-fit text-sm text-muted"
                    >
                      Also: {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageMain>
  );
}
