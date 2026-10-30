import { test, expect } from "@playwright/test";

test("review is independent of checks and practice, and does not gate navigation", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page
    .getByRole("button", {
      name: "Start this path: Start with AI basics",
      exact: true,
    })
    .click();
  const lessonPanel = page.getByRole("tabpanel", {
    name: /AI, models and assistants/,
  });
  await lessonPanel
    .getByRole("button", { name: "Mark as reviewed", exact: true })
    .click();
  await expect(
    lessonPanel.getByRole("button", { name: "Reviewed this session" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(lessonPanel.locator('input[type="radio"]:checked')).toHaveCount(0);
  await lessonPanel
    .getByLabel("An interface that can combine models, context and tools", {
      exact: true,
    })
    .check();
  await lessonPanel.getByRole("button", { name: "Reviewed this session" }).click();
  await expect(
    lessonPanel.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(lessonPanel.getByRole("status")).toContainText("Correct.");
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
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page
    .getByRole("button", {
      name: "Start this path: Understand the frontend",
      exact: true,
    })
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
    page.getByText("Partly available · demos and roadmap", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Connected Systems", exact: true })
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
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page
    .getByRole("button", {
      name: "Start this path: Start with AI basics",
      exact: true,
    })
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
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page
    .getByRole("button", {
      name: "Start this path: Build and release safely",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Reading code, files, JSON and YAML",
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("systems path reaches the recovery lesson and its written practice", async ({ page }) => {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page.getByRole("button", { name: "Start this path: Connect systems and recover failures", exact: true }).click();
  await page.getByRole("navigation", { name: "Selected learning path" }).getByRole("button", { name: "What happens when a background job fails?", exact: true }).click();
  await expect(page.getByRole("heading", { name: "What happens when a background job fails?", exact: true })).toBeFocused();
  await expect(page.getByRole("region", { name: "Lesson prerequisites" })).toContainText("Databases: branching, backups, and platform decisions");
  await expect(page.getByRole("link", { name: "Explore related webhook and access demos", exact: true })).toHaveAttribute("href", "/ai-academy/systems");
  await expect(page.getByRole("link", { name: "Read the recovery exercise and answer key", exact: true }).first()).toHaveAttribute("href", /background-job-recovery\.md$/);
});
