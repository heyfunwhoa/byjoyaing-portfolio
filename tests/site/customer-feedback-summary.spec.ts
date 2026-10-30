import { expect, test } from "@playwright/test";

for (const width of [375, 768, 1280]) {
  test(`feedback overview and theme comparison at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/customer-feedback-intelligence");
    await expect(page.getByRole("region", { name: "Feedback demo overview" })).toBeVisible();
    await page.getByRole("tab", { name: "Theme intelligence", exact: true }).click();
    const comparison = page.locator("figure").filter({ hasText: "Feedback volume by theme" });
    await expect(comparison).toBeVisible();
    await expect(comparison).toContainText("volume alone is not urgency");
    const before = await comparison.innerText();
    await page.getByRole("button", { name: "Product status", exact: true }).click();
    await expect(comparison).toHaveText(before);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("tab", { name: "Theme intelligence", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Product decision", exact: true })).toBeFocused();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByRole("tab", { name: "Theme intelligence", exact: true }).click();
    await expect(comparison).toBeVisible();
  });
}
