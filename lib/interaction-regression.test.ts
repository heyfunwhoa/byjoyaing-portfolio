import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("reduced motion still clears animation names and collapses transitions", () => {
  const css = read("app/globals.css");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation-name: none/);
  assert.match(css, /transition-duration: \.01ms/);
  assert.match(css, /\.section-enter/);
  assert.doesNotMatch(css, /from \{ opacity: 0/);
});

test("featured carousel keeps 1/2/3 card bases, visible controls, and no autoplay", () => {
  const carousel = read("components/featured-work-carousel.tsx");
  assert.match(carousel, /basis-full/);
  assert.match(carousel, /md:basis-1\/2/);
  assert.match(carousel, /lg:basis-1\/3/);
  assert.match(carousel, /data-slot="carousel-previous"/);
  assert.match(carousel, /data-slot="carousel-next"/);
  assert.match(carousel, /@\/components\/icons\/arrow-left/);
  assert.match(carousel, /@\/components\/icons\/arrow-right/);
  assert.match(carousel, /aria-live="polite"/);
  assert.doesNotMatch(carousel, /Autoplay|autoplay/);
  assert.match(carousel, /loop: false/);
  assert.match(carousel, /watchDrag: !reduced/);
});

test("Storybook is not installed; the design lab is the visual preview", () => {
  const pkg = read("package.json");
  assert.doesNotMatch(pkg, /"storybook"|@storybook\//);
  assert.doesNotMatch(pkg, /"motion"/);
  const lab = read("app/design-lab/page.tsx");
  assert.match(lab, /<FeaturedWorkCarousel/);
  assert.match(lab, /<FeaturedSideQuestStrip/);
  assert.match(lab, /Storybook is not installed/);
});

test("Side Quest strip is scroll-snap, not a second Embla carousel", () => {
  const strip = read("components/featured-side-quest-strip.tsx");
  assert.match(strip, /snap-x/);
  assert.match(strip, /snap-mandatory/);
  assert.match(strip, /snap-start/);
  assert.match(strip, /overflow-x-auto/);
  assert.match(strip, /motion-reduce:scroll-auto/);
  assert.match(strip, /bg-surface-sage/);
  assert.match(strip, /ProjectStatusPill/);
  assert.doesNotMatch(strip, /@\/components\/ui\/carousel|embla-carousel-react/);
  assert.doesNotMatch(strip, /data-slot="carousel-previous"|data-slot="carousel-next"|aria-live="polite"/);
});
