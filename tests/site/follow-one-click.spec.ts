import { expect, test } from "@playwright/test";

test("Academy metadata discovers the available mission and supports direct resume", async ({
  page,
}) => {
  await page.goto("/ai-academy");
  await page
    .getByText("Explore guides, labs and planned modules", { exact: true })
    .click();
  await page
    .getByRole("link", { name: "Follow one click", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ai-academy\/journeys\/follow-one-click$/);
  await expect(
    page.getByRole("heading", { name: "Follow one click", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Available · Guided practice", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "2. See", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "See", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Resume at See", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Breadcrumb", exact: true })
    .getByRole("link", { name: "Builder Academy", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ai-academy$/);
});
