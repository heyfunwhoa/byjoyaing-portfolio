import { expect, test } from "@playwright/test";

test("About orbit is discoverable and keyboard selection reveals the matching evidence", async ({ page }) => {
  await page.goto("/about#how-i-work");
  const orbit = page.locator("#how-i-work");
  await expect(orbit.getByRole("tab", { name: "Strategist", exact: true })).toBeVisible();
  await expect(orbit.getByRole("region", { name: "Enterprise selling overview" })).toBeVisible();
  const strategist = orbit.getByRole("tab", { name: "Strategist", exact: true });
  await strategist.click();
  await expect(orbit.getByRole("tabpanel", { name: "Strategist", exact: true })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(orbit.getByRole("tab", { name: "Leader", exact: true })).toBeFocused();
  await expect(orbit.getByRole("tabpanel", { name: "Leader", exact: true })).toBeVisible();
  await orbit.getByRole("button", { name: "Enterprise selling", exact: true }).click();
  await expect(orbit.getByRole("region", { name: "Enterprise selling overview" })).toBeVisible();
});

for (const width of [375, 768, 1280]) {
  test(`About orbit remains contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about#how-i-work");
    await page.getByRole("tab", { name: "Builder", exact: true }).click();
    await expect(page.getByRole("tabpanel", { name: "Builder", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
