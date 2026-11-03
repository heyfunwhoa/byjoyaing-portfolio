import { expect, test } from "@playwright/test";

// Phone selector is intentionally native; desktop retains keyboard-operable tabs.
test("competitive workflow steps are all discoverable without horizontal clipping on phones", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Explicit viewport matrix runs once.");
  for (const width of [320, 375, 640, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/competitive-intelligence-engine#workflow");
    const selector = page.getByRole("combobox", { name: "Choose workflow step" });
    await expect(selector).toBeVisible();
    await expect(selector.locator("option")).toHaveCount(5);
    const bounds = await selector.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    const stages = [
      ["landscape", "Provider dashboard"],
      ["change", "Change review"],
      ["impact", "Impact analysis"],
      ["brief", "Competitive brief"],
      ["feedback", "Field feedback"],
    ] as const;
    for (const [value, title] of stages) {
      await selector.selectOption(value);
      await expect(selector).toHaveValue(value);
      await expect(page.locator("#ci-panel").getByText(title, { exact: true }).first()).toBeVisible();
    }
    await selector.selectOption("brief");
    await expect(page.getByRole("combobox", { name: "Choose brief section" })).toBeVisible();
    await page.getByRole("combobox", { name: "Choose brief section" }).selectOption("questions");
    await expect(page.getByRole("tabpanel", { name: "Discovery questions" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("desktop competitive workflow retains tab navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Desktop keyboard sequence runs once.");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/competitive-intelligence-engine#workflow");
  await expect(page.getByRole("combobox", { name: "Choose workflow step" })).toBeHidden();
  const tabs = page.getByRole("tablist", { name: "Competitive workflow" });
  await expect(tabs).toBeVisible();
  const first = tabs.getByRole("tab", { name: /Competitive landscape/ });
  await first.focus();
  await first.press("ArrowDown");
  await expect(tabs.getByRole("tab", { name: /Change detection/ })).toBeFocused();
});


test("tablet view keeps every workflow step and brief section available", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run breakpoint verification once.");
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/work/competitive-intelligence-engine#workflow");
  const stage = page.getByRole("combobox", { name: "Choose workflow step" });
  await expect(stage).toBeVisible();
  await expect(stage.locator("option")).toHaveCount(5);
  await stage.selectOption("feedback");
  await expect(stage).toHaveValue("feedback");
  await stage.selectOption("brief");
  const brief = page.getByRole("combobox", { name: "Choose brief section" });
  await expect(brief).toBeVisible();
  await expect(brief.locator("option")).toHaveCount(5);
  await brief.selectOption("evidence");
  await expect(page.getByRole("tabpanel", { name: "Evidence" })).toBeVisible();
  await expect(page.getByRole("tablist", { name: "Competitive workflow" })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("workflow preserves selection when crossing the desktop breakpoint", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Run breakpoint verification once.");
  await page.setViewportSize({ width: 1023, height: 900 });
  await page.goto("/work/competitive-intelligence-engine#workflow");
  const stage = page.getByRole("combobox", { name: "Choose workflow step" });
  await stage.selectOption("brief");
  const brief = page.getByRole("combobox", { name: "Choose brief section" });
  await brief.selectOption("questions");
  await expect(page.getByRole("tabpanel", { name: "Discovery questions" })).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 900 });
  const desktop = page.getByRole("tablist", { name: "Competitive workflow" });
  await expect(desktop).toBeVisible();
  await expect(stage).toBeHidden();
  await expect(desktop.getByRole("tab", { name: /Competitive brief/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tablist", { name: "Brief sections" }).getByRole("tab", { name: "Discovery questions" })).toHaveAttribute("aria-selected", "true");

  await page.setViewportSize({ width: 375, height: 900 });
  await expect(stage).toHaveValue("brief");
  await expect(brief).toHaveValue("questions");
  await expect(page.getByRole("tabpanel", { name: "Discovery questions" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test("competitive architecture reads as four stages without cramped columns", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Explicit architecture matrix runs once.");
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/competitive-intelligence-engine#architecture");
    const disclosure = page.locator("#architecture");
    await expect(disclosure).toHaveAttribute("open", "");
    const stages = disclosure.getByRole("list", { name: "Proposed intelligence architecture stages" });
    const items = stages.locator(":scope > li");
    await expect(items).toHaveCount(4);
    const names = ["Source collection", "Change intelligence", "Human review", "Field activation"];
    for (let i = 0; i < names.length; i++) {
      await expect(items.nth(i).getByRole("heading", { name: names[i] })).toBeVisible();
      const bounds = await items.nth(i).boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    const first = (await items.nth(0).boundingBox())!;
    const second = (await items.nth(1).boundingBox())!;
    if (width < 1280) expect(second.y).toBeGreaterThan(first.y);
    else expect(Math.abs(second.y - first.y)).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
