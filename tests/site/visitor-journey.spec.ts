import { expect, test } from "@playwright/test";

// Cross-page smoke complements the existing per-route, mobile, and form suites.
// It never submits contact forms or calls external services.
test("visitor can discover a documented project and reach Contact", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run explicit width matrix once.");
  await page.route("**/api/contact", (route) => route.abort());
  await page.route("**/api/request-resume", (route) => route.abort());

  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator('main a[href="/side-quests"]').first().click();
    await expect(page).toHaveURL(/\/side-quests$/);
    await page.getByRole("link", { name: "Browse all independent projects" }).click();
    await expect(page).toHaveURL(/\/projects#directory$/);

    const search = page.getByRole("searchbox", { name: "Search projects" });
    await search.fill("detector coverage");
    await expect(page.getByRole("status")).toHaveText("1 matching project");
    const card = page.locator("#directory article").filter({
      has: page.getByRole("heading", { name: "Detector Coverage Atlas", exact: true }),
    });
    await card.locator('a[href^="/work/detector-coverage-atlas?"]').last().click();
    await expect(page).toHaveURL(/\/work\/detector-coverage-atlas\?from=projects/);
    await expect(page.getByRole("heading", { name: "What this comparison can tell you" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Inspect source attribution" })).toHaveAttribute("href", "#attribution");

    const nav = page.getByRole("navigation", { name: "Primary" });
    const toggle = nav.getByRole("button", { name: "Open navigation menu" });
    if (await toggle.isVisible()) await toggle.click();
    await nav.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
});
