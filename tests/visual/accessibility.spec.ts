import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const story = (name: string) => `/iframe.html?id=portfolio-shared-interactions--${name}&viewMode=story`;

async function openStory(page: Page, name: string) {
  await page.goto(story(name));
  await expect(page.locator("main h1")).toBeVisible();
  await page.waitForLoadState("networkidle");
}

async function checkAccessibility(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations.map(({ id, impact, help, nodes }) => ({
    id, impact, help, targets: nodes.map((node) => node.target),
  }))).toEqual([]);
}

test("navigation has accessible names and passes axe checks", async ({ page }) => {
  await openStory(page, "navigation");
  await expect(page.getByRole("heading", { name: "Portfolio navigation" })).toBeVisible();
  await checkAccessibility(page);
});

test("the open mobile menu passes axe and returns keyboard focus", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1280) >= 1024, "Desktop navigation has no mobile sheet.");
  await openStory(page, "navigation");
  const trigger = page.getByRole("button", { name: /navigation menu/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#main-content")).toHaveAttribute("inert", "");
  await checkAccessibility(page);
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("the contact form has labeled required fields and passes axe", async ({ page }) => {
  await openStory(page, "contact-form");
  for (const name of ["Name", "Email", "Message"]) {
    await expect(page.getByRole("textbox", { name, exact: true })).toHaveAttribute("required", "");
  }
  await checkAccessibility(page);
});

test("a simulated contact error stays readable and accessible", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ error: "Simulated delivery error. Please try again." }),
  }));
  await openStory(page, "contact-form");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Storybook reviewer");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("reviewer@example.test");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("A local accessibility check.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Simulated delivery error.");
  await expect(page.getByRole("link", { name: "Email me instead" })).toBeVisible();
  await checkAccessibility(page);
});

test("collapsed Work disclosures pass axe", async ({ page }) => {
  await openStory(page, "work-disclosures");
  await expect(page.getByRole("heading", { name: "Professional work", exact: true })).toBeVisible();
  await checkAccessibility(page);
});

for (const [id, label] of [
  ["enterprise-sales", "Enterprise Sales"],
  ["people-leadership", "People & Leadership"],
  ["gtm-strategy", "GTM Strategy"],
] as const) {
  test(`${label} disclosure passes axe and returns focus`, async ({ page }) => {
    await openStory(page, "work-disclosures");
    const trigger = page.locator(`#${id} button`).first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("region", { name: `${label} evidence`, exact: true })).toBeVisible();
    await checkAccessibility(page);
    await page.getByRole("button", { name: `Close story: ${label}` }).click();
    await expect(trigger).toBeFocused();
  });
}
