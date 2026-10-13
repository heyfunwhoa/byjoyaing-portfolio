import { completePageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Academy } from "@/components/ai-academy/academy";

export const metadata: Metadata = completePageMetadata(
  {
  title: "AI Enablement Academy",
  description: "An approachable AI learning path and task-based workflow library with responsible-use guidance.",
},
  "/ai-academy",
);

export default function Page() {
  return (
    <Academy
      resources={
        <details className="mb-6 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            Explore related Builder Academy lessons
          </summary>
    <div className="mt-4">
            <div className="mx-auto w-full max-w-6xl px-0 pt-0">
      <Link href="/ai-academy/version-control" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Git Workflow Essentials</strong><span className="mt-1 block text-muted">Learn Git branching, pull requests, and CI through interactive exercises.</span></span>
        <span className="font-semibold text-accent">Start practicing →</span>
      </Link>
      <Link href="/ai-academy/programming" className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Programming Foundations</strong><span className="mt-1 block text-muted">Explore JavaScript, TypeScript, Python, SQL, HTML/CSS, runtimes and frameworks.</span></span>
        <span className="font-semibold text-accent">Explore languages →</span>
      </Link>
    </div>
    <div className="mx-auto w-full max-w-6xl px-0 pt-4">
      <Link href="/ai-academy/devops/build-rate-limits" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Build Rate Limits & CI/CD</strong><span className="mt-1 block text-muted">Troubleshoot Vercel build limits, preserve GitHub checks, and plan safer deployments.</span></span>
        <span className="font-semibold text-accent">Explore lesson →</span>
      </Link>
    </div>
    <div className="mx-auto w-full max-w-6xl px-0 pt-4">
      <Link href="/ai-academy/dependencies/lockfiles" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Lockfiles & Reproducible Builds</strong><span className="mt-1 block text-muted">Understand package registries, dependency manifests, npm ci, and how to fix a mismatched lockfile.</span></span>
        <span className="font-semibold text-accent">Explore lesson →</span>
      </Link>
    </div>
    <div className="mx-auto w-full max-w-6xl px-0 pt-4">
      <Link href="/ai-academy/systems" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Connected Systems Engineering</strong><span className="mt-1 block text-muted">Explore research infrastructure, distributed systems, data, security, evidence, and practical lab plans.</span></span>
        <span className="font-semibold text-accent">Explore pathway →</span>
      </Link>
    </div>
    </div>
  </details>
      }
    />
  );
}
