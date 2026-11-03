import { expect, test } from "@playwright/test";

// Phone selector is intentionally native; desktop retains keyboard-operable tabs.
test("competitive workflow steps are all discoverable without horizontal clipping on phones", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Explicit viewport matrix runs once.");
  for (const width of [320, 375, 640]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/competitive-intelligence-engine#workflow");
    const selector = page.getByRole("combobox", { name: "Choose workflow step" });
    await expect(selector).toBeVisible();
    await expect(selector.locator("option")).toHaveCount(5);
    const bounds = await selector.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    await selector.selectOption("change");
    await expect(page.getByText("Change review", { exact: true })).toBeVisible();
    await selector.selectOption("brief");
    await expect(page.getByRole("combobox", { name: "Choose brief section" })).toBeVisible();
    await page.getByRole("combobox", { name: "Choose brief section" }).selectOption("questions");
    await expect(page.getByRole("tabpanel", { name: "Discovery questions" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("desktop competitive workflow retains tab navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Desktop keyboard sequence runs once.");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/competitive-intelligence-engine#workflow");
  await expect(page.getByRole("combobox", { name: "Choose workflow step" })).toBeHidden();
  const tabs = page.getByRole("tablist", { name: "Competitive workflow" });
  await expect(tabs).toBeVisible();
  const first = tabs.getByRole("tab", { name: /Competitive landscape/ });
  await first.focus();
  await first.press("ArrowDown");
  await expect(tabs.getByRole("tab", { name: /Change detection/ })).toBeFocused();
});
