import { portfolioEntries } from "./portfolio-registry.ts";
import { publicStories } from "./public-stories.ts";
import type { FeaturedSlide } from "./featured-source.ts";

export type {
  FeaturedCollection,
  FeaturedSlide,
  FeaturedSource,
} from "./featured-source.ts";
export { featuredSourceLabel } from "./featured-source.ts";

const storyAnchors: Record<(typeof publicStories)[number]["id"], string> = {
  "enterprise-selling": "/work#enterprise-sales",
  "team-enablement": "/work#people-leadership",
  "competitive-evidence": "/work#gtm-strategy",
};

/** Public Work stories, then registry Work. Independent builds stay on `/side-quests`. */
export function featuredWorkSlides(): FeaturedSlide[] {
  const slides: FeaturedSlide[] = publicStories.map((story) => ({
    id: story.id,
    title: story.title,
    summary: story.context,
    href: storyAnchors[story.id],
    collection: "Work",
    source: "employer",
    area: story.area,
  }));

  const used = new Set([
    ...slides.map((slide) => slide.href),
    ...publicStories.flatMap((story) =>
      story.related
        .filter((link) => link.category === "Work")
        .map((link) => link.href),
    ),
  ]);
  for (const entry of portfolioEntries.filter((item) => item.kind === "work")) {
    if (used.has(entry.href)) continue;
    slides.push({
      id: entry.slug,
      title: entry.title,
      summary: entry.summary,
      href: entry.href,
      collection: "Work",
      source: "employer",
      area: "Professional practice",
    });
    used.add(entry.href);
  }

  return slides;
}

export const featuredSideQuestSlugs = [
  "account-intelligence",
  "detector-coverage-atlas",
  "truffle-camp",
] as const;

/** Selected independent builds for `/side-quests`. Not used on `/work`. */
export function featuredSideQuestSlides(): FeaturedSlide[] {
  return featuredSideQuestSlugs.flatMap((slug) => {
    const entry = portfolioEntries.find(
      (item) => item.slug === slug && item.kind === "side-quest",
    );
    if (!entry) return [];
    return [
      {
        id: entry.slug,
        title: entry.title,
        summary: entry.summary,
        href: entry.href,
        collection: "Side Quests" as const,
        source: "independent" as const,
        area: "Independent build",
        status: entry.status,
      },
    ];
  });
}
