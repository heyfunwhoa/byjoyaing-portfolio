import type { Metadata } from "next";
import Link from "next/link";
import { IdentityJourneyLab } from "@/components/identity-journey-lab";
import { PageMain } from "@/components/page-main";

export const metadata: Metadata = {
  title: "Identity Journey Lab — Builder Academy",
  description: "Learn how humans, service accounts, deployment pipelines and AI agents authenticate and receive permissions.",
};

export default function IdentityJourneyPage() {
  return (
    <PageMain>
      <section className="py-12 sm:py-16">
        <p className="text-sm font-medium text-muted">joy. / Builder Academy / Identity security</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          Identity is more than a login.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          People, services, pipelines and agents all need a way to establish who they are.
          Then comes the separate question: what should they be allowed to do?
        </p>
        <div className="mt-8"><IdentityJourneyLab /></div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link className="text-accent underline underline-offset-4" href="/builder-academy/credential-risk">Credential-to-identity risk lab</Link>
          <Link className="text-accent underline underline-offset-4" href="/projects">Explore independent projects</Link>
          <Link className="text-accent underline underline-offset-4" href="/about">About the Curious Builder</Link>
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-5 text-muted">
          Educational simulation only. Better Auth, SSO, SCIM and machine identity examples describe concepts, not live portfolio integrations.
        </p>
      </section>
    </PageMain>
  );
}
