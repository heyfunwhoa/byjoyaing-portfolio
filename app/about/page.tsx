import { completePageMetadata } from "@/lib/page-metadata";
import { CapabilityOrbit } from "@/components/capability-orbit";
import { OrbitArtwork } from "@/components/orbit-artwork";
import { CareerRail } from "@/components/career-rail";
import { PageMain } from "@/components/page-main";
import { ToolsMap } from "@/components/tools-map";
import { aboutPage } from "@/lib/about/editorial";
import { careerRailNodes } from "@/lib/career-rail";
import { fieldNoteBodies } from "@/lib/field-notes/bodies";
import { Headphones, Palette, Plane, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const interestIcons = new Map([
  ["travel", Plane],
  ["music", Headphones],
  ["making", Wrench],
  ["creative", Palette],
]);

// Match the institution name rather than the editable education list's order.
// Other credentials keep their visible text without receiving an unrelated mark.
const educationMarks = [
  {
    name: "The University of Texas at Austin",
    src: "/logos/education/ut-austin.svg",
    width: 1037,
    height: 298,
    widthClass: "w-32",
  },
  {
    name: "Western Governors University",
    src: "/logos/education/wgu.svg",
    width: 133,
    height: 30,
    widthClass: "w-[6.5rem]",
  },
] as const;

const certificationMarks = [
  {
    name: "AWS Certified Cloud Practitioner",
    src: "/badges/aws-certified-cloud-practitioner.png",
    width: 600,
    height: 600,
    widthClass: "w-20",
  },
  {
    name: "AWS Certified AI Practitioner",
    src: "/badges/aws-certified-ai-practitioner.png",
    width: 600,
    height: 600,
    widthClass: "w-20",
  },
] as const;

export const metadata: Metadata = completePageMetadata(
  {
    alternates: { canonical: "/about" },
    openGraph: { url: "/about" },
    title: "About: Cybersecurity Sales & GTM",
    description: aboutPage.metaDescription,
  },
  "/about",
);

export default function AboutPage() {
  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="order-2 mx-auto w-full max-w-[12rem] lg:order-1 lg:mx-0 lg:max-w-none">
          <OrbitArtwork
            treatment="transparent"
            surface="ivory"
            sizes="(min-width: 1024px) 22rem, 12rem"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="editorial-eyebrow text-accent">{aboutPage.eyebrow}</p>
          <h1 className="editorial-title mt-3 max-w-2xl">
            {aboutPage.headline}
          </h1>
          {aboutPage.lead.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-2xl text-base leading-7 text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <nav aria-label="On this page" className="border-b border-border py-4">
        <p className="editorial-eyebrow text-muted">On this page</p>
        <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {[
            { href: "#philosophy", label: "Philosophy" },
            { href: "#how-i-work", label: "How I work" },
            { href: "#career-progression", label: "Career & education" },
            { href: "#technologies", label: "Tools & systems" },
            { href: "#work-and-writing", label: "Work & writing" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-accent underline underline-offset-4 hover:bg-surface-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="philosophy" className="scroll-mt-24 border-b border-border py-12">
        <p className="orbital-section-label text-sm font-medium text-muted">
          {aboutPage.philosophyLabel}
        </p>
        <h2 className="mt-3 font-display text-3xl">
          {aboutPage.philosophyHeading}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {aboutPage.principles.map((principle) => (
            <article
              key={principle.name}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-lg font-semibold">{principle.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
          {aboutPage.leadershipApproach}
        </p>
      </section>

      <section
        id="how-i-work"
        aria-labelledby="how-i-work-heading"
        className="scroll-mt-24 border-b border-border py-12"
      >
        <p className="orbital-section-label editorial-eyebrow text-accent">
          {aboutPage.approachEyebrow}
        </p>
        <h2 id="how-i-work-heading" className="mt-3 font-display text-3xl">
          {aboutPage.approachHeading}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {aboutPage.approachIntro}
        </p>
        <CapabilityOrbit />
      </section>

      <section id="career-progression" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">
          {aboutPage.careerHeading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {aboutPage.careerIntro}
        </p>
        <details className="mt-5 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            Career at a glance
          </summary>
          <CareerRail nodes={careerRailNodes()} />
        </details>
        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:gap-6">
          <Link
            href="/experience"
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
          >
            Read the experience timeline
          </Link>
          <Link
            href="/capabilities"
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
          >
            See capabilities
          </Link>
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <h3 className="text-lg font-semibold">
            {aboutPage.educationHeading}
          </h3>
          <ul className="mt-3 grid gap-x-6 gap-y-3 text-sm leading-6 text-muted sm:grid-cols-2">
            {aboutPage.education.map((item) => {
              const school = educationMarks.find((mark) => item.includes(mark.name));
              const certification = certificationMarks.find((mark) =>
                item.includes(mark.name),
              );
              const mark = school ?? certification;
              return (
                <li
                  key={item}
                  className={
                    certification
                      ? "flex min-w-0 items-center gap-3"
                      : school
                        ? "min-w-0"
                        : "sm:col-span-2"
                  }
                >
                  {mark ? (
                    <div
                      aria-hidden="true"
                      className={
                        school
                          ? "mb-1 flex h-12 items-center px-3"
                          : "shrink-0"
                      }
                    >
                      <Image
                        src={mark.src}
                        alt=""
                        width={mark.width}
                        height={mark.height}
                        unoptimized
                        className={`h-auto max-w-full ${mark.widthClass}`}
                      />
                    </div>
                  ) : null}
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="technologies"
        className="scroll-mt-24 border-b border-border py-12"
      >
        <p className="editorial-eyebrow text-accent">
          {aboutPage.practiceEyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tight">
          {aboutPage.practiceHeading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {aboutPage.practiceIntro}
        </p>
        <div className="mt-6">
          <ToolsMap />
        </div>
      </section>

      <section
        id="work-and-writing"
        aria-labelledby="work-and-writing-heading"
        className="scroll-mt-24 border-b border-border py-8"
      >
        <h2 id="work-and-writing-heading" className="font-display text-2xl">
          {aboutPage.exploreHeading}
        </h2>
        <ul
          aria-label="Featured illustrative guides"
          className="mt-5 divide-y divide-border border-y border-border"
        >
          {(["enterprise-deal", "multithreading"] as const).map((id) => {
            const guide = fieldNoteBodies[id];
            return (
              <li key={id} className="py-4">
                <p className="text-xs font-medium text-muted">Illustrative guide</p>
                <h3 className="text-base font-semibold">
                  <Link
                    href={`/field-notes/${id}`}
                    className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
                  >
                    {guide.title}
                  </Link>
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-muted">
                  Use this when {guide.sections["use-when"].body}
                </p>
              </li>
            );
          })}
        </ul>
        <ul className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
          <li>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              Professional Work
            </Link>
            <p className="leading-6 text-muted">
              Enterprise selling, competitive positioning, and resources for the team.
            </p>
          </li>
          <li>
            <Link
              href="/field-notes"
              className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              Playbooks and practical guides
            </Link>
            <p className="leading-6 text-muted">
              Structured ways to explain complex sales work and put ideas into practice.
            </p>
          </li>
          <li>
            <Link
              href="/side-quests"
              className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              Independent experiments
            </Link>
            <p className="leading-6 text-muted">
              Tools and learning experiences I build to explore better ways of working.
            </p>
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="beyond-work-heading"
        className="border-b border-border py-8"
      >
        <h2 id="beyond-work-heading" className="text-lg font-semibold">
          {aboutPage.beyondLabel}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {aboutPage.beyondIntro}
        </p>
        <details className="mt-2 max-w-2xl text-sm text-muted">
          <summary className="min-h-11 cursor-pointer py-3 font-medium">
            {aboutPage.beyondHeading}
          </summary>
          <div className="mt-2 rounded-xl bg-surface-clay p-4">
            <ul className="space-y-3 leading-6">
              {aboutPage.interests.map((interest) => {
                const InterestIcon = interestIcons.get(interest.id);
                return (
                  <li key={interest.id} className="flex items-start gap-3">
                    {InterestIcon ? (
                      <InterestIcon
                        aria-hidden="true"
                        focusable="false"
                        className="mt-0.5 size-5 shrink-0 text-muted"
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span className="font-medium text-foreground">
                        {interest.title}.
                      </span>{" "}
                      {interest.detail}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 leading-6">
              <span className="font-medium">{aboutPage.valuesLabel}:</span>{" "}
              {aboutPage.values.join(" · ")}
            </p>
          </div>
        </details>
      </section>

      <section className="py-12">
        <h2 className="text-lg font-semibold">{aboutPage.contactHeading}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          I&apos;m interested in work that connects customer insight, clear communication,
          and practical GTM execution. If you&apos;re building in cybersecurity or helping
          a technical product find its audience, I&apos;d enjoy comparing notes.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/contact" className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">
            Start a conversation
          </Link>
          <a
            href="https://www.linkedin.com/in/kristenaing"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </PageMain>
  );
}

