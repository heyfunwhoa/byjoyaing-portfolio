import { CoverageExplorer } from "@/components/coverage-explorer";
import { PageMain } from "@/components/page-main";
import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredProjects } from "@/lib/project-directory";
import { roles } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kristen Joy Aing — Enterprise sales and GTM systems",
  description:
    "Enterprise cybersecurity sales professional designing GTM systems for account research, competitive intelligence, product feedback, and field enablement.",
};

const previewRoles = ["Truffle Security", "Rapid7", "Darktrace", "Forcepoint"];

const stages = [
  {
    index: "01",
    title: "Identify",
    body: "The same question shows up in different notebooks: a coverage cell nobody has reviewed, a request sitting in five places, a partner list with no domain.",
    example: "Competitive Intelligence and Customer Feedback start from that repetition.",
  },
  {
    index: "02",
    title: "Design",
    body: "Name the user, the decision, and what stays out of scope. A hypothesis stays labeled as a hypothesis.",
    example: "Account Intelligence is one rep’s book and a draft they still have to send.",
  },
  {
    index: "03",
    title: "Build",
    body: "Ship the smallest thing that can be inspected. A table with gray cells, or a walkthrough that does not call a live system.",
    example: "Detector Coverage Atlas is the working sample in this repository.",
  },
  {
    index: "04",
    title: "Validate",
    body: "A person reviews the claim before the field can use it. Proposed metrics stay proposed until they are measured.",
    example: "Unreviewed coverage stays Not evaluated. Follow-up drafts do not send themselves.",
  },
];

export default function Home() {
  const featured = featuredProjects();
  const timeline = roles.filter((role) => previewRoles.includes(role.company));

  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-12 lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium text-muted">Enterprise sales · GTM strategy · Product systems</p>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            I turn enterprise sales experience into systems that help technical products grow.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            I&apos;m Kristen Joy Aing, an enterprise cybersecurity sales professional with 10+ years in complex technical sales cycles, GTM programs, and helping teams communicate product value. I combine that commercial work with product thinking and hands-on technical work on account research, competitive intelligence, product feedback, and field enablement.
          </p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {["10+ years", "Cybersecurity", "$1.4M quota owned"].map((item) => (
              <li key={item} className="rounded-full border border-border px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
              Explore my work
            </Link>
            <Link href="/experience" className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium">
              My experience
            </Link>
          </div>
        </div>
        <div className="grid min-w-0 gap-3">
          {featured.map((project) => (
            <Link key={project.slug} href={project.caseStudyUrl} className="min-w-0 rounded-2xl border border-border bg-card p-3 hover:border-accent">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{project.title}</p>
                <ProjectStatusPill status={project.status} />
              </div>
              <ProjectPreview kind={project.preview} compact />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">Enterprise experience informs everything I build.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          The work starts from problems in cybersecurity sales cycles: fragmented account research, inconsistent technical messaging, slow handoffs, product knowledge that lives with one person, and customer feedback that does not reliably reach the team who can act on it. I design systems for those problems because I have worked inside them.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Enterprise sales",
              body: "Full-cycle work in AppSec, cloud, data, threat intelligence, network, and developer security.",
              proof: "Forcepoint, Rapid7, Darktrace, and Truffle Security.",
              href: "/experience",
              label: "See the roles",
            },
            {
              title: "GTM programs and enablement",
              body: "Discovery frameworks, competitive messaging, playbooks, and training other people could use.",
              proof: "Field systems. The course and release hub are still designs.",
              href: "/work/truffle-camp",
              label: "Truffle Camp",
            },
            {
              title: "Product and technical systems",
              body: "A coverage sample you can filter, plus designed workflows for accounts, feedback, and competitive claims.",
              proof: "Detector Coverage Atlas is the working prototype in this repository.",
              href: "/work/detector-coverage-atlas",
              label: "Open the Atlas",
            },
          ].map((card) => (
            <article key={card.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm leading-6 text-muted">{card.body}</p>
              <p className="text-sm leading-6">{card.proof}</p>
              <Link href={card.href} className="mt-auto text-sm font-medium text-accent">
                {card.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-medium text-accent">
            Explore all projects
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-6">
          {featured.map((project, index) => (
            <article key={project.slug} id={project.slug === "detector-coverage-atlas" ? "atlas" : undefined} className="grid min-w-0 grid-cols-1 items-center gap-6 rounded-2xl border border-border p-4 sm:p-5 lg:grid-cols-2">
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusPill status={project.status} />
                  <span className="text-xs text-muted">{project.categories[0]}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{project.summary}</p>
                <p className="mt-3 text-sm leading-6">{project.role}</p>
                <Link href={project.caseStudyUrl} className="mt-4 inline-flex text-sm font-medium text-accent">
                  View case study
                </Link>
              </div>
              <div className={index % 2 === 1 ? "min-w-0 lg:order-1" : "min-w-0"}>
                {project.slug === "detector-coverage-atlas" ? <CoverageExplorer /> : <ProjectPreview kind={project.preview} />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">From field problem to working system.</h2>
        <ol className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <li key={stage.index} className="rounded-2xl border border-border p-4">
              <p className="text-xs font-medium text-muted">{stage.index}</p>
              <h3 className="mt-2 font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{stage.body}</p>
              <p className="mt-3 text-sm leading-6">{stage.example}</p>
              {index < stages.length - 1 ? <span className="sr-only">Next stage</span> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-3xl tracking-tight sm:text-4xl">Built on a decade of enterprise cybersecurity sales.</h2>
          <Link href="/experience" className="text-sm font-medium text-accent">
            Explore my experience
          </Link>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {timeline.map((role) => (
            <li key={role.company} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted">{role.period}</p>
              <h3 className="mt-1 font-semibold">{role.company}</h3>
              <p className="text-sm">{role.title}</p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{role.points[0]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-12">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">Interested in building better ways to bring technical products to market?</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          I work at the intersection of enterprise sales, product strategy, technical systems, and GTM execution. If you are building a sales organization, introducing a technical product, or improving how a team turns information into action, I welcome a conversation.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/contact" className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-accent-foreground">
            Get in touch
          </Link>
          <a href="https://www.linkedin.com/in/kristenaing" className="inline-flex h-11 items-center rounded-md border border-border px-5" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/heyfunwhoa" className="inline-flex h-11 items-center rounded-md border border-border px-5" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </PageMain>
  );
}
