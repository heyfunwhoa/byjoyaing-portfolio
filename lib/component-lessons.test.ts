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
