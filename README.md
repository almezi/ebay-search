# eBay Search

Automated testing project for eBay search and filtering functionality using WebdriverIO with Cucumber framework.

## Description

This project provides end-to-end test automation for eBay's product search, filtering, and navigation features. Tests are written in BDD style using Cucumber and executed with WebdriverIO.

## Features

- Product search functionality testing
- Category navigation testing
- Multiple filter application (condition, price, location)
- Search result validation
- Local storage data handling

## Prerequisites

- Node.js (v12 or higher)
- npm
- Chrome browser

## Installation

```bash
npm install
```

## Running Tests

Execute all tests:

```bash
npm run wdio
```

## Test Scenarios

### 1. Product Search via Search Bar
- Opens eBay main page
- Searches for specific products
- Applies category filters
- Validates search results, pricing, delivery, and location

### 2. Product Access via Category with Multiple Filters
- Navigates through category hierarchy
- Opens filter sidebar
- Applies multiple filters (condition, price, location)
- Validates applied filters

## Project Structure

```
ebay-search/
├── features/
│   ├── pageobjects/       # Page object models
│   ├── step-definitions/  # Cucumber step definitions
│   └── product.feature    # Feature file with test scenarios
├── wdio.conf.js          # WebdriverIO configuration
└── package.json          # Project dependencies
```

## Technology Stack

- **Test Framework**: WebdriverIO v9.20.0
- **BDD Framework**: Cucumber
- **Test Runner**: WDIO Local Runner
- **Reporter**: Spec Reporter
- **Browser**: Chrome

## Configuration

The WebdriverIO configuration is located in `wdio.conf.js`. Key settings:
- Browser: Chrome
- Framework: Cucumber
- Test timeout: 60 seconds
- Max instances: 10
- Reporter: Spec

## Reviewer Notes

### Current Implementation Status

The test automation framework is functional with the following implementation details:

**Implemented Features:**
- Page Object Model (POM) pattern for maintainable test code
- Cucumber BDD framework with feature files and step definitions
- Local storage data handling for product information
- Error handling with try-catch blocks in page objects
- Basic explicit waits using `waitForDisplayed()` with timeouts
- XPath selectors for element identification

**Test Coverage:**
1. Product search via search bar with category filtering
2. Category navigation and subcategory selection
3. Multi-filter application (Condition, Price, Item Location)
4. Search result validation (title, price, location, delivery)

### Suggested Improvements for Review

#### 1. **Implement Consistent Explicit Waits**
   - **Current Issue:** Some waits are missing or inconsistent across page objects
   - **Location:** `features/pageobjects/ebay.page.js:163` - commented out wait in `clickCheckboxInFilterSidebar`
   - **Recommendation:**
     - Add explicit waits for all element interactions
     - Use `waitForClickable()` before clicking elements
     - Use `waitForDisplayed()` before assertions
     - Consider creating reusable wait helper methods

#### 2. **Use Properties/Configuration File**
   - **Current Issue:** Hard-coded values throughout the codebase
   - **Examples:**
     - Timeouts (5000ms, 10000ms, 15000ms) scattered in code
     - URL in page object
     - Test data embedded in feature files
     - XPath selectors in both page objects and step definitions
   - **Recommendation:**
     - Create `config/test.config.js` for environment-specific values
     - Create `config/selectors.properties.js` for element locators
     - Externalize test data to JSON files or data tables
     - Move timeout values to configuration

#### 3. **Add HTML Reporter**
   - **Current Issue:** Only using spec reporter (`wdio.conf.js:130`)
   - **Recommendation:**
     - Install `@wdio/allure-reporter` or `@wdio/html-reporter`
     - Configure reporter in `wdio.conf.js`:
       ```javascript
       reporters: [
         'spec',
         ['allure', {
           outputDir: 'allure-results',
           disableWebdriverStepsReporting: true,
           disableWebdriverScreenshotsReporting: false
         }]
       ]
       ```
     - Add screenshots on test failure
     - Generate visual test execution reports

### Additional Observations

**Good Practices Currently Used:**
- Page Object Model pattern
- Error handling with descriptive messages
- Async/await for asynchronous operations
- Element encapsulation in page objects
- BDD scenarios with clear Given-When-Then structure

**Areas Needing Attention:**
- Mixed selector strategies (XPath embedded in step definitions at `ebay.js:122,136`)
- Commented code should be removed (`wdio.conf.js:54-57`)
- Console.log statements in test code should use proper logging framework
- Hard-coded test data in XPath expressions (`ebay.page.js:152` - currency specific)

### Test Execution
Run tests with: `npm run wdio`

Current reporter output location: Console only

## License

ISC
