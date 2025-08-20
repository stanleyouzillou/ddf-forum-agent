# Windsurf Memories — team-level context (persisted)

Memories are long-lived preferences and facts the agent should remember across sessions.

## Team & Project facts
- Project: DDDForum — HackerNews-inspired forum clone (posts, votes, comments, users).
- Primary language: TypeScript / Node / Next.js.
- Testing: Jest for unit, Playwright for E2E.
- DB (future): Postgres + Prisma (start with in-memory adapters for speed).

## Domain shortcuts
- Actor: Member / User (members can post links/text, comment, upvote).
- Core features: createPost, getPopular, upvotePost, commentOnPost.
- Default per-post initial score: 0.

## Preferences
- Use feature-driven folder layout: `src/modules/<feature>/{domain,app,infra,api}`
- Acceptance tests ALWAYS in `src/tests/e2e/*.spec.ts` or `features/*.feature`.
- Commit messages should follow: `type(scope): short summary` (e.g. `feat(posts): add create-post use case`).

## Reminders for the agent
- When asked to implement a feature, always:
  1. Check for existing Gherkin features; if present, treat them as contract.
  2. If no Gherkin exists, generate acceptance scenarios and open them for human review.
  3. Implement walking skeleton to satisfy at least one acceptance scenario.
  4. Use in-memory repos for fast feedback; switch to Prisma/Postgres only after approval.

## Short-term mutable memory (session)
- Current sprint feature: **Create Post** (link or text) — track progress of acceptance tests and unit tests.
- Current branch: use the branch specified by the human (or create `feature/<short-name>`).
