import { CoverageExplorer } from "@/components/coverage-explorer";
import { PageMain } from "@/components/page-main";
import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { workAreas } from "@/lib/capabilities";
import { featuredProjects } from "@/lib/project-directory";
import { roles } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kristen Joy Aing — Enterprise sales, GTM strategy, and AI systems",
  description:
    "Enterprise cybersecurity sales professional designing practical GTM systems for account research, pipeline, customer understanding, enablement, and go-to-market execution.",
};

const previewRoles = ["Truffle Security", "Rapid7", "Darktrace", "Forcepoint"];

const buildSteps = [
  { index: "01", title: "Identify friction", example: "The same coverage question, feedback thread, or partner list shows up in different notebooks." },
  { index: "02", title: "Define the problem", example: "Account Intelligence is one rep’s book and a draft they still have to send." },
  { index: "03", title: "Design the workflow", example: "Competitive claims stay attached to a source. A hypothesis stays labeled as a hypothesis." },
  { index: "04", title: "Validate the data", example: "Unreviewed Atlas cells stay gray. A missing partner domain stays in human review." },
  { index: "05", title: "Build the application", example: "The coverage table is the sample you can use in this repository." },
  { index: "06", title: "Add automation carefully", example: "No model runs here. Planned tools stay planned until the evidence is trustworthy." },
  { index: "07", title: "Measure and improve", example: "Proposed metrics stay proposed until they are measured." },
];

export default function Home() {
  const featured = featuredProjects();
  const timeline = roles.filter((role) => previewRoles.includes(role.company));

  return (
    <PageMain>
      <section className="grid items-start gap-10 border-b border-border py-12 lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium text-muted">Enterprise cybersecurity · 10+ years</p>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Enterprise Sales. GTM Strategy. AI-Powered Systems.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            I&apos;m Kristen Joy Aing, an enterprise cybersecurity sales professional and GTM systems builder. I combine frontline revenue work with hands-on systems development so teams can research accounts, manage pipeline, understand customers, enable sellers, and execute go-to-market strategy.
          </p>
          <p className="max-w-xl text-base leading-7 text-muted">
            The work connects commercial strategy, structured data, and automation to operational problems I have seen in the field. A model is added only when the underlying record is trustworthy.
          </p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {["Enterprise sales", "GTM strategy", "Hands-on systems"].map((item) => (
              <li key={item} className="rounded-full border border-border px-3 py-1">{item}</li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground">
              Explore my work
            </Link>
            <Link href="/experience" className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium">
              View my experience
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
          The commercial work is the foundation: enterprise security buyers, long sales cycles, technical evaluations, account strategy, forecasting, and the operational gaps that slow a revenue team. The systems on this site start from those problems.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Enterprise sales", "Full-cycle work in AppSec, cloud, data, threat intelligence, network, and developer security.", "Forcepoint, Rapid7, Darktrace, and Truffle Security.", "/experience", "See the roles"],
            ["GTM knowledge", "Discovery, competitive positioning, partner motion, enablement, and the handoff between sales and product.", "Briefs and training used with teams. The software around them is still a design.", "/capabilities/sales-enablement", "Enablement view"],
            ["Technical building", "A coverage sample you can filter, plus designed workflows for accounts, feedback, and competitive claims.", "Next.js and TypeScript in this repository. No model is installed.", "/work/detector-coverage-atlas", "Open the Atlas"],
          ].map(([title, body, proof, href, label]) => (
            <article key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-muted">{body}</p>
              <p className="text-sm leading-6">{proof}</p>
              <Link href={href} className="mt-auto text-sm font-medium text-accent">{label}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">What I work on</h2>
          <Link href="/capabilities" className="text-sm font-medium text-accent">All capabilities</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workAreas.map((area) => (
            <article key={area.title} className="rounded-2xl border border-border p-5">
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{area.problem}</p>
              <Link href={area.href} className="mt-4 inline-flex text-sm font-medium text-accent">Browse projects</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-medium text-accent">Explore all projects</Link>
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
                <Link href={project.caseStudyUrl} className="mt-4 inline-flex text-sm font-medium text-accent">View case study</Link>
              </div>
              <div className={index % 2 === 1 ? "min-w-0 lg:order-1" : "min-w-0"}>
                {project.slug === "detector-coverage-atlas" ? <CoverageExplorer /> : <ProjectPreview kind={project.preview} />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">How I build</h2>
        <ol className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          {buildSteps.map((step) => (
            <li key={step.index} className="rounded-2xl border border-border p-4">
              <p className="text-xs font-medium text-muted">{step.index}</p>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.example}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-3xl tracking-tight sm:text-4xl">Built on a decade of enterprise cybersecurity sales.</h2>
          <Link href="/experience" className="text-sm font-medium text-accent">View my experience</Link>
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
          I work at the intersection of enterprise sales, GTM strategy, and the systems a revenue team actually runs. If you are hiring a sales leader, a GTM operator, or someone who can design the workflow, I welcome a conversation.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/contact" className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-accent-foreground">Get in touch</Link>
          <a href="https://www.linkedin.com/in/kristenaing" className="inline-flex h-11 items-center rounded-md border border-border px-5" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/heyfunwhoa" className="inline-flex h-11 items-center rounded-md border border-border px-5" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </PageMain>
  );
}
