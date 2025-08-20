---
description:
auto_execution_mode: 1
---

Purpose: implement the vertical slice for given feature file: walking skeleton → double-loop TDD → artifacts.

Inputs

feature_file (required) — repo path or GitHub URL (agent must accept either)

branch (optional) — branch to work on; default: feature/<feature_name>

test_fast_cmd, e2e_cmd, dev_cmd (optional override)

max_iterations (safety) default 10

pause_on_ambiguity (bool) default true

Agent steps (exact) 0. Validate preconditions: repo access, branch exists, feature file immutable (unless force).

Parse feature_file and extract scenarios.

Ensure branch checked out: git checkout $branch.

Create walking skeleton minimal files (UI route, API adapter, InMemory repo, use-case) in src/modules/<feature_name>/....

Use templates and place TODO comments linking to the feature file.

Commit each logical step: small focused commits, push after each.

Start dev server (background) and run e2e_cmd. If passes immediately, skip to PR prep.

If failing: enter inner TDD loop up to max_iterations:

a) Inspect failing e2e logs → identify first failing expectation.

b) Add unit test (tests/unit/...) that reproduces smallest behavior.

c) Run test_fast_cmd — ensure red.

d) Implement minimal code to make test green.

e) Refactor. Commit and push.

f) Re-run e2e. If green, break.

If ambiguity encountered (validation rules, UX choice) AND pause_on_ambiguity:

Create a short ISSUE + comment on branch with options, set status waiting_for_human.

Stop further automatic changes until human resolves.

When acceptance green: collect artifacts (playwright json/html, traces, screenshots), attach to PR or comment.

Return structured report: commits list, test results, artifacts locations, any issues raised.

Outputs

Multiple commits pushed to feature branch, test artifacts, status report, optional PR draft.

Safety

Always commit tests & pass unit tests before pushing feature code that makes tests pass.

Respect .windsurf/rules.md — do not upgrade dependencies or change global config.
