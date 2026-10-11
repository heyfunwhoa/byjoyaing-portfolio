/**
 * Three public projects that already share a field question.
 * Revenue OS studies stay off this diagram. Links are conceptual, not integrations.
 */
export const constellationSlugs = [
  "competitive-intelligence-engine",
  "detector-coverage-atlas",
  "truffle-camp",
] as const;

export const constellationNotes = [
  {
    from: "competitive-intelligence-engine",
    to: "detector-coverage-atlas",
    text: "Competitive Intelligence Engine and Detector Coverage Atlas both answer a coverage question. The atlas is a prototype sample. It does not feed the field briefs.",
  },
  {
    from: "detector-coverage-atlas",
    to: "truffle-camp",
    text: "Detector Coverage Atlas and Truffle Camp both teach a technical distinction. Camp is a written design. It does not run on the atlas.",
  },
  {
    from: "truffle-camp",
    to: "competitive-intelligence-engine",
    text: "Truffle Camp and Competitive Intelligence Engine both support enablement. Camp is not a deployment of the competitive briefs.",
  },
] as const;
