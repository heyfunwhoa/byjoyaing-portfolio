import { BrandAvatar } from "@/components/brand-avatar";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { MaterialsInvitation } from "@/components/materials-invitation";
import { PageMain } from "@/components/page-main";
import { ProjectConstellation } from "@/components/project-constellation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/experience" },
  openGraph: { url: "/experience" },
  title: "Experience",
  description:
    "Technical enterprise sales, sales-lead coaching, and the product narrative behind the field.",
};

const related: Record<string, { href: string; label: string }[]> = {
  "Truffle Security": [
    { href: "/work/competitive-intelligence-engine", label: "Competitive briefs" },
    { href: "/work/customer-feedback-intelligence", label: "Sales-to-product loop" },
    { href: "/work/product-release-intelligence", label: "Release questions" },
  ],
  Rapid7: [{ href: "/work/security-signal-intelligence", label: "Signal idea, not the playbooks" }],
  Darktrace: [{ href: "/work/truffle-camp", label: "Camp is a later design, not this training" }],
  Forcepoint: [{ href: "/work/competitive-intelligence-engine", label: "Discovery templates" }],
  Metadot: [{ href: "/work/partner-gtm-engine", label: "Partner design, not the Metadot program" }],
};

export default function ExperiencePage() {
  return (
    <PageMain>
      <section className="grid items-center gap-8 border-b border-border py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="min-w-0">
          <p className="editorial-eyebrow text-accent">Work · Revenue & GTM</p>
          <h1 className="editorial-title mt-3 max-w-[16ch]">
            A decade selling technical security, and teaching the story.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Enterprise cycles, the coaching a sales leader does from the field, and the positioning a product marketer owes the team. Portfolio projects are not employer deployments unless a note says a team used a document or a training.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[12rem]">
          <BrandAvatar variant="leader" />
          <p className="editorial-eyebrow mt-3 text-center text-muted">Leader / Work</p>
        </div>
      </section>
      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">How the work connects</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          These links are portfolio evidence. They are not employer deployments. Revenue Planning, Revenue Intelligence, and the GTM Operating Plan run in gtm-revenue-os on a fictional book. A POC tracker is not in this portfolio.
        </p>
        <ul className="mt-6 divide-y divide-border border-y border-border text-sm">
          {[
            ["Enterprise account strategy", "Account Intelligence", "/work/account-intelligence"],
            ["Competitive positioning", "Competitive Intelligence Engine", "/work/competitive-intelligence-engine"],
            ["Technical evaluations", "Detector Coverage Atlas", "/work/detector-coverage-atlas"],
            ["Onboarding and mentoring", "Truffle Camp", "/work/truffle-camp"],
            ["Customer and product feedback", "Customer Feedback Intelligence", "/work/customer-feedback-intelligence"],
            ["Partner strategy", "Partner GTM Engine", "/work/partner-gtm-engine"],
            ["Planning and capacity", "Revenue Planning Simulator", "/work/revenue-planning-simulator"],
            ["Pipeline review", "Revenue Intelligence", "/work/revenue-intelligence"],
          ].map(([motion, project, href]) => (
            <li key={motion} className="grid gap-1 py-3 sm:grid-cols-2">
              <span>{motion}</span>
              <Link href={href} className="font-medium text-accent">{project}</Link>
            </li>
          ))}
        </ul>
        <ProjectConstellation />
      </section>
      <ExperienceTimeline related={related} />
      <MaterialsInvitation tone="work" />
    </PageMain>
  );
}
