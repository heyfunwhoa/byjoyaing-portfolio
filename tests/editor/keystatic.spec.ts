import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save the singleton, render the change, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/academy/lessons/verification.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = `${original.summary} Local editorial acceptance check.`;
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "Verification lesson", exact: true })
      .first()
      .click();
    const summary = page.getByRole("textbox", { name: "Summary", exact: true });
    await expect(summary).toHaveValue(original.summary);
    await summary.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(edited);
    const saved = JSON.parse(readFileSync(path, "utf8"));
    expect(saved.id).toBe("verification");
    expect(saved).not.toHaveProperty("check");
    expect(saved).not.toHaveProperty("reviewed");
    const reader = await context.newPage();
    await reader.goto("/ai-academy");
    await reader.getByText(/^Explore learning paths \(\d+\)$/).click();
    await reader
      .getByRole("button", { name: "Start verify an ai output →", exact: true })
      .click();
    await expect(
      reader.getByRole("article", { name: "Grounding and source quality" }),
    ).toContainText(edited);
    await reader.getByLabel("False", { exact: true }).check();
    await expect(reader.getByRole("article").getByRole("status")).toContainText(
      "Correct.",
    );
    await page.reload();
    await expect(summary).toHaveValue(edited);
    await summary.fill(original.summary);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(original.summary);
    await reader.reload();
    await reader.getByText(/^Explore learning paths \(\d+\)$/).click();
    await reader
      .getByRole("button", { name: "Start verify an ai output →", exact: true })
      .click();
    await expect(reader.getByRole("article")).not.toContainText(
      "Local editorial acceptance check.",
    );
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    // Also restore exact bytes on failure; this suite must not leave editorial edits behind.
    writeFileSync(path, originalBytes);
  }
});
