import { expect, test } from "@playwright/test";

test("evidence-first comparison preserves project facts and authentic sample captions", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-case-study-evidence--comparison&viewMode=story");
  const section = page.locator("#case-study-evidence");
  await expect(section.getByRole("heading", { name: /A project story, grounded in what exists/ })).toBeVisible();
  await expect(section.getByText("On-site sample · Illustrative coverage")).toBeVisible();
  await expect(section.getByText(/fixed, illustrative table/)).toBeVisible();

  await section.getByRole("button", { name: "Evidence first" }).click();
  await expect(section.getByRole("button", { name: "Evidence first" })).toHaveAttribute("aria-pressed", "true");
  await expect(section.getByText(/Not shown:/)).toBeVisible();

  await section.getByRole("button", { name: "Account Intelligence" }).click();
  await expect(section.getByText("Fictional account scenario")).toBeVisible();
  await expect(section.getByText(/no live feed, source retrieval, or sent outreach/i)).toBeVisible();
  await expect(section.getByRole("link", { name: /Open the current case study/ })).toHaveAttribute("href", "/work/account-intelligence");
});

test("evidence comparison has no document-wide horizontal overflow", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-case-study-evidence--comparison&viewMode=story");
  await expect(page.locator("#case-study-evidence")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
