/**
 * Public editorial relationships, not a personal data warehouse or a deployed knowledge graph.
 * Prose is read from content/work/stories. Ids, areas, and related links stay here.
 * No private Joy Index records or automated cross-repository sync.
 */
import { workNarratives } from "./work/editorial.ts";
import { storyFacts } from "./work/story-facts.ts";

export const publicStories = storyFacts.map((fact) => {
  const prose = workNarratives[fact.id];
  return {
    id: fact.id,
    area: fact.area,
    title: prose.title,
    scope: prose.scope,
    collaboration: prose.collaboration,
    decision: prose.decision,
    context: prose.context,
    contribution: prose.contribution,
    execution: prose.execution,
    evidence: prose.evidence,
    takeaway: prose.takeaway,
    related: fact.related,
  };
});

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
  return errors;
}
