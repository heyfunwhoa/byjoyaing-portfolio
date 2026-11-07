import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { completePageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { PageMain } from "@/components/page-main";
import { CredentialRiskExplorer } from "@/components/credential-risk-explorer";

export const metadata: Metadata = completePageMetadata({
  title: "Credential to Identity Risk",
  description: "Explore secrets detection, non-human identity, permissions and remediation with synthetic evidence.",
}, "/builder-academy/credential-risk");

export default function CredentialRiskPage() {
  return (
    <PageMain>
      <section className="py-12 sm:py-16">
        <AcademyBreadcrumb title="Credential to Identity Risk" />
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">A leaked secret is the beginning of the investigation.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Follow a fictional API token from exposure to workload ownership, permissions, activity evidence and remediation. Explore why secrets detection, NHI security and IAM are related—but not interchangeable.</p>
        <section aria-labelledby="credential-evidence-title" className="mt-8">
          <h2 id="credential-evidence-title" className="font-display text-2xl">From a detection signal to a decision</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            In this fictional example, a scanner flags a token in a repository. Follow the evidence before choosing a response.
          </p>
          <ol className="mt-4 grid list-decimal gap-3 pl-6 marker:font-semibold marker:text-accent md:grid-cols-3 md:gap-8">
            <li className="min-w-0 rounded-xl border border-border bg-card p-4">
              <strong className="block">Observe</strong>
              <p className="mt-1 text-sm leading-6">Record the candidate token and where it appeared.</p>
            </li>
            <li className="min-w-0 rounded-xl border border-border bg-card p-4">
              <strong className="block">Review</strong>
              <p className="mt-1 text-sm leading-6">Identify the workload owner and check what the credential could access. Keep validity and activity unknown until there is evidence.</p>
            </li>
            <li className="min-w-0 rounded-xl border border-border bg-card p-4">
              <strong className="block">Decide</strong>
              <p className="mt-1 text-sm leading-6">Choose the next investigation step and who owns it. Use the simulator below to see what changes when new evidence arrives.</p>
            </li>
          </ol>
          <div className="mt-4 rounded-xl border border-border bg-background p-4 text-sm leading-6">
            <p><strong>Try it.</strong> A different scanner flags a deployment token. The team has no evidence of validity, permissions or activity. What can you report now, and what evidence would you ask for next?</p>
            <details className="mt-2">
              <summary className="min-h-11 cursor-pointer py-2 font-semibold underline underline-offset-4">Compare your reasoning</summary>
              <p>Report a candidate exposure and name what is unknown. Ask the workload owner for credential status and effective permissions, then check authorized activity records before drawing conclusions about use. Start the simulator with the unknowns in place and compare its recommendation with the result after adding evidence.</p>
            </details>
          </div>
        </section>
        <div className="mt-8"><CredentialRiskExplorer /></div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/builder-academy/identity-journey" className="text-accent underline underline-offset-4">Explore identity journeys</Link>
          <a href="https://github.com/heyfunwhoa/detector-coverage-atlas" className="text-accent underline underline-offset-4">Detector Coverage Atlas</a>
          <a href="https://github.com/heyfunwhoa/security-market-map" className="text-accent underline underline-offset-4">Security Market Map</a>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">The Atlas explores detector capabilities and limitations. The Market Map documents market categories, vendors and evidence. This lab uses neither project&apos;s live data; its findings are fictional.</p>
      </section>
    </PageMain>
  );
}
