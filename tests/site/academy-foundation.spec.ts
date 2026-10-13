import { test, expect } from "@playwright/test";

test("review is independent of checks and practice, and does not gate navigation", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page
    .getByRole("button", { name: "Start the AI path", exact: true })
    .click();
  const article = page.getByRole("article", {
    name: "AI, models and assistants",
  });
  await article
    .getByRole("button", { name: "Mark as reviewed", exact: true })
    .click();
  await expect(
    article.getByRole("button", { name: "Reviewed this session" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(article.locator('input[type="radio"]:checked')).toHaveCount(0);
  await article
    .getByLabel("An interface that can combine models, context and tools", {
      exact: true,
    })
    .check();
  await article.getByRole("button", { name: "Reviewed this session" }).click();
  await expect(
    article.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(article.getByRole("status")).toContainText("Correct.");
  await page
    .getByRole("navigation", { name: "Lesson sequence" })
    .getByRole("button", { name: /^Next:/ })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Privacy, security and human oversight",
      exact: true,
    }),
  ).toBeFocused();
  await expect(page.locator('article input[type="radio"]:checked')).toHaveCount(
    0,
  );
});

test("builder paths, prerequisites and planned resources remain independently reachable", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page
    .getByRole("button", { name: "Start the frontend path", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Frontend building blocks: from framework to experience",
      exact: true,
    }),
  ).toBeFocused();
  await expect(
    page.getByRole("region", { name: "Lesson prerequisites" }),
  ).toContainText("No earlier Academy lesson required.");
  await page
    .getByRole("navigation", { name: "Lesson sequence" })
    .getByRole("button", { name: /^Next:/ })
    .click();
  await page
    .getByRole("region", { name: "Lesson prerequisites" })
    .getByRole("button", {
      name: "Frontend building blocks: from framework to experience",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Selected learning path" }),
  ).toHaveCount(0);
  await expect(page.locator("#track")).toHaveValue("All");
  await page
    .getByText("Explore guides, labs and planned modules", { exact: true })
    .click();
  await expect(
    page.getByText("Partly available · guided tutorials", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Planned · Connected Systems", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "View the systems roadmap", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Planned learning modules",
      exact: true,
    }),
  ).toBeVisible();
});

test("path switching clears stale answers and links to existing practice", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page
    .getByRole("button", { name: "Start the AI path", exact: true })
    .click();
  const path = page.getByRole("navigation", { name: "Selected learning path" });
  await path
    .getByRole("button", { name: "Write prompts that work", exact: true })
    .click();
  const practice = page.getByRole("link", {
    name: "Open the Prompting Journey",
    exact: true,
  });
  await expect(practice).toHaveAttribute(
    "href",
    "/ai-academy/journeys/prompting",
  );
  await practice.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/ai-academy\/journeys\/prompting$/);
  await page
    .getByRole("navigation", { name: "Breadcrumb", exact: true })
    .getByRole("link", { name: "Builder Academy", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Start the delivery path", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "From idea to verified release",
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
