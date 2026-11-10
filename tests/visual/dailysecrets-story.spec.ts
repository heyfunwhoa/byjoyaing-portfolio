import { expect, test } from "@playwright/test";

const story = "/iframe.html?id=design-lab-dailysecrets-story--";

test("stacked story presents the complete sequence without controls", async ({
  page,
}) => {
  await page.goto(story + "stacked");
  const panels = page.locator("article");
  await expect(panels).toHaveCount(5);
  await expect(panels.nth(3)).toContainText("The old key still works.");
  await expect(panels.nth(4)).toContainText("disables the old one");
});

test("carousel exposes the selected panel and keeps keyboard focus at the end", async ({
  page,
}) => {
  await page.goto(story + "carousel");
  const carousel = page.getByRole("region", { name: "Payment key story" });
  const next = carousel.getByRole("button", { name: "Next", exact: true });
  const previous = carousel.getByRole("button", {
    name: "Previous",
    exact: true,
  });

  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await expect(
    carousel.getByRole("heading", { name: "A private message" }),
  ).toBeVisible();
  await expect(
    carousel.getByRole("heading", { name: "The guide is edited" }),
  ).toHaveCount(0);

  await next.focus();
  for (let index = 2; index <= 5; index++) {
    await next.press("Enter");
    await expect(carousel.getByRole("status")).toHaveText(`Part ${index} of 5`);
  }

  await expect(next).toBeDisabled();
  await expect(next).toBeFocused();
  await expect(
    carousel.getByRole("heading", { name: "The owner replaces the key" }),
  ).toBeVisible();
  await next.press("ArrowLeft");
  await expect(carousel.getByRole("status")).toHaveText("Part 4 of 5");
  await expect(
    carousel.getByRole("heading", { name: "The guide is edited" }),
  ).toBeVisible();
});
