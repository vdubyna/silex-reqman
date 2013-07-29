@api @testCase
Feature: Test Case
  In order to Manage user Test Cases
  As a Reqman user
  I should be able to manage them

  Scenario: List of Test Cases
    When I send a GET request to "/user-story/1/test-case/"
    Then the response code should be 200
    And response should contain json:
    """
      [
          {
              "id":  "1",
              "user_story_id":  "1",
              "name":  "test-case-1",
              "description": "Description test-case 1"
          },
          {
              "id":  "2",
              "user_story_id":  "1",
              "name":  "test-case-2",
              "description": "Description test-case 2"
          }
      ]
      """

  Scenario: Get test case by id
    When I send a GET request to "/user-story/1/test-case/1"
    Then the response code should be 200
    And response should contain json:
    """
      {
          "id":  "1",
          "user_story_id":  "1",
          "name":  "test-case-1",
          "description": "Description test-case 1"
      }
      """

  Scenario: Add new test case
    When I send a POST request to "/user-story/1/test-case/" with values:
      | name        | test-case-3             |
      | description | Description test-case 3 |

    Then the response code should be 201
    And response should contain json:
    """
      {
          "id":  "3",
          "user_story_id":  "1",
          "name":  "test-case-3",
          "description": "Description test-case 3"
      }
      """
  Scenario: Update test case
    When I send a PUT request to "/user-story/1/test-case/2" with values:
      | name        | test-case-3             |
      | description | Description test-case 3 |
    Then the response code should be 200
    And response should contain json:
    """
      {
          "id":  "2",
          "user_story_id":  "1",
          "name":  "test-case-3",
          "description": "Description test-case 3"
      }
      """
  Scenario: Delete test case
    When I send a DELETE request to "/user-story/1/test-case/2"
    Then the response code should be 200
    When I send a GET request to "/user-story/1/test-case/2"
    Then the response code should be 404