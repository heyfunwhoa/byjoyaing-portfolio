import { BrandAvatar } from "@/components/brand-avatar";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { CropFrame } from "@/components/crop-frame";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { StatusBadge } from "@/components/status-badge";
import { homepageStories, salesProof, useCases } from "@/lib/sales";
import { avatar } from "@/lib/portfolio";
import Link from "next/link";

export default function Home() {
  const [competitive, partner, atlas] = homepageStories();

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
              Explore sales use cases
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

      <section
        className="border-b border-border py-12"
        aria-labelledby="stories-title"
      >
        <div className="mb-8 flex max-w-2xl flex-col gap-3">
          <h2
            id="stories-title"
            className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Three places to start
          </h2>
          <p className="text-base leading-7 text-muted">
            Field knowledge, a channel design, and a prototype you can inspect.
            They are not the same kind of evidence.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col gap-4 border border-border bg-card p-5 sm:p-6">
            <StatusBadge status={competitive.status} />
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/work/${competitive.slug}`}
                className="link-rule hover:text-accent"
              >
                {competitive.title}
              </Link>
            </h3>
            <p className="text-base leading-7 text-foreground">
              {competitive.sales.salesQuestion}
            </p>
            <p className="text-sm leading-6 text-muted">
              {competitive.sales.maturityDetail}
            </p>
            <Link
              href={`/work/${competitive.slug}`}
              className="link-rule w-fit text-sm font-medium text-accent"
            >
              Read the case
            </Link>
          </article>

          <article className="flex flex-col gap-4 border border-border bg-card p-5 sm:p-6">
            <StatusBadge status={partner.status} />
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/work/${partner.slug}`}
                className="link-rule hover:text-accent"
              >
                Account and partner strategy
              </Link>
            </h3>
            <p className="text-base leading-7 text-foreground">
              {partner.sales.salesQuestion}
            </p>
            <p className="text-sm leading-6 text-muted">
              {partner.sales.maturityDetail}
            </p>
            <p className="text-sm leading-6 text-muted">
              Account Intelligence is a separate design for the brief that
              follows a signal. It is also not deployed.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`/work/${partner.slug}`}
                className="link-rule w-fit text-sm font-medium text-accent"
              >
                Partner GTM Engine
              </Link>
              <Link
                href="/work/account-intelligence"
                className="link-rule w-fit text-sm font-medium text-accent"
              >
                Account Intelligence
              </Link>
            </div>
          </article>
        </div>

        <article
          id="atlas"
          className="mt-4 scroll-mt-24 border border-border bg-card p-5 sm:p-6"
        >
          <div className="mb-5 flex flex-col gap-3">
            <StatusBadge status={atlas.status} />
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/work/${atlas.slug}`}
                className="link-rule hover:text-accent"
              >
                {atlas.title}
              </Link>
            </h3>
            <p className="max-w-2xl text-base leading-7 text-muted">
              {atlas.sales.maturityDetail} Independent research — not an
              official Truffle Security product. Gray means not evaluated, never
              a confirmed gap.
            </p>
          </div>
          <CropFrame>
            <CoverageExplorer />
          </CropFrame>
          <Link
            href={`/work/${atlas.slug}`}
            className="link-rule mt-4 inline-flex text-sm font-medium text-accent"
          >
            Read the case
          </Link>
        </article>
      </section>

      <section
        className="border-b border-border py-12"
        aria-labelledby="camp-title"
      >
        <div className="flex flex-col gap-4 border border-dashed border-foreground/30 p-5 sm:p-6">
          <StatusBadge status="designed" />
          <h2
            id="camp-title"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            <Link
              href="/work/truffle-camp"
              className="link-rule hover:text-accent"
            >
              Truffle Camp and the enablement I already did
            </Link>
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted">
            Teams have used discovery frameworks, playbooks, onboarding notes,
            and industry training I wrote. Truffle Camp is the course I designed
            so a new AE, SDR, SA, or partner can practice that without a live
            secret. The course is not deployed. The Darktrace ramp result
            belongs to the training, not to Camp.
          </p>
          <Link
            href="/work/truffle-camp"
            className="link-rule w-fit text-sm font-medium text-accent"
          >
            See the sample module
          </Link>
        </div>
      </section>

      <section className="py-12" aria-labelledby="jobs-title">
        <h2 id="jobs-title" className="text-sm font-medium text-muted">
          Browse by the sales job
        </h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {useCases.map((useCase) => (
            <li key={useCase.id}>
              <Link
                href={`/projects#${useCase.id}`}
                className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-8"
              >
                <span className="font-medium text-foreground group-hover:text-accent">
                  {useCase.title}
                </span>
                <span className="text-sm leading-6 text-muted">
                  {useCase.flow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageMain>
  );
}
