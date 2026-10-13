import { techCategories, type TechStance } from "../portfolio.ts";
import { officialToolWebsites } from "./external-links.ts";
import { gtmSystemsToolkit } from "./toolkit-registry.ts";

export type ToolkitSection = {
  id: string;
  title: string;
  mobileLabel: string;
  summary: string;
  example: string;
  steps: readonly string[];
  status: string;
  evidence: { label: string; href: string };
  tools: {
    id: string;
    name: string;
    note: string;
    stance: TechStance;
    logo?: string;
    href?: string;
  }[];
};

const tools = new Map<string, ToolkitSection["tools"][number]>([
  ...techCategories.flatMap((group) =>
    group.items.map((item) => [item.id, item] as const),
  ),
  ...gtmSystemsToolkit.map((item) => [item.id, item] as const),
]);
const definitions = [
  {
    id: "revenue",
    title: "Revenue execution",
    mobileLabel: "Revenue execution",
    summary: "Move complex buying decisions forward.",
    example:
      "I connect discovery, technical evaluation and commercial conversations into a clear account strategy.",
    steps: [
      "Understand the buyer",
      "Align stakeholders",
      "Advance the decision",
    ],
    status: "Professional practice",
    evidence: {
      label: "Explore enterprise selling",
      href: "/work#enterprise-sales",
    },
    ids: ["salesforce", "attio", "outreach", "nooks", "gong", "commonroom"],
  },
  {
    id: "research",
    title: "Market & account intelligence",
    mobileLabel: "Market intelligence",
    summary: "Turn market context into useful field guidance.",
    example:
      "I collect competitive evidence, separate observations from assumptions and package findings for sellers.",
    steps: ["Collect sources", "Assess the evidence", "Shape field guidance"],
    status: "Professional practice",
    evidence: {
      label: "Explore competitive field work",
      href: "/work#gtm-strategy",
    },
    ids: ["linkedin", "sheets", "clay", "firecrawl", "exa"],
  },
  {
    id: "collaboration",
    title: "Team enablement & collaboration",
    mobileLabel: "Team enablement",
    summary: "Help people ramp and share what they know.",
    example:
      "I turn recurring discovery and evaluation questions into shared resources for sellers and customer-facing teams.",
    steps: [
      "Find recurring friction",
      "Create shared guidance",
      "Coach and refine",
    ],
    status: "Professional practice",
    evidence: {
      label: "Explore coaching and enablement",
      href: "/work#people-leadership",
    },
    ids: ["notion", "slack", "workspace", "resend"],
  },
  {
    id: "build",
    title: "Building & automation",
    mobileLabel: "Building & automation",
    summary: "Turn recurring problems into practical experiments.",
    example:
      "This portfolio is a live independent build. My Side Quests explore research, account and enablement workflows, with each project's stage labeled.",
    steps: [
      "Define the problem",
      "Build a small example",
      "Review and iterate",
    ],
    status: "Independent building",
    evidence: {
      label: "Explore independent Side Quests",
      href: "/side-quests",
    },
    ids: ["next", "github", "vercel", "cursor", "aws"],
  },
  {
    id: "ai",
    title: "AI & data practice",
    mobileLabel: "AI & data",
    summary: "Explore assistance with evidence and human review.",
    example:
      "I use AI for drafting support and am learning how structured, source-grounded information could support research workflows.",
    steps: ["Define the output", "Ground it in sources", "Review the result"],
    status: "Learning · proposed workflow",
    evidence: { label: "Explore my AI learning lab", href: "/ai-academy" },
    ids: ["chatgpt", "claude", "postgres", "aisdk", "schema", "ingest"],
  },
];
export const toolkitSections: ToolkitSection[] = definitions.map(
  ({ ids, ...section }) => ({
    ...section,
    tools: ids.map((id) => {
      const item = tools.get(id);
      if (!item) throw new Error(`Missing toolkit item: ${id}`);
      return { ...item, href: officialToolWebsites[id] };
    }),
  }),
);
