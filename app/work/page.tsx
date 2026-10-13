import { completePageMetadata } from "@/lib/page-metadata";
import { ProfessionalCaseStudy } from "@/components/editorial/professional-case-study";
import { WorkExplorer } from "@/components/work-explorer";
import type { Metadata } from "next";
import Link from "next/link";
import { PageMain } from "@/components/page-main";
import { portfolioEntries } from "@/lib/portfolio-registry";
import { publicStories } from "@/lib/public-stories";
export const metadata: Metadata = completePageMetadata(
  {
    alternates: { canonical: "/work" },
    openGraph: { url: "/work" },
    title: "Work",
    description:
      "Enterprise cybersecurity sales, revenue leadership, coaching and evidence-led GTM work.",
  },
  "/work",
);
export default function WorkPage() {
  const work = portfolioEntries.filter((entry) => entry.kind === "work");
  return (
    <PageMain>
      <section className="border-b border-border py-12 sm:py-16">
        <p className="text-sm font-medium text-muted">
          Work / Professional experience
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.16] tracking-normal sm:text-5xl">
          People. Strategy. Systems.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Enterprise cybersecurity sales, team development, competitive
          positioning and GTM operations. My professional experience comes
          first; independent product experiments live under Side Quests.
        </p>
      </section>
      <section
        aria-labelledby="featured-work-heading"
        className="border-b border-border py-12 sm:py-16"
      >
        <p className="editorial-eyebrow text-accent">Selected work / Explore</p>
        <h2 id="featured-work-heading" className="mt-2 font-display text-3xl">
          Explore professional evidence
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Three ways into the work. Open a card to explore the story,
          contribution and evidence—or collapse it to keep browsing.
        </p>
        <WorkExplorer
          stories={publicStories.map((story) => (
            <ProfessionalCaseStudy
              key={story.id}
              title={story.title}
              context={story.context}
              scope={story.scope}
              collaboration={story.collaboration}
              role={story.contribution}
              execution={
                <>
                  <p>{story.execution}</p>
                  <p className="mt-3">
                    <strong>Judgment behind the approach:</strong>{" "}
                    {story.decision}
                  </p>
                </>
              }
              evidence={story.evidence}
              reflection={story.takeaway}
              relatedItems={story.related}
              requestHref={`/contact?example=${story.id}`}
            />
          ))}
        />
        <Link href="/about#how-i-work" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">How I approach the work →</Link>
        <p className="mt-6 text-sm leading-6 text-muted">
          Independent research and prototypes live in{" "}
          <Link
            href="/side-quests"
            className="font-semibold text-accent underline underline-offset-4"
          >
            Side Quests
          </Link>
          .
        </p>
      </section>
      <section className="py-12" aria-label="Related professional work">
        <h2 className="font-display text-2xl">Related field systems</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {work.map((item) => (
            <article
              key={item.slug}
              className="rounded-xl border border-border bg-card p-6"
            >
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                Professional practice
              </p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.summary}
              </p>
              <p className="mt-3 text-xs leading-5 text-muted">
                Portfolio example: outcomes and any related software experiments
                are described separately.
              </p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-accent underline"
              >
                Explore case study →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-border p-6">
          <h3 className="font-semibold">Career and leadership experience</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Work extends beyond any one project: complex enterprise deals,
            coaching, onboarding, technical discovery, and cross-functional GTM
            improvements.
          </p>
          <Link
            href="/experience"
            className="mt-3 inline-block text-sm text-accent underline"
          >
            View professional timeline →
          </Link>
        </div>
      </section>
    </PageMain>
  );
}
