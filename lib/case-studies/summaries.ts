import account from "../../content/work/studies/account-intelligence.json" with { type: "json" };
import competitive from "../../content/work/studies/competitive-intelligence-engine.json" with { type: "json" };
import feedback from "../../content/work/studies/customer-feedback-intelligence.json" with { type: "json" };
import atlas from "../../content/work/studies/detector-coverage-atlas.json" with { type: "json" };
import campaign from "../../content/work/studies/gtm-campaign-lab.json" with { type: "json" };
import operating from "../../content/work/studies/gtm-operating-plan.json" with { type: "json" };
import partner from "../../content/work/studies/partner-gtm-engine.json" with { type: "json" };
import prioritization from "../../content/work/studies/product-prioritization-simulator.json" with { type: "json" };
import release from "../../content/work/studies/product-release-intelligence.json" with { type: "json" };
import intelligence from "../../content/work/studies/revenue-intelligence.json" with { type: "json" };
import planning from "../../content/work/studies/revenue-planning-simulator.json" with { type: "json" };
import signal from "../../content/work/studies/security-signal-intelligence.json" with { type: "json" };
import camp from "../../content/work/studies/truffle-camp.json" with { type: "json" };

/** Directory order. The filename is the slug. Kind, route, and status stay in code. */
export const caseStudySlugs = [
  "detector-coverage-atlas",
  "competitive-intelligence-engine",
  "account-intelligence",
  "customer-feedback-intelligence",
  "product-release-intelligence",
  "truffle-camp",
  "partner-gtm-engine",
  "product-prioritization-simulator",
  "revenue-planning-simulator",
  "revenue-intelligence",
  "gtm-operating-plan",
  "gtm-campaign-lab",
  "security-signal-intelligence",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

const requiredKeys = [
  "summary",
  "owner",
  "reviewer",
  "contentVersion",
  "reviewDue",
  "classification",
  "publicationStatus",
] as const;

const files: Record<CaseStudySlug, unknown> = {
  "detector-coverage-atlas": atlas,
  "competitive-intelligence-engine": competitive,
  "account-intelligence": account,
  "customer-feedback-intelligence": feedback,
  "product-release-intelligence": release,
  "truffle-camp": camp,
  "partner-gtm-engine": partner,
  "product-prioritization-simulator": prioritization,
  "revenue-planning-simulator": planning,
  "revenue-intelligence": intelligence,
  "gtm-operating-plan": operating,
  "gtm-campaign-lab": campaign,
  "security-signal-intelligence": signal,
};

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(): never {
  throw new Error(
    "Invalid case study summary: check the slug, summary, and public metadata",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Build-time JSON reader. Unknown keys cannot own routes, kind, or status. */
export function readCaseStudySummary(
  slug: CaseStudySlug,
  input: unknown,
): string {
  if (!caseStudySlugs.includes(slug) || !isRecord(input)) invalid();
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...requiredKeys, ...optional]);
  if (
    requiredKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid();
  if (!nonempty(input.summary) || !nonempty(input.owner) || !nonempty(input.reviewer))
    invalid();
  if (
    !Number.isInteger(input.contentVersion) ||
    Number(input.contentVersion) < 1 ||
    !["public", "synthetic"].includes(String(input.classification)) ||
    !["draft", "review", "pilot", "published", "retired"].includes(
      String(input.publicationStatus),
    ) ||
    !date(input.reviewDue) ||
    (input.lastReviewed !== undefined && !date(input.lastReviewed))
  )
    invalid();
  return input.summary;
}

export const caseStudySummaries: Record<CaseStudySlug, string> = Object.fromEntries(
  caseStudySlugs.map((slug) => [slug, readCaseStudySummary(slug, files[slug])]),
) as Record<CaseStudySlug, string>;
