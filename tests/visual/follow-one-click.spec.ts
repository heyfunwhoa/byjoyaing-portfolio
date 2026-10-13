import { expect, test } from "@playwright/test";

const route = "/iframe.html?id=academy-follow-one-click--pilot&viewMode=story";
const key = "academy:practice:mcp-vs-rest-api:follow-one-click:v1";

test("reviewing, practicing and passing are independent, resumable and resettable", async ({
  page,
}) => {
  await page.goto(route);
  const progress = page.getByRole("complementary", {
    name: "Your practice progress",
  });
  await page
    .getByRole("button", { name: "Mark reading as reviewed", exact: true })
    .click();
  await expect(progress).toContainText("Reviewed: yes");
  await expect(progress).toContainText("Practiced: not yet");
  await page.getByRole("button", { name: "3. Try", exact: true }).click();
  const first = page.getByRole("group", {
    name: "Fix the explanation",
    exact: true,
  });
  await first
    .getByLabel("Remove the server’s access check", { exact: true })
    .check();
  await first
    .getByRole("button", { name: "Check answer", exact: true })
    .click();
  await expect(first.getByRole("status")).toContainText("Keep exploring");
  await expect(progress).toContainText("Practiced: yes");
  await expect(progress).toContainText("Passed checks: 0 / 2");
  await first
    .getByLabel("Explain that access was refused", { exact: true })
    .check();
  await first
    .getByRole("button", { name: "Check answer", exact: true })
    .click();
  await expect(progress).toContainText("Passed checks: 1 / 2");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Try", exact: true }),
  ).toBeVisible();
  await expect(progress).toContainText("Passed checks: 1 / 2");
  await expect(
    page.getByRole("button", { name: "Resume at Try", exact: true }),
  ).toBeVisible();
  await page
    .getByText("Reset this mission’s progress", { exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm reset", exact: true })
    .click();
  await expect(progress).toContainText("Reviewed: not yet");
  await expect(progress).toContainText("Practiced: not yet");
  await expect(progress).toContainText("Passed checks: 0 / 2");
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Understand", exact: true }),
  ).toBeVisible();
});

test("denied request explains refusal and never includes a database summary step", async ({
  page,
}) => {
  await page.goto(route);
  await page.getByRole("button", { name: "2. See", exact: true }).click();
  await page
    .getByRole("button", { name: "Blair · no account access", exact: true })
    .click();
  const flow = page.getByRole("list", { name: "Request flow" });
  await expect(flow).toContainText("403: access refused");
  await expect(flow).not.toContainText("The database is read");
  await page
    .getByRole("button", { name: "Alex · has access", exact: true })
    .click();
  await expect(flow).toContainText("200: the request worked");
  await expect(flow).toContainText("The database is read");
  await expect(flow).toContainText("Review pending");
});

test("malformed progress and blocked storage do not block reading", async ({
  page,
}) => {
  await page.addInitScript((k) => {
    localStorage.setItem(k, "broken-json");
  }, key);
  await page.goto(route);
  await expect(
    page.getByRole("heading", { name: "Understand", exact: true }),
  ).toBeVisible();
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked in test");
      },
    });
  });
  await page.reload();
  await expect(
    page.getByRole("complementary", { name: "Your practice progress" }),
  ).toContainText("Device storage is unavailable");
  await page
    .getByRole("button", { name: "4. Explain", exact: true })
    .press("Enter");
  await expect(
    page.getByRole("heading", { name: "Explain", exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
