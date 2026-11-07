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
      name: "From rules to AI agents",
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
      name: "Start this path: Start here: Build software from idea to release",
      exact: true,
    })
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

test("lesson sequence supports keyboard next and previous without completing a quiz", async ({ page }) => {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page.getByRole("button", { name: "Start this path: Start with AI basics", exact: true }).click();
  const sequence = page.getByRole("navigation", { name: "Lesson sequence" });
  await expect(sequence.getByRole("button", { name: /Previous:/ })).toHaveCount(0);
  await sequence.getByRole("button", { name: /^Next:/ }).press("Enter");
  await expect(page.getByRole("heading", { name: "From rules to AI agents", exact: true })).toBeFocused();
  await sequence.getByRole("button", { name: /Previous:/ }).press("Enter");
  await expect(page.getByRole("heading", { name: "AI, models and assistants", exact: true })).toBeFocused();
});

test("systems path reaches the recovery lesson and its written practice", async ({ page }) => {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page.getByRole("button", { name: "Start this path: Connect systems and recover failures", exact: true }).click();
  await page.getByRole("navigation", { name: "Selected learning path" }).getByRole("button", { name: "What happens when a background job fails?", exact: true }).click();
  await expect(page.getByRole("heading", { name: "What happens when a background job fails?", exact: true })).toBeFocused();
  await expect(page.getByRole("region", { name: "Lesson prerequisites" })).toContainText("Databases: branching, backups, and platform decisions");
  await expect(page.getByRole("link", { name: "Explore related webhook and access demos", exact: true })).toHaveAttribute("href", "/ai-academy/systems");
  await expect(page.getByRole("link", { name: "Read the recovery exercise and answer key ↗", exact: true })).toHaveAttribute("href", /background-job-recovery\.md$/);
  const check = page.getByRole("group", { name: "Knowledge check" });
  await check.getByRole("radio", { name: "Repeat every write because there was no acknowledgement.", exact: true }).check();
  await expect(check.getByRole("status")).toContainText("A missing acknowledgement does not prove a write failed.");
  await check.getByRole("radio", { name: "Delete all failed jobs so the dashboard is green.", exact: true }).check();
  await expect(check.getByRole("status")).toContainText("Deleting failed jobs hides the evidence.");
  await check.getByRole("radio", { name: "Check the stable operation key and recorded result before repeating an effect.", exact: true }).check();
  await expect(check.getByRole("status")).toContainText("The stable operation key and saved result");
});

test("SDLC orientation is the first recommended lesson and navigates to privacy", async ({ page }) => {
  await page.goto("/ai-academy");
  await expect(page.getByRole("heading", { name: "From idea to verified release", exact: true })).toBeVisible();
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page.getByRole("button", { name: "Start this path: Start here: Build software from idea to release", exact: true }).click();
  await expect(page.getByRole("heading", { name: "From idea to verified release", exact: true })).toBeFocused();
  const path = page.getByRole("navigation", { name: "Selected learning path" });
  await expect(path.locator("li").first()).toContainText("From idea to verified release");
  await page.getByRole("navigation", { name: "Lesson sequence" }).getByRole("button", { name: /^Next:/ }).click();
  await expect(page.getByRole("heading", { name: "Privacy, security and human oversight", exact: true })).toBeFocused();
});


test("IaC plan review is keyboard-usable and resets without affecting lesson progress", async ({page}) => {
  await page.goto("/ai-academy");
  const lab = page.getByRole("region", {name:"IaC plan review practice"});
  await lab.getByRole("radio", {name:/Plan C: destructive database change/}).check();
  await lab.getByRole("button", {name:"Check decision"}).click();
  await expect(lab.getByRole("status")).toContainText("Stop: unapproved or unsafe change.");
  await lab.getByRole("radio", {name:/Plan A: private preview storage/}).check();
  await expect(lab.getByRole("status")).toHaveCount(0);
  await lab.getByRole("button", {name:"Check decision"}).press("Enter");
  await expect(lab.getByRole("status")).toContainText("Candidate for review, not approval to apply.");
  await lab.getByRole("button", {name:"Reset"}).click();
  await expect(lab.getByRole("radio", {checked:true})).toHaveCount(0);
  await expect(lab.getByRole("status")).toHaveCount(0);
});
