import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
const base = process.argv[2] ?? "http://127.0.0.1:3100";
const output =
  process.argv[3] ?? "/workspace/scratch/frontend-comparison/evidence";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const results = [];
try {
  for (const variant of ["native", "fumadocs"])
    for (const width of [375, 768, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`${base}/${variant}`);
      await page.getByTestId("frontend-lesson").waitFor();
      const lesson = page.getByTestId("frontend-lesson");
      assert.equal(await lesson.locator("input:checked").count(), 0);
      await lesson.getByLabel("Content source/props", { exact: true }).focus();
      await page.keyboard.press("Space");
      assert.match(
        await lesson.getByRole("status").first().innerText(),
        /Review:.*words are correct/s,
      );
      await page.keyboard.press("ArrowDown");
      assert.match(
        await lesson.getByRole("status").first().innerText(),
        /Correct.*wrapping/s,
      );
      assert.equal(
        await lesson
          .getByLabel("Styling and responsive layout", { exact: true })
          .evaluate((e) => document.activeElement === e),
        true,
      );
      await lesson.getByLabel("Increase padding", { exact: true }).check();
      await lesson.getByLabel("Add a hover effect", { exact: true }).check();
      await lesson
        .getByLabel("The href, matching route and deployed revision", {
          exact: true,
        })
        .check();
      await lesson
        .getByLabel(
          "Use a semantic anchor with a valid href, descriptive text and visible focus; test keyboard activation",
          { exact: true },
        )
        .check();
      await lesson
        .getByRole("button", { name: "Reset practice and checks" })
        .focus();
      await page.keyboard.press("Enter");
      assert.equal(await lesson.locator("input:checked").count(), 0);
      await lesson
        .getByText("Open the self-review rubric", { exact: true })
        .focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await lesson.locator("details").last().getAttribute("open"),
        "",
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, `${variant} overflow ${width}`);
      const resources = await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .filter((e) => /\.(js|css)(\?|$)/.test(e.name))
          .map((e) => ({
            url: new URL(e.name).pathname,
            bytes: e.decodedBodySize,
          })),
      );
      await page.screenshot({
        path: `${output}/${variant}-${width}.png`,
        fullPage: true,
      });
      assert.deepEqual(errors, []);
      results.push({
        variant,
        width,
        overflow,
        keyboardAndFeedback: "passed",
        resources,
        resourceBytes: resources.reduce((s, r) => s + r.bytes, 0),
      });
      await context.close();
    }
  writeFileSync(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    results.map((r) => ({
      variant: r.variant,
      width: r.width,
      overflow: r.overflow,
      keyboardAndFeedback: r.keyboardAndFeedback,
      resourceBytes: r.resourceBytes,
    })),
  );
} finally {
  await browser.close();
}
