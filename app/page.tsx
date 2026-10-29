import { completePageMetadata } from "@/lib/page-metadata";
import { BrandAvatar, homeBrandAvatarPortrait } from "@/components/brand-avatar";
import { ArrowRight } from "@/components/icons/arrow-right";
import { CelestialFrame } from "@/components/celestial-frame";
import { EditorialBento } from "@/components/editorial-bento";
import { Marginalia } from "@/components/marginalia";
import { PageMain } from "@/components/page-main";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { homePage } from "@/lib/home/editorial";
import { directoryProjects } from "@/lib/project-directory";
import { roles, statusCopy, statusHelp } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
  title: {
    absolute: "Revenue & GTM Leader · Curious Builder — Kristen Aing",
  },
  description: homePage.metaDescription,
},
  "/",
);

function roleByCompany(company: string) {
  const role = roles.find((item) => item.company === company);
  if (!role) {
    throw new Error(`Missing role ${company}`);
  }
  return role;
}

export default function Home() {
  const current = roleByCompany("Truffle Security");
  const earlier = [roleByCompany("Rapid7"), roleByCompany("Forcepoint")];
  const roleProofs = [
    {
      role: current,
      label: "Current role",
      detail:
        "Built shared discovery, ICP, competitive, and POC resources the sales team adopted.",
      href: "/work#people-leadership",
      action: "Coaching and enablement",
    },
    {
      role: earlier[0],
      label: "Strategic enterprise",
      detail: null,
      href: "/work#enterprise-sales",
      action: "Enterprise deal execution",
    },
    {
      role: earlier[1],
      label: "Security sales",
      detail: null,
      href: "/experience#career-details",
      action: "Full career timeline",
    },
  ];
  const sideQuest = directoryProjects.find((project) => project.slug === "detector-coverage-atlas",
  );
  if (!sideQuest) {
    throw new Error("Missing detector-coverage-atlas");
  }

  return (
    <PageMain>
      <section
        aria-labelledby="home-title"
        className="editorial-dark -mx-5 grid min-w-0 items-center gap-8 px-5 py-12 sm:-mx-8 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(13rem,0.55fr)] lg:gap-12 lg:py-20"
      >
        <div className="min-w-0">
          <p className="editorial-eyebrow text-[#DFC1A9]">{homePage.eyebrow}</p>
          <h1 id="home-title" className="editorial-title mt-5 max-w-[15ch]">
            {homePage.headline}
            <span className="mt-2 block italic text-[#E6B59A]">{homePage.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-[38rem] text-base font-medium leading-7 sm:text-lg sm:leading-8">
            {homePage.philosophy}
          </p>
          <p className="editorial-subtle mt-3 max-w-[38rem] text-base leading-7">
            {homePage.body}
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground hover:bg-foreground"
            >
              Explore Work {" "}
              <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4CEC4] px-5 py-3 text-center text-sm font-semibold text-[#F3EFE6] hover:bg-[#4A504B]"
            >
              About Me {" "}
              <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[10rem] sm:max-w-[15rem] lg:max-w-[19rem]">
          <CelestialFrame>
            <BrandAvatar variant="leader" portrait={homeBrandAvatarPortrait} />
          </CelestialFrame>
          <p className="editorial-subtle mt-3 text-center text-xs leading-5">{homePage.caption}</p>
        </div>
      </section>

      <section aria-labelledby="credibility-title" className="section-enter border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">01 / Credibility</p>
        <h2 id="credibility-title" className="editorial-section-title mt-3 max-w-[24ch]">
          Enterprise sales, team development, and practical systems.
        </h2>
        <div className="mt-7 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roleProofs.map(({ role, label, detail, href, action }, index) => (
            <article
              key={role.company}
              className={`flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 ${
                index === 2
                  ? "sm:col-span-2 sm:w-1/2 sm:justify-self-center lg:col-span-1 lg:w-full"
                  : ""
              }`}
            >
              <p className="editorial-eyebrow text-accent">{label}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight">
                {role.company}
              </h3>
              <p className="mt-1 text-sm font-medium leading-6">{role.title}</p>
              <p className="mt-4 text-sm leading-6 text-muted">
                {role.points[0]}
              </p>
              {detail ? (
                <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
              ) : null}
              <Link
                href={href}
                className="editorial-link mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-semibold text-accent underline"
              >
                {action}
                <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <EditorialBento />

      <section aria-labelledby="build-title" className="section-enter border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">03 / A side quest</p>
        <div className="mt-4 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <p className="editorial-eyebrow text-muted">{statusCopy[sideQuest.status]}</p>
            <h2 id="build-title" className="editorial-section-title mt-3 max-w-[16ch]">
              {sideQuest.title}
            </h2>
            <Marginalia>Independent of the roles above. The label is the limit of what runs.</Marginalia>
          </div>
          <div className="min-w-0">
            <p className="max-w-xl text-base leading-7">{sideQuest.summary}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{statusHelp[sideQuest.status]}</p>
            <ProjectTechnologyStack slug={sideQuest.slug} presentation="compact" className="mt-4" />
            <div className="mt-5 flex flex-col gap-1">
              <Link
                href={sideQuest.caseStudyUrl}
                className="editorial-link inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
              >
                Read the sample {" "}
                <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
              </Link>
              <Link
                href="/side-quests"
                className="editorial-link inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
              >
                All Side Quests {" "}
                <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="close-title" className="section-enter py-14 sm:py-20">
        <p className="editorial-eyebrow text-accent">04 / A note</p>
        <h2 id="close-title" className="editorial-quotation mt-4 max-w-[24ch]">
          The useful next step is a conversation.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted">
          I like the hard enterprise problem, the teammate getting better at it, and the system that makes the next one easier. If that is the work you are in, I would like to hear about it.
        </p>
        <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-foreground"
          >
            Get in touch {" "}
            <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-accent underline underline-offset-4"
          >
            About Me
          </Link>
        </div>
      </section>
    </PageMain>
  );
}
