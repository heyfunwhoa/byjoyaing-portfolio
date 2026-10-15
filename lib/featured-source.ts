import type { ProjectStatus } from "./portfolio.ts";

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
  status?: ProjectStatus;
};

export const featuredSourceLabel: Record<FeaturedSource, string> = {
  employer: "Employer work",
  independent: "Independent · Side Quest",
};
