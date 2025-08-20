/**
 * Guardrail: Do NOT delete this file.
 * This spec ensures the E2E suite always contains a create-post vertical slice entry point.
 * If you need to change scenarios, add/modify tests below rather than removing the file.
 */
import { test, expect } from "@playwright/test";

// Smoke test: verifies the app serves the Popular page used by acceptance scenarios
test("smoke: Popular page renders", async ({ page }) => {
  await page.goto("/popular");
  await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
});
