@api
Feature: Issue To Feature
  In order to Manage issues and feature
  As a Reqman user
  I should be able to manage them

  @getListOfIssues
  Scenario: List of issues by project and issues
    When I send a GET request to "/project/1/feature/1/issue/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id": "1",
              "project_id": "1",
              "name": "feature 1",
              "description": "Description feature 1",
              "category_id": "1"
          },
          {
              "id": "2",
              "project_id": "1",
              "name": "feature 2",
              "description": "Description feature 2",
              "category_id": "1"
          }
      ]
      """