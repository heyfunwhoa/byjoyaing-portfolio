import { expect, test } from "@playwright/test";

/**
 * Synthetic Design Lab registry contracts.
 * Browser tests exercise the Storybook example, not a production integration.
 */
const story = "/iframe.html?id=design-lab-registry-patterns--explorer-detail-and-compare&viewMode=story";

test("registry demo filters, resets and retains observable count", async ({ page }) => {
  await page.goto(story);
  await expect(page.getByRole("status")).toContainText("4 matching fictional records");
  await page.getByRole("searchbox", { name: "Search technologies" }).fill("atlas");
  await expect(page.getByRole("status")).toContainText("1 matching fictional records");
  await expect(page.getByRole("rowheader", { name: "Atlas Table Demo" })).toBeVisible();
  await page.getByRole("combobox", { name: "Category" }).selectOption("Diagram");
  await expect(page.getByText("No matches. Clear filters")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("status")).toContainText("4 matching fictional records");
});

test("detail opens by keyboard and returns focus after Escape", async ({ page }) => {
  await page.goto(story);
  const inspect = page.getByRole("button", { name: "Inspect Atlas Table Demo" });
  await inspect.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Technology details" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Unverified");
  await expect(page.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(inspect).toBeFocused();
});

test("select two to four fictional tools and compare aligned fields", async ({ page }) => {
  await page.goto(story);
  await page.getByRole("checkbox", { name: "Compare Atlas Table Demo" }).check();
  await page.getByRole("checkbox", { name: "Compare Birch Flow Demo" }).check();
  await expect(page.getByRole("button", { name: "Compare selected" })).toBeEnabled();
  await page.getByRole("button", { name: "Compare selected" }).click();
  const dialog = page.getByRole("dialog", { name: "Compare technologies" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("columnheader", { name: "Atlas Table Demo" })).toBeVisible();
  await expect(dialog.getByRole("columnheader", { name: "Birch Flow Demo" })).toBeVisible();
  await expect(dialog.getByRole("rowheader", { name: "License" })).toBeVisible();
  await expect(dialog.getByRole("cell", { name: "Unverified" })).toBeVisible();
  await expect(dialog.getByRole("cell", { name: "Unknown" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Compare selected" })).toBeFocused();
});

test("registry Storybook example contains overflow at narrow widths", async ({ page }) => {
  await page.goto(story);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("region", { name: "Technology registry table" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
