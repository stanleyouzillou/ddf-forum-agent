# How to work with the agent (short)

- When you want the agent to implement a feature:
  1. Add or update the Gherkin feature under `features/` (or use SAMPLE_GHERKIN.feature).
  2. Open Cascade and run `/create-post` (or the workflow name).
  3. Review the PR created by the agent, run tests locally, and merge if OK.

- If you want the agent to pause:
  - Comment `@agent:pause` in the PR and it will stop making automated changes.

- For major design decisions:
  - Create an issue and ask for human review before accepting changes.
