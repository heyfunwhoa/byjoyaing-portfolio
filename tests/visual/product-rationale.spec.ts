import { expect, test } from "@playwright/test";

test("product design rationale distinguishes hypotheses from tested evidence", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-product-rationale--comparison&viewMode=story");
  const section = page.locator("#product-rationale");
  await expect(section.getByRole("heading", { name: "Decide why before deciding what." })).toBeVisible();
  await expect(section.getByText(/No visitor comprehension study has been completed/)).toBeVisible();
  await section.getByRole("button", { name: "Continuous animation" }).click();
  await expect(section.getByText(/Risks distraction and unnecessary performance cost/)).toBeVisible();
  await section.getByRole("button", { name: "Projects discovery" }).click();
  await expect(section.getByText(/public directory already has search/)).toBeVisible();
  await section.getByRole("button", { name: "Case-study evidence" }).click();
  await expect(section.getByText(/no observed reader study/)).toBeVisible();
  await expect(section.getByRole("button", { name: "Case-study evidence" })).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
