import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lockfiles & Reproducible Builds | Builder Academy",
  description:
    "A hands-on lesson about npm package manifests, package-lock.json, deterministic installs, and fixing lockfile drift in CI.",
};

const checks = [
  {
    label: "The manifest",
    file: "package.json",
    value: '"next": "16.4.0"',
    meaning: "The package version that the project requests.",
  },
  {
    label: "The resolved receipt",
    file: "package-lock.json",
    value: '"next": "16.3.5"',
    meaning: "The outdated version pinned for installations. It no longer satisfies the manifest.",
  },
];

const commands = [
  {
    command: "git switch fix/dependency-security-remediation",
    why: "Work on the existing repair branch rather than changing production directly.",
  },
  {
    command: "npm install --package-lock-only --ignore-scripts",
    why: "Resolve and rewrite the lockfile without running package lifecycle scripts or reinstalling node_modules. It still needs registry access.",
  },
  {
    command: "npm ci",
    why: "Reinstall from the committed dependency resolution; npm will reject manifest/lockfile drift.",
  },
  {
    command: "npm run lint",
    why: "Check code quality only after dependencies have installed successfully.",
  },
  {
    command: "npm run build",
    why: "Verify the application compiles. Type checks or stylesheet imports can fail independently of a valid lockfile.",
  },
  {
    command: "git add package-lock.json && git commit -m \"fix(deps): sync lockfile\"",
    why: "Commit the exact resolved dependency tree for GitHub Actions and teammates.",
  },
];

export default function LockfilesLesson() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
      <nav className="text-sm text-muted">
        <Link href="/ai-academy" className="underline underline-offset-4 hover:text-foreground">← Builder Academy</Link>
        {" / Dependencies & Package Registries / Lockfiles"}
      </nav>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-accent">Builder Academy · Dependency Management · Beginner</p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-normal sm:text-5xl">Lockfiles & reproducible builds</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Why does CI stop before lint? Learn the difference between a package manifest and a lockfile,
        then practice diagnosing a real-world Next.js version mismatch.
      </p>

      <section className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">What you will learn</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>Explain packages, transitive dependencies, npm registries, and integrity hashes.</li>
          <li>Describe why package.json and package-lock.json must agree.</li>
          <li>Distinguish npm install, npm ci, and npm install --package-lock-only.</li>
          <li>Repair CI safely without downgrading security patches or switching checks off.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">1. The shopping list and the receipt</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {checks.map((item) => (
            <article key={item.file} className="rounded-xl border border-border p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.label}</p>
              <h3 className="mt-2 font-semibold">{item.file}</h3>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-card p-3 text-sm"><code>{item.value}</code></pre>
              <p className="mt-3 text-sm leading-6 text-muted">{item.meaning}</p>
            </article>
          ))}
        </div>
        <p className="text-muted">
          Think of <code>package.json</code> as the ingredients you order, and <code>package-lock.json</code> as the detailed
          receipt listing exact versions, where they were resolved, and integrity information. The lockfile also records
          transitive dependencies: packages your direct dependencies rely on.
        </p>
        <p className="text-muted">
          A package registry such as npm is the catalog from which packages and metadata are fetched. Integrity hashes help
          npm check that downloaded package contents match what the lockfile records; they are not a security endorsement.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">2. Why npm ci refuses to continue</h2>
        <p className="text-muted">
          Continuous Integration (CI) uses <code>npm ci</code> because it checks that the manifest and lockfile are
          consistent before installing. A mismatch stops dependency installation before ESLint, tests, or the build can run.
          This is a dependency-resolution failure, not evidence that your source code has lint errors.
        </p>
        <div className="rounded-xl border border-border bg-card p-5 text-sm leading-7">
          <p><strong>Example:</strong> package.json requests Next.js 16.4.0, but the lockfile pins 16.3.5.</p>
          <p className="mt-2 text-muted"><strong>Result:</strong> <code>npm ci</code> exits with an EUSAGE error because the dependency resolution is out of sync.</p>
          <p className="mt-2 text-muted"><strong>Fix:</strong> regenerate the lockfile, validate it with a clean install, and commit the result.</p>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">3. Repair the dependency graph</h2>
        <ol className="list-decimal space-y-5 pl-5">
          {commands.map((step) => (
            <li key={step.command}>
              <pre className="overflow-x-auto rounded-lg border border-border bg-card p-3 text-xs sm:text-sm"><code>{step.command}</code></pre>
              <p className="mt-2 text-sm text-muted">{step.why}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted">
          Finish by pushing the branch and reviewing the fresh GitHub Actions results. If the clean install passes but
          the build fails, diagnose that new error separately. Never hand-edit integrity hashes, blindly run
          <code> npm audit fix --force</code>, or disable CI simply to get a green badge.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">4. Practice: diagnose before fixing</h2>
        <p className="mt-3 text-muted">
          Scenario: A security PR updates Next.js and eslint-config-next to 16.4.0, but GitHub Actions fails at npm ci.
          What should you change first?
        </p>
        <details className="mt-4 rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-semibold">A. Change npm ci to npm install in CI</summary>
          <p className="mt-2 text-muted">Not recommended. This hides drift instead of ensuring CI uses a reproducible dependency resolution.</p>
        </details>
        <details className="mt-3 rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-semibold">B. Regenerate and commit the lockfile</summary>
          <p className="mt-2 text-muted">Correct. Run npm install --package-lock-only, test with npm ci, then commit the new lockfile.</p>
        </details>
        <details className="mt-3 rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-semibold">C. Revert the security patch</summary>
          <p className="mt-2 text-muted">Not a default fix. Preserve the intended safe versions unless testing reveals a documented incompatibility.</p>
        </details>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">5. What to explore next</h2>
        <p className="text-muted">
          Try changing a dependency version in a disposable practice branch without changing the lockfile, then observe
          npm ci fail. Restore the manifest or regenerate the lockfile, and verify the command passes. Use a synthetic
          practice project—not production credentials.
        </p>
        <p><Link className="text-accent underline underline-offset-4" href="/ai-academy/devops/build-rate-limits">
          Related lesson: Build Rate Limits & CI/CD
        </Link></p>
        <p className="text-sm text-muted">
          References: <a className="underline underline-offset-4" href="https://docs.npmjs.com/cli/v10/commands/npm-ci" target="_blank" rel="noopener noreferrer">npm ci</a>,{" "}
          <a className="underline underline-offset-4" href="https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json" target="_blank" rel="noopener noreferrer">package-lock.json</a>,{" "}
          <a className="underline underline-offset-4" href="https://docs.npmjs.com/cli/v10/commands/npm-install" target="_blank" rel="noopener noreferrer">npm install</a>.
        </p>
      </section>
    </main>
  );
}
