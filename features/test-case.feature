@api
Feature: Features' Test case
  In order to Manage Test cases
  As a Reqman user
  I should be able to manage them

  Scenario: List of Test cases
    When I send a GET request to "/project/1/feature/1/test-case/"
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
      ""