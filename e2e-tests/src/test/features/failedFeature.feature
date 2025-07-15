@active
Feature: Failed Shopping on SauceDemo 

    Background:
        Given I am on the Inventory Page
    
    Scenario Outline: Add an item to the cart
        When I add <product> to the cart
        Then The item <product> should be in the cart

        Examples:
            | product                             |
            | "Sauce Labs Backpackk"               |
            | "Sauce Labs Bolt T-Shirtt"           |
            | "Sauce Labs Onesiee"                 |
            | "Sauce Labs Bike Lightt"             |
            | "Sauce Labs Fleece Jackett"          |
            | "Test.allTheThings() T-Shirt (Red))" |