import { completePageMetadata } from "@/lib/page-metadata";
import { BrandAvatar } from "@/components/brand-avatar";
import { FeaturedSideQuestStrip } from "@/components/featured-side-quest-strip";
import { PageMain } from "@/components/page-main";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredSideQuestSlides, featuredSideQuestSlugs,
} from "@/lib/featured-work";
import { portfolioEntries } from "@/lib/portfolio-registry";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
  alternates: { canonical: "/side-quests" },
  openGraph: { url: "/side-quests" },
  title: "Side Quests",
  description:
    "Independent cybersecurity, AI, enablement, and GTM software experiments, with transparent build stages.",
},
  "/side-quests",
);

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
  const more = items.filter((entry) => !featuredSlugSet.has(entry.slug));

  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div className="order-2 mx-auto w-full max-w-[9rem] lg:order-1 lg:mx-0 lg:max-w-[14rem]">
          <BrandAvatar variant="builder" />
        </div>
        <div className="order-1 lg:order-2">
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
          Selected experiments
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Start with account research, a source-backed coverage comparison or a synthetic learning exercise. Each example shows its current stage and what you can inspect today.
        </p>
        <FeaturedSideQuestStrip slides={featuredSideQuestSlides()} />
      </section>

      <section id="look-closer" className="scroll-mt-24 border-b border-border py-8"
      >
        <h2 className="font-display text-2xl">Look closer</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Open a project to inspect its sample, contribution and implementation
          limits.
        </p>
        <Link href="/projects#directory"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
        >
          Explore the project directory →
        </Link>
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
