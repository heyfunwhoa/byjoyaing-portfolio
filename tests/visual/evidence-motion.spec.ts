import { expect, test } from "@playwright/test";

const story =
  "/iframe.html?id=design-lab-selective-motion-evidence-disclosure--default&viewMode=story";

test("evidence disclosure is keyboard operable and preserves source limitations", async ({
  page,
}) => {
  await page.goto(story);
  await expect(
    page.getByRole("heading", { name: "Review evidence before choosing an action" }),
  ).toBeVisible();

  const trigger = page.locator("details > summary");
  const disclosure = page.locator("details");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await trigger.focus();
  await expect(trigger).toBeFocused();
  await trigger.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(
    page.getByRole("heading", { name: "What remains unknown?" }),
  ).toBeVisible();
  await expect(page.getByText(/Budget, project ownership, vendor evaluation/)).toBeVisible();

  await trigger.press("Space");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(trigger).toBeFocused();
});

test("evidence disclosure retains stable layout and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(story);
  const trigger = page.locator("details > summary");
  await trigger.click();
  await expect(page.locator("details")).toHaveAttribute("open", "");

  const chevron = page.locator('summary [aria-hidden="true"]');
  await expect
    .poll(() => chevron.evaluate((el) => getComputedStyle(el).transitionDuration))
    .toBe("0s");

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByText(/Budget, project ownership/)).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
