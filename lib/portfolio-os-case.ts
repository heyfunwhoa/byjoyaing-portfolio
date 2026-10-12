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
    body: "Pull request #67 merged the Markdown at c635cc4 on 2026-10-11. Pull request #68 merged the catalog record at 451147c at 18:40 UTC the same day, and Linear closed KRU-19 seconds later. A closed issue records status. It does not check the live site.",
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
    "Pull request #68 merged the catalog record, and someone then opened the deployed Builder track and found the card.",
    "The agent chat said Done, so the lesson is live in the Academy.",
  ],
  answer: 1,
  pass: "Pull request #68, merged at 451147c on 2026-10-11, added the catalog record that creates the card. Only a check of the deployed Academy shows that visitors can see it. Pull request #67, merged at c635cc4 the same day, published the lesson source, not the card.",
  fail: "Pull request #67 published the Markdown, not the card. An agent saying Done is a claim. You need the catalog record from pull request #68 and a check of the deployed Academy.",
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
