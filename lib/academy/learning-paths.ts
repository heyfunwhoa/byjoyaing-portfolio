export const learningPaths = [
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
      "prompting",
      "privacy",
      "gtm-research",
      "verification",
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
