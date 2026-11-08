import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { componentOptions } from "./component-options.ts";
import {
  componentLessons,
  lessonsForExplorer,
  lessonTrack,
} from "./component-lessons.ts";

const sourceHosts = new Set([
  "developer.mozilla.org",
  "ui.shadcn.com",
  "www.w3.org",
]);

const requiredText = [
  "title",
  "family",
  "definition",
  "why",
  "when",
  "avoid",
  "variants",
  "accessibility",
  "prompt",
  "exercise",
  "source",
] as const;

test("every lesson has the teaching fields and a working demo", () => {
  assert.equal(
    new Set(componentLessons.map((lesson) => lesson.id)).size,
    componentLessons.length,
  );
  const explorer = readFileSync(
    new URL("../components/design-lab/component-learning.tsx", import.meta.url),
    "utf8",
  );
  const catalogIds = new Set(componentOptions.map((option) => option.id));
  for (const lesson of componentLessons) {
    assert.equal(lesson.level, "foundational");
    for (const field of requiredText) {
      assert.ok(lesson[field].trim().length > 0, `${lesson.id} ${field}`);
    }
    assert.ok(lesson.useCases.length > 0, lesson.id);
    assert.ok(lesson.alternatives.length > 0, lesson.id);
    assert.ok(lesson.projects.length > 0, lesson.id);
    assert.ok(lesson.related.length > 0, lesson.id);
    for (const relatedId of lesson.related) {
      assert.notEqual(relatedId, lesson.id);
      assert.ok(componentLessons.some((item) => item.id === relatedId));
    }
    assert.equal(lesson.source.startsWith("https://"), true, lesson.id);
    assert.ok(sourceHosts.has(new URL(lesson.source).hostname), lesson.source);
    assert.match(explorer, new RegExp(`\\n  ${lesson.id}:`));
    if (lesson.kind === "concept") {
      assert.equal(lessonTrack(lesson), "Foundations");
      assert.equal(lesson.catalogId, undefined, lesson.id);
    } else {
      assert.equal(lesson.kind, "component");
      assert.equal(lessonTrack(lesson), "Components");
    }
    if (lesson.catalogId) {
      assert.ok(catalogIds.has(lesson.catalogId), lesson.catalogId);
    }
  }
  assert.equal(
    componentLessons.filter((lesson) => lesson.kind === "concept").length,
    6,
  );
  assert.ok(explorer.includes("\n  feedback:"));
  for (const id of ["button", "checkbox", "select"]) {
    assert.equal(
      componentLessons.find((lesson) => lesson.id === id)?.catalogId,
      undefined,
    );
  }
});

test("lesson search matches a task and a project without saving progress", () => {
  assert.deepEqual(
    lessonsForExplorer("Foundations", "contrast").map((lesson) => lesson.id),
    ["color"],
  );
  assert.deepEqual(
    lessonsForExplorer("Components", "pipeline").map((lesson) => lesson.id),
    ["table"],
  );
  assert.equal(lessonsForExplorer("All", "no-such-lesson").length, 0);
  assert.equal(
    lessonsForExplorer("All", " \t ").length,
    componentLessons.length,
  );
  assert.equal(
    lessonsForExplorer("Foundations").every(
      (lesson) => lesson.kind === "concept",
    ),
    true,
  );
});

test("navigation comparison supports three distinct patterns and stays in Design Lab", () => {
  const comparison = readFileSync(
    new URL("../components/design-lab/navigation-pattern-comparison.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(
    new URL("../app/design-lab/page.tsx", import.meta.url),
    "utf8",
  );
  for (const pattern of ["sidebar", "top", "tabs"]) {
    assert.match(comparison, new RegExp('id: "' + pattern + '"'));
  }
  assert.match(comparison, /aria-pressed=/);
  assert.match(comparison, /aria-current=/);
  assert.match(comparison, /aria-expanded=/);
  assert.match(comparison, /Fictional teaching data only/);
  assert.match(page, /<NavigationPatternComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});

test("form comparison teaches exclusive, multi-choice, select, and search patterns", () => {
  const comparison = readFileSync(
    new URL("../components/design-lab/form-pattern-comparison.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  for (const pattern of ["radio", "checkbox", "select", "search"]) {
    assert.match(comparison, new RegExp('id: "' + pattern + '"'));
  }
  assert.match(comparison, /type="radio"/);
  assert.match(comparison, /type="checkbox"/);
  assert.match(comparison, /type="search"/);
  assert.match(comparison, /<select/);
  assert.match(comparison, /No accounts match that search/);
  assert.match(comparison, /not a full ARIA combobox/);
  assert.match(page, /<FormPatternComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
});

test("data display comparison keeps cards, table, and metrics tied to the same fixture", () => {
  const comparison = readFileSync(
    new URL("../components/design-lab/data-display-comparison.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(
    new URL("../app/design-lab/page.tsx", import.meta.url),
    "utf8",
  );
  for (const pattern of ["cards", "table", "metrics"]) {
    assert.match(comparison, new RegExp('id: "' + pattern + '"'));
  }
  assert.match(comparison, /const accounts: Account\[\]/);
  assert.match(comparison, /filtered\.reduce\(/);
  assert.match(comparison, /No matching accounts/);
  assert.match(comparison, /<caption/);
  assert.match(comparison, /aria-pressed=/);
  assert.match(comparison, /scope="col"/);
  assert.match(page, /<DataDisplayComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});

test("dashboard lesson combines shared filters, summaries, chart and exact values", () => {
  const source = readFileSync(
    new URL("../components/design-lab/dashboard-composition-comparison.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(
    new URL("../app/design-lab/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /export const dashboardFixture/);
  assert.match(source, /export function dashboardRows/);
  assert.match(source, /team === "All teams" \|\| item\.team === team/);
  assert.match(source, /filtered\.filter\(/);
  assert.match(source, /role="group" aria-label="Data presentation mode"/);
  assert.match(source, /aria-pressed=/);
  assert.match(source, /<figure/);
  assert.match(source, /<figcaption/);
  assert.match(source, /<table/);
  assert.match(source, /scope="col"/);
  assert.match(source, /scope="row"/);
  assert.match(source, /synthetic/);
  assert.match(page, /<DashboardCompositionComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});

test("account application workbench covers research, evidence, shortlist and handoff without live integration", () => {
  const fixture = readFileSync(new URL("./design-lab-account-workflow.ts", import.meta.url), "utf8");
  const component = readFileSync(new URL("../components/design-lab/account-workflow-workbench.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  for (const stage of ["discover", "inspect", "shortlist", "export"]) {
    assert.match(component, new RegExp('id: "' + stage + '"'));
  }
  assert.match(fixture, /accountWorkbenchFixture/);
  assert.match(fixture, /visibleWorkbenchAccounts/);
  assert.match(fixture, /workbenchExportPreview/);
  assert.match(fixture, /status: "Unknown"/);
  assert.match(component, /<EvidenceDetail/);
  assert.match(component, /role="status"/);
  assert.match(component, /type="checkbox"/);
  assert.match(component, /No matching accounts/);
  assert.match(component, /No accounts selected/);
  assert.match(component, /No Excel file is generated/);
  assert.match(page, /<AccountWorkflowWorkbench \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});
