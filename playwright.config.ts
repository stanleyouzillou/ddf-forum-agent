import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const bddTestDir = defineBddConfig({
  paths: ["features/**/*.feature"],
  require: ["tests/e2e/steps/**/*.ts", "tests/e2e/hooks.ts"],
});

export default defineConfig({
  projects: [
    {
      name: "e2e",
      testDir: "tests/e2e",
      use: { baseURL: "http://localhost:3000" },
    },
    {
      name: "bdd",
      testDir: bddTestDir,
      use: { baseURL: "http://localhost:3000" },
    },
  ],
  reporter: [
    ["list"],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["html", { outputFolder: "playwright-report/html", open: "never" }],
  ],
  webServer: {
    command: "pnpm exec next dev -p 3000",
    url: "http://localhost:3000/popular",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
