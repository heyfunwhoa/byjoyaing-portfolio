import { test, expect } from "@playwright/test";

test("lesson search preserves the open lesson and supports empty-result recovery", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  const heading = page.locator("#academy-lesson-heading");
  const initialTitle = await heading.innerText();
  const library = page.getByRole("region", { name: "Lesson library" });
  await library
    .getByRole("searchbox", { name: "Search lessons" })
    .fill("background job");
  await expect(library.getByRole("status")).toHaveText("1 lesson found");
  await expect(heading).toHaveText(initialTitle);
  const picker = library.getByLabel("Choose a lesson", { exact: true });
  if (await picker.isVisible()) {
    await picker.selectOption("background-job-recovery");
  } else {
    await library
      .getByRole("button", { name: /What happens when a background job fails/ })
      .click();
  }
  await expect(heading).toHaveText("What happens when a background job fails?");
  await expect(heading).toBeFocused();
  const check = page.getByRole("group", { name: "Knowledge check" });
  await check.getByRole("radio").first().check();
  await library.getByRole("searchbox").fill("no-such-learning-topic");
  await expect(
    library.getByText("No lessons found", { exact: true }),
  ).toBeVisible();
  await expect(check.getByRole("radio").first()).toBeChecked();
  await library
    .getByRole("button", { name: "Clear lesson search" })
    .press("Enter");
  await expect(library.getByRole("searchbox")).toBeFocused();
  await expect(library.getByRole("status")).toHaveText(
    "39 lessons in this view",
  );
  await expect(heading).toHaveText("What happens when a background job fails?");
  await expect(
    page.getByRole("button", { name: "Mark as reviewed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.reload();
  await expect(library.getByRole("searchbox")).toHaveValue("");
  await expect(heading).toHaveText(initialTitle);
});

test("recommended path, lesson contents and resources form a keyboard journey", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page
    .getByRole("button", { name: "Start recommended path" })
    .press("Enter");
  const heading = page.locator("#academy-lesson-heading");
  await expect(heading).toBeFocused();
  const path = page.getByRole("navigation", { name: "Selected learning path" });
  await expect(path).toContainText("Lesson 1 of 8");
  await expect(path.locator('[aria-current="step"]')).toHaveCount(1);
  const outline = page.getByRole("navigation", { name: "In this lesson" });
  for (const [label, id] of [
    ["1. Read", "lesson-read"],
    ["2. Practice", "lesson-practice"],
    ["3. Check", "lesson-check"],
  ]) {
    await outline
      .getByRole("link", { name: label, exact: true })
      .press("Enter");
    await expect(page.locator(`#${id}`)).toBeFocused();
  }
  await page
    .getByRole("navigation", { name: "Lesson sequence" })
    .getByRole("button", { name: /^Next:/ })
    .press("Enter");
  await expect(heading).toHaveText("Privacy, security and human oversight");
  await expect(heading).toBeFocused();
  await path.getByRole("button", { name: "Leave this path" }).click();
  await expect(
    page.getByRole("region", { name: "Lesson library" }),
  ).toBeVisible();
  await expect(heading).toHaveText("Privacy, security and human oversight");
  // Supporting resources follow the workspace, so they cannot push the lesson down.
  expect(
    await page.locator("#academy-panel").evaluate((panel) => {
      const resources = [...document.querySelectorAll("summary")].find((item) =>
        item.textContent?.includes("Explore guides, labs"),
      );
      return resources
        ? Boolean(
            panel.compareDocumentPosition(resources) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          )
        : false;
    }),
  ).toBe(true);
});

test("library and lesson controls reflow at phone, tablet and desktop widths", async ({
  page,
}) => {
  const configuredWidth = page.viewportSize()!.width;
  const width = configuredWidth < 768 ? 375 : configuredWidth;
  {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/ai-academy");
    const library = page.getByRole("region", { name: "Lesson library" });
    await library.getByRole("searchbox").fill("models");
    await expect(library.getByRole("status")).toContainText("found");
    await expect(
      library.getByLabel("Choose a lesson", { exact: true }),
    ).toBeVisible({ visible: width < 1024 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const outline = page.getByRole("navigation", { name: "In this lesson" });
    for (const link of await outline.getByRole("link").all()) {
      const bounds = await link.boundingBox();
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
      expect(bounds?.x).toBeGreaterThanOrEqual(0);
      expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(
        width,
      );
    }
    if (width >= 1024) {
      const list = library.locator("ul");
      expect((await list.boundingBox())?.height).toBeGreaterThan(0);
      const sidebar = await page
        .getByRole("complementary", { name: "Lessons" })
        .boundingBox();
      expect(sidebar?.height).toBeLessThan(900);
    }
  }
});
