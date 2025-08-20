---
trigger: always_on
---

# Windsurf Rules — repo-level guardrails (always on)

These rules are always visible to the WindSurf agent (Cascade). They should be concise, deterministic, and authoritative.

## 1) Project philosophy & priorities

- Follow **Clean-Architecture / DDD** principles: feature-driven vertical slices, acceptance-first (Gherkin), walking skeleton, then Double-Loop TDD (acceptance outer loop, unit inner loop).
- Keep the `main` branch deployable. Small commits, small PRs.
- Prioritize tests that codify behavior (acceptance tests) over UI polish early.

## 2) Repo conventions (commands)

- Dev: `pnpm dev` — start app locally on :3000
- Unit tests: `pnpm test:unit`
- E2E tests: `pnpm test:e2e`
- Lint & format: `pnpm lint && pnpm format`
- Build: `pnpm build`

## 3) Coding standards

- TypeScript + strict mode (prefer explicit types).
- Prefer domain value objects and aggregates for business logic.
- Apply CQS (Command Query Separation) in use-cases.
- Name things using SolidBook naming rules: clear, specific, pronounceable, concise.

## 4) Testing & TDD rules for the agent

- Acceptance tests (Gherkin / Playwright) are the **contract** — never change them without human approval.
- Agent may create or update unit tests to make acceptance tests green.
- Use Red → Green → Refactor. Commit after green.
- When modifying domain invariants, create/adjust unit tests and add a short CHANGES note in PR.

## 5) PR & commit guidance

- Squash or keep focused commits per feature: `[feature(posts)]: create walking skeleton for create-post`.
- PR description must reference the acceptance scenarios (paste the Gherkin).
- Agent must run CI locally (or a simulated run) before opening PR.

## 6) Interaction rules

- Ask the human: if a workflow requires design/UX decisions or ambiguous domain rules, the agent must pause and list options.
- For low-ambiguity refactors, agent can proceed and open a PR with tests + summary.
- For destructive migrations (DB schema, API-breaking), agent must create an RFC issue and wait for human approval.

## 7) Files the agent must not modify automatically

- `.windsurf/rules.md`
- `.windsurf/memories.md`
- `README.md`
- `CONTRIBUTING.md`
  Agent may propose edits but must ask before committing changes to these files.
