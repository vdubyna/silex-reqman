@api @step
Feature: Step
  In order to Manage step
  As a Reqman user
  I should be able to manage them

  Scenario: List of projects
    When I send a GET request to "/project/1/feature/1/step"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "feature_id":  "1",
              "name":  "step 1",
              "description": "Description step 1"
          },
          {
              "id":  "2",
              "feature_id":  "1",
              "name":  "step 2",
              "description": "Description step 2"
          }
      ]
      """

  Scenario: Get step by id
    When I send a GET request to "/project/1/feature/1/step/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "feature_id":  "1",
          "name":  "step 1",
          "description": "Description step 1"
      }
      """

  Scenario: Add new project
    When I send a POST request to "/project/1/feature/1/step/" with values:
      | name        | step 3             |
      | description | Description step 3 |

    Then the response code should be 201
    And response should contain json:
      """
      {
          "id":  "3",
          "feature_id":  "1",
          "name":  "step 3",
          "description": "Description step 3"
      }
      """
  Scenario: Update step
    When I send a PUT request to "/project/1/feature/1/step/2" with values:
      | name        | step 3             |
      | description | Description step 3 |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "feature_id":  "1",
          "name":  "step 3",
          "description": "Description step 3"
      }
      """
  Scenario: Delete step
    When I send a DELETE request to "/project/1/feature/1/step/2"
    Then the response code should be 200
    When I send a GET request to "/project/1/feature/1/step/2"
    Then the response code should be 404