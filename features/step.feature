@api @step
Feature: Step
  In order to Manage step
  As a Reqman user
  I should be able to manage them

  @listofsteps
  Scenario: List of steps
    When I send a GET request to "/test-case/1/step/"
    Then the response code should be 200
    And response should contain json:
      """
      [
          {
              "id":  "1",
              "test_case_id":  "1",
              "name":  "step 1 given",
              "type": "given"
          },
          {
              "id":  "2",
              "test_case_id":  "1",
              "name":  "step 2 when",
              "type": "when"
          },
          {
              "id":  "3",
              "test_case_id":  "1",
              "name":  "step 3 then",
              "type": "then"
          }
      ]
      """

  Scenario: Get step by id
    When I send a GET request to "/test-case/1/step/1"
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "1",
          "test_case_id":  "1",
          "name":  "step 1 given",
          "type": "given"
      }
      """

  Scenario: Add new step
    When I send a POST request to "/test-case/2/step/" with values:
      | name          | step 1-2 |
      | type          | given    |
    Then the response code should be 201
    And print response
    And response should contain json:
      """
      {
          "id":  "4",
          "test_case_id":  "2",
          "name":  "step 1-2",
          "type": "given"
      }
      """

  Scenario: Update step
    When I send a PUT request to "/test-case/1/step/2" with values:
      | name        | step 3 then           |
    Then the response code should be 200
    And response should contain json:
      """
      {
          "id":  "2",
          "test_case_id":  "1",
          "name":  "step 3 then",
          "type": "when"
      }
      """
  Scenario: Delete step
    When I send a DELETE request to "/test-case/1/step/2"
    Then the response code should be 200
    When I send a GET request to "/test-case/1/step/2"
    Then the response code should be 404