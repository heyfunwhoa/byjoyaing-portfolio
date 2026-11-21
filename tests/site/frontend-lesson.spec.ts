import { test, expect, type Page } from "@playwright/test";

async function openFrontend(page: Page) {
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
  await expect(lesson).toBeVisible();
  return lesson;
}

test("frontend lesson explains a choice, resets, and does not mark reading reviewed", async ({
  page,
}) => {
  const lesson = await openFrontend(page);
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
    .getByRole("navigation", { name: "Mission steps" })
    .getByRole("button", { name: /Try/ })
    .click();
  await expect(page.locator("#frontend-step")).toBeFocused();

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

  await lesson.getByRole("button", { name: "Continue to Explain" }).click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  await lesson
    .getByLabel("Your diagnosis notes")
    .fill("Name the agenda, then tab to the link.");
  await expect(lesson.getByText("These notes stay in this tab.")).toBeVisible();
  await lesson.getByText("Self-review rubric", { exact: true }).click();
  await expect(lesson.getByText(/accessible name/i)).toBeVisible();

  await lesson.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  await expect(
    practice.getByRole("radio", { name: "Styling and responsive layout" }),
  ).toBeChecked();
  await expect(
    destination.getByRole("radio", {
      name: /href, matching route and deployed revision/,
    }),
  ).toBeChecked();
  await practice
    .getByRole("button", { name: "Reset practice", exact: true })
    .click();
  await expect(practice.getByRole("radio", { checked: true })).toHaveCount(0);
  await expect(destination.getByRole("status")).toContainText(
    "Inspect the navigation chain",
  );
  await expect(
    lesson.getByRole("button", { name: "Show an example answer" }),
  ).toHaveAttribute("aria-expanded", "false");
  await lesson.getByRole("button", { name: "Continue to Explain" }).click();
  await expect(lesson.getByLabel("Your diagnosis notes")).toHaveValue(
    "Name the agenda, then tab to the link.",
  );
  await expect(
    page.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");

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

test("frontend steps are unlocked and example tabs work by keyboard without page overflow", async ({
  page,
}) => {
  const lesson = await openFrontend(page);
  const navigation = lesson.getByRole("navigation", { name: "Mission steps" });
  await navigation.getByRole("button", { name: /Explain/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#frontend-step")).toBeFocused();
  await expect(page.locator("#frontend-step")).toHaveText("Explain");
  await expect(
    navigation.getByRole("button", { name: /Explain/ }),
  ).toHaveAttribute("aria-current", "step");
  await lesson
    .getByRole("button", { name: "Review from the beginning" })
    .click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  await expect(
    lesson.getByRole("button", { name: "Back", exact: true }),
  ).toBeDisabled();
  await lesson.getByRole("button", { name: "Continue to See" }).click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  const plain = lesson.getByRole("tab", { name: "Plain English", exact: true });
  const rendered = lesson.getByRole("tab", {
    name: "Rendered card",
    exact: true,
  });
  const code = lesson.getByRole("tab", { name: "Code", exact: true });
  await expect(plain).toHaveAttribute("aria-selected", "true");
  await plain.focus();
  await page.keyboard.press("ArrowRight");
  await expect(rendered).toBeFocused();
  await expect(rendered).toHaveAttribute("aria-selected", "true");
  await expect(
    lesson.getByRole("link", { name: "Read the project", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("End");
  await expect(code).toBeFocused();
  await expect(code).toHaveAttribute("aria-selected", "true");
  const source = lesson.getByRole("region", { name: "Project card source" });
  await expect(source).toContainText("ProjectCard");
  // The code can scroll independently at narrow widths, without widening the page.
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
      `${width}px`,
    ).toBeLessThanOrEqual(1);
    await expect(source).toBeVisible();
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await source.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => source.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0);
  await code.focus();
  await page.keyboard.press("Home");
  await expect(plain).toBeFocused();
  await expect(plain).toHaveAttribute("aria-selected", "true");
  await rendered.click();
  await lesson.getByRole("button", { name: "Continue to Try" }).click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  await lesson.getByRole("button", { name: "Back", exact: true }).click();
  await expect(rendered).toHaveAttribute("aria-selected", "true");
});

test("frontend glossary traps focus, scrolls on small screens and returns to the lesson", async ({
  page,
}) => {
  const lesson = await openFrontend(page);
  await lesson.getByRole("button", { name: "Continue to See" }).click();
  await expect(page.locator("#frontend-step")).toBeFocused();
  await page.setViewportSize({ width: 375, height: 400 });
  const trigger = lesson.getByRole("button", { name: "Open lesson glossary" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", {
    name: "Frontend glossary",
    exact: true,
  });
  const close = dialog.getByRole("button", { name: "Close glossary" });
  const definitions = dialog.getByRole("region", {
    name: "Glossary definitions",
  });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await expect(dialog.locator("dt")).toHaveText([
    "Component",
    "Props",
    "Styling",
    "Route",
    "Verification",
  ]);
  await page.keyboard.press("Tab");
  await expect(definitions).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(definitions).toBeFocused();
  await page.keyboard.press("End");
  await expect
    .poll(() => definitions.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("#frontend-step")).toHaveText("See");
  await trigger.click();
  await close.click();
  await expect(trigger).toBeFocused();
});
