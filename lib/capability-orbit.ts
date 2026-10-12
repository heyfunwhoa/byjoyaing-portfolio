/**
 * Design-lab data for the capability orbit. Sentences restate public wording in
 * docs/brand/brand-guidelines.md, `roles`, and `publicStories`. Coaching figures
 * are omitted until they are re-verified (see `publicStories`).
 */
export type OrbitCollection = "Work" | "Experience" | "About" | "Side Quests";
export type EvidenceSource = "employer" | "independent";

export type OrbitLink = { label: string; href: string; collection: OrbitCollection };
export type OrbitEvidence = { text: string; source: EvidenceSource };
export type OrbitPillar = {
  id: "strategist" | "leader" | "builder";
  label: string;
  summary: string;
  evidence: readonly OrbitEvidence[];
  boundary?: string;
  links: readonly OrbitLink[];
};

export const orbitCenter = {
  label: "Enterprise selling",
  summary: "Full-cycle enterprise cybersecurity sales across security, engineering, and executive buyers.",
  href: "/work#enterprise-sales",
} as const;

export const orbitPillars: readonly OrbitPillar[] = [
  {
    id: "strategist",
    label: "Strategist",
    summary: "Understand markets and buyers, identify patterns and opportunities, ask better questions.",
    evidence: [
      {
        text: "Competitive briefs and field playbooks shared with teammates, separating validated observations from assumptions.",
        source: "employer",
      },
      { text: "Threat-intelligence playbooks the Rapid7 portfolio team used.", source: "employer" },
    ],
    links: [
      { label: "GTM strategy and professional evidence", href: "/work#gtm-strategy", collection: "Work" },
      { label: "Competitive evidence field approach", href: "/work/competitive-intelligence-engine", collection: "Work" },
    ],
  },
  {
    id: "leader",
    label: "Leader",
    summary: "Create alignment, own commercial execution, coach and develop people, move complex decisions forward.",
    evidence: [
      {
        text: "At Truffle Security, coach SDRs and newer sellers and support onboarding across sales, solutions architecture, and customer success.",
        source: "employer",
      },
      {
        text: "At Darktrace, coached newer sellers on discovery, competitive positioning, and value-based selling.",
        source: "employer",
      },
    ],
    boundary: "Coaching and onboarding support alongside a quota. Not a direct-management title.",
    links: [
      { label: "People and leadership", href: "/work#people-leadership", collection: "Work" },
      { label: "Career timeline", href: "/experience", collection: "Experience" },
      { label: "Leadership approach", href: "/about", collection: "About" },
    ],
  },
  {
    id: "builder",
    label: "Builder",
    summary: "Turn ideas into practical tools, experiments, and repeatable systems.",
    evidence: [
      {
        text: "At work: shared discovery, ICP, competitive, and POC resources the Truffle Security sales team adopted.",
        source: "employer",
      },
      {
        text: "On my own: independent builds and research live in Side Quests. They are not employer deployments.",
        source: "independent",
      },
    ],
    links: [
      { label: "Career timeline", href: "/experience", collection: "Experience" },
      { label: "Side Quests", href: "/side-quests", collection: "Side Quests" },
      { label: "Detector Coverage Atlas", href: "/work/detector-coverage-atlas", collection: "Side Quests" },
    ],
  },
];

export function nextPillarIndex(current: number, key: string, count: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
