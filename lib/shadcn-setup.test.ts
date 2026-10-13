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

function isDesignLab(file: string) {
  return (
    file.startsWith("app/design-lab/") ||
    file.startsWith("components/design-lab/")
  );
}

test("shadcn config keeps radix-nova and the configured registries", () => {
  const config = JSON.parse(read("components.json")) as {
    style: string;
    registries: Record<string, string>;
  };
  assert.equal(config.style, "radix-nova");
  assert.equal(config.registries["@keyline"], "https://keylineicons.com/r/{name}.json");
  assert.equal(config.registries["@magicui"], "https://magicui.design/r/{name}");
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

test("installed primitives are present and public adoption stays explicitly scoped", () => {
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
    "components/ui/bento-grid.tsx",
  ]) {
    assert.equal(read(file).length > 0, true, file);
  }

  const layout = read("app/layout.tsx");
  assert.match(layout, /TooltipProvider/);
  assert.match(layout, /Geist,/);
  assert.equal(layout.includes("Instrument_Serif"), false);
  assert.equal(layout.includes('from "geist"'), false);
  assert.equal(layout.includes("ThemeProvider"), false);

  // Public adoption is reviewed per component and page rather than globally banned.
  // FeaturedWorkCarousel wraps ui/carousel. Stakeholder map pilot adopts only
  // Button and Card in these two named wrappers; no global primitive exemption.
  const scopedImports: Record<string, string[]> = {
    "components/toolkit-explorer.tsx": ["@/components/ui/tabs", "@/components/ui/button"],
    "components/stakeholder-map/stakeholder-node.tsx": ["@/components/ui/button"],
    "components/stakeholder-map/stakeholder-detail.tsx": ["@/components/ui/card"],
  };
  const offenders: string[] = [];
  for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
    if (
      file === "app/layout.tsx" ||
      file === "components/featured-work-carousel.tsx" ||
      isDesignLab(file)
    ) {
      continue;
    }
    const source = read(file);
    const imports = [...source.matchAll(/from\s+["'](@\/components\/ui\/[^"']+)["']/g)].map((match) => match[1]);
    const unreviewed = imports.filter(item => !scopedImports[file]?.includes(item));
    if (unreviewed.length) offenders.push(`${file}: ${unreviewed.join(", ")}`);
  }
  assert.deepEqual(offenders, []);
  assert.match(read("app/work/page.tsx"), /from ["']@\/components\/featured-work-carousel["']/);
  assert.match(read("app/work/page.tsx"), /<FeaturedWorkCarousel\b/);
  assert.match(read("components/featured-work-carousel.tsx"), /from ["']@\/components\/ui\/carousel["']/);
  assert.match(read("components/featured-work-carousel.tsx"), /<Carousel\b/);
});

test("bento grid and lifeline stay inside the design lab", () => {
  assert.equal(read("components/lifeline/lifeline.tsx").includes("export function Lifeline"), true);
  assert.equal(read("components/lifeline/lifeline-labels.tsx").includes("Age"), false);
  assert.match(read("components/lifeline/lifeline-labels.tsx"), /Co\./);
  assert.equal(read("components/experience-timeline.tsx").includes("lifeline"), false);

  const packageJson = read("package.json");
  assert.equal(packageJson.includes('"geist"'), false);
  assert.equal(packageJson.includes("react-bits"), false);
  assert.equal(packageJson.includes('"motion"'), false);

  const css = read("app/globals.css");
  assert.match(css, /\.lifeline-marker-intro,\s*\.lifeline-labels-intro \{\s*opacity: 1;/);

  let lifelinePage = false;
  try {
    read("app/lifeline/page.tsx");
    lifelinePage = true;
  } catch {
    lifelinePage = false;
  }
  assert.equal(lifelinePage, false);

  const labUsers: string[] = [];
  const publicUsers: string[] = [];
  for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
    if (file.startsWith("components/lifeline/") || file.startsWith("components/ui/")) continue;
    const source = read(file);
    const usesLibrary =
      source.includes("@/components/ui/bento-grid") ||
      source.includes("@/components/lifeline");
    if (!usesLibrary) continue;
    if (isDesignLab(file)) labUsers.push(file);
    else publicUsers.push(file);
  }
  assert.deepEqual(publicUsers, []);
  assert.ok(labUsers.includes("components/design-lab/demos.tsx"));
});
