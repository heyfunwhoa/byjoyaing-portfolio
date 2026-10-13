import type { TechStance } from "../portfolio.ts";

/** About toolkit marks. Separate from verified Side Quest stacks. */
export const gtmSystemsToolkit = [
  {
    id: "salesforce",
    name: "Salesforce",
    stance: "professional",
    note: "Where I have run enterprise cycles. Not integrated here.",
    logo: "/logos/toolkit/salesforce.svg",
    source: "SVGL / Salesforce",
  },
  {
    id: "attio",
    name: "Attio",
    stance: "learning",
    note: "Not connected to this site.",
    logo: "/logos/toolkit/attio.svg",
    source: "Attio",
  },
  {
    id: "outreach",
    name: "Outreach",
    stance: "professional",
    note: "Sales engagement in the field. Not integrated here.",
    logo: "/logos/toolkit/outreach.svg",
    source: "Outreach",
  },
  {
    id: "nooks",
    name: "Nooks",
    stance: "professional",
    note: "Dialer practice in the field. Not integrated here.",
    logo: "/logos/toolkit/nooks.png",
    source: "Nooks",
  },
  {
    id: "gong",
    name: "Gong",
    stance: "professional",
    note: "Conversation intelligence in the field. Not integrated here.",
    logo: "/logos/toolkit/gong.svg",
    source: "Gong",
  },
  {
    id: "commonroom",
    name: "Common Room",
    stance: "professional",
    note: "Community and account signal in the field. Not integrated here.",
    logo: "/logos/toolkit/commonroom.png",
    source: "Common Room",
  },
  {
    id: "clay",
    name: "Clay",
    stance: "learning",
    note: "Not connected to this site.",
    logo: "/logos/toolkit/clay.png",
    source: "Clay",
  },
  {
    id: "notion",
    name: "Notion",
    stance: "professional",
    note: "Private planning and docs. This site does not read Notion.",
    logo: "/logos/toolkit/notion.svg",
    source: "Simple Icons",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    stance: "professional",
    note: "Field drafting aid. This repository does not call OpenAI.",
    logo: "/logos/toolkit/chatgpt.svg",
    source: "Simple Icons",
  },
  {
    id: "claude",
    name: "Claude",
    stance: "learning",
    note: "Not a dependency of this repository.",
    logo: "/logos/toolkit/claude.svg",
    source: "Simple Icons",
  },
  {
    id: "cursor",
    name: "Cursor",
    stance: "professional",
    note: "Where I write. Not a feature of the site.",
    logo: "/logos/toolkit/cursor.svg",
    source: "Simple Icons",
  },
  {
    id: "github",
    name: "GitHub",
    stance: "built",
    note: "Source and version history for this portfolio.",
    logo: "/logos/toolkit/github.svg",
    source: "Logoforge",
  },
  {
    id: "vercel",
    name: "Vercel",
    stance: "built",
    note: "Hosts this site. It does not host a separate intelligence app.",
    logo: "/logos/toolkit/vercel.svg",
    source: "Logoforge",
  },
  {
    id: "firecrawl",
    name: "Firecrawl",
    stance: "learning",
    note: "Not a dependency of this repository.",
    logo: "/logos/toolkit/firecrawl.svg",
    source: "SVGL / Firecrawl",
  },
  {
    id: "exa",
    name: "Exa",
    stance: "learning",
    note: "Not a dependency of this repository.",
    logo: "/logos/toolkit/exa.svg",
    source: "Exa",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  stance: TechStance;
  note: string;
  logo: string;
  source: string;
}>;

export type ToolkitId = (typeof gtmSystemsToolkit)[number]["id"];

export const siteHowBuilt =
  "This site is a Next.js App Router app in heyfunwhoa/byjoyaing-portfolio: React, TypeScript, and Tailwind, hosted on Vercel. I write it in Cursor. The portfolio source is on GitHub. The coverage sample is hardcoded here. A logo in the GTM toolkit is a product I have used or am learning — not a live integration.";
