import { workNarratives, type WorkNarrativeId } from "./work/narratives.ts";

/**
 * Public editorial relationships, not a personal data warehouse or a deployed knowledge graph.
 * No private Joy Index records or automated cross-repository sync.
 * Sentences live in content/work/stories. This module owns id, area, and links.
 */
const facts: Record<
  WorkNarrativeId,
  {
    area: string;
    related: readonly { label: string; href: string; category: string }[];
  }
> = {
  "enterprise-selling": {
    area: "Enterprise Sales",
    related: [
      { label: "Experience and career history", href: "/experience", category: "Work" },
      { label: "Deal anatomy illustration", href: "/field-notes/enterprise-deal", category: "Field Notes" },
      { label: "Stakeholder mapping exercise", href: "/field-notes/multithreading", category: "Field Notes" },
    ],
  },
  "team-enablement": {
    area: "People & Leadership",
    related: [
      { label: "Career timeline", href: "/experience", category: "Work" },
      { label: "Truffle Camp — independent curriculum design", href: "/work/truffle-camp", category: "Side Quests" },
    ],
  },
  "competitive-evidence": {
    area: "GTM Strategy",
    related: [
      { label: "Competitive evidence field approach", href: "/work/competitive-intelligence-engine", category: "Work" },
      { label: "Career timeline", href: "/experience", category: "Work" },
      { label: "Explore independent research systems", href: "/side-quests", category: "Side Quests" },
    ],
  },
};

export const publicStories = workNarratives.map((story) => ({
  ...story,
  area: facts[story.id].area,
  related: facts[story.id].related,
}));

export function validatePublicStories() {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const story of publicStories) {
    if (ids.has(story.id)) errors.push("Duplicate story: " + story.id);
    ids.add(story.id);
    const requiredFields: readonly string[] = [
      story.title,
      story.context,
      story.contribution,
      story.execution,
      story.evidence,
      story.takeaway,
      story.scope,
      story.collaboration,
      story.decision,
    ];
    if (requiredFields.some((value) => value.trim().length === 0))
      errors.push("Incomplete story: " + story.id);
    if (
      !story.related.length ||
      story.related.some(
        (link) =>
          !link.href.startsWith("/") ||
          !["Work", "Field Notes", "Side Quests", "Builder Academy"].includes(
            link.category,
          ),
      )
    )
      errors.push("Invalid internal reference: " + story.id);
  }
  if (
    workNarratives.length !== 3 ||
    workNarratives.some((story) => !(story.id in facts))
  )
    errors.push("Story id is not in the code allowlist");
  return errors;
}
