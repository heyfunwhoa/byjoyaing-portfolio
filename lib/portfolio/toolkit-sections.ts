import { techCategories, type TechStance } from "../portfolio.ts";
import { officialToolWebsites } from "./external-links.ts";
import { gtmSystemsToolkit } from "./toolkit-registry.ts";

export type ToolkitSection = {
  id: string;
  title: string;
  summary: string;
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
    title: "Revenue",
    summary: "Account strategy, outreach and sales conversations.",
    ids: ["salesforce", "attio", "outreach", "nooks", "gong", "commonroom"],
  },
  {
    id: "research",
    title: "Research",
    summary: "Account context, source collection and evidence.",
    ids: ["linkedin", "sheets", "clay", "firecrawl", "exa"],
  },
  {
    id: "collaboration",
    title: "Collaboration",
    summary: "Shared knowledge, team handoffs and communication.",
    ids: ["notion", "slack", "workspace", "resend"],
  },
  {
    id: "build",
    title: "Build & deploy",
    summary: "The tools behind this portfolio and my building practice.",
    ids: ["next", "github", "vercel", "cursor", "aws"],
  },
  {
    id: "ai",
    title: "AI & data",
    summary: "Drafting support and the data workflows I am learning.",
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
