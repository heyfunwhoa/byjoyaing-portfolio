import { BrandAvatar } from "@/components/brand-avatar";
import { FeaturedSideQuestStrip } from "@/components/featured-side-quest-strip";
import { PageMain } from "@/components/page-main";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { ProjectEvidence } from "@/components/project-evidence";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredSideQuestSlides, featuredSideQuestSlugs } from "@/lib/featured-work";
import { statusHelp } from "@/lib/portfolio";
import { portfolioEntries } from "@/lib/portfolio-registry";
import { directoryProjects } from "@/lib/project-directory";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/side-quests" },
  openGraph: { url: "/side-quests" },
  title: "Side Quests",
  description:
    "Independent cybersecurity, AI, enablement, and GTM software experiments, with transparent build stages.",
};

const featuredSlugSet = new Set<string>(featuredSideQuestSlugs);

const focusLinks = [
  {
    label: "GTM & Revenue Systems",
    detail: "Revenue planning, partner, and operating workflows",
    href: "/projects?category=revenue",
  },
  {
    label: "Security & Market Intelligence",
    detail: "Account signals and security research",
    href: "/projects?category=accounts",
  },
  {
    label: "Technical Systems & AI",
    detail: "Detection and developer-focused experiments",
    href: "/projects?category=technical",
  },
  {
    label: "All projects",
    detail: "Browse by topic and build status",
    href: "/projects",
  },
] as const;

export default function SideQuestsPage() {
  const items = portfolioEntries.filter((entry) => entry.kind === "side-quest");
  const featured = featuredSideQuestSlugs.flatMap((slug) => items.filter((entry) => entry.slug === slug));
  const featuredPreviewBySlug = new Map(directoryProjects.map((project) => [project.slug, project.preview]));
  const more = items.filter((entry) => !featuredSlugSet.has(entry.slug));

  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
          <BrandAvatar variant="builder" />
        </div>
        <div>
          <p className="editorial-eyebrow text-accent">Side Quests / Independent builds</p>
          <h1 className="font-display mt-3 text-4xl leading-[1.16] tracking-normal sm:text-5xl">
            Curiosity, put to work.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Exploring the problems I encounter in cybersecurity and go-to-market work, then turning them into research
            systems, learning tools, and software experiments. Different projects are at different stages; none should
            be mistaken for employer deployments.
          </p>
        </div>
      </section>

      <nav aria-label="Explore independent projects by focus" className="grid gap-3 border-b border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
        {focusLinks.map((item) => (
          <Link key={item.label} href={item.href} className="rounded-xl border border-border bg-card p-4 hover:border-accent">
            <span className="block font-display text-xl">{item.label}</span>
            <span className="mt-2 block text-sm leading-6 text-muted">{item.detail}</span>
            <span className="mt-3 block text-sm font-medium text-accent">Explore →</span>
          </Link>
        ))}
      </nav>

      <section aria-labelledby="featured-quests-title" className="section-enter border-b border-border py-12">
        <p className="editorial-eyebrow text-accent">Featured builds</p>
        <h2 id="featured-quests-title" className="mt-2 font-display text-3xl">
          A strip, not a carousel
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Sage cards, honest status, and a peek of the next experiment. Scroll sideways. There is no Previous or Next,
          and nothing autoplays. Employer stories stay on Work.
        </p>
        <FeaturedSideQuestStrip slides={featuredSideQuestSlides()} />
      </section>

      <section id="look-closer" className="section-enter border-b border-border py-12">
        <h2 className="font-display text-3xl">Look closer</h2>
        <p className="mt-2 text-sm text-muted">
          The same four builds, with evidence and stack. Selected for relevance to security, commercial problem-solving,
          and learning—not because each app is finished.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((item) => (
            <article key={item.slug} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="mb-4">
                {featuredPreviewBySlug.get(item.slug) ? (
                  <ProjectEvidence kind={featuredPreviewBySlug.get(item.slug)!} compact />
                ) : null}
              </div>
              <ProjectStatusPill status={item.status} />
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
              <p className="mt-3 text-xs leading-5 text-muted">{statusHelp[item.status]}</p>
              <ProjectTechnologyStack slug={item.slug} presentation="compact" className="mt-4" />
              <Link href={item.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-accent underline">
                View case study →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="font-display text-3xl">Other explorations</h2>
        <p className="mt-2 text-sm text-muted">These are supporting experiments or concepts. They are not all active priorities.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {more.map((item) => (
            <Link href={item.href} key={item.slug} className="rounded-lg border border-border p-4 hover:border-accent">
              <span className="block font-semibold">{item.title}</span>
              <span className="mt-2 block">
                <ProjectStatusPill status={item.status} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-9 rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Research and tools still taking shape</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            These repositories are part of the longer-term roadmap. They are intentionally not represented as finished
            portfolio applications.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/heyfunwhoa/security-market-map"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              Security Market Map ↗
            </a>
            <a
              href="https://github.com/heyfunwhoa/technical-docs-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              Technical Documentation Foundation ↗
            </a>
          </div>
        </div>
        <Link href="/projects" className="mt-6 inline-block text-sm text-accent underline">
          View legacy project directory →
        </Link>
      </section>
    </PageMain>
  );
}
