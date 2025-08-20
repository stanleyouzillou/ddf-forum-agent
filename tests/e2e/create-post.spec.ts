import { test, expect } from "@playwright/test";

// Debug hooks to surface errors in CI/local runs
test.beforeEach(async ({ page }) => {
  page.on("console", (msg) => console.log("[console]", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("[pageerror]", err.message));
  page.on("requestfailed", (req) =>
    console.log("[requestfailed]", req.url(), req.failure()?.errorText)
  );
});

// Optional: give a bit more time on slower cold starts
// test.setTimeout(15000);

test("Member submits a valid link submission", async ({ page }) => {
  await page.goto("/popular");

  await page.getByTestId("title-input").fill("Awesome tool");
  await page.getByTestId("url-input").fill("https://x.com");

  // Start waiting for the API response before clicking, to avoid race conditions
  const postResponsePromise = page.waitForResponse(
    (res) =>
      res.url().endsWith("/api/posts") &&
      res.request().method() === "POST" &&
      res.status() === 201
  );

  await page.getByTestId("submit-btn").click();
  await postResponsePromise;

  const item = page.getByTestId("posts-list").getByText("Awesome tool");
  await expect(item).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("Score: 0")).toBeVisible({ timeout: 15000 });
});
