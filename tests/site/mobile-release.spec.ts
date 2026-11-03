import { expect, test } from "@playwright/test";

// Focused release reflow smoke tests. These are viewport checks, not manual browser zoom.
test("Work, Projects, Experience and Field Notes fit small viewports", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run the explicit mobile matrix once.");
  for (const width of [320, 375, 640, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/work", "/projects", "/experience", "/field-notes"]) {
      await page.goto(route);
      await expect(page.getByRole("main")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} overflowed at ${width}px`,
      ).toBe(true);
    }
  }
});

test("Mobile Work links and Projects disclosure have accessible touch targets", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run the explicit mobile matrix once.");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/work");
  for (const link of [
    page.getByRole("link", { name: "Explore case study", exact: false }).first(),
    page.getByRole("link", { name: "View professional timeline", exact: false }),
  ]) {
    await expect(link).toBeVisible();
    const bounds = await link.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
  await page.goto("/projects");
  const summary = page.locator("#systems summary");
  await expect(summary).toBeVisible();
  const bounds = await summary.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#systems details")).toHaveAttribute("open", "");
});
