/** Recommendations only. Availability describes this portfolio, not other repositories. */
export const componentApps = [
  "Portfolio",
  "Account Signal Engine",
  "Security Market Map",
  "Detector Coverage Atlas",
  "Truffle Camp",
  "Interview dashboard",
  "GTM Revenue OS",
] as const;
export type ComponentApp = (typeof componentApps)[number];
export type ComponentOption = {
  id: string;
  name: string;
  purpose: string;
  availability: "Available here" | "Candidate";
  parts: string[];
  apps: readonly ComponentApp[];
  source: string;
  adoption: string;
};
export const componentOptions: ComponentOption[] = [
  {
    id: "identity",
    name: "Identity & ownership",
    purpose: "Recognize a person, author, stakeholder, or owner.",
    availability: "Available here",
    parts: ["Avatar", "Avatar group", "Tooltip"],
    apps: [
      "Portfolio",
      "Account Signal Engine",
      "Interview dashboard",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/avatar",
    adoption:
      "Keep the existing Radix avatar and fallback. Use named owner rows when identity matters; portraits are optional.",
  },
  {
    id: "summaries",
    name: "Summary & discovery",
    purpose: "Show the key idea before a reader opens detail.",
    availability: "Available here",
    parts: ["Card", "Bento grid", "Carousel"],
    apps: [
      "Portfolio",
      "Security Market Map",
      "Truffle Camp",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/card",
    adoption:
      "Start with cards. Use a carousel only for a short collection, with controls and an alternative path to all items.",
  },
  {
    id: "disclosure",
    name: "Organize long content",
    purpose: "Group information without creating an endless vertical list.",
    availability: "Available here",
    parts: ["Tabs", "Accordion"],
    apps: componentApps,
    source: "https://ui.shadcn.com/docs/components/tabs",
    adoption:
      "Tabs switch peer views. Accordions reveal optional detail. Leave essential summaries visible.",
  },
  {
    id: "context",
    name: "Inspect in context",
    purpose: "Open evidence or a short task near the originating item.",
    availability: "Available here",
    parts: ["Sheet", "Dialog", "Hover card"],
    apps: [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/sheet",
    adoption:
      "Use a sheet for evidence, a dialog for a bounded action, and hover content only as supplementary information.",
  },
  {
    id: "data",
    name: "Compare & triage data",
    purpose: "Sort, filter, select, and compare many records.",
    availability: "Candidate",
    parts: ["Data table", "Pagination", "Column filters"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/data-table",
    adoption:
      "Pull into the data app when needed. Define row identifiers, server permissions, query behavior, and mobile summaries first.",
  },
  {
    id: "search",
    name: "Find & choose",
    purpose: "Search a growing collection or select a specific entity.",
    availability: "Candidate",
    parts: ["Command", "Combobox", "Popover"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/command",
    adoption:
      "Use command search for navigation and combobox for selection. Keyboard access and a useful empty state are required.",
  },
  {
    id: "schedule",
    name: "Plan & schedule",
    purpose: "Choose dates and review upcoming work.",
    availability: "Candidate",
    parts: ["Calendar", "Date picker"],
    apps: ["Interview dashboard", "GTM Revenue OS", "Account Signal Engine"],
    source: "https://ui.shadcn.com/docs/components/calendar",
    adoption:
      "A date picker is a UI control, not calendar synchronization. Define timezone and all-day behavior before integration.",
  },
  {
    id: "feedback",
    name: "Communicate system state",
    purpose: "Explain loading, empty results, success, and failures.",
    availability: "Candidate",
    parts: ["Skeleton", "Empty", "Alert", "Toast", "Progress"],
    apps: componentApps,
    source: "https://ui.shadcn.com/docs/components/empty",
    adoption:
      "Add alongside a real asynchronous workflow. Keep errors inline and actionable; toast messages supplement durable feedback.",
  },
  {
    id: "workspace",
    name: "Workspace navigation",
    purpose: "Support repeated work across multiple views.",
    availability: "Candidate",
    parts: ["Sidebar", "Breadcrumb", "Resizable panels"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/sidebar",
    adoption:
      "Use application navigation in workspaces. The portfolio’s editorial header and existing breadcrumb remain its default.",
  },
  {
    id: "measurement",
    name: "Explain change over time",
    purpose: "Make numeric trends and comparisons easier to understand.",
    availability: "Candidate",
    parts: ["Chart", "Metric summary", "Accessible data table"],
    apps: [
      "Account Signal Engine",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/chart",
    adoption:
      "Use verified data, units, source, and date. Supply a text summary or table; a chart is not a relationship map.",
  },
];
export function optionsForApp(app: ComponentApp | "All") {
  return componentOptions.filter(
    (option) => app === "All" || option.apps.includes(app),
  );
}
