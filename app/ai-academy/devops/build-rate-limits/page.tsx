import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Build Rate Limits | Builder Academy",
  description: "Learn the difference between GitHub CI and Vercel deployments, diagnose rate limits, and reduce unnecessary preview builds safely.",
};

const cases = [
  {
    symptom: "Vercel status failed; URL includes build-rate-limit",
    meaning: "The hosting provider may be restricting new deployment attempts. This is not proof that the application code failed to compile.",
    next: "Open the Vercel deployment/status details. Check project and team limits and recent deployment frequency. Don't rerun repeatedly.",
  },
  {
    symptom: "GitHub Actions TypeScript, lint, or unit test job failed",
    meaning: "The code-quality pipeline found an error independent of whether Vercel can deploy.",
    next: "Open Actions, find the first failed step, read its error, fix the code, and rerun the check.",
  },
  {
    symptom: "Deployment is QUEUED rather than ERROR",
    meaning: "A build may be waiting for an available concurrency slot; it is not necessarily rate-limited or broken.",
    next: "Inspect the queue and running builds before changing configuration.",
  },
  {
    symptom: "Vercel deployment READY, but a PR check is red",
    meaning: "A successful deployment doesn't guarantee tests, security scans, and required GitHub checks passed.",
    next: "Inspect each required check separately; do not merge based only on the preview working.",
  },
];

export default function BuildRateLimitsLesson() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
      <nav className="mb-8 text-sm text-muted"><Link href="/ai-academy" className="underline underline-offset-4 hover:text-foreground">← Builder Academy</Link> / DevOps / Build rate limits</nav>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">Builder Academy · DevOps foundations · Beginner</p>
      <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">Why did my deployment get rate-limited?</h1>
      <p className="max-w-3xl text-lg leading-relaxed text-muted">A practical lesson inspired by a real portfolio workflow: learn what builds do, why repeated pushes can trigger platform limits, and how to fix the deployment process without disabling your CI safeguards.</p>
      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Learning goals</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>Distinguish a GitHub Actions CI check from a Vercel deployment.</li>
          <li>Recognize build-rate limits, build concurrency queues, and actual code failures.</li>
          <li>Reduce unnecessary preview builds while preserving production delivery and quality checks.</li>
          <li>Verify an appropriate fix before merging or publishing.</li>
        </ul>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">First: understand the pipeline</h2>
        <ol className="list-decimal space-y-3 pl-5 text-muted">
          <li><strong className="text-foreground">Commit and push:</strong> GitHub receives a change on a branch.</li>
          <li><strong className="text-foreground">Continuous integration (CI):</strong> GitHub Actions can check types, lint, tests, the production build, and security scans.</li>
          <li><strong className="text-foreground">Continuous delivery/deployment (CD):</strong> Vercel may create a preview for branch changes or publish production from the configured production branch.</li>
          <li><strong className="text-foreground">Rate limit:</strong> If too many deployment attempts happen within a provider-defined window, Vercel may reject new builds, even though source-code checks could still pass.</li>
        </ol>
        <p className="text-muted">Rate limits cap how often work may be started. Concurrency limits cap how many builds run at the same time; queued builds are different from rejected builds. Exact quotas depend on the account, plan, and current provider rules.</p>
      </section>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Diagnose the symptom, not just the red icon</h2>
        <div className="space-y-4">{cases.map((item) => (
          <article key={item.symptom} className="rounded-xl border border-border p-5">
            <h3 className="font-semibold">{item.symptom}</h3>
            <p className="mt-2 text-muted"><strong className="text-foreground">What it means:</strong> {item.meaning}</p>
            <p className="mt-2 text-muted"><strong className="text-foreground">Next action:</strong> {item.next}</p>
          </article>
        ))}</div>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Safer recovery playbook</h2>
        <ol className="list-decimal space-y-3 pl-5 text-muted">
          <li>Check the latest deployment and whether production is still READY. A failed preview does not automatically take down production.</li>
          <li>Inspect GitHub Actions separately. Keep lint, TypeScript, unit tests, build validation, and secret scanning enabled.</li>
          <li>Pause rapid repeated pushes and retries while diagnosing the rate limit.</li>
          <li>In Vercel project settings, consider an <strong className="text-foreground">Ignored Build Step</strong> or other Git deployment controls to skip unnecessary feature-branch builds. Configure only-production builds as a temporary option if previews are not currently needed. Confirm the current setting names in Vercel.</li>
          <li>Retain automatic production builds on the correct branch, and re-enable or selectively permit preview builds for visual, accessibility, and integration review before merging.</li>
          <li>After capacity returns, verify required GitHub checks, trigger one intended deployment, inspect the deployed application, and check links and contact flows.</li>
        </ol>
        <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted"><strong className="text-foreground">Important:</strong> Reducing future builds does not reset an existing rate limit. Avoid upgrading a plan until the actual quota and usage have been verified. If Vercel returns HTTP 403 when reading settings, that's an authorization/scope problem, not a build-rate-limit diagnosis.</p>
      </section>
      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Practice: choose the right first step</h2>
        <p className="mt-3 text-muted">Scenario: Five commits to an experimental branch created multiple canceled previews. GitHub shows a red Vercel status with a build-rate-limit link, while the existing production deployment is READY.</p>
        <details className="mt-4 rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-medium">Reveal the recommended response</summary>
          <p className="mt-3 text-muted">Do not change application code based on this status alone. Confirm the Vercel quota/usage, stop unnecessary build attempts, preserve GitHub CI, and configure selective preview deployments. Validate the next intentional deployment and all required checks separately.</p>
        </details>
        <p className="mt-4 text-sm text-muted">Reflection: What would you check first if the Vercel deployment was READY but the test job failed? Answer: read the failing GitHub Actions test logs before merging.</p>
      </section>
      <footer className="mt-10 border-t border-border pt-6 text-sm text-muted">
        <p className="font-semibold text-foreground">Further reading (official documentation)</p>
        <ul className="mt-2 space-y-2">
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://vercel.com/docs/deployments" target="_blank" rel="noopener noreferrer">Vercel deployments</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://vercel.com/docs/project-configuration/git-settings" target="_blank" rel="noopener noreferrer">Vercel Git deployment settings</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer">GitHub Actions</a></li>
        </ul>
        <p className="mt-3">This lesson is generalized educational guidance. Limits and controls can change; verify current settings against official platform documentation.</p>
      </footer>
    </main>
  );
}
