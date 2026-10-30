import { expect, test } from "@playwright/test";

for (const width of [375, 768, 1280]) {
  test(`systems examples at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ai-academy/systems");
    const section = page.getByRole("region", { name: "Make the invisible parts easier to understand." });
    const webhook = section.locator("figure").filter({ hasText: "One event. Several destinations." });
    await expect(webhook).toContainText("Ready. No requests");
    const timeline = webhook.getByRole("list", { name: "Delivery timeline" });
    await expect(timeline.locator('[aria-current="step"]')).toHaveCount(0);
    const step = webhook.getByRole("button", { name: "Send sample event", exact: true });
    await step.focus();
    await page.keyboard.press("Enter");
    await expect(webhook).toContainText("Attempt 1 failed");
    await expect(timeline.locator('[aria-current="step"]')).toContainText("First attempt fails");
    await webhook.getByRole("button", { name: "Show retry wait", exact: true }).click();
    await expect(webhook).toContainText("Backoff means waiting");
    await webhook.getByRole("button", { name: "Retry delivery", exact: true }).click();
    await expect(webhook).toContainText("Attempt 2 succeeded");
    for (let i = 0; i < 3; i++) await webhook.getByRole("button", { name: "Deliver same event again", exact: true }).click();
    await expect(webhook).toContainText("Duplicate recognized");
    await expect(timeline.locator('[aria-current="step"]')).toContainText("Duplicate is skipped");
    await expect(webhook.locator("dl > div").filter({ hasText: "Business actions" }).locator("dd")).toHaveText("1");
    await expect(webhook.locator("dl > div").filter({ hasText: "Duplicates skipped" }).locator("dd")).toHaveText("3");
    await webhook.getByRole("button", { name: "Reset delivery example" }).click();
    await expect(webhook).toContainText("Ready. No requests");
    await expect(webhook.locator("dl > div").filter({ hasText: "Attempts" }).locator("dd")).toHaveText("0");
    await section.getByRole("radio", { name: "Signed out", exact: true }).focus();
    await page.keyboard.press("ArrowDown");
    await expect(section.getByRole("radio", { name: "Signed in, no permission", exact: true })).toBeChecked();
    await expect(section).toContainText("403 · Editing is not allowed");
    const diagram = section.getByRole("group", { name: "Access decision diagram" });
    await expect(diagram.locator('[data-selected="true"]')).toContainText("No → 403");
    await page.keyboard.press("ArrowDown");
    await expect(section).toContainText("200 · Sample edit allowed");
    await expect(diagram.locator('[data-selected="true"]')).toContainText("Yes → 200");
    await section.getByRole("radio", { name: "Signed out", exact: true }).check();
    await expect(section).toContainText("401 · Sign in first");
    await expect(diagram.locator('[data-selected="true"]')).toContainText("No → 401");
    await expect(timeline.locator('[aria-current="step"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(section.getByRole("link", { name: "Follow a request through an app" })).toHaveAttribute("href", "/ai-academy/journeys/follow-one-click");
  });
}
