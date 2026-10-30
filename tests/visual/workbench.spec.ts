import { expect, test } from "@playwright/test";

test("transition presets replay without movement when the device requests reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(
    "/iframe.html?id=design-lab-motion-workbench--transitions&viewMode=story",
  );
  await expect(
    page.getByRole("heading", { name: "Motion & components", exact: true }),
  ).toBeVisible();
  const preset = page.getByRole("button", { name: "Grouped reveal" });
  if (
    await page
      .getByRole("combobox", { name: "Transition preset", exact: true })
      .isVisible()
  ) {
    await page
      .getByRole("combobox", { name: "Transition preset", exact: true })
      .selectOption("stagger");
  } else {
    await preset.focus();
    await preset.press("Enter");
    await expect(preset).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Replay transition" }).click();
  await expect(
    page.getByText("A concise summary stays visible", { exact: false }),
  ).toHaveCount(3);
  expect(
    await page
      .getByText("People", { exact: true })
      .evaluate((node) => getComputedStyle(node.parentElement!).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("library preserves filters across cards/table and resets an empty result", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=design-lab-component-options--library&viewMode=story",
  );
  await page.getByLabel("Search options", { exact: true }).fill("avatar");
  await page
    .getByRole("combobox", { name: "Availability", exact: true })
    .selectOption("Available here");
  await expect(page.getByRole("status")).toContainText("1 options");
  await page.getByRole("button", { name: /^table$/i }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page.getByRole("rowheader", { name: /Identity & ownership/ }),
  ).toBeVisible();
  await page
    .getByLabel("Search options", { exact: true })
    .fill("no-such-component");
  await expect(
    page.getByRole("heading", { name: "No matching components" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset library filters" }).click();
  await expect(page.getByRole("status")).toContainText("16 options");
  await expect(page.getByRole("table")).toBeVisible();
});

test("feedback demos offer recovery and bounded progress", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=design-lab-motion-workbench--components&viewMode=story",
  );
  await expect(
    page.getByRole("heading", { name: "Motion & components", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Feedback", exact: true }).click();
  await page.getByRole("button", { name: "Add sample item" }).click();
  await expect(
    page.getByRole("heading", { name: "Sample item added" }),
  ).toBeVisible();
  if (
    await page
      .getByRole("combobox", { name: "Component pattern", exact: true })
      .isVisible()
  )
    await page
      .getByRole("combobox", { name: "Component pattern", exact: true })
      .selectOption("progress");
  else
    await page
      .getByRole("button", { name: "Step progress", exact: true })
      .click();
  for (let step = 0; step < 3; step++)
    await page.getByRole("button", { name: "Complete next step" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "3");
  await page.getByRole("button", { name: "Restart sample" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0");
});

test("comparison table stays within the page at phone, tablet and desktop widths", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=design-lab-component-options--library&viewMode=story",
  );
  await page.getByRole("button", { name: /^table$/i }).click();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(
      page.getByRole("region", { name: "Component comparison table" }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => ({
          page: document.documentElement.scrollWidth,
          viewport: window.innerWidth,
        })),
      )
      .toEqual({ page: width, viewport: width });
  }
});

test("component purposes select the right previews and dialog returns focus", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=design-lab-motion-workbench--components&viewMode=story",
  );
  await page.getByRole("button", { name: "Focus", exact: true }).click();
  await expect(page.getByRole("button", { name: "Category tabs" })).toHaveCount(
    0,
  );
  const trigger = page.getByRole("button", { name: "Open focused preview" });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Focused preview" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("app filter retains suitable options and avoids portfolio-only recommendations", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=design-lab-component-options--library&viewMode=story",
  );
  await page
    .getByRole("combobox", { name: "Project", exact: true })
    .selectOption("Detector Coverage Atlas");
  await expect(page.getByRole("status")).toContainText(
    "Detector Coverage Atlas",
  );
  await expect(
    page.getByRole("heading", { name: "Compare & triage data" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Plan & schedule" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
