import { completePageMetadata } from "@/lib/page-metadata";
import { FieldNoteBreadcrumb } from "@/components/collection-breadcrumb";
import { SourceAndEvidencePanel } from "@/components/editorial/source-and-evidence-panel";
import { RelatedWork } from "@/components/editorial/related-work";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
    alternates: { canonical: "/field-notes/developer-workstations" },
    openGraph: { url: "/field-notes/developer-workstations" },
    title: "Point of View: The Developer Workstation Is the New Soft Target",
    description:
      "Why developer machines and CI became a primary attack path, who owns the problem, and how I'd test a sales motion around it.",
  },
  "/field-notes/developer-workstations",
);

const signals = [
  {
    when: "Aug 2025",
    name: "Nx “s1ngularity”",
    detail:
      "Malicious package versions ran on developer machines, harvested tokens and were the first known attack to look for installed AI coding CLIs to extract more secrets.",
  },
  {
    when: "Oct 2025 onward",
    name: "GlassWorm",
    detail:
      "A self-propagating worm spread through VS Code extensions, stealing npm, GitHub and Git credentials and reusing them to publish more malicious components.",
  },
  {
    when: "Nov 2025",
    name: "Shai-Hulud 2.0",
    detail:
      "Hundreds of npm packages and more than 25,000 GitHub repositories were compromised in a few days, exposing developer and CI secrets.",
  },
  {
    when: "May 2026",
    name: "VS Code extension breach",
    detail:
      "The payload targeted AI coding assistant configurations alongside npm tokens, GitHub tokens and cloud credentials.",
  },
  {
    when: "Oct 2026",
    name: "Tampered AI coding extension",
    detail:
      "An extension marketplace briefly served altered builds of a widely used AI coding assistant extension.",
  },
] as const;

