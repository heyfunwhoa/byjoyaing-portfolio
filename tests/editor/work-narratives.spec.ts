import { test, expect, type Page } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

/** The takeaway and related links live behind the story card and its full-story disclosure. */
async function showEnterpriseTakeaway(reader: Page) {
  await reader.goto("/work#enterprise-sales");
  const sales = reader.locator("#enterprise-sales button");
  await expect(sales).toHaveAttribute("aria-expanded", "true");
  const evidence = reader.getByRole("region", {
    name: "Enterprise Sales evidence",
    exact: true,
  });
  await expect(evidence).toBeVisible();
  await evidence.locator("summary").click();
}

test("edit and save a Work narrative, render the change, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/work/stories/enterprise-selling.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = `${original.takeaway} Local editorial check.`;
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "Work narratives", exact: true })
      .first()
      .click();
    await page
      .getByRole("rowheader", { name: "enterprise-selling", exact: true })
      .click();
    const takeaway = page.getByRole("textbox", {
      name: "Takeaway",
      exact: true,
    });
    await expect(takeaway).toHaveValue(original.takeaway);
    await takeaway.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).takeaway)
      .toBe(edited);
    const reader = await context.newPage();
    await showEnterpriseTakeaway(reader);
    await expect(reader.getByText(edited, { exact: true })).toBeVisible();
    await expect(
      reader
        .getByRole("region", { name: "Enterprise Sales evidence", exact: true })
        .getByRole("link", { name: "Experience and career history" }),
    ).toBeVisible();
    await page.reload();
    await expect(takeaway).toHaveValue(edited);
    await takeaway.fill(original.takeaway);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).takeaway)
      .toBe(original.takeaway);
    await reader.reload();
    await showEnterpriseTakeaway(reader);
    await expect(
      reader.getByText(original.takeaway, { exact: true }),
    ).toBeVisible();
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
