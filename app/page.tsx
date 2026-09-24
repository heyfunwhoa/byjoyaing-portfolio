import { BrandAvatar } from "@/components/brand-avatar";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { CropFrame } from "@/components/crop-frame";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredProjects } from "@/lib/project-directory";
import { salesProof } from "@/lib/sales";
import { avatar } from "@/lib/portfolio";
import Link from "next/link";

export default function Home() {
  const featured = featuredProjects();

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
              Explore the projects
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

      <section className="border-b border-border py-12" aria-labelledby="featured-title">
        <div className="mb-8 flex max-w-2xl flex-col gap-3">
          <h2 id="featured-title" className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Selected projects
          </h2>
          <p className="text-base leading-7 text-muted">
            The same three projects as the directory. The coverage table is the only working prototype in this repository.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {featured.map((project) => (
            <article key={project.slug} id={project.slug === "detector-coverage-atlas" ? "atlas" : undefined} className="scroll-mt-24 border border-border bg-card p-5 sm:p-6">
              <ProjectStatusPill status={project.status} />
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                <Link href={project.caseStudyUrl} className="link-rule hover:text-accent">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{project.summary}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6">{project.role}</p>
              {project.slug === "detector-coverage-atlas" ? (
                <div className="mt-5">
                  <CropFrame>
                    <CoverageExplorer />
                  </CropFrame>
                </div>
              ) : null}
              <Link href={project.caseStudyUrl} className="mt-4 inline-flex text-sm font-medium text-accent">
                Read the case
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12" aria-labelledby="proof-title">
        <h2 id="proof-title" className="text-sm font-medium text-muted">
          Sales record
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          These figures are from role history, not from the software on this site. The measurement method for the Darktrace ramp is not written down here. Truffle quota attainment is not stated.
        </p>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {salesProof.map((item) => (
            <li key={item.value} className="flex flex-col gap-2">
              <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
          The full timeline is on{" "}
          <Link href="/about#experience" className="link-rule text-foreground">
            Experience
          </Link>
          .
        </p>
      </section>
    </PageMain>
  );
}
