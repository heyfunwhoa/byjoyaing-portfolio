import { expect, test } from "@playwright/test";

test("native form reports inline validation and a non-persistent success", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=design-lab-no-cost-baselines--validated-form&viewMode=story",
  );
  await page.getByRole("button", { name: "Validate sample" }).click();
  await expect(page.getByRole("alert")).toContainText("at least three characters");
  await expect(page.getByRole("textbox", { name: "Account name" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByRole("textbox", { name: "Account name" }).fill("Acorn Demo");
  await page.getByRole("combobox", { name: "Review stage" }).selectOption("Evidence review");
  await page.getByRole("button", { name: "Validate sample" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Acorn Demo is in Evidence review",
  );
  await expect(page.getByRole("status")).toContainText("No record was saved");
});

test("native review table filters, sorts and contains horizontal overflow", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=design-lab-no-cost-baselines--review-table&viewMode=story",
  );
  await expect(page.getByRole("status")).toContainText("3 synthetic accounts");
  await page.getByRole("button", { name: "Account ascending" }).click();
  await expect(
    page.getByRole("rowheader").first(),
  ).toHaveText("Cedar Demo");
  await page.getByRole("searchbox", { name: "Search demo accounts" }).fill("Birch");
  await expect(page.getByRole("status")).toContainText("1 synthetic accounts");
  await expect(page.getByRole("rowheader").first()).toHaveText("Birch Demo");
  await page.getByRole("searchbox", { name: "Search demo accounts" }).fill("absent");
  await expect(page.getByText("No matching accounts.", { exact: false })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search demo accounts" }).clear();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("region", { name: "Research review table" })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("CSS scenario bars keep exact labeled data accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(
    "/iframe.html?id=design-lab-no-cost-baselines--scenario-chart&viewMode=story",
  );
  await expect(
    page.getByRole("table", { name: "Exact synthetic scenario values" }),
  ).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "Base" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$8,000,000" })).toBeVisible();
  await expect(
    page.getByText("Not a forecast for a real company.", { exact: false }),
  ).toBeVisible();
});
