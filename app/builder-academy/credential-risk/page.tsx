import type { Metadata } from "next";
import Link from "next/link";
import { PageMain } from "@/components/page-main";
import { CredentialRiskExplorer } from "@/components/credential-risk-explorer";

export const metadata: Metadata = {
  title: "Credential to Identity Risk — Builder Academy",
  description: "Explore secrets detection, non-human identity, permissions and remediation with synthetic evidence.",
};

export default function CredentialRiskPage() {
  return (
    <PageMain>
      <section className="py-12 sm:py-16">
        <p className="text-sm font-medium text-muted">joy. / Builder Academy / Identity security</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">A leaked secret is the beginning of the investigation.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted">Follow a fictional API token from exposure to workload ownership, permissions, activity evidence and remediation. Explore why secrets detection, NHI security and IAM are related—but not interchangeable.</p>
        <div className="mt-8"><CredentialRiskExplorer /></div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/builder-academy/identity-journey" className="text-accent underline underline-offset-4">Explore identity journeys</Link>
          <a href="https://github.com/heyfunwhoa/detector-coverage-atlas" className="text-accent underline underline-offset-4">Detector Coverage Atlas</a>
          <a href="https://github.com/heyfunwhoa/security-market-map" className="text-accent underline underline-offset-4">Security Market Map</a>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">The Atlas explores detector capabilities and limitations. The Market Map documents market categories, vendors and evidence. This lab uses neither project's live data; its findings are fictional.</p>
      </section>
    </PageMain>
  );
}
