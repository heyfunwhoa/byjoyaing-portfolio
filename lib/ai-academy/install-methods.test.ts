import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../ai-academy.ts";
import {
  findInstallMethod,
  installMethods,
  installSituations,
  installSources,
  installGlossary,
  verifyCommands,
  verifyIfNothing,
} from "./install-methods.ts";

test("every situation points at a real method and each method is complete", () => {
  for (const situation of installSituations) {
    const method = findInstallMethod(situation.method);
    assert.ok(situation.why.length > 20);
    assert.ok(method.command || method.manualStep, `${method.id} needs a command or a manual step`);
    assert.ok(method.updates.length > 10);
    assert.ok(method.trust.length > 10);
  }
  assert.equal(new Set(installMethods.map((m) => m.id)).size, 5);
  assert.equal(new Set(installSituations.map((s) => s.id)).size, installSituations.length);
});

test("the hook situation recommends Homebrew and Docker is the one route a hook cannot find", () => {
  assert.equal(installSituations.find((s) => s.id === "hook")?.method, "homebrew");
  const unreachable = installMethods.filter((m) => m.hookFinds.answer === "No").map((m) => m.id);
  assert.deepEqual(unreachable, ["docker"]);
  assert.deepEqual([...verifyCommands], ["command -v trufflehog", "trufflehog --version"]);
});

test("commands match the documented sources and every source is https", () => {
  assert.equal(findInstallMethod("homebrew").command, "brew install trufflehog");
  assert.match(findInstallMethod("script").command ?? "", /scripts\/install\.sh \| sh -s -- -b \/usr\/local\/bin$/);
  assert.match(findInstallMethod("source").command ?? "", /go install$/);
  for (const method of installMethods) {
    assert.ok(method.sources.includes("trufflehog-readme"));
  }
  for (const source of Object.values(installSources)) {
    assert.ok(source.url.startsWith("https://"));
  }
});

test("the chooser lives in the existing package-registries lesson; catalog size is unchanged", () => {
  assert.ok(lessons.some((lesson) => lesson.slug === "package-registries"));
  assert.equal(lessons.length, 39);
});

test("beginner support: glossary covers the lab's jargon and failure steps are actionable", () => {
  const terms = installGlossary.map((item) => item.term).join(" ");
  for (const word of ["PATH", "shell", "Git hook", "CI", "Container", "cosign"]) {
    assert.match(terms, new RegExp(word));
  }
  assert.equal(verifyIfNothing.length, 3);
  for (const step of verifyIfNothing) {
    if (step.link) assert.ok(installSources[step.link.source]);
  }
  assert.ok(findInstallMethod("homebrew").beginnerNote?.includes("brew.sh"));
  assert.match(findInstallMethod("docker").beginnerNote ?? "", /does not install anything/);
});
