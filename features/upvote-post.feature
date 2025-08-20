# author: human + Cascade
# date: 2025-08-20
# feature-id: upvote-post
# ref: .windsurf/rules.md

Feature: Upvote a post to increase its score
  # Human description: Core Hacker-News behavior. Members can upvote a post.
  # Rules:
  # - First upvote by a member increases the post score by 1.
  # - Repeated upvotes by the same member are idempotent (score does not increase again).

  Background:
    Given an existing member "alice" is signed in
    And the popular page is visible

  Scenario: Member upvotes a post and the score increases by 1
    Given a post titled "Awesome tool" exists with score 0
    When alice upvotes the post titled "Awesome tool"
    Then I should see the post titled "Awesome tool" on the popular page
    And its score should be 1

  Scenario: Member cannot upvote the same post twice (idempotent)
    Given a post titled "Awesome tool" exists with score 1
    And alice has already upvoted the post titled "Awesome tool"
    When alice upvotes the post titled "Awesome tool" again
    Then I should see the post titled "Awesome tool" on the popular page
    And its score should be 1
