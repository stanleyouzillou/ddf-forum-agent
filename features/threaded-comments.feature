Feature: Threaded comments (post comments + replies)
  # Human description: Allow signed-in members to post comments on a post and reply to existing comments.
  # Rules:
  # - Only authenticated users may create comments or replies; unauthenticated attempts return 401.
  # - Each comment stores: author, timestamp, body (<= 200 chars), optional parentId.
  # - Replying to a non-existent comment returns 404.
  # - Display: top-level comments in chronological order; each parent’s replies appear immediately after the parent in chronological order.

  Background:
    Given an existing member "alice" is signed in
    And the popular page is visible
    And a post titled "On DDD" exists with score 0

  Scenario: Member posts a top-level comment successfully
    When alice comments "Great read!" on the post titled "On DDD"
    Then I should see a comment "Great read!" under the post titled "On DDD"

  Scenario: Unauthenticated user cannot post a comment (401)
    Given no user is signed in
    When someone comments "Hello" on the post titled "On DDD"
    Then the request should be unauthorized

  Scenario: Member replies to an existing comment successfully
    Given a comment "First!" exists under the post titled "On DDD"
    When alice replies "Agree" to the comment "First!" on the post titled "On DDD"
    Then I should see a reply "Agree" under the comment "First!" on the post titled "On DDD"

  Scenario: Replying to a non-existent comment returns 404
    When alice replies "Where is it?" to a missing comment id "deadbeef" on the post titled "On DDD"
    Then the request should be not found

  Scenario: Comments and replies display in the correct order
    Given the following comments exist under the post titled "On DDD" in chronological order:
      | body           |
      | "A"            |
      | "B"            |
    And the following replies exist under the comment "A" in chronological order on the post titled "On DDD":
      | body           |
      | "A1"           |
      | "A2"           |
    Then I should see the comments displayed in this order under the post titled "On DDD":
      | body           |
      | "A"            |
      | "A1"           |
      | "A2"           |
      | "B"            |
