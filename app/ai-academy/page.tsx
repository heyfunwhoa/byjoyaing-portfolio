import type { Metadata } from "next";
import Link from "next/link";
import { Academy } from "@/components/ai-academy/academy";

export const metadata: Metadata = {
  title: "AI Enablement Academy | Learn, Apply, Build",
  description: "An approachable AI learning path and task-based workflow library with responsible-use guidance.",
};

export default function Page() {
  return <>
    <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
      <Link href="/ai-academy/version-control" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Git Workflow Essentials</strong><span className="mt-1 block text-muted">Learn Git branching, pull requests, and CI through interactive exercises.</span></span>
        <span className="font-semibold text-accent">Start practicing →</span>
      </Link>
    </div>
    <div className="mx-auto w-full max-w-6xl px-5 pt-4 sm:px-8">
      <Link href="/ai-academy/devops/build-rate-limits" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span><strong className="block text-foreground">Builder Academy: Build Rate Limits & CI/CD</strong><span className="mt-1 block text-muted">Troubleshoot Vercel build limits, preserve GitHub checks, and plan safer deployments.</span></span>
        <span className="font-semibold text-accent">Explore lesson →</span>
      </Link>
    </div>
    <Academy />
  </>;
}
