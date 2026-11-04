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

test("Experience role disclosure and Projects map case link are usable on phones", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run mobile touch checks once.");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/experience");
  const roleSummary = page.locator("#career-details details summary").first();
  await expect(roleSummary).toBeVisible();
  const summaryBounds = await roleSummary.boundingBox();
  expect(summaryBounds).not.toBeNull();
  expect(summaryBounds!.height).toBeGreaterThanOrEqual(44);
  await roleSummary.focus();
  await roleSummary.press("Enter");
  await expect(roleSummary.locator("..")).toHaveAttribute("open", "");

  await page.goto("/projects");
  await page.locator("#systems summary").click();
  const caseLink = page.locator("#systems").getByRole("link", { name: "View case study" });
  await expect(caseLink).toBeVisible();
  const linkBounds = await caseLink.boundingBox();
  expect(linkBounds).not.toBeNull();
  expect(linkBounds!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test("About career disclosure and Work cards adapt to phone widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run mobile layout checks once.");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/about");
  const summary = page.getByText("Career at a glance", { exact: true });
  await expect(summary).toBeVisible();
  const bounds = await summary.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  await summary.focus();
  await summary.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");

  await page.goto("/work");
  const card = page.locator("#enterprise-sales button").first();
  await expect(card).toHaveCSS("min-height", "240px");
  await expect(card).toBeVisible();
  await card.click();
  await expect(page.getByRole("region", { name: "Enterprise Sales evidence" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
