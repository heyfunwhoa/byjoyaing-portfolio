/**
 * Code-owned Work story identity. Prose lives in content/work/stories.
 * Areas, related hrefs, and this id allowlist do not move into the editor.
 */
export const storyFacts = [
  {
    id: "enterprise-selling",
    area: "Enterprise Sales",
    related: [
      {
        label: "Experience and career history",
        href: "/experience",
        category: "Work",
      },
      {
        label: "Deal anatomy illustration",
        href: "/field-notes/enterprise-deal",
        category: "Field Notes",
      },
      {
        label: "Stakeholder mapping exercise",
        href: "/field-notes/multithreading",
        category: "Field Notes",
      },
    ],
  },
  {
    id: "team-enablement",
    area: "People & Leadership",
    related: [
      { label: "Career timeline", href: "/experience", category: "Work" },
      {
        label: "Truffle Camp — independent curriculum design",
        href: "/work/truffle-camp",
        category: "Side Quests",
      },
    ],
  },
  {
    id: "competitive-evidence",
    area: "GTM Strategy",
    related: [
      {
        label: "Competitive evidence field approach",
        href: "/work/competitive-intelligence-engine",
        category: "Work",
      },
      { label: "Career timeline", href: "/experience", category: "Work" },
      {
        label: "Explore independent research systems",
        href: "/side-quests",
        category: "Side Quests",
      },
    ],
  },
] as const;

export type StoryId = (typeof storyFacts)[number]["id"];
