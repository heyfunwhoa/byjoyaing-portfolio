import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { featuredWorkSlides } from "./featured-work.ts";
import { kindBySlug } from "./portfolio-kind.ts";
import { publicStories } from "./public-stories.ts";

const forbidden = [/\$/, /Head of Sales/i, /Joy Index/i, /\d{3}[-. ]\d{3}[-. ]\d{4}/];

test("featured slides start with public Work stories and label Side Quests separately", () => {
  const slides = featuredWorkSlides();
  assert.ok(slides.length >= 5);
  assert.deepEqual(
    slides.slice(0, 3).map((slide) => slide.id),
    publicStories.map((story) => story.id),
  );
  assert.equal(slides[0].href, "/work#enterprise-sales");
  const work = slides.filter((slide) => slide.collection === "Work");
  const quests = slides.filter((slide) => slide.collection === "Side Quests");
  assert.ok(work.length >= 3);
  assert.ok(quests.length >= 1);
  assert.ok(slides.findIndex((slide) => slide.collection === "Side Quests") > slides.findIndex((slide) => slide.collection === "Work"));
  for (const slide of work) assert.equal(slide.source, "employer");
  for (const slide of quests) {
    assert.equal(slide.source, "independent");
    const slug = slide.href.replace("/work/", "");
    assert.equal(kindBySlug[slug], "side-quest");
  }
  for (const slide of slides) {
    assert.ok(slide.summary.trim().length > 20);
    for (const pattern of forbidden) assert.doesNotMatch(`${slide.title} ${slide.summary}`, pattern);
  }
});

test("source guard: Work mounts the carousel, homepage does not, and Embla is not set to autoplay", () => {
  const work = readFileSync(new URL("../app/work/page.tsx", import.meta.url), "utf8");
  assert.match(work, /<FeaturedWorkCarousel/);
  assert.match(work, /id="enterprise-sales"/);
  assert.match(work, /id="people-leadership"/);
  assert.match(work, /id="gtm-strategy"/);
  const carousel = readFileSync(new URL("../components/featured-work-carousel.tsx", import.meta.url), "utf8");
  assert.match(carousel, /@\/components\/ui\/carousel/);
  assert.match(readFileSync(new URL("../components/ui/carousel.tsx", import.meta.url), "utf8"), /aria-roledescription="carousel"/);
  assert.doesNotMatch(carousel, /Autoplay|autoplay|loop:\s*true/);
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /basis-full md:basis-1\/2 lg:basis-1\/3/);
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(home, /FeaturedWorkCarousel|featured-work-carousel/);
});
