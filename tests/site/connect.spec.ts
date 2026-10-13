import { expect, test } from "@playwright/test";

test("QR landing keeps confirmation deliberate and destination fixed", async ({
  page,
  request,
}) => {
  const response = await request.get(
    "/connect?next=https://example.invalid&url=https://example.invalid",
  );
  expect(response.status()).toBe(200);
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe("no-referrer");
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  await page.goto("/connect?next=https://example.invalid");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "Let's stay connected.",
  );
  const link = main.getByRole("link", { name: "Continue to LinkedIn" });
  await expect(link).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/kristenaing",
  );
  await expect(main.locator("form")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await link.focus();
  await expect(link).toBeFocused();
  // Intercept external navigation: never send a real connection request.
  await page.route("https://www.linkedin.com/**", (route) =>
    route.fulfill({ body: "Profile destination verified" }),
  );
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("https://www.linkedin.com/in/kristenaing");
});
