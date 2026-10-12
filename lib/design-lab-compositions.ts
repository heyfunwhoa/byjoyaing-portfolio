import { roles } from "./portfolio.ts";
import { publicStories } from "./public-stories.ts";

type RoleSource = { company: string; title: string; period: string };
type StorySource = {
  id: string;
  title: string;
  area: string;
  context: string;
  contribution: string;
  execution: string;
  evidence: string;
  takeaway: string;
};

export type CareerRailNode = {
  company: string;
  title: string;
  startYear: string;
  endLabel: string;
};

export function careerRailNodes(source: readonly RoleSource[] = roles): CareerRailNode[] {
  return [...source].reverse().map((role) => {
    const [start = "", end = ""] = role.period.split("–").map((part) => part.trim());
    return {
      company: role.company,
      title: role.title,
      startYear: start.split(" ").at(-1) ?? "",
      endLabel: end === "Present" ? "Present" : (end.split(" ").at(-1) ?? ""),
    };
  });
}

export type OrbitNode = { label: string; sentence: string; href: string };

/** Sentences restate wording already published on About and Work. */
export const pillarOrbitNodes: { center: OrbitNode; pillars: readonly OrbitNode[] } = {
  center: {
    label: "Enterprise selling",
    sentence: "Discovery, a competitive story, and the close, with security, engineering, and executive buyers.",
    href: "/work#enterprise-sales",
  },
  pillars: [
    {
      label: "Strategist",
      sentence: "Competitive briefs and field playbooks that separate confirmed findings from hypotheses.",
      href: "/work#gtm-strategy",
    },
    {
      label: "Leader",
      sentence: "Coaching sellers, supporting hiring, and building the ramp a sales lead owes the team.",
      href: "/work#people-leadership",
    },
    {
      label: "Builder",
      sentence: "Shared discovery, ICP, competitive, and POC resources the sales team adopted.",
      href: "/experience",
    },
  ],
};

export type CaseBandStep = { heading: string; text: string };

export function caseBandSteps(story: StorySource): CaseBandStep[] {
  return [
    { heading: "Context", text: story.context },
    { heading: "My contribution", text: story.contribution },
    { heading: "Execution and decisions", text: story.execution },
    { heading: "Evidence and limitations", text: story.evidence },
    { heading: "What I learned", text: story.takeaway },
  ];
}

export const caseBandStories = publicStories;
