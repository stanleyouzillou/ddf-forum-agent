import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

// Background steps
Given("an existing member {string} is signed in", async () => {
  // No-op for now; handlers hardcode member "alice"
});

Given("the popular page is visible", async ({ page }) => {
  await page.goto("/popular");
  await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
});

// Create post scenario
When(
  "{string} submits a new link with title {string} and url {string}",
  async ({ page }, _member, title, url) => {
    await page.getByTestId("title-input").fill(title);
    await page.getByTestId("url-input").fill(url);
    await page.getByTestId("submit-btn").click();
  }
);

Then(
  "I should see a post titled {string} on the popular page",
  async ({ page }, title) => {
    const item = page.locator("[data-testid=posts-list] li", {
      hasText: title,
    });
    await expect(item).toBeVisible();
  }
);

// Alias to match wording used in upvote feature
Then(
  "I should see the post titled {string} on the popular page",
  async ({ page }, title) => {
    const item = page.locator("[data-testid=posts-list] li", {
      hasText: title,
    });
    await expect(item).toBeVisible();
  }
);

Then("its score should be {int}", async ({ page }, score: number) => {
  const scoreLocator = page.locator(
    "[data-testid=posts-list] li >> text=Score: " + score
  );
  await expect(scoreLocator.first()).toBeVisible();
});

// Upvote feature preconditions
Given(
  "a post titled {string} exists with score 0",
  async ({ page }, title: string) => {
    await page.getByTestId("title-input").fill(title);
    await page.getByTestId("url-input").fill("https://example.com");
    await page.getByTestId("submit-btn").click();
    await expect(
      page.locator("[data-testid=posts-list] li", { hasText: title })
    ).toBeVisible();
    await expect(
      page.locator("[data-testid=posts-list] li >> text=Score: 0").first()
    ).toBeVisible();
  }
);

Given(
  "a post titled {string} exists with score 1",
  async ({ page }, title: string) => {
    await page.getByTestId("title-input").fill(title);
    await page.getByTestId("url-input").fill("https://example.com");
    await page.getByTestId("submit-btn").click();
    const item = page.locator("[data-testid=posts-list] li", {
      hasText: title,
    });
    await expect(item).toBeVisible();
    const upvoteBtn = item.getByRole("button", { name: /upvote/i });
    await upvoteBtn.click();
    await expect(item.locator("text=Score: 1")).toBeVisible();
  }
);

Given(
  "{string} has already upvoted the post titled {string}",
  async ({ page }, _member: string, title: string) => {
    const item = page.locator("[data-testid=posts-list] li", {
      hasText: title,
    });
    const upvoteBtn = item.getByRole("button", { name: /upvote/i });
    await upvoteBtn.click();
    await expect(item.locator("text=Score: 1")).toBeVisible();
  }
);

// Upvote action
When(
  "{string} upvotes the post titled {string}",
  async ({ page }, _member: string, title: string) => {
    const item = page.locator("[data-testid=posts-list] li", {
      hasText: title,
    });
    const upvoteBtn = item.getByRole("button", { name: /upvote/i });
    await upvoteBtn.click();
  }
);
