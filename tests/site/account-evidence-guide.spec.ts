import { expect, test } from "@playwright/test";

test("readers can inspect field work, independent research and the supporting sources", async ({
  page,
}) => {
  await page.goto("/work/account-intelligence#workflow");
  const workflow = page.locator("#workflow");
  await expect(
    workflow.getByRole("link", { name: /acquisition announcement/ }),
  ).toHaveAttribute(
    "href",
    "https://www.rapid7.com/about/press-releases/rapid7-acquires-intsights/",
  );
  await expect(
    workflow
      .getByRole("article")
      .getByText(/portfolio team used the playbooks/),
  ).toBeVisible();
  await workflow.getByRole("button", { name: "Truffle Security" }).click();
  await expect(
    workflow.getByRole("article").getByText(/sales team adopted the discovery and evaluation materials/),
  ).toBeVisible();
  await expect(
    workflow.getByRole("link", { name: "My enablement work" }),
  ).toHaveAttribute("href", "/work#people-leadership");
  await workflow.getByRole("button", { name: "LimaCharlie" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    workflow.getByText("Independent research", { exact: true }),
  ).toBeVisible();
  await workflow
    .getByRole("link", { name: "Read the saved research brief" })
    .click();
  await expect(page).toHaveURL(/\/account-signal$/);
  await expect(
    page.getByRole("heading", { name: "Verified from the source" }),
  ).toBeVisible();
});

test("personal notes stay with their source and the career account stays intact", async ({
  page,
}) => {
  await page.goto("/work/account-intelligence#workflow");
  const workflow = page.locator("#workflow");
  const edit = workflow.getByText("Edit or copy a reading note");
  await edit.click();
  const rapid7 = workflow.getByLabel("Your note for Rapid7");
  await expect(rapid7).toHaveValue(/playbooks/);
  await rapid7.fill("My question for the author");
  await workflow.getByRole("button", { name: "LimaCharlie" }).click();
  await edit.click();
  await expect(workflow.getByLabel("Your note for LimaCharlie")).toHaveValue(
    /LimaCharlie/,
  );
  await workflow.getByRole("button", { name: "Rapid7" }).click();
  await edit.click();
  await expect(rapid7).toHaveValue("My question for the author");
  await expect(
    workflow
      .getByRole("article")
      .getByText(/portfolio team used the playbooks/),
  ).toBeVisible();
});
