import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/work", "/contact", "/ai-academy"] as const;

// A test must never send mail, even if a later UI change bypasses validation.
test.beforeEach(async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort());
  await page.route("**/api/request-resume", (route) => route.abort());
});

for (const path of routes) {
  test(`${path} renders with no browser exceptions or horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.name));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/\S/);
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(() => page.evaluate(() =>
      document.documentElement.scrollWidth <= window.innerWidth + 1,
    )).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("primary navigation works by keyboard on desktop and mobile", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary", exact: true });
  const menu = nav.getByRole("button", { name: "Open navigation menu" });
  if (await menu.isVisible()) {
    await menu.focus();
    await menu.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
  }
  const work = nav.getByRole("link", { name: "Work", exact: true });
  await work.focus();
  await work.press("Enter");
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  if (await menu.isVisible()) await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("contact rejects empty and invalid-email submissions without calling the API", async ({ page }) => {
  let submissions = 0;
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/contact") submissions += 1;
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  const name = page.getByRole("textbox", { name: "Name", exact: true });
  await expect(name).toBeFocused();
  await name.fill("Synthetic QA");
  const email = page.getByRole("textbox", { name: "Email (work preferred)", exact: true });
  await email.fill("invalid-email");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("Synthetic validation only.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(email).toBeFocused();
  expect(await email.evaluate((element) => (element as HTMLInputElement).validity.typeMismatch)).toBe(true);
  expect(submissions).toBe(0);
  await page.getByRole("button", { name: "Request work examples", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Which work would help you evaluate fit?" })).toBeVisible();
  await expect(page.getByText(/Submitting this form does not unlock private files/)).toBeVisible();
});

test("legacy About redirect and unknown-page status remain correct", async ({ page }) => {
  await page.goto("/approach");
  await expect(page).toHaveURL(/\/about$/);
  const missing = await page.goto("/qa-route-that-does-not-exist");
  expect(missing?.status()).toBe(404);
});
