# Gherkin guide — writing acceptance tests for Windsurf

Guidelines:
- Keep scenarios short and focused (1 behavior per scenario).
- Use `Given` for setup, `When` for the action, `Then` for the observable outcome.
- Save feature files under `features/*.feature` or `src/tests/e2e/*.feature`.

Example:
```
Feature: Create a new post and show it in popular
  Scenario: Member submits a valid link submission
    Given an existing member "alice" is signed in
    And the popular page is visible
    When alice submits a new link with title "Awesome tool" and url "https://x.com"
    Then I should see a post titled "Awesome tool" on the popular page
    And its score should be 0
```

Best practices for the agent:
- Treat feature files as immutable contracts unless a human asks to change them.
- When multiple scenarios exist, implement the simplest one first.
- Keep data setup explicit in Given steps or use builder fixtures under `tests/fixtures`.
