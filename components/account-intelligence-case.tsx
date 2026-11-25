import Link from "next/link";
import { AccountIntelligenceWorkflow } from "@/components/account-intelligence-workflow";
import { CaseStudyContents } from "@/components/case-study-contents";
import { DisclosureSection } from "@/components/disclosure-section";
import { PageMain } from "@/components/page-main";
import { PortfolioExample } from "@/components/portfolio-example";
import { ProjectKindLabel } from "@/components/project-kind-label";
import { ProjectTechnologyStack } from "@/components/portfolio/technology-stack";
import { RelatedWork } from "@/components/related-work";
import { WorkCaseBreadcrumb } from "@/components/work-case-breadcrumb";
import { portfolioExamples } from "@/lib/portfolio-examples";

export function AccountIntelligenceCase() {
  return (
    <PageMain>
      <header className="border-b border-border py-12 sm:py-16">
        <WorkCaseBreadcrumb slug="account-intelligence" />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ProjectKindLabel slug="account-intelligence" />
          <p className="text-sm font-medium text-muted">Account Intelligence</p>
        </div>
        <h1
          id="problem-title"
          className="mt-2 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-6xl"
        >
          From threat intelligence to a field playbook
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8">
          At Rapid7, I sold threat intelligence and wrote the playbooks our
          portfolio team used. At Truffle Security, I turned recurring buyer
          questions into discovery and evaluation guides.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <a
            className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 text-accent-foreground"
            href="#workflow"
          >
            Read the field examples
          </a>
          <Link
            className="inline-flex min-h-11 items-center text-accent underline"
            href="/account-signal"
          >
            Open my LimaCharlie research brief
          </Link>
        </div>
      </header>
      <CaseStudyContents
        sections={[
          { id: "workflow", label: "Field examples" },
          { id: "guided-example", label: "Research example" },
          { id: "architecture", label: "How the brief works" },
          { id: "connected-title", label: "Related work" },
        ]}
      />
      <section
        id="workflow"
        aria-labelledby="workflow-title"
        className="scroll-mt-24 border-b border-border py-8"
      >
        <h2
          id="workflow-title"
          className="font-display text-3xl tracking-tight"
        >
          The work behind the examples
        </h2>
        <p className="mt-3 mb-5 max-w-2xl text-base leading-7 text-muted">
          Rapid7 and Truffle were my employers. LimaCharlie is an independent
          research subject. The company links give product context. The career
          entries and published brief document my contribution.
        </p>
        <AccountIntelligenceWorkflow />
      </section>
      <PortfolioExample example={portfolioExamples["account-intelligence"]} />
      <DisclosureSection
        id="architecture"
        title="How the LimaCharlie brief works"
        className="my-6"
      >
        <h2 id="architecture-title" className="font-display text-2xl">
          A dated copy a reader can check
        </h2>
        <div
          id="design-decisions"
          className="mt-3 max-w-2xl space-y-3 text-base leading-7"
        >
          <p id="decisions-title">
            The brief uses a saved copy of the October 10 product overview. Each
            factual line comes from that copy. The brief records its address,
            capture date and content hash so a reader can trace it back.
          </p>
          <p id="outcomes-title">
            If the same address returns different text, the research workflow
            flags the change for review and keeps the earlier copy.
          </p>
          <Link
            href="/account-signal"
            className="inline-flex min-h-11 items-center text-accent underline"
          >
            Inspect the source, interpretation and open questions
          </Link>
        </div>
      </DisclosureSection>
      <ProjectTechnologyStack slug="account-intelligence" />
      <section
        className="border-t border-border py-8"
        aria-labelledby="connected-title"
      >
        <h2 id="connected-title" className="font-display text-2xl">
          Related work
        </h2>
        <RelatedWork slug="account-intelligence" />
      </section>
    </PageMain>
  );
}
