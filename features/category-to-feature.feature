@api @categoryToFeature
Feature: Category To Feature
  In order to Manage categories and feature
  As a Reqman user
  I should be able to manage them

  Scenario: List of features by product and category category 1
    When I send a GET request to "/project/1/category/1/feature/"
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
  Scenario: List of features by product and category category 2
    When I send a GET request to "/project/1/category/2/feature/"
    Then the response code should be 200
    And response should contain json:
    """
      [
          {
              "id": "1",
              "project_id": "1",
              "name": "feature 1",
              "description": "Description feature 1",
              "category_id": "2"
          }
      ]
      """

  Scenario: Get feature by id and category id and project id
    When I send a GET request to "/project/1/category/1/feature/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "project_id":  "1",
          "name":  "feature 1",
          "description": "Description feature 1",
          "category_id": "1"
      }
      """
  @deleteCategoryFromFeature
  Scenario: Delete category
    When I send a DELETE request to "/project/1/category/1/feature/1"
    Then the response code should be 200
    When I send a GET request to "/project/1/category/1/feature/1"
    Then the response code should be 404