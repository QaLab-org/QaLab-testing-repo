@active
Feature: Succeeded Shopping on SauceDemo 

    Background:
        Given I am on the Inventory Page
    
    Scenario Outline: Add an item to the cart
        When I add <product> to the cart
        Then The item <product> should be in the cart

        Examples:
            | product                             |
            | "Sauce Labs Backpack"               |
            | "Sauce Labs Bolt T-Shirt"           |
            | "Sauce Labs Onesie"                 |
            | "Sauce Labs Bike Light"             |
            | "Sauce Labs Fleece Jacket"          |
            | "Test.allTheThings() T-Shirt (Red)" |

    Scenario: Checkout the items in the cart
        When I add "Sauce Labs Backpack" to the cart
        And I proceed to checkout
        Then I should be on the checkout page
    