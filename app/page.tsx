import { BrandAvatar } from "@/components/brand-avatar";
import { EditorialBento } from "@/components/editorial-bento";
import { PageMain } from "@/components/page-main";
import { ProjectPreview } from "@/components/project-previews";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredProjects } from "@/lib/project-directory";
import { roles } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kristen Joy Aing — Revenue & GTM Leader · Curious Builder",
  description:
    "Strategic enterprise cybersecurity selling, people development, go-to-market leadership, and curious independent builds.",
};

const principles = [
  {
    title: "People",
    text: "Coaching, trust, and the conditions for someone else to do the work well.",
  },
  {
    title: "Problem-driven",
    text: "Start with the buyer, the friction, and the decision — then the motion around it.",
  },
  {
    title: "Systems-minded",
    text: "Turn a repeated question into a resource, a cadence, or a tool another person can use.",
  },
];

function roleByCompany(company: string) {
  const role = roles.find((item) => item.company === company);
  if (!role) {
    throw new Error(`Missing role ${company}`);
  }
  return role;
}

export default function Home() {
  const featured = featuredProjects().slice(0, 3);
  const [leadBuild, ...otherBuilds] = featured;
  const current = roleByCompany("Truffle Security");
  const earlier = [roleByCompany("Rapid7"), roleByCompany("Forcepoint")];

  return (
    <PageMain>
      <section
        aria-labelledby="home-title"
        className="editorial-dark -mx-5 grid min-w-0 items-center gap-8 px-5 py-12 sm:-mx-8 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(13rem,0.55fr)] lg:gap-12 lg:py-20"
      >
        <div className="min-w-0">
          <p className="editorial-eyebrow text-[#DFC1A9]">Enterprise cybersecurity · Revenue & GTM</p>
          <h1 id="home-title" className="editorial-title mt-5 max-w-[15ch]">
            Revenue & GTM Leader.
            <span className="mt-2 block italic text-[#E6B59A]">Curious Builder.</span>
          </h1>
          <p className="mt-5 max-w-[38rem] text-base font-medium leading-7 sm:text-lg sm:leading-8">
            People first. Problem-driven. Systems-minded.
          </p>
          <p className="editorial-subtle mt-3 max-w-[38rem] text-base leading-7">
            I&apos;m Kristen Joy Aing. I sell into complex enterprise security decisions, coach the people around the deal, and build practical systems when the same friction shows up again.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Link
              href="/experience"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground hover:bg-foreground"
            >
              Explore Work <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4CEC4] px-5 py-3 text-center text-sm font-semibold text-[#F3EFE6] hover:bg-[#4A504B]"
            >
              Explore Side Quests <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:max-w-[19rem]">
          <BrandAvatar variant="leader" />
          <p className="editorial-subtle mt-3 text-center text-xs leading-5">Curious by nature. Builder by instinct.</p>
        </div>
      </section>

      <section aria-labelledby="credibility-title" className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">01 / Credibility</p>
        <div className="mt-3 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="min-w-0">
            <h2 id="credibility-title" className="editorial-section-title max-w-[16ch]">
              The selling comes first. The systems follow the work.
            </h2>
            <ol className="mt-8 divide-y divide-border border-y border-border">
              {principles.map((principle, index) => (
                <li key={principle.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-4">
                  <span className="editorial-eyebrow pt-1 text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl">{principle.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <p className="editorial-eyebrow text-muted">On the record, without a dashboard</p>
            <article className="mt-4 border-t border-foreground pt-5">
              <p className="editorial-eyebrow text-accent">{current.period}</p>
              <h3 className="mt-2 font-display text-4xl leading-tight">{current.company}</h3>
              <p className="mt-2 text-sm leading-6">{current.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{current.category}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6">
                {current.points.map((point) => (
                  <li key={point} className="border-l border-accent pl-3">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <Link
              href="/experience"
              className="editorial-link mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
            >
              Read the experience timeline <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <EditorialBento />

      <section aria-labelledby="studies-title" className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">03 / Professional case studies</p>
        <h2 id="studies-title" className="editorial-section-title mt-3 max-w-[18ch]">
          Enterprise decisions, told as the work I owned.
        </h2>
        <p className="editorial-intro mt-4 text-muted">
          These are employment stories, not software deployments. Dollar figures stay off the site. Field guides further down show a method. They are not a substitute for the deals.
        </p>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {earlier.map((role) => (
            <article key={role.company} className="grid min-w-0 gap-3 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
              <div>
                <p className="editorial-eyebrow text-accent">{role.period}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight">
                  <Link href="/experience" className="underline decoration-transparent underline-offset-4 hover:decoration-accent">
                    {role.company}
                  </Link>
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">{role.title}</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-6 text-muted">{role.category}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 grid min-w-0 gap-6 border-t border-border pt-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="editorial-eyebrow text-accent">Field guides</p>
            <h3 className="mt-2 font-display text-3xl leading-tight">The method, labeled as a model.</h3>
          </div>
          <ul className="min-w-0 divide-y divide-border border-y border-border">
            <li>
              <Link href="/field-notes/enterprise-deal" className="group block py-4">
                <p className="editorial-eyebrow text-muted">Illustrative framework</p>
                <p className="mt-1 font-display text-2xl group-hover:text-accent">Strategic Enterprise Deal Anatomy</p>
                <p className="mt-1 text-sm leading-6 text-muted">A walkthrough of hypothesis, buying group, evaluation, and commercial decision. Not a customer record.</p>
              </Link>
            </li>
            <li>
              <Link href="/field-notes/multithreading" className="group block py-4">
                <p className="editorial-eyebrow text-muted">Interactive playbook</p>
                <p className="mt-1 font-display text-2xl group-hover:text-accent">Multithreading & stakeholder mapping</p>
                <p className="mt-1 text-sm leading-6 text-muted">A coverage exercise and a coaching view. Synthetic on purpose.</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="builds-title" className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">04 / Independent systems</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="builds-title" className="editorial-section-title max-w-[16ch]">Selected experiments, with the limits visible.</h2>
          <Link href="/projects" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">
            All Side Quests <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
        {leadBuild ? (
          <article className="mt-8 grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="min-w-0">
              <ProjectStatusPill status={leadBuild.status} />
              <h3 className="mt-3 font-display text-4xl leading-tight">{leadBuild.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{leadBuild.summary}</p>
              <p className="mt-3 max-w-xl text-sm leading-6">
                <span className="font-medium">Contribution. </span>
                {leadBuild.role}
              </p>
              <Link
                href={leadBuild.caseStudyUrl}
                className="editorial-link mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
              >
                Read the case study <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
            <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface-sage p-3 sm:p-4">
              <ProjectPreview kind={leadBuild.preview} compact />
            </div>
          </article>
        ) : null}
        <ol className="mt-8 divide-y divide-border border-y border-border">
          {otherBuilds.map((project, index) => (
            <li key={project.slug}>
              <article className="grid min-w-0 gap-3 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start">
                <p className="editorial-eyebrow text-muted">{String(index + 2).padStart(2, "0")}</p>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl">{project.title}</h3>
                    <ProjectStatusPill status={project.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
                </div>
                <Link
                  href={project.caseStudyUrl}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
                >
                  Case study
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="story-title" className="grid min-w-0 gap-8 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="editorial-eyebrow text-accent">05 / The person</p>
          <h2 id="story-title" className="editorial-section-title mt-3">Curiosity doesn&apos;t stop at the title.</h2>
        </div>
        <div className="min-w-0">
          <blockquote className="editorial-quotation max-w-[16ch]">Curious by nature. Builder by instinct.</blockquote>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            I studied advertising and business foundations at The University of Texas at Austin. That training is still how I explain a technical product: one claim a buyer can repeat, and a field that does not invent the rest. Building is how I learn the next question.
          </p>
          <Link href="/about" className="editorial-link mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline">
            More about me <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className="editorial-dark -mx-5 px-5 py-12 sm:-mx-8 sm:px-8 sm:py-16"
      >
        <p className="editorial-eyebrow text-[#DFC1A9]">06 / Connect</p>
        <h2 id="contact-title" className="editorial-section-title mt-3 max-w-[18ch]">
          Building a team, or navigating an enterprise market?
        </h2>
        <p className="editorial-subtle mt-4 max-w-2xl text-base leading-7">
          I&apos;m interested in strategic enterprise selling and revenue leadership conversations where customer understanding and developing people both matter.
        </p>
        <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-foreground"
          >
            Get in touch <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <Link
            href="/private-work"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4CEC4] px-5 py-3 text-sm font-semibold text-[#F3EFE6] hover:bg-[#4A504B]"
          >
            Request additional materials
          </Link>
        </div>
        <p className="editorial-subtle mt-4 text-xs leading-5">The reviewer portal is not enabled. Public pages already stand on their own.</p>
      </section>
    </PageMain>
  );
}
