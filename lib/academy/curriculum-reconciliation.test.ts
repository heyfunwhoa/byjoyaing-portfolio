import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { lessons } from "../ai-academy.ts";
import { learningPaths } from "./learning-paths.ts";

const reconciledDocs = [
  "docs/academy/PROGRAM.md",
  "docs/academy/CURRICULUM-AUDIT.md",
  "docs/academy/SDLC-ENABLEMENT-CROSSWALK.md",
  "docs/academy/DATA-FOUNDATIONS-PATH.md",
  "docs/academy/SYSTEMS-ENGINEERING-ROADMAP.md",
  "docs/builder-academy/idea-to-verified-release.md",
  "docs/builder-academy/pr-integration-and-reconciliation.md",
  "docs/builder-academy/release-security-review.md",
  "docs/builder-academy/first-deployment-settings.md",
  "docs/builder-academy/follow-one-api-request.md",
  "docs/builder-academy/source-to-running-software.md",
  "docs/builder-academy/systems-design-tradeoffs.md",
  "docs/builder-academy/infrastructure-as-code-plan-review.md",
  "docs/builder-academy/kubernetes-platform-engineering.md",
  "docs/builder-academy/observability-reliability-incidents.md",
  "docs/builder-academy/background-job-recovery.md",
];

function headingSlug(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[`]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function headingSlugs(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => /^#{1,6}\s+/.test(line))
    .map((line) => headingSlug(line.replace(/^#{1,6}\s+/, "")));
}

test("reconciliation keeps the registered nine-path catalog and recovery disclaimer", () => {
  assert.equal(lessons.length, 39);
  assert.equal(new Set(lessons.map((lesson) => lesson.slug)).size, 39);
  assert.equal(learningPaths.length, 9);
  assert.deepEqual(
    learningPaths.map((path) => path.id),
    [
      "delivery",
      "frontend",
      "systems",
      "security",
      "foundations",
      "agents",
      "research",
      "verification",
      "enterprise-evaluation",
    ],
  );
  const covered = new Set(learningPaths.flatMap((path) => [...path.slugs]));
  assert.deepEqual([...covered].sort(), lessons.map((lesson) => lesson.slug).sort());
  assert.equal(
    lessons.some((lesson) => lesson.slug === "pr-integration-and-reconciliation"),
    false,
  );
  const recovery = readFileSync("docs/builder-academy/background-job-recovery.md", "utf8");
  assert.match(recovery, /does not save or grade a submission/);
  assert.match(recovery, /not independent proof that you can operate a production queue/);
  assert.equal(existsSync("examples/academy/alert-handoff/server.mjs"), false);
  assert.equal(existsSync("docs/academy/DATA-ARCHITECTURE-INTEGRATION-MAP.md"), false);
});

test("reconciled curriculum links resolve and both delivery exercises stay distinct", () => {
  const release = readFileSync("docs/builder-academy/idea-to-verified-release.md", "utf8");
  assert.match(release, /## Full-stack bridge: trace one fictional discovery note/);
  assert.match(release, /object-level authorization enforces access/);
  assert.match(release, /pr-integration-and-reconciliation\.md/);
  assert.match(release, /Choose one control and identify its owner/);
  assert.match(release, /#security-across-the-whole-software-development-lifecycle/);

  const security = readFileSync("docs/builder-academy/release-security-review.md", "utf8");
  assert.match(security, /## Security across the whole software development lifecycle/);
  assert.match(security, /requirements-level abuse case/);
  assert.match(security, /Checked 2026-11-09/);

  const coordination = readFileSync(
    "docs/builder-academy/pr-integration-and-reconciliation.md",
    "utf8",
  );
  assert.match(coordination, /Answer key \(expand after deciding\)/);
  assert.match(coordination, /not a newly deployed lesson/);

  const crosswalk = readFileSync("docs/academy/SDLC-ENABLEMENT-CROSSWALK.md", "utf8");
  assert.match(crosswalk, /Not a live Academy track/);
  assert.match(crosswalk, /PR #278/);
  assert.match(crosswalk, /A separate local capstone provides execution practice/);

  const foundations = readFileSync("docs/academy/DATA-FOUNDATIONS-PATH.md", "utf8");
  assert.match(foundations, /No new app, lesson registration/);

  const program = readFileSync("docs/academy/PROGRAM.md", "utf8");
  assert.match(program, /not additional registered lesson IDs/);
  assert.match(program, /PR #283/);

  for (const file of reconciledDocs) {
    const markdown = readFileSync(file, "utf8");
    const links = [...markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(
      (match) => match[1],
    );
    for (const link of links) {
      if (/^(https?:|mailto:)/.test(link)) continue;
      const [relative, anchor] = link.split("#");
      const target = relative
        ? path.normalize(path.join(path.dirname(file), relative))
        : file;
      assert.equal(existsSync(target), true, `${file} -> ${link}`);
      if (!anchor || !target.endsWith(".md")) continue;
      const slugs = headingSlugs(readFileSync(target, "utf8"));
      assert.ok(slugs.includes(anchor), `${file} missing #${anchor} in ${target}`);
    }
  }
});
