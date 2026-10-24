import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit a Field Note, render it, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/field-notes/guides/enterprise-deal.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = `${original.standfirst} Local editorial check.`;
  try {
    await page.goto("/keystatic/collection/fieldNotes/item/enterprise-deal");
    const standfirst = page.getByRole("textbox", {
      name: "Standfirst",
      exact: true,
    });
    await expect(standfirst).toHaveValue(original.standfirst);
    await standfirst.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).standfirst)
      .toBe(edited);
    const saved = JSON.parse(readFileSync(path, "utf8"));
    expect(saved.links.find((link: { key: string }) => link.key === "experience").href).toBe(
      "/work#enterprise-sales",
    );
    const reader = await context.newPage();
    await reader.goto("/field-notes/enterprise-deal");
    await expect(reader.getByRole("article")).toContainText(edited);
    await expect(reader.getByRole("article")).toContainText("Illustrative model");
    await page.reload();
    await expect(standfirst).toHaveValue(edited);
    await standfirst.fill(original.standfirst);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).standfirst)
      .toBe(original.standfirst);
    await reader.reload();
    await expect(reader.getByRole("article")).not.toContainText(
      "Local editorial check.",
    );
    const restored = JSON.parse(readFileSync(path, "utf8"));
    expect(restored.standfirst).toBe(original.standfirst);
    expect(restored.title).toBe(original.title);
    expect(restored.links).toEqual(original.links);
    expect(restored).not.toHaveProperty("check");
  } finally {
    writeFileSync(path, originalBytes);
  }
});
