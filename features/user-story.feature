@api @userStory
Feature: User Story
  In order to Manage user stories
  As a Reqman user
  I should be able to manage them

  Scenario: List of User Stories
    When I send a GET request to "/project/1/user-story/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "project_id":  "1",
              "name":  "user-story-1",
              "description": "Description user-story 1"
          },
          {
              "id":  "2",
              "project_id":  "1",
              "name":  "user-story-2",
              "description": "Description user-story 2"
          }
      ]
      """

  Scenario: Get user-story by id
    When I send a GET request to "/project/1/user-story/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "project_id":  "1",
          "name":  "user-story-1",
          "description": "Description user-story 1"
      }
      """

  Scenario: Add new project
    When I send a POST request to "/project/1/user-story/" with values:
      | project_id  | 1                        |
      | name        | user-story-3             |
      | description | Description user-story 3 |

    Then the response code should be 201
    And response should contain json:
      """
      {
          "id":  "3",
          "project_id":  "1",
          "name":  "user-story-3",
          "description": "Description user-story 3"
      }
      """
  Scenario: Update user-story
    When I send a PUT request to "/project/1/user-story/2" with values:
      | name        | user-story-3             |
      | description | Description user-story 3 |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "project_id":  "1",
          "name":  "user-story-3",
          "description": "Description user-story 3"
      }
      """
  Scenario: Delete user-story
    When I send a DELETE request to "/project/1/user-story/2"
    Then the response code should be 200
    When I send a GET request to "/project/1/user-story/2"
    Then the response code should be 404