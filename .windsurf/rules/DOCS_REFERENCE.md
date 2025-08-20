---
trigger: manual
---

FILE CONTENT STARTS HERE

Reference rules — Next / TypeScript / React (text)

Upgrade guide (version info): https://nextjs.org/docs/app/guides/upgrading/version-15

Codemods: https://nextjs.org/docs/app/guides/upgrading/codemods

Next.js: Server vs Client components

Use Server Components for business logic and server-side data fetching (layouts and most pages should be server components by default).

Docs: https://nextjs.org/docs/app/getting-started/server-and-client-components

Use Client Components only when you need browser-only APIs, local state, effects, or interactivity. Add 'use client' at the top of files only when required.

Client Components docs: https://nextjs.org/docs/14/app/building-your-application/rendering/client-components

Mutations & Server Actions

Prefer Server Actions or server handlers for simple form submissions and short mutations handled on the server. Keep long-running or external side-effects in background jobs or explicit server endpoints.

Server Actions & data updating docs: https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations

Updating data guide: https://nextjs.org/docs/app/getting-started/updating-data

Upgrade & codemod policy

If upgrading a major Next version (e.g., 14 → 15):

Create an RFC issue describing breaking changes and migration steps.

Run the official codemod(s) locally: npx @next/codemod@canary upgrade latest

Run full CI (unit + e2e) and attach CI logs to the RFC/PR.

Wait for human approval before merging.

Codemod docs: https://nextjs.org/docs/app/guides/upgrading/codemods

Version 15 upgrade notes: https://nextjs.org/docs/app/guides/upgrading/version-15

TypeScript rules

tsconfig.json: set compilerOptions.strict = true (enable noImplicitAny, strictNullChecks, etc.). Strict mode catches many issues early.

TypeScript strict docs: https://www.typescriptlang.org/tsconfig/strict.html

Use runtime validation (zod / io-ts) at external boundaries (API inputs, DB rows). Prefer explicit typed factories for domain entities.

Linting & Hooks

Use eslint-config-next as baseline and include eslint-plugin-react-hooks. Enforce the Rules of Hooks; treat react-hooks/exhaustive-deps at least as warn.

react-hooks plugin: https://www.npmjs.com/package/eslint-plugin-react-hooks

Rules of Hooks reference: https://reactjs.org/docs/hooks-rules.html

Use husky + lint-staged to run formatting and linting on pre-commit.

Testing & CI (reminder)

Acceptance tests (Playwright / Gherkin) are the contract and must run in CI against a running app.

Playwright + Next guide: https://nextjs.org/docs/pages/guides/testing/playwright

Provide a test:fast script that uses in-memory adapters so humans/agents can run fast Red→Green→Refactor loops locally.

Quarantine flaky tests (do not delete). If a test is flaky, open an issue, mark the test @flaky and create a ticket.

CI / Build rules

CI order: install → test:unit → build → start → test:e2e. Acceptance tests must pass before merging to main.

Agent must attach CI logs to any PR that changes runtime behavior (Next, React, build settings).

Dev ergonomics

Provide .devcontainer or a reproducible dev script and document Node / pnpm versions in DEVELOPER.md.

For bundler or tooling changes (e.g., switching to Turbopack), the agent must open an RFC and wait for human approval.

Agent constraints

The agent must never change this file automatically. It may propose edits via PR but must request human approval before committing changes to this file.

If the agent needs to change Next/React major versions:

Create an RFC issue describing breaking changes and migration steps.

Run official codemods locally (npx @next/codemod@canary upgrade latest) and run full CI (unit + e2e).

Attach CI output and request human review before merging.

Where to place this file

Place under .windsurf/reference-rules.txt (or .windsurf/reference-rules.md if you convert it). This keeps it with the always-on Windsurf rules.

Git commit snippet

git checkout -b chore/add-reference-rules

[create/edit .windsurf/reference-rules.txt with the content above]

git add .windsurf/reference-rules.txt

git commit -m "chore(rules): add Next/TS/React reference rules (Next 14 default)"

git push -u origin chore/add-reference-rules

END OF FILE

Would you like me to also produce a plain-text PR description + checklist you can paste into GitHub for this branch?
