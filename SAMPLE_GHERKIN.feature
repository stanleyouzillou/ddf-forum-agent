Feature: Create a new post and show it in popular
  Scenario: Member submits a valid link submission
    Given an existing member "alice" is signed in
    And the popular page is visible
    When alice submits a new link with title "Awesome tool" and url "https://x.com"
    Then I should see a post titled "Awesome tool" on the popular page
    And its score should be 0
