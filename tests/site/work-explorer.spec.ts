import { expect, test } from "@playwright/test";

test("Work cards open, switch and close evidence with focus return", async ({ page }) => {
  await page.goto("/work");
  const sales = page.locator("#enterprise-sales button");
  const people = page.locator("#people-leadership button");
  await expect(sales).toHaveAttribute("aria-expanded", "false");
  await sales.focus();
  await page.keyboard.press("Enter");
  const salesStory = page.getByRole("region", { name: "Enterprise Sales evidence", exact: true });
  await expect(salesStory).toBeVisible();
  await expect(salesStory.getByText("Execution and decisions", { exact: true })).toBeVisible();
  await expect(salesStory.getByText("What I learned", { exact: true })).toBeVisible();
  await expect(salesStory.locator("details, summary")).toHaveCount(0);
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
    const story = page.getByRole("region", { name: "GTM Strategy evidence", exact: true });
    await expect(story).toBeVisible();
    for (const heading of ["Context", "My contribution", "Execution and decisions", "Evidence and limitations", "What I learned"]) {
      await expect(story.getByText(heading, { exact: true })).toBeVisible();
    }
    await expect(story.locator("details, summary")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
