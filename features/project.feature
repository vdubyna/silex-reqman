@api
Feature: Project
  In order to Manage projects
  As a Project user
  I should be able to manage them

  Scenario: List of projects
    When I send a GET request to "/project/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "identifier":  "project_1",
              "name":  "project 1",
              "description": "Description project 1"
          },
          {
              "id":  "2",
              "identifier":  "project_2",
              "name":  "project 2",
              "description": "Description project 2"
          }
      ]
      """

  Scenario: Get project by id
    When I send a GET request to "/project/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "identifier":  "project_1",
          "name":  "project 1",
          "description": "Description project 1"
      }
      """

  Scenario: Add new project
    When I send a POST request to "/project/" with values:
      | identifier  | project_3             |
      | name        | project 3             |
      | description | Description project 3 |

    Then the response code should be 201
    And response should contain json:
      """
      {
          "id":  "3",
          "identifier":  "project_3",
          "name":  "project 3",
          "description": "Description project 3"
      }
      """
  Scenario: Update project
    When I send a PUT request to "/project/2" with values:
      | name        | project 3             |
      | description | Description project 3 |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "identifier":  "project_2",
          "name":  "project 3",
          "description": "Description project 3"
      }
      """
  Scenario: Delete project
    When I send a DELETE request to "/project/2"
    Then the response code should be 200
    When I send a GET request to "/project/2"
    Then the response code should be 404