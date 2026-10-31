import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { lessons } from "../ai-academy.ts";
import { learningPaths } from "./learning-paths.ts";
import {
  lessonGuidance,
  getLessonGuidance,
  academyResources,
} from "./lesson-guidance.ts";

test("mission metadata covers every stable lesson ID and has no orphan or cyclic prerequisites", () => {
  const ids = lessons.map((l) => l.slug);
  assert.deepEqual(Object.keys(lessonGuidance).sort(), [...ids].sort());
  function visit(id: string, ancestors: string[] = []) {
    assert.ok(
      !ancestors.includes(id),
      `Prerequisite cycle: ${[...ancestors, id]}`,
    );
    const metadata = getLessonGuidance(id);
    assert.ok(metadata);
    assert.equal(metadata.availability, "available");
    for (const prerequisite of metadata.prerequisites) {
      assert.ok(ids.includes(prerequisite));
      visit(prerequisite, [...ancestors, id]);
    }
  }
  ids.forEach((id) => visit(id));
  assert.equal(getLessonGuidance("missing"), undefined);
  assert.equal(getLessonGuidance("toString"), undefined);
});

test("paths reference available lessons and AI basics is not a universal prerequisite", () => {
  for (const path of learningPaths) {
    assert.equal(new Set(path.slugs).size, path.slugs.length);
    for (const slug of path.slugs)
      assert.equal(getLessonGuidance(slug)?.availability, "available");
  }
  assert.equal(
    learningPaths.find((p) => p.id === "foundations")?.slugs[0],
    "what-is-ai",
  );
  for (const slug of [
    "frontend-building-blocks",
    "idea-to-verified-release",
    "package-registries",
    "privacy",
    "verification",
  ]) {
    assert.deepEqual(getLessonGuidance(slug)?.prerequisites, []);
  }
});

test("practice and guide destinations resolve to existing local routes or public references", () => {
  const resources = Object.values(lessonGuidance).flatMap((item) => {
    const metadata = item as ReturnType<typeof getLessonGuidance>;
    return [metadata?.preparation, metadata?.practice, metadata?.guide].filter(
      Boolean,
    );
  });
  for (const resource of [...resources, ...academyResources]) {
    assert.ok(resource);
    if (resource.href.startsWith("/"))
      assert.ok(existsSync(`app${resource.href}/page.tsx`), resource.href);
    else {
      assert.match(
        resource.href,
        /^https:\/\/(github\.com|developer\.mozilla\.org)\//,
      );
      const local = resource.href.split("/blob/main/")[1];
      if (local) assert.ok(existsSync(local), local);
    }
  }
  assert.equal(
    new Set(academyResources.map((item) => item.id)).size,
    academyResources.length,
  );
  assert.equal(
    academyResources.find((item) => item.id === "systems-roadmap")
      ?.availability,
    "partial",
  );
  assert.equal(
    academyResources.find((item) => item.id === "programming")?.availability,
    "partial",
  );
});

test("every catalog lesson has a path and included prerequisites precede dependent lessons", () => {
  const covered = new Set<string>(learningPaths.flatMap((path) => [...path.slugs]));
  assert.deepEqual([...covered].sort(), lessons.map((lesson) => lesson.slug).sort());
  for (const path of learningPaths) {
    const slugs: readonly string[] = path.slugs;
    for (const slug of slugs) {
      for (const prerequisite of getLessonGuidance(slug)?.prerequisites ?? []) {
        assert.ok(slugs.includes(prerequisite), `${path.id}: missing preparation ${prerequisite}`);
        assert.ok(slugs.indexOf(prerequisite) < slugs.indexOf(slug), `${path.id}: ${prerequisite} must precede ${slug}`);
      }
    }
  }
  assert.equal(lessons[0].slug, "what-is-ai");
});
