import { expect, test } from "@playwright/test";

test("Account Intelligence reading guide separates demo, planned infrastructure and outcomes", async ({ page }) => {
  await page.goto("/work/account-intelligence");
  const guide = page.getByRole("complementary", { name: "How to read this example" });
  await expect(guide).toBeVisible();
  await expect(guide.getByText(/Fictional account changes/)).toBeVisible();
  await expect(guide.getByText(/Live research sources, account assignment sync/)).toBeVisible();
  await expect(guide.getByText(/Rep adoption, time saved/)).toBeVisible();
  await expect(guide.getByRole("link", { name: "Explore the fictional workflow" })).toHaveAttribute("href", "#workflow");
  await expect(guide.getByRole("link", { name: "Review planned architecture" })).toHaveAttribute("href", "#architecture");
  await expect(guide.getByRole("link", { name: "See proposed measures" })).toHaveAttribute("href", "#outcomes-title");
  await guide.getByRole("link", { name: "See proposed measures" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#outcomes-title$/);
  await expect(page.getByRole("heading", { name: "Measuring what matters." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
