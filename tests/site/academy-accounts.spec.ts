import { test, expect } from "@playwright/test";
// Default deployment remains disabled until approved database + email QA is complete.
test("public lessons remain usable and account setup fails closed", async ({
  page,
  request,
}) => {
  await page.goto("/ai-academy?lesson=what-is-ai");
  await expect(page.locator("#academy-lesson-heading")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "My learning", exact: true }),
  ).toHaveCount(0);
  const response = await request.get("/api/academy/learning");
  expect(response.status()).toBe(503);
  expect(response.headers()["cache-control"]).toContain("no-store");
  await page.goto("/ai-academy/sign-in");
  await expect(
    page.getByText("Learning accounts are not available yet.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Email address", { exact: true })).toHaveCount(
    0,
  );
  await expect(
    page.getByRole("link", { name: "All lessons are still open to explore." }),
  ).toHaveAttribute("href", "/ai-academy");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
