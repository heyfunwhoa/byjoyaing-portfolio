import { expect, test } from "@playwright/test";

test("transition presets replay without movement when the device requests reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(
    "/iframe.html?id=design-lab-motion-workbench--transitions&viewMode=story",
  );
  const preset = page.getByRole("button", { name: "Grouped reveal" });
  await preset.focus();
  await preset.press("Enter");
  await expect(preset).toHaveAttribute("aria-pressed", "true");
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
    .getByLabel("Project", { exact: true })
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
