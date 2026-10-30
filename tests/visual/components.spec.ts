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

test("stakeholder map selects roles with the keyboard and preserves evidence context", async ({ page }) => {
  await page.goto(story("patterns-stakeholder-map--overview"));
  const map = page.getByRole("group", { name: "Interactive stakeholder map" });
  const buyer = map.getByRole("button", { name: /Economic buyer/ });
  await buyer.focus();
  await buyer.press("Enter");
  await expect(buyer).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Economic buyer", exact: true })).toBeVisible();
  await expect(page.getByText("Possible introduction · Security champion")).toBeVisible();
  await expect(page.getByText(/Hypothesis — Illustrative path; champion sponsorship/)).toBeVisible();
  await expect(map.getByRole("button", { name: /Security champion/ })).toHaveAttribute("aria-pressed", "false");
});

test("map handles empty, invalid and long-label fixtures without horizontal overflow", async ({ page }) => {
  await page.goto(story("patterns-stakeholder-map--empty"));
  await expect(page.getByRole("status")).toHaveText("No stakeholders are mapped yet.");
  await page.goto(story("patterns-stakeholder-map--invalid-relationship"));
  await expect(page.getByRole("status")).toContainText("Relationship endpoints");
  await expect(page.getByRole("button", { name: /Security champion/ })).toHaveCount(0);
  await page.goto(story("patterns-stakeholder-map--long-labels"));
  await expect(page.getByRole("button", { name: /Security operations and application security champion/ })).toBeVisible();
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fits).toBe(true);
});

test("desktop map stays readable and Fit view restores its framing", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(story("patterns-stakeholder-map--overview"));
  const canvas = page.locator(".react-flow");
  const card = canvas.getByRole("button", { name: /Security champion/ });
  await expect(card).toBeVisible();
  const cardWidth = async () => (await card.boundingBox())?.width ?? 0;
  await expect.poll(cardWidth).toBeGreaterThan(180);
  const initialWidth = await cardWidth();
  await canvas.getByRole("button", { name: "Zoom in on stakeholder map", exact: true }).click();
  await expect.poll(cardWidth).toBeGreaterThan(initialWidth + 10);
  await canvas.getByRole("button", { name: "Fit stakeholder map to view", exact: true }).click();
  await expect.poll(async () => Math.abs((await cardWidth()) - initialWidth)).toBeLessThan(2);
  const bounds = await canvas.boundingBox();
  for (const node of await canvas.locator(".react-flow__node").all()) {
    const box = await node.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
    expect(box!.y).toBeGreaterThanOrEqual(bounds!.y);
    expect(box!.y + box!.height).toBeLessThanOrEqual(bounds!.y + bounds!.height);
  }
});
