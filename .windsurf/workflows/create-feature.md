---
description:
auto_execution_mode: 1
---

create branch + scaffold canonical Gherkin file + initial commit.

Inputs

feature_name (slug) — required (e.g. create-post)

title — short human title (optional)

description — user description / story (required)

base_branch (default main)

branch_policy flags (optional: allow_empty_commit=false)

Agent steps (exact)

Validate feature_name (lowercase, [-a-z0-9]), ensure not reserved.

git fetch origin and check base_branch exists.

Create branch: git checkout -b feature/<feature_name> origin/<base_branch> (if exists, git checkout feature/<feature_name>).

Generate features/<feature_name>.feature with Gherkin scaffold:

Feature: <Title or feature_name>

# Human description: <description>

Scenario: basic behavior
Given ...
When ...
Then ...

Add metadata header: author, date, feature-id, link to workflow rules.

git add + commit: feat(contract): add <feature_name> contract

Push branch: git push -u origin feature/<feature_name>

Create an initial PR draft (optional) or leave for /commit command.

Return JSON: {status: "created", branch: "...", file: "...", commit: "...", pr_url: null}

Outputs

branch created + pushed, feature file path, commit SHA.

Edge cases

If branch exists and has diverged: agent creates feature/<feature_name>-<timestamp> and warns.
