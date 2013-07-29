@api
Feature: Feature
  In order to Manage categories
  As a Reqman user
  I should be able to manage them

  Scenario: List of projects
    When I send a GET request to "/project/1/feature/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "project_id":  "1",
              "name":  "feature 1",
              "description": "Description feature 1"
          },
          {
              "id":  "2",
              "project_id":  "1",
              "name":  "feature 2",
              "description": "Description feature 2"
          }
      ]
      """

  Scenario: Get feature by id
    When I send a GET request to "/project/1/feature/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "project_id":  "1",
          "name":  "feature 1",
          "description": "Description feature 1"
      }
      """

  Scenario: Add new project
    When I send a POST request to "/project/1/feature/" with values:
      | project_id  | 1                     |
      | name        | feature 3             |
      | description | Description feature 3 |

    Then the response code should be 201
    And response should contain json:
      """
      {
          "id":  "3",
          "project_id":  "1",
          "name":  "feature 3",
          "description": "Description feature 3"
      }
      """
  Scenario: Update feature
    When I send a PUT request to "/project/1/feature/2" with values:
      | name        | feature 3             |
      | description | Description feature 3 |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "project_id":  "1",
          "name":  "feature 3",
          "description": "Description feature 3"
      }
      """
  Scenario: Delete feature
    When I send a DELETE request to "/project/1/feature/2"
    Then the response code should be 200
    When I send a GET request to "/project/1/feature/2"
    Then the response code should be 404