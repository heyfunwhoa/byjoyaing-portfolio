import { test, expect } from "@playwright/test";

test("frontend lesson explains a choice, resets, and does not mark reading reviewed", async ({
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

  const lesson = page.getByRole("region", {
    name: "Diagnose one project card",
  });
  await expect(
    lesson.getByRole("heading", {
      name: "Diagnose one project card",
      level: 3,
    }),
  ).toBeVisible();
  const originalViewport = page.viewportSize();
  for (const size of [
    originalViewport,
    { width: 375, height: 812 },
    { width: 640, height: 900 },
  ]) {
    if (!size) continue;
    await page.setViewportSize(size);
    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(horizontalOverflow, `${size.width}px`).toBeLessThanOrEqual(1);
  }
  if (originalViewport) await page.setViewportSize(originalViewport);

  await lesson
    .getByRole("link", { name: "Check understanding", exact: true })
    .click();
  await expect(page.locator("#frontend-checks")).toBeFocused();

  const destination = lesson.getByRole("group", {
    name: /opens a missing page/,
  });
  const padding = destination.getByRole("radio", { name: "Increase padding" });
  await padding.focus();
  await page.keyboard.press("Space");
  await expect(padding).toBeChecked();
  await expect(padding).toBeFocused();
  await expect(destination.getByRole("status")).toContainText(
    "Spacing does not create a route.",
  );

  await destination
    .getByRole("button", { name: "Reset destination check" })
    .click();
  await expect(destination.getByRole("radio", { checked: true })).toHaveCount(
    0,
  );
  await expect(destination.getByRole("status")).toHaveCount(0);

  await destination
    .getByRole("radio", { name: /href, matching route and deployed revision/ })
    .check();
  await expect(destination.getByRole("status")).toContainText(
    "Inspect the navigation chain",
  );
  await expect(
    page.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");

  const practice = lesson.getByRole("group", {
    name: /runs outside its boundary/,
  });
  await practice
    .getByRole("radio", { name: "Styling and responsive layout" })
    .check();
  await expect(practice.getByRole("status")).toContainText(
    "first investigation",
  );
  await lesson.getByRole("button", { name: "Show an example answer" }).click();
  await expect(lesson.getByText(/200% zoom/)).toBeVisible();

  await lesson
    .getByLabel("Your diagnosis notes")
    .fill("Name the agenda, then tab to the link.");
  await expect(lesson.getByText("These notes stay in this tab.")).toBeVisible();
  await lesson.getByText("Self-review rubric", { exact: true }).click();
  await expect(lesson.getByText(/accessible name/i)).toBeVisible();

  await lesson
    .getByRole("button", { name: /Build and test your Design Lab/ })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Build and test your Design Lab",
      exact: true,
    }),
  ).toBeFocused();
  await expect(
    page.getByRole("region", { name: "Diagnose one project card" }),
  ).toHaveCount(0);
});
