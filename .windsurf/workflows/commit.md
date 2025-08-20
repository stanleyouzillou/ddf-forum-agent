---
description:
auto_execution_mode: 1
---

Purpose: finalize branch: push, open PR, optionally request reviewers and run CI.

Inputs

branch (required)

pr_title (optional)

pr_body_template (optional)

reviewers (list optional)

auto_merge (bool default false)

Agent steps

Validate branch is up-to-date with base (git fetch + git rebase origin/main or create merge commit as per policy) — prefer rebase unless policy forbids.

Run test_fast_cmd & e2e_cmd (or read last run); if failures present, abort and post logs.

Create PR via gh pr create or GitHub API including Gherkin contract, list of commits, test badges, artifacts links.

Add labels: needs-review, feature/<feature_name>, assign reviewers per CODEOWNERS.

Optional: set draft vs ready state depending on tests_green.

Return PR URL and CI job URL.

Outputs

PR opened (or updated), CI kicked, message with PR link.
