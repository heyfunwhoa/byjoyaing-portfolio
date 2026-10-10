import { BrandAvatar } from "@/components/brand-avatar";
import { PageMain } from "@/components/page-main";
import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredProjects } from "@/lib/project-directory";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kristen Joy Aing — Revenue & GTM Leader · Curious Builder",
  description:
    "Strategic enterprise cybersecurity selling, people development, go-to-market leadership, and curious independent builds.",
};

const strengths = [
  {
    number: "01",
    title: "People",
    text: "Coaching, building trust, developing talent, and helping teams do their best work.",
  },
  {
    number: "02",
    title: "Strategy",
    text: "Navigating complex enterprise deals and connecting buyer insights to revenue decisions.",
  },
  {
    number: "03",
    title: "Systems",
    text: "Turning recurring friction into practical workflows, enablement, and useful tools.",
  },
];

const audiences = [
  {
    eyebrow: "Professional work",
    title: "Enterprise selling & leadership",
    description:
      "How I approach large, technical opportunities, mentor sellers, support team growth, and turn field lessons into repeatable execution.",
    href: "/experience",
    action: "Explore experience",
  },
  {
    eyebrow: "Independent experiments",
    title: "Side Quests & systems",
    description:
      "Explore the tools I build to understand cybersecurity, competitive intelligence, product ideas, and GTM workflows. Each project shows its real stage.",
    href: "/projects",
    action: "Explore independent builds",
  },
];

export default function Home() {
  const featured = featuredProjects().slice(0, 3);

  return (
    <PageMain>
      <section aria-labelledby="home-title" className="grid min-w-0 items-center gap-8 border-b border-border py-10 sm:py-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(13rem,0.55fr)] lg:gap-12 lg:py-20">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent sm:text-sm">
            Enterprise cybersecurity · Revenue & GTM
          </p>
          <h1 id="home-title" className="mt-4 max-w-[15ch] font-display text-[clamp(2.45rem,7.4vw,4.75rem)] leading-[1.08] tracking-[-0.02em]">
            Revenue & GTM Leader.
            <span className="mt-1 block italic text-accent">Curious Builder.</span>
          </h1>
          <p className="mt-5 max-w-[38rem] text-base font-medium leading-7 sm:text-lg sm:leading-8">
            People first. Problem-driven. Systems-minded.
          </p>
          <p className="mt-3 max-w-[38rem] text-base leading-7 text-muted">
            I&apos;m Kristen Joy Aing. I navigate complex enterprise security deals, coach people around me, and build practical systems that help teams move forward.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Link href="/experience" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground transition-colors hover:bg-foreground">
              Explore Work <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link href="/projects" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold transition-colors hover:border-accent">
              Explore Side Quests <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">Strategic enterprise seller · People developer · GTM systems thinker</p>
        </div>
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:max-w-[19rem]">
          <BrandAvatar />
          <p className="mt-3 text-center text-xs leading-5 text-muted">Curious by nature. Builder by instinct.</p>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="border-b border-border py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">How I work</p>
        <h2 id="approach-title" className="mt-2 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          A way of working that connects people, strategy, and systems.
        </h2>
        <div className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {strengths.map((strength) => (
            <article key={strength.number} className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="text-xs font-medium text-accent">{strength.number} / {strength.title}</p>
              <h3 className="mt-3 font-display text-2xl">{strength.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{strength.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="paths-title" className="border-b border-border py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Two sides of my work</p>
        <h2 id="paths-title" className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Explore the work, or explore the curiosity.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {audiences.map((item) => (
            <article key={item.href} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{item.eyebrow}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex min-h-11 w-fit items-center rounded-md font-semibold text-accent underline-offset-4 hover:underline">
                {item.action} <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="builds-title" className="border-b border-border py-10 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Selected Side Quests</p>
            <h2 id="builds-title" className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Ideas made tangible.</h2>
          </div>
          <Link href="/projects" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
            All projects <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Independent experiments, not employer deployments. Every case study distinguishes live work from sample interfaces and planned capabilities.
        </p>
        <div className="mt-7 grid min-w-0 gap-4 lg:grid-cols-3">
          {featured.map((project) => (
            <article key={project.slug} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="max-w-[19rem] text-lg font-semibold leading-snug">{project.title}</h3>
                <ProjectStatusPill status={project.status} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
              <div className="mt-4 min-w-0 overflow-hidden"><ProjectPreview kind={project.preview} compact /></div>
              <Link href={project.caseStudyUrl} className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-accent underline-offset-4 hover:underline">
                View case study <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="notes-title" className="border-b border-border py-10 sm:py-14">
        <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-5 sm:p-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Field Notes</p>
            <h2 id="notes-title" className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">The thinking behind the work.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Playbooks, operating systems, frameworks, and lessons learned—grounded in practical enterprise selling and team development.
            </p>
            <Link href="/field-notes" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
              Explore Field Notes <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid gap-2 text-sm" aria-label="Field Notes collections">
            {["Playbooks", "Operating Systems", "Frameworks", "Lessons Learned"].map((label) => (
              <div key={label} className="rounded-lg border border-border px-3 py-2.5">{label}</div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-title" className="grid gap-6 border-b border-border py-10 sm:py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Beyond the title</p>
          <h2 id="about-title" className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Curiosity doesn&apos;t stop at work.</h2>
        </div>
        <div>
          <p className="text-base leading-7 text-muted">
            My background in advertising influences how I tell stories, and building things is how I learn. I bring that curiosity to technology, creative projects, and the people I work alongside.
          </p>
          <Link href="/about" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
            More about me <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Let&apos;s connect</p>
        <h2 id="contact-title" className="mt-2 max-w-3xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          Building a team, navigating an enterprise market, or exploring something new?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          I&apos;m interested in strategic enterprise selling and revenue leadership conversations where customer understanding and team development matter.
        </p>
        <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-foreground">
          Get in touch <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </section>
    </PageMain>
  );
}
