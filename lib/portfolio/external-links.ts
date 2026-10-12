/** Verified public profiles and official product destinations. No employer/customer links. */
export const socialProfiles = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/kristenaing" },
  { id: "github", label: "GitHub", href: "https://github.com/heyfunwhoa" },
] as const;

/** Only named third-party products; generic concepts intentionally have no outbound link. */
export const officialToolWebsites: Readonly<Record<string, string>> = {
  github: "https://github.com/heyfunwhoa",
  vercel: "https://vercel.com",
  cursor: "https://cursor.com",
  aws: "https://aws.amazon.com",
  linkedin: "https://business.linkedin.com/sales-solutions/sales-navigator",
  salesforce: "https://www.salesforce.com",
  slack: "https://slack.com",
  attio: "https://attio.com",
  outreach: "https://www.outreach.io",
  nooks: "https://www.nooks.ai",
  gong: "https://www.gong.io",
  commonroom: "https://www.commonroom.io",
  clay: "https://www.clay.com",
  notion: "https://www.notion.com",
  chatgpt: "https://chatgpt.com",
  claude: "https://claude.ai",
  firecrawl: "https://www.firecrawl.dev",
  exa: "https://exa.ai",
  resend: "https://resend.com",
  workspace: "https://workspace.google.com",
  aisdk: "https://ai-sdk.dev",
};
