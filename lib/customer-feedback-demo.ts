export const sources = ["Sales", "Customer Success", "Support", "Closed-lost"] as const;
export type FeedbackSource = (typeof sources)[number];

export type FeedbackRecord = {
  id: string;
  account: string;
  owner: string;
  quote: string;
  source: FeedbackSource;
  date: string;
  suggestedTheme: string;
  need: string;
  status: "Needs review" | "Confirmed";
};

export const feedbackRecords: FeedbackRecord[] = [
  {
    id: "harbor-sales",
    account: "Harbor Bank",
    owner: "AE, illustrative",
    quote: "New admins wait days for access to the security console.",
    source: "Sales",
    date: "March 2026",
    suggestedTheme: "Enterprise identity and provisioning",
    need: "Provision console access without a ticket to the vendor.",
    status: "Needs review",
  },
  {
    id: "harbor-cs",
    account: "Harbor Bank",
    owner: "CSM, illustrative",
    quote: "SCIM was promised in the pilot notes and never turned on.",
    source: "Customer Success",
    date: "April 2026",
    suggestedTheme: "Enterprise identity and provisioning",
    need: "Turn directory sync on for the groups they already use.",
    status: "Needs review",
  },
  {
    id: "lumen-support",
    account: "Lumen Health",
    owner: "Support, illustrative",
    quote: "Ticket: SSO works, but role mapping drops contractors.",
    source: "Support",
    date: "May 2026",
    suggestedTheme: "Enterprise identity and provisioning",
    need: "Map contractor groups to a limited role.",
    status: "Needs review",
  },
  {
    id: "northline-lost",
    account: "Northline Freight",
    owner: "AE, illustrative",
    quote: "Lost the expansion. Procurement required SCIM in the security review.",
    source: "Closed-lost",
    date: "February 2026",
    suggestedTheme: "Enterprise identity and provisioning",
    need: "Pass a security review that lists SCIM as mandatory.",
    status: "Needs review",
  },
  {
    id: "keel-sales",
    account: "Keel Cloud",
    owner: "AE, illustrative",
    quote: "They want the weekly digest in Slack, not email.",
    source: "Sales",
    date: "June 2026",
    suggestedTheme: "Notification routing",
    need: "Deliver the same digest where the team already works.",
    status: "Confirmed",
  },
];

export type ThemeStatus = "Not reviewed" | "In review" | "Accepted, not shipped";

export type FeedbackTheme = {
  id: string;
  name: string;
  signalCount: number;
  accountCount: number;
  commercial: string;
  status: ThemeStatus;
  summary: string;
  rationale: string;
  owner: string;
  commitment: string;
};

export const themes: FeedbackTheme[] = [
  {
    id: "identity",
    name: "Enterprise identity and provisioning",
    signalCount: 4,
    accountCount: 3,
    commercial: "One closed-lost note cites SCIM as a review requirement. Not a revenue total.",
    status: "In review",
    summary: "Four notes ask for directory-backed access. They are not the same sentence, and they are not a shipped feature.",
    rationale: "Product has not accepted a commitment. The demo stops at a recommendation a person can confirm.",
    owner: "Unassigned in this demo",
    commitment: "None recorded. A pilot note mentioned SCIM. That sentence is not a ship date.",
  },
  {
    id: "notify",
    name: "Notification routing",
    signalCount: 1,
    accountCount: 1,
    commercial: "No opportunity attached in this sample.",
    status: "Not reviewed",
    summary: "One request to move a digest from email to Slack.",
    rationale: "Volume is too thin to treat as a theme decision.",
    owner: "Unassigned in this demo",
    commitment: "None recorded.",
  },
];

export const themeFilters = ["All", "Signal volume", "Account count", "Commercial context", "Product status"] as const;
export type ThemeFilter = (typeof themeFilters)[number];

export function recordsForTheme(themeName: string) {
  return feedbackRecords.filter((record) => record.suggestedTheme === themeName);
}

export const followUpDrafts: Record<string, string> = {
  identity:
    "Hi [First Name],\n\nYou asked about directory-backed access for Harbor Bank. That request is grouped with similar notes from Lumen Health and Northline Freight. It is not a commitment that SCIM will ship, and a related feature would not close every original request.\n\nI will write again when Product records a decision. Until then, the open item is still open.",
  notify:
    "Hi [First Name],\n\nYou asked to receive the weekly digest in Slack. That note is grouped as notification routing. It is not a commitment that Slack delivery will ship.\n\nI will write again when Product records a decision. Until then, the request stays open.",
};

export const followUpDraft = followUpDrafts.identity;
