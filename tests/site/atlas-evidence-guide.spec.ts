import { expect, test } from "@playwright/test";

test("Atlas evidence guide separates demonstrated sample from unverified product claims", async ({ page }) => {
  await page.goto("/work/detector-coverage-atlas");
  const guide = page.getByRole("complementary", { name: "What this comparison can tell you" });
  await expect(guide).toBeVisible();
  await expect(guide.getByText(/fixed example of three sources and five credential types/i)).toBeVisible();
  await expect(guide.getByText(/live detection, complete coverage, verified product gaps/i)).toBeVisible();
  const definitions = guide.getByRole("link", { name: "Read the evidence states" });
  const attribution = guide.getByRole("link", { name: "Inspect source attribution" });
  await expect(definitions).toHaveAttribute("href", "#read-the-cell");
  await expect(attribution).toHaveAttribute("href", "#attribution");
  await definitions.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#read-the-cell$/);
  await expect(page.getByRole("heading", { name: "Gray is not a gap." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
