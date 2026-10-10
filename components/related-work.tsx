import { ProjectStatusPill } from "@/components/project-status-pill";
import { directoryProjects } from "@/lib/project-directory";
import Link from "next/link";

const relatedBySlug: Record<string, string[]> = {
  "account-intelligence": ["partner-gtm-engine", "competitive-intelligence-engine", "customer-feedback-intelligence"],
  "customer-feedback-intelligence": ["product-release-intelligence", "competitive-intelligence-engine", "account-intelligence"],
  "detector-coverage-atlas": ["truffle-camp", "competitive-intelligence-engine", "account-intelligence"],
  "competitive-intelligence-engine": ["detector-coverage-atlas", "product-release-intelligence", "account-intelligence"],
  "truffle-camp": ["detector-coverage-atlas", "competitive-intelligence-engine"],
  "partner-gtm-engine": ["account-intelligence", "customer-feedback-intelligence"],
  "product-release-intelligence": ["customer-feedback-intelligence", "truffle-camp"],
  "security-signal-intelligence": ["account-intelligence", "competitive-intelligence-engine"],
  "revenue-planning-simulator": ["gtm-operating-plan", "revenue-intelligence", "account-intelligence"],
  "revenue-intelligence": ["revenue-planning-simulator", "gtm-operating-plan", "account-intelligence"],
  "gtm-operating-plan": ["revenue-planning-simulator", "revenue-intelligence", "account-intelligence"],
  "gtm-campaign-lab": ["account-intelligence", "product-release-intelligence"],
  "product-prioritization-simulator": ["customer-feedback-intelligence", "product-release-intelligence"],
};

export function RelatedWork({ slug }: { slug: string }) {
  const items = (relatedBySlug[slug] ?? [])
    .flatMap((relatedSlug) => {
      const match = directoryProjects.find((project) => project.slug === relatedSlug);
      return match ? [match] : [];
    })
    .slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border py-16">
      <h2 className="text-lg font-semibold">Explore related work</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {items.map((project) => (
          <li key={project.slug}>
            <Link href={project.caseStudyUrl} className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4 hover:border-accent">
              <ProjectStatusPill status={project.status} />
              <p className="font-semibold">{project.title}</p>
              <p className="text-sm leading-6 text-muted">{project.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/projects" className="link-rule text-sm font-medium text-accent">
          Back to all projects
        </Link>
      </p>
    </section>
  );
}