export default function DeveloperWorkstationsPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-14">
        <FieldNoteBreadcrumb title="The Developer Workstation Is the New Soft Target" />
        <p className="mt-8 text-xs font-medium tracking-wider text-muted uppercase">
          Field note · Point of view · Short read
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
          The developer workstation is the new soft target.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          My view: over the past year, attackers stopped treating developer
          machines and CI as side doors and started treating them as the main
          way in. They hold the tokens, keys and AI agent access that unlock
          source code and cloud. Most companies still secure them like any other
          laptop.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          <strong>Use this when:</strong> you&apos;re deciding where a security
          product fits a buyer&apos;s current pain, or which segment to test
          next.
        </p>
      </header>

      <section
        id="signals"
        className="scroll-mt-24 py-10"
        aria-labelledby="signals-title"
      >
        <h2 id="signals-title" className="font-display text-2xl">
          What changed
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {signals.map((signal) => (
            <li
              key={signal.name}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs font-medium text-muted">{signal.when}</p>
              <h3 className="mt-1 font-display text-lg">{signal.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {signal.detail}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
          The common thread is credential theft at the point where code is
          written and built. Researchers note that, depending on configuration,
          a developer machine can be compromised across its toolchain before an
          endpoint alert fires. And it isn&apos;t only laptops: in at least one
          major 2025 attack, most compromised machines were CI runners.
        </p>
      </section>

      <section
        id="buyer"
        className="scroll-mt-24 border-t border-border py-10"
        aria-labelledby="buyer-title"
      >
        <h2 id="buyer-title" className="font-display text-2xl">
          Why buyers struggle to act on it
        </h2>
        <ul className="mt-5 max-w-2xl list-disc space-y-3 pl-5 text-sm leading-7 text-muted">
          <li>
            <strong>Ownership sits in a seam.</strong> SecOps owns the endpoint,
            AppSec owns code and secrets, platform teams own CI. Nobody owns the
            developer machine end to end, so budget is unclear.
          </li>
          <li>
            <strong>Tools are split the same way.</strong> EDR, code scanning
            and secrets detection each see one slice of the same incident.
          </li>
          <li>
            <strong>AI coding agents widen the gap.</strong> They run with the
            developer&apos;s privileges and credentials, and most companies have
            no policy for them yet.
          </li>
        </ul>
      </section>

      <section
        id="test"
        className="scroll-mt-24 border-t border-border py-10"
        aria-labelledby="test-title"
      >
        <h2 id="test-title" className="font-display text-2xl">
          How I&apos;d test a motion around it
        </h2>
        <dl className="mt-6 grid max-w-3xl gap-4 text-sm leading-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Who</dt>
            <dd className="mt-1 text-muted">
              Security leaders at developer-heavy companies where AppSec and
              SecOps already share incidents.
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Message</dt>
            <dd className="mt-1 text-muted">
              See and contain a compromised developer machine end to end, from
              the stolen token to the repos and cloud it reached.
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Test</dt>
            <dd className="mt-1 text-muted">
              One message, one segment, four weeks, run alongside an existing
              campaign so the comparison is fair.
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Decide</dt>
            <dd className="mt-1 text-muted">
              Keep it if it books meetings with a buyer the core message
              doesn&apos;t reach. If replies come but meetings don&apos;t,
              change the persona before the message.
            </dd>
          </div>
        </dl>
      </section>

      <section
        id="conversation"
        className="scroll-mt-24 border-t border-border py-10"
      >
        <h2 className="font-display text-2xl">Pressure-test this with me</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          I&apos;d rather be argued out of a point of view than hold one
          quietly. If you see this differently in your market, I&apos;d like to
          hear it.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
        >
          Get in touch →
        </Link>
      </section>

      <SourceAndEvidencePanel
        status="exploring"
        limitations="A personal point of view built from public reporting, not employer or customer data. The motion test is a proposal, not a record of results. Sources verified November 11, 2026."
        sources={[
          {
            title: "s1ngularity supply chain attack",
            href: "https://orca.security/resources/blog/s1ngularity-supply-chain-attack/",
            publisher: "Orca Security",
          },
          {
            title:
              "GlassWorm returns: developer toolchain worm expands to GitHub and npm",
            href: "https://labs.cloudsecurityalliance.org/research/csa-research-note-glassworm-supply-chain/",
            publisher: "Cloud Security Alliance",
          },
          {
            title:
              "GlassWorm Zig dropper: cross-IDE developer supply chain attack",
            href: "https://labs.cloudsecurityalliance.org/research/csa-research-note-glassworm-ide-supply-chain-20260413-csa-st/",
            publisher: "Cloud Security Alliance",
          },
          {
            title: "Shai-Hulud 2.0: inside the second coming",
            href: "https://blog.checkpoint.com/research/shai-hulud-2-0-inside-the-second-coming-the-most-aggressive-npm-supply-chain-attack-of-2025/",
            publisher: "Check Point Research",
          },
          {
            title: "VS Code extension supply chain breach",
            href: "https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/05/CSA_research_note_vscode-extension-supply-chain-breach_20260525-csa-styled.pdf",
            publisher: "Cloud Security Alliance",
          },
          {
            title: "Trojanized Claude Code extension on Cursor's marketplace",
            href: "https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/11/CSA_research_note_cursor_claude_code_extension_trojan_20261103-csa-styled.pdf",
            publisher: "Cloud Security Alliance",
          },
          {
            title: "Shai-Hulud and secrets harvesting (CI runner share)",
            href: "https://nhimg.org/articles/shai-hulud-shows-how-npm-supply-chain-attacks-harvest-secrets/",
            publisher: "NHI Mgmt Group",
          },
        ]}
      />
      <RelatedWork
        items={[
          {
            href: "/field-notes/build-the-motion",
            title: "How I'd build a motion at your stage",
            category: "Field Notes",
          },
          {
            href: "/work",
            title: "Enterprise sales and team leadership",
            category: "Work",
          },
        ]}
      />
    </PageMain>
  );
}
