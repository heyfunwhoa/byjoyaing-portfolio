import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { featuredSideQuestSlides, featuredWorkSlides } from "./featured-work.ts";
import { kindBySlug } from "./portfolio-kind.ts";
import { publicStories } from "./public-stories.ts";

const forbidden = [/\$/, /Head of Sales/i, /Joy Index/i, /\d{3}[-. ]\d{3}[-. ]\d{4}/];

test("featured Work slides are employer stories only", () => {
  const slides = featuredWorkSlides();
  assert.ok(slides.length >= 3);
  assert.deepEqual(
    slides.slice(0, 3).map((slide) => slide.id),
    publicStories.map((story) => story.id),
  );
  assert.equal(slides[0].href, "/work#enterprise-sales");
  for (const slide of slides) {
    assert.equal(slide.collection, "Work");
    assert.equal(slide.source, "employer");
    assert.equal(slide.href.startsWith("/side-quests"), false);
    assert.ok(slide.summary.trim().length > 20);
    for (const pattern of forbidden) assert.doesNotMatch(`${slide.title} ${slide.summary}`, pattern);
  }
});

test("Side Quest slides stay on /side-quests and are not mixed into Work", () => {
  const quests = featuredSideQuestSlides();
  assert.ok(quests.length >= 3);
  for (const slide of quests) {
    assert.equal(slide.collection, "Side Quests");
    assert.equal(slide.source, "independent");
    assert.ok(slide.status);
    const slug = slide.href.replace("/work/", "");
    assert.equal(kindBySlug[slug], "side-quest");
  }
  const workIds = new Set(featuredWorkSlides().map((slide) => slide.id));
  for (const slide of quests) assert.equal(workIds.has(slide.id), false);
});

test("source guard: Work uses the grid, homepage omits it, and lab carousel has no autoplay", () => {
  const work = readFileSync(new URL("../app/work/page.tsx", import.meta.url), "utf8");
  assert.match(work, /<FeaturedWorkCarousel[^>]*layout="grid"/);
  assert.match(work, /href="\/side-quests"/);
  assert.match(work, /id="enterprise-sales"/);
  assert.match(work, /id="people-leadership"/);
  assert.match(work, /id="gtm-strategy"/);
  const carousel = readFileSync(new URL("../components/featured-work-carousel.tsx", import.meta.url), "utf8");
  assert.match(carousel, /@\/components\/ui\/carousel/);
  assert.match(readFileSync(new URL("../components/ui/carousel.tsx", import.meta.url), "utf8"), /aria-roledescription="carousel"/);
  assert.doesNotMatch(carousel, /Autoplay|autoplay|loop:\s*true/);
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /basis-full pl-4 md:basis-1\/2 lg:basis-1\/3/);
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(home, /FeaturedWorkCarousel|featured-work-carousel/);
  assert.doesNotMatch(work, /FeaturedSideQuestStrip|featured-side-quest-strip/);
});

test("source guard: Side Quests mounts a snap strip, not Embla", () => {
  const quests = readFileSync(new URL("../app/side-quests/page.tsx", import.meta.url), "utf8");
  assert.match(quests, /<FeaturedSideQuestStrip/);
  assert.match(quests, /featuredSideQuestSlides\(\)/);
  assert.match(quests, /featuredSideQuestSlugs/);
  assert.match(quests, /BrandAvatar variant="builder"/);
  assert.doesNotMatch(quests, /FeaturedWorkCarousel|@\/components\/ui\/carousel|embla-carousel-react/);
  const strip = readFileSync(new URL("../components/featured-side-quest-strip.tsx", import.meta.url), "utf8");
  assert.match(strip, /snap-x snap-mandatory/);
  assert.match(strip, /bg-surface-sage/);
  assert.match(strip, /ProjectStatusPill/);
  assert.match(strip, /aria-label="Featured independent builds"/);
  assert.doesNotMatch(strip, /@\/components\/ui\/carousel|embla-carousel-react|data-slot="carousel-previous"|aria-live="polite"/);
});
