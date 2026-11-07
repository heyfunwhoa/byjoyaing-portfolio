import { expect, test } from "@playwright/test";

test("side quests offers one academy entry, one revenue system, and no status pills", async ({ page }) => {
  test.skip(test.info().project.name !== "site-desktop", "Run the presentation journey once.");
  await page.goto("/side-quests");
  await expect(page.getByRole("heading", { name: "GTM Revenue OS" })).toBeVisible();
  const academy = page.getByRole("link", { name: "Open Builder Academy" });
  await expect(academy).toHaveAttribute("href", "/ai-academy");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Planning$/ })).toHaveAttribute("href", "/work/revenue-planning-simulator");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Coverage and capacity$/ })).toHaveAttribute("href", "/work/gtm-operating-plan");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Pipeline review$/ })).toHaveAttribute("href", "/work/revenue-intelligence");
  await expect(page.getByRole("link", { name: "Request a walkthrough" })).toHaveAttribute("href", "/contact");
  await expect(page.getByText("Prototype", { exact: true })).toHaveCount(0);
  await expect(page.locator("a[href*='gtm-revenue-os'], a[href*='vercel.app']")).toHaveCount(0);

  await academy.focus();
  await expect(academy).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/ai-academy$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/side-quests");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.goto("/projects");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/projects");
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  const card = page.locator("#directory article").filter({
    has: page.getByRole("heading", { name: "Revenue Planning Simulator", exact: true }),
  });
  await expect(card.getByText("Intended value:")).toBeVisible();
  await expect(card.getByText("Contribution:")).toBeVisible();
  const details = card.locator("details");
  await details.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(card.getByText(/Recorded stage:/)).toBeVisible();
  await expect(card.getByText(/does not save a scenario/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
