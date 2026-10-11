import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function read(relativePath: string) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function sourceFiles(directory: string): string[] {
  const absolute = path.join(root, directory);
  const found: string[] = [];
  for (const entry of readdirSync(absolute)) {
    const relative = path.join(directory, entry);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) {
      if (relative === path.join("components", "ui")) continue;
      found.push(...sourceFiles(relative));
      continue;
    }
    if (entry.endsWith(".tsx") || entry.endsWith(".ts")) found.push(relative);
  }
  return found;
}

test("shadcn config keeps radix-nova and the keyline registry from main", () => {
  const config = JSON.parse(read("components.json")) as {
    style: string;
    registries: Record<string, string>;
  };
  assert.equal(config.style, "radix-nova");
  assert.equal(config.registries["@keyline"], "https://keylineicons.com/r/{name}.json");
});

test("brand tokens stay ivory, charcoal, and copper", () => {
  const css = read("app/globals.css");
  for (const token of [
    "--background: #f3efe6",
    "--foreground: #1b211d",
    "--muted: #4a504b",
    "--accent: #8a4b2a",
    "--card: #fbf8f2",
    "--border: #cfc3b3",
    "--ring: #8a4b2a",
    "--font-sans: var(--font-geist-sans)",
    "--font-mono: var(--font-geist-mono)",
    "--font-display: var(--font-geist-sans)",
  ]) {
    assert.equal(css.includes(token), true, token);
  }
  assert.equal(css.includes("--font-sans: var(--font-sans)"), false);
  assert.equal(css.includes("oklch("), false);
  assert.equal(css.includes("--radius-lg"), false);
  assert.equal(css.includes("@apply bg-background"), false);
  assert.equal(css.includes("tw-animate-css"), false);
  assert.equal(css.includes('@import "shadcn/tailwind.css"'), true);
  assert.match(css, /color:\s*var\(--foreground\)/);
});

test("installed primitives are present and pages do not adopt them", () => {
  for (const file of [
    "components/ui/card.tsx",
    "components/ui/tabs.tsx",
    "components/ui/tooltip.tsx",
    "components/ui/hover-card.tsx",
    "components/ui/avatar.tsx",
    "components/ui/sheet.tsx",
    "components/ui/dialog.tsx",
    "components/ui/accordion.tsx",
    "components/ui/carousel.tsx",
    "components/ui/button.tsx",
  ]) {
    assert.equal(read(file).length > 0, true, file);
  }

  const layout = read("app/layout.tsx");
  assert.match(layout, /TooltipProvider/);
  assert.match(layout, /Geist,/);
  assert.equal(layout.includes("Instrument_Serif"), false);

  const offenders: string[] = [];
  for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
    if (file === "app/layout.tsx") continue;
    const source = read(file);
    if (source.includes("@/components/ui/") || source.includes("components/ui/")) {
      offenders.push(file);
    }
  }
  assert.deepEqual(offenders, []);
});
