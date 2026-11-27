import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../ai-academy.ts";
import {
  atlasInstallGuide,
  findInstallMethod,
  installMethods,
  installSituations,
  installSources,
  installGlossary,
  otherOptions,
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
  for (const method of installMethods) assert.ok(method.plain.length > 60, `${method.id} needs a plain summary`);
});

test("every method explains how to run it in plain words", () => {
  for (const method of installMethods) {
    assert.ok(method.walkthrough.length >= 2, `${method.id} needs a walkthrough`);
    assert.ok(method.walkthrough.every((step) => step.text.length > 15));
    assert.ok(method.youllSee.length > 20);
  }
  const script = findInstallMethod("script").walkthrough.map((step) => step.code ?? "").join(" ");
  for (const part of ["curl -sSfL", "| sh", "-s --", "-b /usr/local/bin"]) assert.ok(script.includes(part), part);
  const docker = findInstallMethod("docker").walkthrough.map((step) => step.code ?? "").join(" ");
  for (const part of ["--rm", "-it", "-v", "trufflesecurity/trufflehog:latest"]) assert.ok(docker.includes(part), part);
});

test("other options are documented variations with real sources", () => {
  assert.ok(otherOptions.length >= 5);
  for (const option of otherOptions) {
    assert.ok(option.sources.length >= 1);
    for (const id of option.sources) assert.ok(installSources[id]?.url.startsWith("https://"));
  }
  const verified = otherOptions.find((o) => o.title.includes("genuine"));
  assert.match(verified?.command ?? "", /sh -s -- -v -b \/usr\/local\/bin$/);
});

test("the lab points to the Atlas install guide over https", () => {
  const url = new URL(atlasInstallGuide.url);
  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, "detector-coverage-atlas.vercel.app");
  assert.equal(url.pathname, "/how-it-works");
  assert.equal(url.hash, "#install");
});
