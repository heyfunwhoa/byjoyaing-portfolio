import { expect, test } from "@playwright/test";
const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});
test("button is keyboard-focusable and matches approved baseline", async ({ page }) => {
  await page.goto(story("design-system-button--primary"));
  const button = page.getByRole("button", { name: "Explore the work" });
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#storybook-root")).toHaveScreenshot("button-primary.png");
});
test("avatar fallback and card match baselines", async ({ page }) => {
  await page.goto(story("design-system-avatar--initials"));
  await expect(page.getByText("KA")).toBeVisible();
  await expect(page.locator("#storybook-root")).toHaveScreenshot("avatar-initials.png");
  await page.goto(story("design-system-card--default"));
  await expect(page.getByText("Account Intelligence")).toBeVisible();
  await expect(page.locator("#storybook-root")).toHaveScreenshot("card-default.png");
});
test("carousel supports navigation and reduced motion", async ({ page }) => {
  await page.goto(story("design-system-carousel--default"));
  const region = page.getByRole("region", { name: /carousel/i });
  await expect(region).toBeVisible();
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(page.getByRole("button", { name: "Previous slide" })).toBeEnabled();
});
