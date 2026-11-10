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
    assert.match(explorer, new RegExp(`\\n  ["\x27]?${lesson.id}["\x27]?:`));
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
    ["table", "advanced-grid"],
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

test("advanced Design Lab examples are present without introducing a new registry", () => {
  const advanced = ["advanced-grid", "workflow-builder", "agent-activity", "rule-builder", "learning-playground"];
  const ids = new Set(componentLessons.map((lesson) => lesson.id));
  const explorer = readFileSync(new URL("../components/design-lab/component-learning.tsx", import.meta.url), "utf8");
  const demos = readFileSync(new URL("../components/design-lab/advanced-learning-demos.tsx", import.meta.url), "utf8");
  for (const id of advanced) {
    assert.ok(ids.has(id), id);
    assert.match(explorer, new RegExp('\\n  "' + id + '":'));
  }
  assert.equal(componentLessons.filter(lesson => lesson.catalogId === "data").length, 2);
  assert.match(demos, /Fictional accounts/);
  assert.match(demos, /No action was actually executed/);
  assert.match(demos, /No bulk action or export is connected/);
  assert.match(demos, /No grading, progress recording/);
  assert.match(demos, /aria-expanded=/);
  assert.match(demos, /role="status"/);
  assert.match(demos, /role="region"/);
  assert.match(demos, /<fieldset/);
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
  assert.match(comparison, /aria-sort=/);
  assert.match(comparison, /chooseSort\("name"\)/);
  assert.match(comparison, /chooseSort\("signals"\)/);
  assert.match(comparison, /chooseSort\("reviewed"\)/);
  assert.match(comparison, /Sort accounts by/);
  assert.match(comparison, /Table spacing/);
  assert.match(comparison, /Clear search and filters/);
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

test("context and feedback comparisons reuse existing Design Lab primitives and route gate", () => {
  const details = readFileSync(new URL("../components/design-lab/detail-pattern-comparison.tsx", import.meta.url), "utf8");
  const feedback = readFileSync(new URL("../components/design-lab/feedback-pattern-comparison.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  for (const pattern of ["inline", "sheet", "dialog"]) {
    assert.match(details, new RegExp('id: "' + pattern + '"'));
  }
  for (const pattern of ["inline", "toast", "alert"]) {
    assert.match(feedback, new RegExp('id: "' + pattern + '"'));
  }
  assert.match(details, /<DialogContent/);
  assert.match(details, /<SheetContent/);
  assert.match(details, /aria-expanded=/);
  assert.match(details, /Synthetic teaching fixture/);
  assert.match(feedback, /aria-invalid=/);
  assert.match(feedback, /aria-describedby=/);
  assert.match(feedback, /role="alert"/);
  assert.match(feedback, /role="status"/);
  assert.match(feedback, /Simulate recovery/);
  assert.match(page, /<DetailPatternComparison \/>/);
  assert.match(page, /<FeedbackPatternComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});

test("project discovery lessons stay on existing catalog families", () => {
  const comparison = readFileSync(
    new URL("../components/design-lab/project-discovery-comparison.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  const catalogByLesson = {
    editorialProjectCard: "summaries",
    screenshotProjectCard: "summaries",
    featuredCaseStudy: "summaries",
    projectCarousel: "summaries",
    projectDetailChoice: "context",
    captionGallery: "summaries",
    projectMap: "process-illustrations",
  } as const;
  for (const [id, catalogId] of Object.entries(catalogByLesson)) {
    const lesson = componentLessons.find((item) => item.id === id);
    assert.ok(lesson, id);
    assert.equal(lesson.catalogId, catalogId);
    assert.equal(lesson.family, "Discovery");
    assert.match(comparison, new RegExp(`id: "${id === "editorialProjectCard" ? "compact" : id === "screenshotProjectCard" ? "screenshot" : id === "featuredCaseStudy" ? "featured" : id === "projectCarousel" ? "carousel" : id === "projectDetailChoice" ? "routes" : id === "captionGallery" ? "gallery" : "map"}"`));
  }
  assert.match(comparison, /No featured projects match/);
  assert.match(comparison, /prefers-reduced-motion/);
  assert.match(comparison, /loop: false/);
  assert.doesNotMatch(comparison, /loop:\s*true|Autoplay/);
  assert.match(page, /<ProjectDiscoveryComparison \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
  const families = new Set(componentOptions.map((option) => option.id));
  assert.equal(families.has("project-discovery"), false);
});

test("five guided exercises reuse existing workbench examples without persisting answers", async () => {
  const { guidedExercises, isGuidedExercise } = await import("./design-lab-guided-exercises.ts");
  const ui = readFileSync(new URL("../components/design-lab/guided-practice-explorer.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  assert.equal(guidedExercises.length, 5);
  assert.equal(new Set(guidedExercises.map((exercise) => exercise.id)).size, 5);
  assert.equal(isGuidedExercise("account-handoff"), true);
  assert.equal(isGuidedExercise("unknown"), false);
  const destinations = new Set(["guided-data-display", "guided-form-controls", "guided-dashboard", "guided-detail-patterns", "application-workbench"]);
  for (const exercise of guidedExercises) {
    assert.ok(exercise.userTask.length > 20);
    assert.ok(exercise.why.length > 20);
    assert.ok(exercise.test.length > 20);
    assert.ok(exercise.followUp.length > 20);
    assert.ok(exercise.choices.length >= 2);
    assert.ok(exercise.choices.some((choice) => choice.id === exercise.suggested));
    assert.ok(destinations.has(exercise.destination));
    assert.ok(page.includes('id="' + exercise.destination + '"') || exercise.destination === "application-workbench");
  }
  assert.match(ui, /type="radio"/);
  assert.match(ui, /Compare my decision/);
  assert.match(ui, /Worked example and tradeoffs/);
  assert.match(ui, /Reset answer/);
  assert.match(ui, /Nothing is saved|not recorded|not grades/);
  assert.match(page, /<GuidedPracticeExplorer \/>/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});

test("Design Lab quick navigation and workbench step focus remain accessible", () => {
  const page = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  const workbench = readFileSync(new URL("../components/design-lab/account-workflow-workbench.tsx", import.meta.url), "utf8");
  for (const anchor of ["guided-practice", "component-learning", "application-workbench"]) {
    assert.match(page, new RegExp('href="#' + anchor + '"'));
    assert.ok(page.includes('<GuidedPracticeExplorer />') || anchor !== "guided-practice");
  }
  assert.match(workbench, /stepHeadingRef\.current\?\.focus\(\)/);
  assert.match(workbench, /ref=\{stepHeadingRef\} tabIndex=\{-1\}/);
  assert.match(workbench, /onClick=\{reset\}/);
  assert.match(workbench, /aria-current=\{stage === item\.id/);
  assert.match(page, /designLabAvailable\(\)/);
  assert.match(page, /notFound\(\)/);
});
