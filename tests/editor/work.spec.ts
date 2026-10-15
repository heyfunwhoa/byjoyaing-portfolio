import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save a Work narrative, render the change, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/work/stories/enterprise-selling.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = "Local editorial check for the enterprise selling story.";
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "Work narratives", exact: true })
      .first()
      .click();
    await page
      .getByRole("rowheader", { name: "enterprise-selling", exact: true })
      .click();
    const contextField = page.getByRole("textbox", {
      name: "Context",
      exact: true,
    });
    await expect(contextField).toHaveValue(original.context);
    await contextField.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).context)
      .toBe(edited);
    const reader = await context.newPage();
    await reader.goto("/work#enterprise-sales");
    await expect(reader.getByText(edited)).toBeVisible();
    await expect(
      reader.getByRole("heading", { level: 3, name: original.title }),
    ).toBeVisible();
    await reader
      .getByRole("article", { name: original.title })
      .getByText("Read the full story")
      .click();
    await expect(
      reader.getByRole("link", { name: "Experience and career history →" }),
    ).toBeVisible();
    await page.reload();
    await expect(contextField).toHaveValue(edited);
    await contextField.fill(original.context);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).context)
      .toBe(original.context);
    await reader.reload();
    await expect(reader.getByText(original.context)).toBeVisible();
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
