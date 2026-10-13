export const learningPaths = [
  {
    id: "foundations",
    title: "Start with AI basics",
    prerequisite: "No experience needed",
    outcome:
      "Understand AI, protect your inputs, write a clear prompt and check its claims.",
    slugs: ["what-is-ai", "privacy", "prompting", "verification"],
  },
  {
    id: "delivery",
    title: "Build and release safely",
    prerequisite:
      "Start with the linked programming and Git references if you are new to code",
    outcome:
      "Connect delivery planning, Cursor, dependencies, integrations and cost controls.",
    slugs: [
      "reading-code-and-yaml",
      "idea-to-verified-release",
      "cursor-workflows",
      "package-registries",
      "mcp-vs-rest-api",
      "integration-registry-finops",
    ],
  },
  {
    id: "frontend",
    title: "Understand the frontend",
    prerequisite: "No coding prerequisite",
    outcome:
      "Explain how structure, components, styling and accessibility fit together.",
    slugs: [
      "frontend-building-blocks",
      "storybook-visual-regression",
      "idea-to-verified-release",
    ],
  },
  {
    id: "research",
    title: "Build a research workflow",
    prerequisite: "Start with AI and prompting basics",
    outcome:
      "Frame a GTM research task, protect sensitive inputs and verify its output.",
    slugs: [
      "what-is-ai",
      "privacy",
      "prompting",
      "verification",
      "gtm-research",
    ],
  },
  {
    id: "verification",
    title: "Verify an AI output",
    prerequisite: "A question or output you want to check",
    outcome:
      "Separate supported claims from assumptions and compare models with evidence.",
    slugs: [
      "verification",
      "evaluate-ai-models",
      "evidence-based-product-request",
    ],
  },
] as const;

