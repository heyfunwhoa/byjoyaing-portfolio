export type GuidedExercise = {
  id: string;
  title: string;
  userTask: string;
  decision: string;
  choices: readonly { id: string; label: string; tradeoff: string }[];
  suggested: string;
  why: string;
  test: string;
  project: string;
  destination: string;
  followUp: string;
};

/** Reuse existing patterns. Exercises are local practice, not graded or persisted. */
export const guidedExercises: readonly GuidedExercise[] = [
  {
    id: "search-compare",
    title: "Find and compare accounts",
    userTask: "An AE needs to compare the signal counts and review dates of twelve accounts.",
    decision: "Which starting presentation makes exact comparisons easiest?",
    choices: [
      { id: "cards", label: "Individual cards", tradeoff: "Good for context on one account, but harder to compare aligned fields." },
      { id: "table", label: "Comparison table", tradeoff: "Aligns exact counts and dates across accounts; needs a mobile overflow strategy." },
    ],
    suggested: "table",
    why: "A table better supports exact cross-record comparisons. Use search and filters to narrow the set, and provide a detail view for deeper context.",
    test: "Try filtering to one account, then compare two exact signal counts in Cards and Table. Can you still access the data on a narrow screen?",
    project: "Account Signal Engine / GTM Revenue OS",
    destination: "guided-data-display",
    followUp: "The better pattern changes if the task becomes reading one account narrative rather than comparing many.",
  },
  {
    id: "choice-controls",
    title: "Choose form controls",
    userTask: "A campaign creator must choose one owner and any combination of outreach channels.",
    decision: "Which controls express the two choice rules clearly?",
    choices: [
      { id: "radio-checkbox", label: "Radio group for owner; checkboxes for channels", tradeoff: "Makes exclusive vs independent selection visible." },
      { id: "two-selects", label: "Two single-select menus", tradeoff: "Compact, but the channel choice cannot express multiple selections." },
    ],
    suggested: "radio-checkbox",
    why: "Radio buttons model one-of-many; checkboxes model any number. A searchable combobox is useful when an owner list is long, not merely because it looks modern.",
    test: "Select two channels and one owner. Verify that choosing a different owner clears the previous owner but not the channels.",
    project: "GTM Revenue OS / Channel Territory Mapping",
    destination: "guided-form-controls",
    followUp: "In a real app, required-field validation, permissions and server-side confirmation remain separate from these controls.",
  },
  {
    id: "metric-meaning",
    title: "Interpret a dashboard",
    userTask: "A sales leader wants to identify the highest month and quote the exact February count.",
    decision: "Which presentation serves both questions?",
    choices: [
      { id: "chart-table", label: "Labeled chart with exact-value table", tradeoff: "Fast comparisons plus auditable numbers; uses more space." },
      { id: "kpi-only", label: "One quarterly KPI", tradeoff: "Summarizes total activity but hides monthly variation." },
    ],
    suggested: "chart-table",
    why: "The chart shows relative magnitude, while the table gives exact values. Both should use the same filter scope, units and source rows.",
    test: "Switch between teams and metrics. Verify the chart, table and KPI total stay consistent. Describe what the data does not prove.",
    project: "GTM Revenue OS / Account Signal Engine",
    destination: "guided-dashboard",
    followUp: "Counts do not prove conversion, revenue, effectiveness or intent without appropriate denominators and verified definitions.",
  },
  {
    id: "inspect-evidence",
    title: "Inspect evidence and uncertainty",
    userTask: "An analyst needs to review a long account source without losing their place in a list.",
    decision: "Which detail pattern most closely preserves context?",
    choices: [
      { id: "sheet", label: "Contextual side sheet", tradeoff: "Supports more detail while preserving source context; takes screen space and requires focus handling." },
      { id: "modal", label: "Focused modal dialog", tradeoff: "Better for brief decisions; interrupts browsing and can obscure the list." },
    ],
    suggested: "sheet",
    why: "A sheet is often appropriate for lengthy inspection. Short details may work inline. A modal is better for a bounded, consequential decision.",
    test: "Open the side sheet, navigate with Tab, press Escape, and verify focus returns. Distinguish observation, inference and unknown.",
    project: "Account Signal Engine / Security Market Map",
    destination: "guided-detail-patterns",
    followUp: "Neither sheet nor dialog verifies a source or enforces permissions. The application must handle those separately.",
  },
  {
    id: "account-handoff",
    title: "Complete an account handoff",
    userTask: "An AE wants a reviewed list of accounts and the exact fields a teammate will receive.",
    decision: "Which workflow gives the clearest handoff?",
    choices: [
      { id: "review-preview", label: "Shortlist, then review the export preview", tradeoff: "Adds a review step but lets the seller verify selected rows and fields." },
      { id: "instant-export", label: "Export directly from search results", tradeoff: "Fewer steps but risks sharing unintended or unsupported records." },
    ],
    suggested: "review-preview",
    why: "Separating discovery, evidence inspection, selection and review makes the handoff understandable and easier to correct.",
    test: "Shortlist two fictional records, inspect the preview, remove one and verify the preview updates. Identify the missing requirements for a real CRM/Excel handoff.",
    project: "Channel Territory Mapping / GTM Revenue OS",
    destination: "application-workbench",
    followUp: "This learning example intentionally does not export a file or connect to company data.",
  },
];

export function isGuidedExercise(id: string) {
  return guidedExercises.some((exercise) => exercise.id === id);
}
