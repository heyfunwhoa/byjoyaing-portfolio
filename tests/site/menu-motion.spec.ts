import { expect, test } from "@playwright/test";

// KRU-311: menu bar and motion patterns. Default runs use reduced motion; the motion
// checks below opt in to no-preference explicitly.

test.describe("with motion allowed", () => {
  test.use({ reducedMotion: "no-preference" });

  test("header tucks away on scroll down and returns on scroll up", async ({ page }) => {
    await page.goto("/about");
    const header = page.locator("header[data-site-chrome]");
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(header).toHaveAttribute("data-tucked", "true");
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).not.toHaveAttribute("data-tucked", "true");
  });

  test("desktop underline follows hover and rests on the current page", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "site-desktop", "The underline is desktop-only.");
    await page.goto("/about");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const underline = nav.locator("[data-nav-underline]");
    const about = nav.getByRole("link", { name: "About", exact: true });
    const work = nav.getByRole("link", { name: "Work", exact: true });

    const centreOf = async (locator: typeof about) => {
      const box = await locator.boundingBox();
      return box ? box.x + box.width / 2 : Number.NaN;
    };
    await expect(underline).toHaveCSS("opacity", "1");
    await expect.poll(async () => Math.abs((await centreOf(underline)) - (await centreOf(about)))).toBeLessThan(4);

    await work.hover();
    await expect.poll(async () => Math.abs((await centreOf(underline)) - (await centreOf(work)))).toBeLessThan(4);

    await work.focus();
    await expect.poll(async () => Math.abs((await centreOf(underline)) - (await centreOf(work)))).toBeLessThan(4);
  });
});

test.describe("with reduced motion", () => {
  test("header never tucks and the timeline shows complete", async ({ page }) => {
    await page.goto("/experience");
    const header = page.locator("header[data-site-chrome]");
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(200);
    await expect(header).not.toHaveAttribute("data-tucked", "true");
    const dots = page.locator("[data-timeline-dot]");
    await expect(dots.first()).toHaveAttribute("data-reached", "true");
    await expect(dots.last()).toHaveAttribute("data-reached", "true");
  });
});

test("About section menu stays in view and marks the section being read", async ({ page }) => {
  await page.goto("/about");
  const nav = page.getByRole("navigation", { name: "On this page", exact: true });
  await page.evaluate(() => document.getElementById("career-progression")?.scrollIntoView({ block: "start" }));
  await expect(nav).toBeInViewport();
  await expect(nav.getByRole("link", { name: "Career & education", exact: true })).toHaveAttribute("aria-current", "location");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("phone menu opens as a sheet and keeps Escape and focus behaviour", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-mobile", "Phone menu only.");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.click();
  const panel = page.locator("#primary-menu");
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  const width = page.viewportSize()?.width ?? 0;
  expect(box && Math.round(box.x + box.width)).toBe(width);
  await expect(panel.getByRole("link", { name: "Home", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});
