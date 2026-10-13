import { directoryProjects, type DirectoryProject } from "@/lib/project-directory";

export const workAreas = [
  {
    title: "Revenue Strategy & Operations",
    problem: "How a team plans coverage, partner motion, and which accounts are worth the next conversation.",
    href: "/projects?category=revenue#directory",
  },
  {
    title: "Account & Market Intelligence",
    problem: "How sellers separate a real account change from a guess, and keep competitive claims tied to a source.",
    href: "/projects?category=accounts#directory",
  },
  {
    title: "Sales Enablement & Productivity",
    problem: "How a new seller learns the product, and how a release becomes something the field can say.",
    href: "/projects?category=enablement#directory",
  },
  {
    title: "Customer & Product Intelligence",
    problem: "How customer requests stay attached to the account, and how product decisions stay inspectable.",
    href: "/projects?category=customer#directory",
  },
  {
    title: "Technical Systems & AI",
    problem: "How a repeatable workflow keeps evidence visible. Automation and models stay out until the data is trustworthy.",
    href: "/projects?category=technical#directory",
  },
] as const;

export const capabilityViews = [
  {
    slug: "revenue-strategy",
    title: "Revenue Strategy",
    summary:
      "Connect account priorities, territory coverage and partner strategy to a clear commercial plan.",
    professionalHref: "/work#enterprise-sales",
    professionalLabel: "Enterprise selling and account strategy",
    boundary: "The planning simulations use fictional companies and figures. They are independent designs, not employer forecasts.",
    slugs: ["revenue-planning-simulator", "gtm-operating-plan", "revenue-intelligence", "partner-gtm-engine"],
  },
  {
    slug: "gtm-engineering",
    title: "GTM Engineering",
    summary:
      "Turn recurring sales and research friction into workflows people can inspect, review and reuse.",
    professionalHref: "/work#gtm-strategy",
    professionalLabel: "Competitive positioning and field guidance",
    boundary: "The coverage table is a working portfolio sample. The other linked workflows carry their own prototype or design labels.",
    slugs: ["detector-coverage-atlas", "account-intelligence", "competitive-intelligence-engine"],
  },
  {
    slug: "revenue-operations",
    title: "Revenue Operations",
    summary:
      "Make handoffs between sales, product and customer-facing teams easier to understand and follow through.",
    professionalHref: "/experience#career-details",
    professionalLabel: "Cross-functional career contributions",
    boundary: "These examples illustrate operating approaches. No live CRM, forecast or customer system is connected to this portfolio.",
    slugs: ["customer-feedback-intelligence", "product-release-intelligence", "partner-gtm-engine"],
  },
  {
    slug: "ai-product",
    title: "AI Product & Systems",
    summary:
      "Design research and product workflows that preserve sources, uncertainty and human judgment.",
    professionalHref: "/work#gtm-strategy",
    professionalLabel: "Evidence-led field guidance",
    boundary: "AI-assisted steps are proposed where labeled. These portfolio examples do not call an LLM.",
    slugs: ["detector-coverage-atlas", "competitive-intelligence-engine", "account-intelligence"],
  },
  {
    slug: "sales-enablement",
    title: "Sales Enablement",
    summary:
      "Help sellers build product understanding, improve discovery and share useful field knowledge.",
    professionalHref: "/work#people-leadership",
    professionalLabel: "Coaching and onboarding experience",
    boundary: "Professional enablement experience is separate from Truffle Camp, an independent curriculum design that has not been deployed.",
    slugs: ["truffle-camp", "competitive-intelligence-engine", "product-release-intelligence"],
  },
] as const;

export type CapabilityView = (typeof capabilityViews)[number];

export function capabilityBySlug(slug: string) {
  return capabilityViews.find((view) => view.slug === slug);
}

export function projectsForCapability(view: CapabilityView): DirectoryProject[] {
  return view.slugs.flatMap((slug) => {
    const project = directoryProjects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
}
