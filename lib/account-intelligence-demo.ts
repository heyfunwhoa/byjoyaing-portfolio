export const signalCategories = [
  "Funding",
  "Leadership change",
  "Hiring surge",
  "Technology change",
  "News mention",
] as const;

export type SignalCategory = (typeof signalCategories)[number];

export type DemoAccount = {
  id: string;
  name: string;
  industry: string;
};

export type DemoSignal = {
  id: string;
  accountId: string;
  category: SignalCategory;
  title: string;
  observed: string;
  hypothesis: string;
  sourceLabel: string;
  date: string;
  nextStep: string;
  angle: string;
};

export const demoAccounts: DemoAccount[] = [
  { id: "acme", name: "Acme Corp", industry: "Fintech" },
  { id: "northstar", name: "Northstar", industry: "Software" },
  { id: "meridian", name: "Meridian", industry: "Healthcare" },
];

export const demoSignals: DemoSignal[] = [
  {
    id: "acme-leader",
    accountId: "acme",
    category: "Leadership change",
    title: "New VP of Application Security appointed",
    observed: "Acme Corp appointed a new VP of Application Security.",
    hypothesis:
      "The new leader may review existing application-security processes and tools. That is a hypothesis, not a confirmed buying cycle.",
    sourceLabel: "Illustrative company announcement. Not a real citation.",
    date: "September 2026",
    nextStep: "Read the announcement, then ask what the leader has said publicly about priorities.",
    angle:
      "A new AppSec leader may be evaluating how the organization finds and remediates exposed credentials.",
  },
  {
    id: "acme-hiring",
    accountId: "acme",
    category: "Hiring surge",
    title: "Several platform security roles opened",
    observed: "Acme Corp listed multiple platform-security openings in the same month.",
    hypothesis:
      "Hiring can mean a new program. It can also mean backfill. Do not treat the job posts as a budget.",
    sourceLabel: "Illustrative job-board snapshot. Not a real citation.",
    date: "August 2026",
    nextStep: "Ask who owns the pipeline where long-lived credentials enter CI.",
    angle: "New platform-security seats often inherit a backlog of secrets already in CI.",
  },
  {
    id: "northstar-funding",
    accountId: "northstar",
    category: "Funding",
    title: "Series C announced",
    observed: "Northstar announced a Series C.",
    hypothesis:
      "Growth funding sometimes expands the engineering surface. It does not by itself say they will buy.",
    sourceLabel: "Illustrative press note. Not a real citation.",
    date: "July 2026",
    nextStep: "Confirm whether security engineering is one of the teams they said they will hire.",
    angle: "A funding announcement is context for timing, not proof of a project.",
  },
  {
    id: "meridian-tech",
    accountId: "meridian",
    category: "Technology change",
    title: "Public note about moving CI to a new platform",
    observed: "Meridian described a CI platform migration in an engineering post.",
    hypothesis:
      "Migrations are when old tokens get copied into new pipelines. That is a reason to ask, not a finding.",
    sourceLabel: "Illustrative engineering post. Not a real citation.",
    date: "June 2026",
    nextStep: "Ask which credential types they verify today and which are still not evaluated.",
    angle: "A CI migration is a concrete moment to talk about secrets that move with the pipeline.",
  },
];

export const draftVariants = [
  {
    subject: "Application security priorities at Acme",
    body: "Hi [First Name],\n\nI saw the announcement about the new VP of Application Security at Acme. I am not assuming that means a tool review.\n\nIf you are mapping how the team finds exposed credentials versus what is still not evaluated, I can share the questions we use in that conversation.\n\nWorth a short look?",
  },
  {
    subject: "One question after the AppSec announcement",
    body: "Hi [First Name],\n\nThe Acme announcement names a new VP of Application Security. The only fact I am using is that appointment.\n\nAre you the right person to ask how the team separates a detected credential from one that has been verified?\n\nHappy to send the question set either way.",
  },
] as const;

export function signalsForAccount(accountId: string) {
  return demoSignals.filter((signal) => signal.accountId === accountId);
}

export function accountById(accountId: string) {
  const account = demoAccounts.find((item) => item.id === accountId);
  if (!account) {
    throw new Error(`Missing demo account ${accountId}`);
  }
  return account;
}
