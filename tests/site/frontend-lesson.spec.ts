import { test, expect } from "@playwright/test";

async function openFrontend(page: import("@playwright/test").Page) {
  await page.goto("/ai-academy");
  await page.getByText(/^Explore learning paths \(\d+\)$/).click();
  await page
    .getByRole("button", {
      name: "Start this path: Understand the frontend",
      exact: true,
    })
    .click();
  return page.getByTestId("frontend-lesson");
}

test("Frontend teaches diagnosis with keyboard feedback, reset and independent reading review", async ({
  page,
}) => {
  const lesson = await openFrontend(page);
  await expect(
    lesson.getByRole("navigation", { name: "Frontend lesson sections" }),
  ).toBeVisible();
  await expect(lesson.locator("input:checked")).toHaveCount(0);
  const practice = lesson.getByLabel("Content source/props", { exact: true });
  await practice.focus();
  await page.keyboard.press("Space");
  await expect(lesson.getByRole("status").first()).toContainText(
    "The words are correct",
  );
  await page.keyboard.press("ArrowDown");
  await expect(
    lesson.getByLabel("Styling and responsive layout", { exact: true }),
  ).toBeFocused();
  await expect(lesson.getByRole("status").first()).toContainText("Correct.");
  await lesson.getByLabel("Increase padding", { exact: true }).check();
  await expect(lesson.getByRole("status").nth(1)).toContainText(
    "Spacing does not create",
  );
  await lesson.getByLabel("Add a hover effect", { exact: true }).check();
  await expect(lesson.getByRole("status").nth(2)).toContainText(
    "Hover does not provide",
  );
  await lesson
    .getByLabel("The href, matching route and deployed revision", {
      exact: true,
    })
    .check();
  await lesson
    .getByLabel(
      "Use a semantic anchor with a valid href, descriptive text and visible focus; test keyboard activation",
      { exact: true },
    )
    .check();
  const panel = page.getByRole("tabpanel", {
    name: /Frontend building blocks/,
  });
  await expect(
    panel.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await panel
    .getByRole("button", { name: "Mark as reviewed", exact: true })
    .click();
  await expect(lesson.locator("input:checked")).toHaveCount(3);
  await lesson
    .getByRole("button", { name: "Reset practice and checks" })
    .focus();
  await page.keyboard.press("Enter");
  await expect(lesson.locator("input:checked")).toHaveCount(0);
  await expect(
    panel.getByRole("button", { name: "Reviewed this session", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await lesson
    .getByText("Open the self-review rubric", { exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(lesson.getByText(/Propose a contextual label/)).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await lesson
    .getByRole("button", { name: "Explore Storybook and visual regression" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Build and test your Design Lab",
      exact: true,
    }),
  ).toBeFocused();
  await expect(page.getByTestId("frontend-lesson")).toHaveCount(0);
  await openFrontend(page);
  await expect(
    page.getByTestId("frontend-lesson").locator("input:checked"),
  ).toHaveCount(0);
});

test("Frontend retains an answer across resize and reflows at 320px without requiring motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const lesson = await openFrontend(page);
  await lesson
    .getByLabel("Styling and responsive layout", { exact: true })
    .check();
  await page.setViewportSize({ width: 320, height: 900 });
  await expect(
    lesson.getByLabel("Styling and responsive layout", { exact: true }),
  ).toBeChecked();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await expect(
    lesson.getByRole("article", { name: "Rendered fictional project card" }),
  ).toBeVisible();
  await lesson
    .getByRole("link", { name: "Read the fictional project practice" })
    .click();
  await expect(page).toHaveURL(/#frontend-practice$/);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});
