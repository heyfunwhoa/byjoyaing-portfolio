import { expect, test } from "@playwright/test";

test("Account Intelligence reading guide separates demo, planned infrastructure and outcomes", async ({ page }) => {
  await page.goto("/work/account-intelligence");
  const guide = page.getByRole("complementary", { name: "How to read this example" });
  await expect(guide).toBeVisible();
  await expect(guide.getByText(/Fictional account changes/)).toBeVisible();
  await expect(guide.getByText(/Live research sources, account assignment sync/)).toBeVisible();
  await expect(guide.getByText(/Rep adoption, time saved/)).toBeVisible();
  await expect(guide.getByRole("link", { name: "Explore the fictional workflow" })).toHaveAttribute("href", "#workflow");
  await expect(guide.getByRole("link", { name: "Review planned architecture" })).toHaveAttribute("href", "#architecture");
  await expect(guide.getByRole("link", { name: "See proposed measures" })).toHaveAttribute("href", "#outcomes-title");
  await guide.getByRole("link", { name: "See proposed measures" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#outcomes-title$/);
  await expect(page.getByRole("heading", { name: "Measuring what matters." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("outreach follows the selected signal and keeps edits with the right account", async ({ page }) => {
  await page.goto("/work/account-intelligence#workflow");
  const workflow = page.locator("#workflow");
  const feed = workflow.getByRole("tab", { name: /Intelligence feed/ });
  const panel = workflow.getByRole("tabpanel");
  const cases = [
    { title: "New VP of Application Security appointed", account: "Acme", subject: /AppSec|Application security/i, opening: /VP of Application Security/ },
    { title: "Several platform security roles opened", account: "Acme", subject: /platform security|new roles/i, opening: /platform security/ },
    { title: "Series C announced", account: "Northstar", subject: /Northstar/, opening: /Series C/ },
    { title: "Public note about moving CI to a new platform", account: "Meridian", subject: /Meridian/, opening: /pipeline/i },
  ];

  for (const item of cases) {
    await feed.click();
    const card = panel.getByRole("listitem").filter({ hasText: item.title });
    await card.getByRole("button", { name: "View detail" }).click();
    await panel.getByRole("button", { name: "Draft outreach from this signal" }).click();
    const body = panel.locator("#draft-body");
    await expect(panel).toContainText(item.subject);
    await expect(body).toContainText(item.opening);
    await expect(body).toContainText(item.account);
    const first = await body.innerText();
    await panel.getByRole("button", { name: "Try another draft" }).click();
    await expect(body).not.toHaveText(first);
    await expect(body).toContainText(item.account);
    await expect(body).toContainText(item.opening);
  }

  await panel.getByRole("button", { name: "Edit draft" }).click();
  await panel.getByLabel("Body", { exact: true }).fill("A question just for Meridian");
  await panel.getByRole("button", { name: "Done editing" }).click();
  await feed.click();
  const hiring = panel.getByRole("listitem").filter({ hasText: "Several platform security roles opened" });
  await hiring.getByRole("button", { name: "Draft outreach" }).click();
  await expect(panel.locator("#draft-body")).toContainText("Acme");
  await workflow.getByRole("tab", { name: /Assigned accounts/ }).click();
  await panel.getByRole("row", { name: /Meridian/ }).getByRole("button", { name: "View signals" }).click();
  await workflow.getByRole("tab", { name: /Outreach draft/ }).click();
  await expect(panel.locator("#draft-body")).toHaveText("A question just for Meridian");
});
