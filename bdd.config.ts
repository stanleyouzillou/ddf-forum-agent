import { defineBddConfig } from "playwright-bdd";

export default defineBddConfig({
  features: "features/**/*.feature",
  steps: ["tests/bdd/steps/**/*.ts"],
  outputDir: "tests/bdd-gen",
});
