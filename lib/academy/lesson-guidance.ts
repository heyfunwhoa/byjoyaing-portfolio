/** Navigation metadata only; lesson bodies remain in ai-academy.ts. */
export type LearningResource = { label: string; href: string };
export type Availability = "available" | "partial" | "planned";
export const availabilityLabels: Record<Availability, string> = {
  available: "Available",
  partial: "Partly available",
  planned: "Planned",
};
export type LessonGuidance = {
  availability: Availability;
  format: "short-lesson";
  prerequisites: string[];
  preparation?: LearningResource;
  practice?: LearningResource;
  guide?: LearningResource;
};
const guide = (
  file: string,
  label = "Read the full guide",
): LearningResource => ({
  label,
  href: `https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/${file}.md`,
});

const availableLesson = {
  availability: "available",
  format: "short-lesson",
} as const;

export const lessonGuidance = {
  "fde-ai-agent-engineering": {
    ...availableLesson,
    prerequisites: [],
    guide: guide("fde-ai-agent-engineering", "Read the AI agent engineering companion"),
  },
  "database-branching-recovery": {
    ...availableLesson,
    prerequisites: ["reading-code-and-yaml"],
    guide: guide("databases-branching-recovery-and-selection", "Read the database choices and recovery guide"),
  },
  "reading-code-and-yaml": {
    ...availableLesson,
    prerequisites: [],
    guide: guide("reading-code-and-yaml", "Read the code and YAML beginner guide"),
  },
  "sales-frameworks": {
    ...availableLesson,
    prerequisites: [],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/sales-frameworks.md",
    },
  },
  "evaluation-discovery": {
    ...availableLesson,
    prerequisites: ["sales-frameworks"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-discovery.md",
    },
  },
  "evaluation-value": {
    ...availableLesson,
    prerequisites: ["evaluation-discovery"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-value.md",
    },
  },
  "evaluation-deployment": {
    ...availableLesson,
    prerequisites: ["evaluation-discovery"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-deployment.md",
    },
  },
  "evaluation-poc": {
    ...availableLesson,
    prerequisites: ["evaluation-value", "evaluation-deployment"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-poc.md",
    },
  },
  "evaluation-map": {
    ...availableLesson,
    prerequisites: ["evaluation-poc"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-map.md",
    },
  },
  "evaluation-procurement": {
    ...availableLesson,
    prerequisites: ["evaluation-map", "enterprise-contracts-sales-cycle"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-procurement.md",
    },
  },
  "evaluation-security": {
    ...availableLesson,
    prerequisites: [
      "evaluation-deployment",
      "evaluation-map",
      "security-assessments-buyer-size",
    ],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-security.md",
    },
  },
  "evaluation-negotiation": {
    ...availableLesson,
    prerequisites: ["evaluation-value", "evaluation-procurement"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-negotiation.md",
    },
  },
  "evaluation-readout": {
    ...availableLesson,
    prerequisites: [
      "evaluation-poc",
      "evaluation-procurement",
      "evaluation-security",
    ],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-readout.md",
    },
  },
  "evaluation-handoff": {
    ...availableLesson,
    prerequisites: ["evaluation-readout", "evaluation-negotiation"],
    guide: {
      label: "Read the lesson and toolkit",
      href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-handoff.md",
    },
  },

  "cms-fundamentals": {
    ...availableLesson,
    prerequisites: ["frontend-building-blocks"],
    guide: guide("cms-fundamentals", "Read the six-chapter CMS fundamentals guide"),
  },
  "llms-models-inference-gateways": {
    ...availableLesson,
    prerequisites: ["what-is-ai", "privacy"],
    guide: guide("llms-models-inference-gateways"),
  },
  "what-is-ai": { ...availableLesson, prerequisites: [] },
  evolution: { ...availableLesson, prerequisites: ["what-is-ai"] },
  privacy: { ...availableLesson, prerequisites: [] },
  prompting: {
    ...availableLesson,
    prerequisites: ["what-is-ai", "privacy"],
    practice: {
      label: "Open the Prompting Journey",
      href: "/ai-academy/journeys/prompting",
    },
  },
  verification: {
    ...availableLesson,
    prerequisites: [],
    practice: {
      label: "Open the Source Verification Journey",
      href: "/ai-academy/journeys/source-verification",
    },
  },
  "gtm-research": {
    ...availableLesson,
    prerequisites: ["prompting", "privacy", "verification"],
    practice: {
      label: "Try the Research Pipeline Simulator",
      href: "/ai-academy/playground/research-pipeline",
    },
  },
  skills: {
    ...availableLesson,
    prerequisites: ["prompting", "verification"],
    practice: {
      label: "Open the Skill Builder",
      href: "/ai-academy/playground/skill-builder",
    },
  },
  "frontend-building-blocks": {
    ...availableLesson,
    prerequisites: [],
    preparation: {
      label: "Optional: Programming Foundations",
      href: "/ai-academy/programming",
    },
    practice: guide("editorial-project-card", "Practice with a project card"),
  },
  "storybook-visual-regression": {
    ...availableLesson,
    prerequisites: ["frontend-building-blocks"],
    preparation: {
      label: "Git Workflow Essentials",
      href: "/ai-academy/version-control",
    },
  },
  "idea-to-verified-release": {
    ...availableLesson,
    prerequisites: [],
    preparation: {
      label: "Optional: Git Workflow Essentials",
      href: "/ai-academy/version-control",
    },
  },
  "cursor-workflows": {
    ...availableLesson,
    prerequisites: ["idea-to-verified-release"],
    guide: guide("cursor-agent-workflows"),
  },
  "package-registries": {
    ...availableLesson,
    prerequisites: [],
    preparation: {
      label: "Programming Foundations",
      href: "/ai-academy/programming",
    },
    practice: {
      label: "Practice diagnosing lockfile drift",
      href: "/ai-academy/dependencies/lockfiles",
    },
  },
  "mcp-vs-rest-api": {
    ...availableLesson,
    prerequisites: ["privacy"],
    practice: {
      label: "Start or resume Follow one click",
      href: "/ai-academy/journeys/follow-one-click",
    },
    preparation: {
      label: "HTTP overview — public reference",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    },
  },
  "integration-registry-finops": {
    ...availableLesson,
    prerequisites: ["mcp-vs-rest-api"],
    practice: guide(
      "finops-and-integration-registry",
      "Try the five-account cost exercise",
    ),
  },
  "better-auth-gtm-workspace": {
    ...availableLesson,
    prerequisites: ["privacy", "mcp-vs-rest-api"],
    preparation: guide(
      "authentication-vs-authorization",
      "Authentication vs authorization",
    ),
    practice: {
      label: "Try the Identity Journey Lab",
      href: "/builder-academy/identity-journey",
    },
    guide: guide("better-auth-gtm-workspace"),
  },
  "security-hardening-release-gates": {
    ...availableLesson,
    prerequisites: ["idea-to-verified-release", "better-auth-gtm-workspace"],
  },
  "secure-account-import-research": {
    ...availableLesson,
    prerequisites: [
      "better-auth-gtm-workspace",
      "integration-registry-finops",
      "verification",
    ],
  },
  "evaluate-ai-models": {
    ...availableLesson,
    prerequisites: ["prompting", "privacy", "verification", "llms-models-inference-gateways"],
  },
  "measure-product-use-safely": {
    ...availableLesson,
    prerequisites: ["privacy", "idea-to-verified-release"],
    guide: guide("measure-product-usage-safely"),
  },
  "evidence-based-product-request": {
    ...availableLesson,
    prerequisites: ["verification"],
    guide: guide("evidence-based-product-requests"),
  },
  "enterprise-contracts-sales-cycle": {
    ...availableLesson,
    prerequisites: ["privacy"],
  },
  "security-assessments-buyer-size": {
    ...availableLesson,
    prerequisites: ["enterprise-contracts-sales-cycle"],
  },
} satisfies Record<string, LessonGuidance>;

