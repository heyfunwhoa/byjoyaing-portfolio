/** Goal-based sequences share stable lesson IDs; they do not gate access. */
export const learningPaths = [
  {
    "id": "foundations",
    "title": "Start with AI basics",
    "prerequisite": "No experience needed",
    "outcome": "Explain AI, protect inputs, prompt clearly and check claims.",
    "slugs": [
      "what-is-ai",
      "privacy",
      "prompting",
      "verification",
      "evolution",
      "llms-models-inference-gateways"
    ]
  },
  {
    "id": "delivery",
    "title": "Build and release safely",
    "prerequisite": "Use the linked programming and Git references when code is unfamiliar",
    "outcome": "Read project files, plan a release, manage dependencies and measure safely.",
    "slugs": [
      "reading-code-and-yaml",
      "idea-to-verified-release",
      "cursor-workflows",
      "package-registries",
      "privacy",
      "measure-product-use-safely"
    ]
  },
  {
    "id": "frontend",
    "title": "Understand the frontend",
    "prerequisite": "No coding prerequisite",
    "outcome": "Connect accessible interfaces, reusable components, visual checks and content publishing.",
    "slugs": [
      "frontend-building-blocks",
      "storybook-visual-regression",
      "cms-fundamentals"
    ]
  },
  {
    "id": "systems",
    "title": "Connect systems and recover failures",
    "prerequisite": "Begin with file reading; no AI prerequisite",
    "outcome": "Trace requests, data, integration costs and bounded background-job recovery.",
    "slugs": [
      "reading-code-and-yaml",
      "privacy",
      "mcp-vs-rest-api",
      "database-branching-recovery",
      "integration-registry-finops",
      "background-job-recovery"
    ]
  },
  {
    "id": "security",
    "title": "Protect identity and data",
    "prerequisite": "Includes privacy, API and release preparation",
    "outcome": "Explain authorization, release gates and safe import, research and export boundaries.",
    "slugs": [
      "privacy",
      "mcp-vs-rest-api",
      "better-auth-gtm-workspace",
      "idea-to-verified-release",
      "security-hardening-release-gates",
      "verification",
      "integration-registry-finops",
      "secure-account-import-research"
    ]
  },
  {
    "id": "agents",
    "title": "Build toward skills and agents",
    "prerequisite": "Includes AI and evaluation foundations",
    "outcome": "Move from prompting to evaluated reusable skills and scoped agent systems.",
    "slugs": [
      "what-is-ai",
      "privacy",
      "prompting",
      "verification",
      "llms-models-inference-gateways",
      "evaluate-ai-models",
      "skills",
      "fde-ai-agent-engineering"
    ]
  },
  {
    "id": "research",
    "title": "Build a research workflow",
    "prerequisite": "Includes AI and prompting basics",
    "outcome": "Turn public evidence into a research brief and a justified product request.",
    "slugs": [
      "what-is-ai",
      "privacy",
      "prompting",
      "verification",
      "gtm-research",
      "evidence-based-product-request"
    ]
  },
  {
    "id": "verification",
    "title": "Verify an AI output",
    "prerequisite": "Start with a claim; model-comparison preparation follows",
    "outcome": "Check a claim, learn model-comparison prerequisites and document a justified decision.",
    "slugs": [
      "verification",
      "what-is-ai",
      "privacy",
      "prompting",
      "llms-models-inference-gateways",
      "evaluate-ai-models",
      "evidence-based-product-request"
    ]
  },
  {
    "id": "enterprise-evaluation",
    "title": "Enterprise evaluation and buying process",
    "prerequisite": "No coding prerequisite; privacy and commercial preparation are included",
    "outcome": "Build a fictional POC, mutual action plan, executive readout and buying-readiness packet.",
    "slugs": [
      "sales-frameworks",
      "evaluation-discovery",
      "evaluation-value",
      "evaluation-deployment",
      "evaluation-poc",
      "evaluation-map",
      "privacy",
      "enterprise-contracts-sales-cycle",
      "evaluation-procurement",
      "security-assessments-buyer-size",
      "evaluation-security",
      "evaluation-negotiation",
      "evaluation-readout",
      "evaluation-handoff"
    ]
  }
] as const;

/** First appearance gives the full catalog a beginner-first browsing order. */
export const lessonOrder: readonly string[] = [...new Set(learningPaths.flatMap((path) => [...path.slugs]))];
