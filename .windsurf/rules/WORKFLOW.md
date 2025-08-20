---
trigger: always_on
---

# Project workflow (feature-driven, acceptance-first)

1. **Discover & map**: event-storm / quick domain map to identify actors and core features (use SolidBook patterns). Keep discoveries short — a single whiteboard/notes doc.
2. **Write acceptance tests**: author Gherkin scenarios for the selected feature(s).
3. **Walking skeleton**: implement a tiny end-to-end route + API + in-memory repo to satisfy one acceptance test quickly.
4. **Double-Loop TDD**:
   - Outer loop: acceptance tests fail (red).
   - Inner loop: write unit tests for the use-cases and domain objects (red → green → refactor).
5. **Refactor** continuously; keep design simple.
6. **CI & PR**: open small PRs, require at least one human review.
7. **Iterate** to next feature.

Keep acceptance tests as the contract with stakeholders. This flow reduces rework and surfaces integration issues early.
