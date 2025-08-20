// cucumber.js
module.exports = {
  default: {
    requireModule: ["ts-node/register", "tsconfig-paths/register"],
    require: [
      "tests/e2e/hooks.ts", // hooks (Before/After) that create Playwright page/context
      "tests/e2e/steps/**/*.ts", // step definitions (glue)
      "tests/e2e/world.ts", // optional custom World
    ],
    format: ["progress", "json:playwright-report/results.json"],
    paths: ["features/**/*.feature"],
    parallel: 0, // 0 = no parallel; set >1 when steps are made concurrency-safe
    publishQuiet: true, // silence cucumber.io publishing
  },
};
