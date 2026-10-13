import { completePageMetadata } from "@/lib/page-metadata";
import { BrandAvatar } from "@/components/brand-avatar";
import { ArrowRight } from "@/components/icons/arrow-right";
import { CelestialFrame } from "@/components/celestial-frame";
import { EditorialBento } from "@/components/editorial-bento";
import { Marginalia } from "@/components/marginalia";
import { PageMain } from "@/components/page-main";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
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
  description:
    "Strategic enterprise cybersecurity selling, people development, go-to-market leadership, and curious independent builds.",
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

/** One existing sentence per earlier role. The rest stays on /experience. */
function supportLine(company: string) {
  const role = roleByCompany(company);
  if (company === "Forcepoint" && role.points[1]) {
    return role.points[1];
  }
  return role.points[0];
}

export default function Home() {
  const current = roleByCompany("Truffle Security");
  const earlier = [roleByCompany("Rapid7"), roleByCompany("Forcepoint")];
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
          <p className="editorial-eyebrow text-[#DFC1A9]">Enterprise cybersecurity · Revenue & GTM</p>
          <h1 id="home-title" className="editorial-title mt-5 max-w-[15ch]">
            Revenue & GTM Leader.
            <span className="mt-2 block italic text-[#E6B59A]">Curious Builder.</span>
          </h1>
          <p className="mt-5 max-w-[38rem] text-base font-medium leading-7 sm:text-lg sm:leading-8">
            People first. Problem-driven. Systems-minded.
          </p>
          <p className="editorial-subtle mt-3 max-w-[38rem] text-base leading-7">
            I&apos;m Kristen Aing. I sell into complex enterprise security decisions, coach the people around the deal, and build practical systems when the same friction shows up again.
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
            <BrandAvatar variant="leader" />
          </CelestialFrame>
          <p className="editorial-subtle mt-3 text-center text-xs leading-5">Curious by nature. Builder by instinct.</p>
        </div>
      </section>

      <section aria-labelledby="credibility-title" className="section-enter border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">01 / Credibility</p>
        <div className="mt-3 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-14">
          <h2 id="credibility-title" className="editorial-section-title max-w-[16ch]">
            Enterprise selling, with the people and the motion around it.
          </h2>
          <div className="min-w-0">
            <article className="border-t border-foreground pt-5">
              <p className="editorial-eyebrow text-accent">{current.period}</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight">{current.company}</h3>
              <p className="mt-2 text-sm leading-6">{current.title}</p>
              <p className="mt-4 max-w-xl text-base leading-7">{current.points.join(" ")}</p>
            </article>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {earlier.map((role) => (
                <li key={role.company}>
                  <Link href="/experience" className="group grid min-w-0 gap-1 py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                    <span className="editorial-eyebrow pt-1 text-accent">{role.company}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold group-hover:text-accent">{role.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{supportLine(role.company)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <nav aria-label="Explore selling and leadership evidence" className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
              <Link href="/work#enterprise-sales" className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">Enterprise deal execution →</Link>
              <Link href="/work#people-leadership" className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">Coaching and enablement →</Link>
            </nav>
            <Link
              href="/experience"
              className="editorial-link mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
            >
              Read the experience timeline {" "}
              <ArrowRight size={16} className="ml-2 inline-block size-4 shrink-0" />
            </Link>
          </div>
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
