@active
Feature: Shopping on SauceDemo

    Background:
        Given I am on the Inventory Page

    Scenario: Add an item to the cart
        When I add Sauce Labs Backpack to the cart
        Then The item "Sauce Labs Backpack" should be in the cart

    Scenario: Checkout the items in the cart
        When I add Sauce Labs Backpack to the cart
        And I proceed to checkout
        Then I should be on the checkout page
