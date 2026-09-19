import { BrandAvatar } from "@/components/brand-avatar";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { CropFrame } from "@/components/crop-frame";
import { Index, Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { ProjectRow } from "@/components/project-row";
import { Rail } from "@/components/rail";
import { StatusBadge } from "@/components/status-badge";
import { ToolsMap } from "@/components/tools-map";
import {
  avatar,
  domains,
  featuredProjects,
  proof,
  skills,
  strengths,
} from "@/lib/portfolio";
import Link from "next/link";

export default function Home() {
  const featured = featuredProjects();
  const atlas = featured[0];
  const rest = featured.slice(1);

  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-[16rem] lg:mx-0">
          <BrandAvatar />
        </div>
        <div className="flex flex-col gap-6">
          <Kicker>{avatar.label}</Kicker>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.1] tracking-tight text-balance text-foreground sm:text-6xl">
            {avatar.line}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            I build the systems behind how technical products get understood,
            evaluated, launched, and adopted — from evidence-backed coverage
            catalogs to competitive briefs a team can run without me.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Skills, tools & experience
            </Link>
          </div>
        </div>
      </section>

      <Rail label="Strengths" tick>
        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {strengths.map((item) => (
            <li key={item.title} className="flex flex-col gap-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Rail>

      <Rail label="Skills">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-base leading-7 text-foreground">{skills.join(" · ")}</p>
          <p className="text-base leading-7 text-muted">{domains.join(" · ")}</p>
        </div>
      </Rail>

      <Rail label="Tools">
        <ToolsMap compact />
        <p className="mt-6 text-sm leading-6 text-muted">
          How it fits is on{" "}
          <Link href="/about#ai" className="link-rule text-foreground">
            About
          </Link>
          : sales tools surface the friction, build tools make the system, AI fills a schema from a source and a human marks the cell.
        </p>
      </Rail>

      <Rail label="Proof">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
          {proof.map((item, index) => (
            <div
              key={item.value}
              className={
                index === 0
                  ? "sm:pr-8"
                  : "border-t border-border pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8"
              }
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </Rail>

      <Rail label="Featured" tick className="border-b-0 pb-8">
        {atlas ? (
          <div className="flex flex-wrap items-center gap-3">
            <Index n={1} />
            <StatusBadge status={atlas.status} />
            <span className="text-sm text-muted">{atlas.phase}</span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {atlas.title}
            </span>
          </div>
        ) : null}
      </Rail>

      {atlas ? (
        <article className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-card px-5 py-10 sm:px-8">
          <CropFrame>
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
              <div className="flex flex-col gap-4">
                <p className="text-base leading-7 text-muted">
                  Independent research catalog — not an official Truffle
                  product. Parser observed 910 TruffleHog detectors; 14 are
                  enriched. Search and filter the sample. Gray means not
                  evaluated, never a confirmed gap.
                </p>
                <Link
                  href={`/work/${atlas.slug}`}
                  className="link-rule w-fit text-sm font-medium text-accent"
                >
                  Full case study
                </Link>
              </div>
              <CoverageExplorer />
            </div>
          </CropFrame>
        </article>
      ) : null}

      <ul className="border-t border-border">
        {rest.map((project, i) => (
          <li key={project.slug} className="border-b border-border">
            <ProjectRow project={project} showPhase index={i + 2} />
          </li>
        ))}
      </ul>
    </PageMain>
  );
}
