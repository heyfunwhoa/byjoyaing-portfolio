import { expect, test } from "@playwright/test";

test("data display sorting, search, density and reset use the same fixture", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-data-display--comparison&viewMode=story");
  await page.getByRole("button", { name: "Comparison table" }).click();

  const table = page.getByRole("table");
  await expect(table).toBeVisible();
  const rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(4);
  await expect(rows.first()).toContainText("Horizon Networks");

  await table.getByRole("button", { name: /Signals/ }).click();
  await expect(table.getByRole("columnheader", { name: /Signals/ })).toHaveAttribute("aria-sort", "ascending");
  await expect(rows.first()).toContainText("Lumen Data");

  await table.getByRole("button", { name: /Signals/ }).click();
  await expect(table.getByRole("columnheader", { name: /Signals/ })).toHaveAttribute("aria-sort", "descending");
  await expect(rows.first()).toContainText("Northstar Security");

  await table.getByRole("button", { name: /Reviewed/ }).click();
  await expect(table.getByRole("columnheader", { name: /Reviewed/ })).toHaveAttribute("aria-sort", "ascending");
  await expect(rows.first()).toContainText("Northstar Security");
  await table.getByRole("button", { name: /Reviewed/ }).click();
  await expect(rows.first()).toContainText("Summit Systems");

  await page.getByRole("button", { name: "Summary cards" }).click();
  await expect(page.locator("article").first()).toContainText("Summit Systems");
  await page.getByRole("button", { name: "Comparison table" }).click();

  await page.getByRole("combobox", { name: "Table spacing" }).selectOption("compact");
  await expect(page.getByRole("combobox", { name: "Table spacing" })).toHaveValue("compact");

  const search = page.getByRole("searchbox", { name: "Search fictional accounts" });
  await search.fill("northstar");
  await expect(rows).toHaveCount(1);
  await expect(page.getByRole("status").first()).toContainText("1 of 4");

  await page.getByRole("combobox", { name: "Review status" }).selectOption("Reviewed");
  await expect(page.getByText("No matching accounts")).toBeVisible();

  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(rows).toHaveCount(4);
  await expect(search).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Review status" })).toHaveValue("All");
  await expect(table.getByRole("columnheader", { name: /Account/ })).toHaveAttribute("aria-sort", "ascending");
});

test("data display remains within viewport with an internally scrolling table", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-data-display--comparison&viewMode=story");
  await page.getByRole("button", { name: "Comparison table" }).click();
  const region = page.getByRole("region", { name: /Comparison table/ });
  await expect(region).toBeVisible();
  const sizes = await region.evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
  expect(sizes.scroll).toBeGreaterThanOrEqual(sizes.client);
  if (page.viewportSize()!.width < 600) expect(sizes.scroll).toBeGreaterThan(sizes.client);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
