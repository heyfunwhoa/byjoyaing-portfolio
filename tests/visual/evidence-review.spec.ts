import { expect, test } from "@playwright/test";

const story =
  "/iframe.html?id=design-lab-evidence-review--compare-review-states&viewMode=story";

test("fictional source review keeps the observation, interpretation and next question separate", async ({ page }) => {
  await page.goto(story);
  await expect(
    page.getByRole("heading", { name: "Summary → source → next question" }),
  ).toBeVisible();

  const scenario = page.getByRole("combobox", {
    name: "Fictional evidence scenario",
  });
  await expect(scenario).toHaveValue("reviewed");
  await expect(
    page.getByText("Interpretation, not an established fact"),
  ).toBeVisible();
  await expect(
    page.getByText("Ready for a human review question"),
  ).toBeVisible();

  const source = page.getByRole("button", { name: "Inspect source details" });
  await source.click();
  const dialog = page.getByRole("dialog", { name: "Fictional source details" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("FIXTURE-SRC-001")).toBeVisible();
  await expect(dialog.getByText("2026-10-19")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(source).toBeFocused();

  await page.getByRole("button", { name: "Preview review question" }).click();
  await expect(page.getByRole("status")).toContainText("What exactly gets repeated");
  await expect(page.getByRole("status")).toContainText("No email, CRM action");

  await scenario.selectOption("stale");
  await expect(
    page.getByText("Not ready for an evidence-based decision"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Preview review question" }))
    .toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("status")).toHaveCount(0);

  await scenario.selectOption("missing");
  await source.click();
  await expect(dialog.getByText("None attached")).toBeVisible();
  await expect(dialog.getByText("Not available for inspection")).toBeVisible();
  await page.keyboard.press("Escape");

  await scenario.selectOption("restricted");
  await expect(
    page.getByText("Authorized source access or an acceptable replacement"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Preview review question" }).click();
  await expect(page.getByRole("status")).toContainText("Who owns access approval");
});

test("evidence review is readable at mobile, tablet and desktop without motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(story);
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(
      page.getByRole("combobox", { name: "Fictional evidence scenario" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Inspect source details" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("existing pattern library links the evidence prototype without claiming adoption", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=design-lab-component-options--library&viewMode=story",
  );
  await page.getByRole("combobox", { name: "Lifecycle stage" }).selectOption("Prototype");
  await page.getByRole("combobox", { name: "Project" }).selectOption("Security Market Map");
  await page.getByRole("combobox", { name: "Availability" }).selectOption("Available here");
  await page.getByLabel("Search options").fill("Evidence and review checkpoints");
  await expect(
    page.getByRole("heading", { name: "Evidence and review checkpoints" }),
  ).toBeVisible();
  await page.getByText("Fit & adoption notes").click();
  await expect(
    page.getByRole("link", { name: /Interactive fictional evidence-review composition/ }),
  ).toBeVisible();
  await expect(
    page.getByText("None recorded. A proposed destination is not adoption."),
  ).toBeVisible();
});