/** Same stable slugs as the content catalog, checked for complete coverage in tests. */
export type LessonId = keyof typeof lessonGuidance;
export function getLessonGuidance(slug: string): LessonGuidance | undefined {
  return Object.hasOwn(lessonGuidance, slug)
    ? lessonGuidance[slug as LessonId]
    : undefined;
}

export const academyResources = [
  {
    id: "follow-one-click",
    title: "Follow one click",
    href: "/ai-academy/journeys/follow-one-click",
    availability: "available",
    format: "guided simulation",
    detail:
      "Trace an account request, diagnose denied access, and resume practice on this device.",
  },
  {
    id: "programming",
    title: "Programming Foundations",
    href: "/ai-academy/programming",
    availability: "partial",
    format: "guided tutorials",
    detail:
      "Two guided tutorials and a technology explorer. Eight modules are planned.",
  },
  {
    id: "version-control",
    title: "Git Workflow Essentials",
    href: "/ai-academy/version-control",
    availability: "available",
    format: "simulation",
    detail:
      "Practice branches, merge choices and failing checks with fictional scenarios.",
  },
  {
    id: "playground",
    title: "Practice playground",
    href: "/ai-academy/playground",
    availability: "available",
    format: "simulation",
    detail: "Source Detective, Prompt Studio and the Model & Tool Selector.",
  },
  {
    id: "identity-journey",
    title: "Identity Journey Lab",
    href: "/builder-academy/identity-journey",
    availability: "available",
    format: "simulation",
    detail: "Compare human, service, pipeline and agent access.",
  },
  {
    id: "credential-risk",
    title: "Credential to Identity Risk",
    href: "/builder-academy/credential-risk",
    availability: "available",
    format: "simulation",
    detail: "Explore fictional credential evidence and remediation decisions.",
  },
  {
    id: "build-rate-limits",
    title: "Build Rate Limits & CI/CD",
    href: "/ai-academy/devops/build-rate-limits",
    availability: "available",
    format: "guide",
    detail: "Distinguish deployment limits from failing application checks.",
  },
  {
    id: "lockfiles",
    title: "Lockfiles & Reproducible Builds",
    href: "/ai-academy/dependencies/lockfiles",
    availability: "available",
    format: "guide",
    detail: "Read a dependency mismatch and choose a safe repair.",
  },
  {
    id: "systems-roadmap",
    title: "Connected Systems",
    href: "/ai-academy/systems",
    availability: "planned",
    format: "roadmap",
    detail:
      "Thirteen topic outlines and seven future lab ideas. These are not guided courses or working labs.",
  },
] as const satisfies readonly {
  id: string;
  title: string;
  href: string;
  availability: Availability;
  format: string;
  detail: string;
}[];
