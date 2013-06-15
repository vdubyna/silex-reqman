Feature: Home Page
  To use reqman application
  As a reqman user
  I need to be able to see home page

  @mink:selenium2
  Scenario: Open home page
    Given I am on homepage
    Then I should see "Reqman Application"
