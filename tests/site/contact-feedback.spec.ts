import { expect, test } from "@playwright/test";

test.skip(Boolean(process.env.SMOKE_BASE_URL), "Synthetic contact tests run only against the local CI server.");

test("contact keeps pending focus, prevents duplicate requests, and recovers after failure", async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/contact", async (route) => {
    requests += 1;
    if (requests === 1) {
      await pending;
      await route.fulfill({ status: 503, json: { error: "Email is not configured yet." } });
    } else {
      await route.fulfill({ json: { ok: true } });
    }
  });
  await page.goto("/contact");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Synthetic QA");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("qa@example.com");
  const message = page.getByRole("textbox", { name: "Message", exact: true });
  await message.fill("Synthetic submission feedback check.");
  const send = page.getByRole("button", { name: "Send message", exact: true });
  await send.click();
  await expect(send).toHaveAttribute("aria-busy", "true");
  await expect(send).toBeFocused();
  await expect(page.getByRole("status")).toContainText("Sending");
  // Exercise both native keyboard activation and repeated form submission.
  await page.keyboard.press("Enter");
  await page.locator("#write").evaluate((form) => (form as HTMLFormElement).requestSubmit());
  expect(requests).toBe(1);
  release();
  await expect(page.getByRole("status")).toContainText("Message not sent");
  await expect(page.getByRole("status")).toContainText("Email is not configured yet.");
  await expect(message).toHaveValue("Synthetic submission feedback check.");
  await expect(page.getByRole("link", { name: "Email me instead" })).toHaveAttribute("href", /^mailto:/);
  await send.click();
  await expect(page.getByRole("status")).toContainText("Message sent.");
  await expect(message).toHaveValue("");
  await expect(page.getByRole("link", { name: "Email me instead" })).toHaveCount(0);
  expect(requests).toBe(2);
});

test("contact network failure preserves the draft and exposes recovery", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort());
  await page.goto("/contact");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Synthetic QA");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("qa@example.com");
  const message = page.getByRole("textbox", { name: "Message", exact: true });
  await message.fill("Synthetic network failure check.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Could not send");
  await expect(message).toHaveValue("Synthetic network failure check.");
  await expect(page.getByRole("link", { name: "Email me instead" })).toBeVisible();
});
