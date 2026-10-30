import { expect, test } from "@playwright/test";

test("About orbit is discoverable and keyboard selection reveals the matching evidence", async ({
  page,
}) => {
  await page.goto("/about#how-i-work");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Strategist. Leader. Builder.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "People first. Problem-driven. Systems-minded.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Beyond work", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Career at a glance")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Read the experience timeline" }),
  ).toHaveAttribute("href", "/experience");
  const orbit = page.locator("#how-i-work");
  await expect(
    orbit.getByRole("tab", { name: "Strategist", exact: true }),
  ).toBeVisible();
  await expect(
    orbit.getByRole("region", { name: "Enterprise selling overview" }),
  ).toBeVisible();
  const strategist = orbit.getByRole("tab", {
    name: "Strategist",
    exact: true,
  });
  await strategist.click();
  await expect(
    orbit.getByRole("tabpanel", { name: "Strategist", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    orbit.getByRole("tab", { name: "Leader", exact: true }),
  ).toBeFocused();
  await expect(
    orbit.getByRole("tabpanel", { name: "Leader", exact: true }),
  ).toBeVisible();
  await orbit
    .getByRole("button", { name: "Enterprise selling", exact: true })
    .click();
  await expect(
    orbit.getByRole("region", { name: "Enterprise selling overview" }),
  ).toBeVisible();
});

for (const width of [375, 768, 1280]) {
  test(`About orbit remains contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about#how-i-work");
    await page.getByRole("tab", { name: "Builder", exact: true }).click();
    await expect(
      page.getByRole("tabpanel", { name: "Builder", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

// 640px checks the reflow width of a 1280px window at 200% zoom.
// It is not a substitute for manual browser zoom or a screen-reader review.
for (const width of [375, 640, 768, 1280]) {
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    test(`About hero and interests at ${width}px with motion ${reducedMotion}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "site-desktop", "Explicit viewport matrix runs once.");
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion });
      await page.goto("/about");
      const hero = page.locator("main > section").first();
      const image = hero.locator("img");
      await expect(image).toHaveCount(1);
      await expect(image).toHaveAttribute("alt", "");
      await expect(image).toHaveAttribute("src", /orbit-filled-nodes/);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) =>
        element.complete && element.naturalWidth > 0,
      )).toBe(true);
      expect(await image.evaluate((element) => element.closest('[aria-hidden="true"]') !== null)).toBe(true);

      const section = page.getByRole("region", { name: "Beyond work", exact: true });
      const details = section.locator("details");
      const summary = section.locator("summary");
      await expect(section).toContainText("traveling");
      await expect(details).not.toHaveAttribute("open");
      await expect(section.locator("li")).toHaveCount(4);
      await expect(section.locator("li").first()).not.toBeVisible();
      // Both DOM order (assistive technology) and rendered order stay professional-first.
      const work = page.getByRole("link", { name: "Professional Work", exact: true });
      await work.focus();
      await page.keyboard.press("Tab"); // Playbooks and practical guides
      await page.keyboard.press("Tab"); // Independent experiments
      await page.keyboard.press("Tab"); // native interests disclosure
      await expect(summary).toBeFocused();
      expect(await summary.evaluate((element) => {
        const style = getComputedStyle(element);
        return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
      })).toBe(true);
      expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect((await work.boundingBox())!.y).toBeLessThan((await section.boundingBox())!.y);

      await page.keyboard.press("Enter");
      await expect(details).toHaveAttribute("open", "");
      for (const item of await section.locator("li").all()) await expect(item).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const element of [image, summary, section]) {
        const bounds = (await element.boundingBox())!;
        expect(bounds.x).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      }
      // Decorative artwork and the disclosure should stay static under either preference.
      expect(await hero.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
      expect(await section.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
      await page.keyboard.press("Space");
      await expect(details).not.toHaveAttribute("open");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "Start a conversation", exact: true })).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(summary).toBeFocused();
    });
  }
}

