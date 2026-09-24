import { directoryProjects, type DirectoryProject } from "@/lib/project-directory";

export const workAreas = [
  {
    title: "Revenue Strategy & Operations",
    problem: "How a team plans coverage, partner motion, and which accounts are worth the next conversation.",
    href: "/projects#directory",
  },
  {
    title: "Account & Market Intelligence",
    problem: "How sellers separate a real account change from a guess, and keep competitive claims tied to a source.",
    href: "/projects#directory",
  },
  {
    title: "Sales Enablement & Productivity",
    problem: "How a new seller learns the product, and how a release becomes something the field can say.",
    href: "/projects#directory",
  },
  {
    title: "Customer & Product Intelligence",
    problem: "How customer requests stay attached to the account, and how product decisions stay inspectable.",
    href: "/projects#directory",
  },
  {
    title: "Technical Systems & AI",
    problem: "How a repeatable workflow keeps evidence visible. Automation and models stay out until the data is trustworthy.",
    href: "/projects#directory",
  },
] as const;

export const capabilityViews = [
  {
    slug: "revenue-strategy",
    title: "Revenue Strategy",
    summary:
      "Territory, partner, and campaign decisions I have made in the field, and the operating models I have designed around them. A forecasting simulator is not in this portfolio.",
    slugs: ["partner-gtm-engine", "gtm-campaign-lab", "account-intelligence"],
  },
  {
    slug: "gtm-engineering",
    title: "GTM Engineering",
    summary:
      "Hands-on work that turns a field workflow into something a teammate can inspect. The only running sample in this repository is the coverage table.",
    slugs: ["detector-coverage-atlas", "account-intelligence", "competitive-intelligence-engine"],
  },
  {
    slug: "revenue-operations",
    title: "Revenue Operations",
    summary:
      "Handoffs between sales, product, partners, and the field. No CRM, forecast model, or POC tracker is connected here.",
    slugs: ["customer-feedback-intelligence", "product-release-intelligence", "partner-gtm-engine"],
  },
  {
    slug: "ai-product",
    title: "AI Product & Systems",
    summary:
      "Where a model would help, and where it would hide the judgment. This repository does not call an LLM. Planned tools stay labeled planned.",
    slugs: ["detector-coverage-atlas", "competitive-intelligence-engine", "account-intelligence"],
  },
  {
    slug: "sales-enablement",
    title: "Sales Enablement",
    summary:
      "Frameworks, briefs, and training other people could use. Truffle Camp is the curriculum design. It is not a course that has been deployed.",
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
