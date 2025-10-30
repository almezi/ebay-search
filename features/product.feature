Feature: Access A Product In Product List

  Scenario: User want to access product via search
    Given [ebay] User open the main page
    When [ebay] User type 'Malaysian Baju Melayu Elrah set Malay Traditional Formal Attire Shirt Pants' in search bar of the main page
    And [ebay] User use filter 'Clothing, Shoes & Accessories'
    And [ebay] store data in local storage from search result
    Then [ebay] User can see the search result contain product name 'Malaysian Baju Melayu Elrah set Malay Traditional Formal Attire Shirt Pants'
    And [ebay] User can see price with value 'IDR1,129,177.92'
    And [ebay] User can see delivery value '+IDR49,657.92'
    And [ebay] User can see product location in 'Malaysia'

  Scenario: User want to access a product via category and apply multiple filter
    Given [ebay] User open the main page
    When [ebay] User trigger to open shop by category beside search bar
    Then [ebay] User can see shop by category and select 'Cell Phones, Smart Watches & Accessories'
    And [ebay] User can see subcategory page with title 'Cell Phones, Smart Watches & Accessories'
    When [ebay] User select 'Cell Phones & Smartphones' in category navigation
    And [ebay] User can see subcategory page with title 'Cell Phones & Smartphones'
    When [ebay] user click filter button in filter list
    Then [ebay] user can see filter sidebar is showing up
    When [ebay] User click condition filter with 'New' condition in filter sidebar
    When [ebay] User click price filter and choose 'Under' in filter sidebar
    When [ebay] User click item location and choose 'Worldwide' in filter sidebar
    When [ebay] User click apply at filter sidebar
    Then [ebay] User can see filter is applied in filter section
    And [ebay] User can see there are '3' filter that applied
    And [ebay] User can see applied filter with 'Condition: New'
    And [ebay] User can see applied filter with 'Price: Under $1,909,920'
    And [ebay] User can see applied filter with 'Item location: Worldwide'