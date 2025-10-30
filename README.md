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

## License

ISC
