---
trigger: always_on
---

# Testing strategy

- **Unit tests**: fast, isolated. Test domain logic, value objects, aggregates, use-cases.
  - Run: `pnpm test:unit`
- **Integration tests**: test adapters + wiring (e.g., API + in-memory repo).
  - Keep them small and deterministic.
- **E2E acceptance tests**: Playwright tests that exercise the whole vertical slice.
  - Run: `pnpm test:e2e`

Agent rules for testing:

- Run unit tests locally before changing E2E.
- Keep test flakiness below a threshold ( < 5% ).
- If an E2E fails, create targeted unit tests to reproduce and fix the issue.
