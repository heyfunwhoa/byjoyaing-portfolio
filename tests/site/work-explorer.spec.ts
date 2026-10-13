import { expect, test } from "@playwright/test";

test("Work cards open, switch and close evidence with focus return", async ({ page }) => {
  await page.goto("/work");
  const sales = page.locator("#enterprise-sales button");
  const people = page.locator("#people-leadership button");
  await expect(sales).toHaveAttribute("aria-expanded", "false");
  await sales.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Enterprise Sales evidence", exact: true })).toBeVisible();
  await people.click();
  await expect(sales).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("region", { name: "People & Leadership evidence", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close story: People & Leadership" }).click();
  await expect(people).toBeFocused();
  await expect(people).toHaveAttribute("aria-expanded", "false");
});

for (const width of [375, 768, 1280]) {
  test(`Work deep links and overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work#gtm-strategy");
    await expect(page.locator("#gtm-strategy button")).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("region", { name: "GTM Strategy evidence", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
