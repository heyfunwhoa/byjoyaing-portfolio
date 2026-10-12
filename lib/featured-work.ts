import { portfolioEntries } from "./portfolio-registry.ts";
import { publicStories } from "./public-stories.ts";

export type FeaturedCollection = "Work" | "Side Quests";
export type FeaturedSource = "employer" | "independent";

export type FeaturedSlide = {
  id: string;
  title: string;
  summary: string;
  href: string;
  collection: FeaturedCollection;
  source: FeaturedSource;
  area: string;
};

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

  const used = new Set(slides.map((slide) => slide.href));
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

/**
 * Ready when Side Quests gets its own featured strip. Not mounted on `/work`.
 * Uses the existing selected Side Quest order from that page.
 */
export function featuredSideQuestSlides(): FeaturedSlide[] {
  const selected = ["account-intelligence", "detector-coverage-atlas", "truffle-camp", "customer-feedback-intelligence"];
  return selected.flatMap((slug) => {
    const entry = portfolioEntries.find((item) => item.slug === slug && item.kind === "side-quest");
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
      },
    ];
  });
}

export const featuredSourceLabel: Record<FeaturedSource, string> = {
  employer: "Employer work",
  independent: "Independent · Side Quest",
};
