Feature: Project
  In order to Manage projects
  As a Project user
  I should be able to manage them

  Scenario: List of projects
    When I send a GET request to "/project"
    Then the response code should be 200
    And response should contain json:
    """
      [
          {
              "name":  "project 1",
              "description": "Description project 1"
          },
          {
              "name":  "project 2",
              "description": "Description project 2"
          },
          {
              "name":   "project 3",
              "description":  "Description project 3"
          }
      ]
      """