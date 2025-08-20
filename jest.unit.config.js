/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts"],
  modulePaths: ["<rootDir>/src"],
};
