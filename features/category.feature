@api
Feature: Category
  In order to Manage categories
  As a Reqman user
  I should be able to manage them

  Scenario: List of projects
    When I send a GET request to "/project/1/category/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "project_id":  "1",
              "name":  "category 1",
              "description": "Description category 1"
          },
          {
              "id":  "2",
              "project_id":  "1",
              "name":  "category 2",
              "description": "Description category 2"
          }
      ]
      """

  Scenario: Get category by id
    When I send a GET request to "/project/1/category/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "project_id":  "1",
          "name":  "category 1",
          "description": "Description category 1"
      }
      """

  Scenario: Add new project
    When I send a POST request to "/project/1/category/" with values:
      | project_id  | 1                     |
      | name        | category 3             |
      | description | Description category 3 |

    Then the response code should be 201
    And response should contain json:
      """
      {
          "id":  "3",
          "project_id":  "1",
          "name":  "category 3",
          "description": "Description category 3"
      }
      """
  Scenario: Update category
    When I send a PUT request to "/project/1/category/2" with values:
      | name        | category 3             |
      | description | Description category 3 |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "project_id":  "1",
          "name":  "category 3",
          "description": "Description category 3"
      }
      """
  Scenario: Delete category
    When I send a DELETE request to "/project/1/category/2"
    Then the response code should be 200
    When I send a GET request to "/project/1/category/2"
    Then the response code should be 404