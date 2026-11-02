import { completePageMetadata } from "@/lib/page-metadata";
import { CapabilityOrbit } from "@/components/capability-orbit";
import { OrbitArtwork } from "@/components/orbit-artwork";
import { CareerRail } from "@/components/career-rail";
import { PageMain } from "@/components/page-main";
import { ToolsMap } from "@/components/tools-map";
import { aboutPage } from "@/lib/about/editorial";
import { careerRailNodes } from "@/lib/career-rail";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
    alternates: { canonical: "/about" },
    openGraph: { url: "/about" },
    title: "About",
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
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-semibold">
            {aboutPage.educationHeading}
          </h3>
          <ul className="mt-4 grid gap-4 text-sm leading-6 text-muted sm:grid-cols-3">
            {aboutPage.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
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

      <section className="border-b border-border py-8">
        <h2 className="font-display text-2xl">{aboutPage.exploreHeading}</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Professional Work
          </Link>
          <Link
            href="/field-notes"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Field Notes
          </Link>
          <Link
            href="/side-quests"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Independent Side Quests
          </Link>
        </div>
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
              {aboutPage.interests.map((interest) => (
                <li key={interest.id}>
                  <span className="font-medium text-foreground">
                    {interest.title}.
                  </span>{" "}
                  {interest.detail}
                </li>
              ))}
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
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/contact" className="text-accent">
            Get in touch
          </Link>
          <a
            href="https://www.linkedin.com/in/kristenaing"
            className="text-accent"
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
