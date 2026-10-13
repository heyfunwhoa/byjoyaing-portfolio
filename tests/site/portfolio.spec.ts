import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/work",
  "/contact",
  "/experience",
  "/projects",
  "/side-quests",
  "/field-notes",
  "/capabilities",
  "/work/competitive-intelligence-engine",
  "/work/account-intelligence",
  "/work/customer-feedback-intelligence",
  "/work/detector-coverage-atlas",
  "/ai-academy",
  "/ai-academy/dependencies/lockfiles",
  "/ai-academy/devops/build-rate-limits",
  "/ai-academy/journeys/prompting",
  "/ai-academy/journeys/source-verification",
  "/ai-academy/playground",
  "/ai-academy/playground/research-pipeline",
  "/ai-academy/playground/skill-builder",
  "/ai-academy/programming",
  "/ai-academy/systems",
] as const;

// A test must never send mail, even if a later UI change bypasses validation.
test.beforeEach(async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort());
  await page.route("**/api/request-resume", (route) => route.abort());
});

for (const path of routes) {
  test(`${path} renders with no browser exceptions or horizontal overflow`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.name));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator("#main-content")).toHaveCount(1);
    await page.locator(".skip-link").focus();
    await page.locator(".skip-link").press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${path === "/" ? "/" : path}$`),
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
    expect(errors).toEqual([]);
  });
}

test("primary navigation works by keyboard on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary", exact: true });
  const menu = nav.getByRole("button", {
    name: /^(Open|Close) navigation menu$/,
  });
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
  if (await menu.isVisible())
    await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("contact rejects empty and invalid-email submissions without calling the API", async ({
  page,
}) => {
  let submissions = 0;
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/contact") submissions += 1;
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  const name = page.getByRole("textbox", { name: "Name", exact: true });
  await expect(name).toBeFocused();
  await name.fill("Synthetic QA");
  const email = page.getByRole("textbox", {
    name: "Email (work preferred)",
    exact: true,
  });
  await email.fill("invalid-email");
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Synthetic validation only.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(email).toBeFocused();
  expect(
    await email.evaluate(
      (element) => (element as HTMLInputElement).validity.typeMismatch,
    ),
  ).toBe(true);
  expect(submissions).toBe(0);
  await page
    .getByRole("button", { name: "Request work examples", exact: true })
    .click();
  await expect(
    page.getByRole("combobox", {
      name: "Which work would help you evaluate fit?",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/Submitting this form does not unlock private files/),
  ).toBeVisible();
});

test("legacy About redirect and unknown-page status remain correct", async ({
  page,
}) => {
  await page.goto("/approach");
  await expect(page).toHaveURL(/\/about$/);
  const missing = await page.goto("/qa-route-that-does-not-exist");
  expect(missing?.status()).toBe(404);
});

for (const slug of [
  "competitive-intelligence-engine",
  "account-intelligence",
  "customer-feedback-intelligence",
]) {
  test(`${slug} opens architecture from a direct link and repeat navigation`, async ({
    page,
  }) => {
    await page.goto(`/work/${slug}#architecture`);
    const architecture = page.locator("details#architecture");
    await expect(architecture).toHaveAttribute("open", "");
    await architecture.locator(":scope > summary").click();
    await expect(architecture).not.toHaveAttribute("open", "");
    await page.locator('a[href="#architecture"]').first().click();
    await expect(architecture).toHaveAttribute("open", "");
  });
}

test("project filters retain a shareable focus and stage after reload", async ({
  page,
}) => {
  await page.goto("/projects?category=accounts&stage=Build#directory");
  const mobile = page.getByRole("combobox", {
    name: "Project focus",
    exact: true,
  });
  if (await mobile.isVisible()) {
    await expect(mobile).toHaveValue("Account & Market Intelligence");
    await mobile.selectOption("Technical Systems & AI");
  } else {
    await expect(
      page.getByRole("button", {
        name: "Account & Market Intelligence",
        exact: true,
      }),
    ).toHaveAttribute("aria-pressed", "true");
    await page
      .getByRole("button", { name: "Technical Systems & AI", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/category=technical&stage=Build#directory$/);
  await page.reload();
  await expect(page.getByRole("status")).toContainText(/project/);
  if (await mobile.isVisible())
    await expect(mobile).toHaveValue("Technical Systems & AI");
  else
    await expect(
      page.getByRole("button", { name: "Technical Systems & AI", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
});

test("the mobile menu confines focus and restores it on Escape", async ({
  page,
}) => {
  await page.goto("/ai-academy/programming");
  const menu = page.getByRole("button", {
    name: /^(Open|Close) navigation menu$/,
    exact: true,
  });
  test.skip(
    !(await menu.isVisible()),
    "Mobile menu applies below the desktop breakpoint",
  );
  await menu.click();
  await expect(page.locator("#main-content")).toHaveAttribute("inert", "");
  await menu.focus();
  await menu.press("Shift+Tab");
  await expect(page.locator("#main-content")).not.toBeFocused();
  await page.keyboard.press("Tab");
  await expect(menu).toBeFocused();
  await menu.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator("#main-content")).not.toHaveAttribute("inert", "");
});
