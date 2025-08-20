import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [
    ["line"],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["html", { open: "never", outputFolder: "playwright-report/html" }],
  ],
  webServer: {
    // Use pnpm exec to reliably resolve local Next binary on Windows
    command: "pnpm exec next dev -p 3000 --hostname 0.0.0.0",
    // Point readiness check to an existing page to avoid 404 on '/'
    url: "http://localhost:3000/popular",
    reuseExistingServer: false, // force fresh start for debugging
    timeout: 300000,
  },
});
