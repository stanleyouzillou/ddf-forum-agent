# Workflow: create-post
title: Create Post — walking skeleton → TDD → CI
description: Implement the "Create Post" vertical slice: UI form -> API -> in-memory repo -> E2E acceptance test

steps:
  - step: "Read contract"
    instruction: |
      1) Look for `features/create-post.feature` or `SAMPLE_GHERKIN.feature`.
      2) If found, parse scenarios and list acceptance criteria in the PR description.

  - step: "Create walking skeleton"
    instruction: |
      1) Add a minimal page `/popular` with a `Create Post` form (title + url + submit).
      2) Add an API adapter `POST /api/posts` that calls an InMemoryPostRepo and returns 201 with id.
      3) Add a minimal in-memory repo at `src/modules/posts/infra/InMemoryPostRepo.ts`.
      4) Add Playwright acceptance test (or update existing) that visits `/popular`, submits the form, and asserts the post appears.

  - step: "Unit tests & use-case"
    instruction: |
      1) Implement `CreatePostUseCase` in `src/modules/posts/app/CreatePostUseCase.ts`.
      2) Write unit tests for `CreatePostUseCase` that assert validation and persistence interactions.
      3) Run unit tests until green.

  - step: "Run acceptance test"
    instruction: |
      1) Start dev server (`pnpm dev`) and run Playwright test (`pnpm test:e2e`).
      2) If failing, inspect failures, create targeted unit test to drive the change, and fix.
      3) Repeat Red/Green/Refactor cycles until acceptance test is green.

  - step: "Refactor & PR"
    instruction: |
      1) Refactor code for clarity; keep tests green.
      2) Create a focused branch `feature/create-post` and open a PR.
      3) PR must include: Gherkin scenarios, how to run tests, a short design note, and any migration notes.

  - step: "CI & merge"
    instruction: |
      1) Ensure CI passes (unit + e2e).
      2) Merge to main after approval.
      3) Close the workflow by adding a comment summarizing changes.

notes: |
  - If domain rules are ambiguous (e.g. whether url is required), pause and present options in the PR.
  - Use small commits and include tests with each commit.
