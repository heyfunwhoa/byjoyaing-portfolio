import { expect, test } from "@playwright/test";

test("project discovery comparison filters, previews, and switches layouts", async ({ page }) => {
  await page.goto("/iframe.html?id=design-lab-project-discovery--comparison&viewMode=story");
  const section = page.locator("#project-discovery");
  await expect(section.getByRole("button", { name: "Compact editorial card" })).toHaveAttribute("aria-pressed", "true");

  await section.getByRole("button", { name: "Filtered carousel" }).click();
  await section.getByRole("button", { name: "Revenue Strategy & Operations" }).click();
  await expect(section.getByText("No featured projects match.")).toBeVisible();
  await section.getByRole("button", { name: "Reset filters" }).click();
  await expect(section.getByRole("button", { name: "Next featured project" })).toBeVisible();
  await section.getByRole("button", { name: "Preview project" }).first().click();
  await expect(section.getByText("Contribution:")).toBeVisible();

  await section.getByRole("button", { name: "Inline, sheet, or case study" }).click();
  await section.getByRole("button", { name: "Side sheet" }).click();
  await section.getByRole("button", { name: "Open the preview sheet" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();

  await section.getByRole("button", { name: "Relationship map" }).click();
  await section.getByRole("button", { name: "Text list" }).click();
  await expect(section.getByRole("link", { name: "Detector Coverage Atlas" })).toBeVisible();
  await expect(section.getByText(/not a data integration/i)).toBeVisible();
});
