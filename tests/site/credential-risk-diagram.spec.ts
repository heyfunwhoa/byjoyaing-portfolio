import { expect, test } from "@playwright/test";

test("credential risk diagram leads into the fictional investigation", async ({ page }) => {
  await page.goto("/builder-academy/credential-risk");

  const guide = page.getByRole("region", { name: "From a detection signal to a decision" });
  await expect(guide.getByRole("listitem")).toHaveCount(3);

  const selfCheck = guide.locator("summary");
  const feedback = guide.getByText("Report a candidate exposure", { exact: false });
  await expect(feedback).toBeHidden();
  await selfCheck.press("Enter");
  await expect(feedback).toBeVisible();
  await expect(selfCheck).toBeFocused();
  await selfCheck.press("Enter");
  await expect(feedback).toBeHidden();

  await expect(page.getByText("Review and collect evidence", { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth <= window.innerWidth + 1
  )).toBe(true);
});
