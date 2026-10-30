import { test, expect } from "@playwright/test";

test("verification keeps its source, keyboard navigation and independent review/check state", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  const start = page.getByRole("button", {
    name: "Start this path: Verify an AI output",
    exact: true,
  });
  await start.focus();
  await page.keyboard.press("Enter");
  const article = page.getByRole("article", {
    name: "Grounding and source quality",
  });
  await expect(
    article.getByRole("heading", {
      name: "Grounding and source quality",
      exact: true,
    }),
  ).toBeFocused();
  await expect(article).toContainText(
    "Learn to distinguish sourced facts, hypotheses, stale claims and hallucinations.",
  );
  await expect(
    article.getByRole("link", { name: "NIST AI RMF" }),
  ).toHaveAttribute(
    "href",
    "https://www.nist.gov/itl/ai-risk-management-framework",
  );
  await expect(
    page.getByRole("region", { name: "Lesson prerequisites" }),
  ).toContainText("No earlier Academy lesson required.");
  const reviewed = article.getByRole("button", {
    name: "Mark as reviewed",
    exact: true,
  });
  await reviewed.focus();
  await page.keyboard.press("Enter");
  await expect(article.locator('input[type="radio"]:checked')).toHaveCount(0);
  await article.getByLabel("False", { exact: true }).check();
  await expect(article.getByRole("status")).toContainText("Correct.");
  await page
    .getByRole("navigation", { name: "Lesson sequence" })
    .getByRole("button", { name: /^Next:/ })
    .click();
  await page
    .getByRole("navigation", { name: "Lesson sequence" })
    .getByRole("button", { name: /Previous:/ })
    .click();
  await expect(
    article.getByRole("button", { name: "Reviewed this session" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(article.locator('input[type="radio"]:checked')).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("link", {
      name: "Open the Source Verification Journey",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/ai-academy\/journeys\/source-verification$/);
});

test("pre-migration mission storage survives Academy reading and reload", async ({
  page,
}) => {
  const key = "academy:practice:mcp-vs-rest-api:follow-one-click:v1";
  const fixture = {
    version: 1,
    lessonId: "mcp-vs-rest-api",
    activityId: "follow-one-click",
    step: 2,
    reviewed: true,
    practiced: true,
    passedCheckIds: ["denied-message"],
  };
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page.evaluate(
    ({ key, fixture }) => localStorage.setItem(key, JSON.stringify(fixture)),
    { key, fixture },
  );
  await page
    .getByRole("button", {
      name: "Start this path: Verify an AI output",
      exact: true,
    })
    .click();
  await page.goto("/ai-academy/journeys/follow-one-click");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Try", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key),
  ).toEqual(fixture);
  await page
    .getByText("Reset this mission’s progress", { exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm reset", exact: true })
    .click();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), key),
  ).toBeNull();
  await expect(
    page.getByRole("heading", { name: "Understand", exact: true }),
  ).toBeVisible();
});

test("blocked device storage retains the mission's safe session fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/ai-academy/journeys/follow-one-click");
  await expect(page.getByRole("status")).toContainText(
    "Device storage is unavailable.",
  );
  await page.getByRole("button", { name: "2. See", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "See", exact: true }),
  ).toBeVisible();
  await page
    .getByText("Reset this mission’s progress", { exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm reset", exact: true })
    .click();
  await expect(
    page.getByRole("alert").filter({ hasText: "This page was reset" }),
  ).toContainText("browser would not clear its saved copy");
});

test("production disables editor UI and filesystem read/write API", async ({
  page,
  request,
}) => {
  const response = await page.goto("/keystatic");
  expect(response?.status()).toBe(404);
  expect((await request.get("/api/keystatic/tree")).status()).toBe(404);
  expect(
    (await request.post("/api/keystatic/update", { data: {} })).status(),
  ).toBe(404);
});
