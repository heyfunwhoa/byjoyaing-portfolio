export const portfolioOsCheckpoints = [
  {
    id: "requirement",
    title: "Requirement",
    body: "The Academy card needs an exercise, one knowledge check, and sources. The long Cursor lesson stays in docs/builder-academy/cursor-agent-workflows.md.",
  },
  {
    id: "plan",
    title: "Plan",
    body: "The accepted trade-off is one record in lib/ai-academy.ts. A new app, or pasting the full Markdown into the card, was rejected.",
  },
  {
    id: "agent",
    title: "Agent",
    body: "Implementation is a bounded edit on a feature branch. The agent stops before merge and deploy.",
  },
  {
    id: "review",
    title: "Diff and CI",
    body: "Local tests are not GitHub CI. The reviewable evidence for the card is pull request #68.",
  },
  {
    id: "linear",
    title: "Linear",
    body: "Pull request #67 merged the Markdown on 2026-10-11 at c635cc4. Pull request #68 registered the card on 2026-10-11 at 451147c. KRU-19 was marked Done only after that catalog change.",
  },
  {
    id: "next",
    title: "Next issue",
    body: "Name one smaller follow-up. A reflection stays in this browser session and is not saved.",
  },
] as const;

export const portfolioOsDecision = {
  question: "Pull request #67 merged the Cursor lesson Markdown. What evidence shows the Academy screen actually lists that lesson?",
  choices: [
    "The Markdown file on main is enough, because publishing the document publishes the card.",
    "Pull request #68 merged the catalog record, and the Builder track renders the card.",
    "The agent chat said Done, so the lesson is live in the Academy.",
  ],
  answer: 1,
  pass: "Pull request #68 merged at 451147c on 2026-10-11 and registered the card. Pull request #67, at c635cc4 the same day, published the lesson source. A merged document is not the Academy screen.",
  fail: "Pull request #67 published the Markdown. An agent saying Done is a claim. The catalog record in pull request #68 is what makes the card visible.",
  sources: [
    { label: "Pull request #67, merged 2026-10-11", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/67" },
    { label: "Pull request #68, merged 2026-10-11", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/68" },
  ],
} as const;

export function portfolioOsFeedback(choice: number): { passed: boolean; message: string } | null {
  if (!Number.isInteger(choice) || choice < 0 || choice >= portfolioOsDecision.choices.length) return null;
  const passed = choice === portfolioOsDecision.answer;
  return { passed, message: passed ? portfolioOsDecision.pass : portfolioOsDecision.fail };
}
