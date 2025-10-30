const {Given, When, Then} = require('@wdio/cucumber-framework');
const {expect, $} = require('@wdio/globals')

const EbayPage = require('../pageobjects/ebay.page');
const SearchResultModel = require('../step-definitions/model/searchResult.model');

const pages = {
    ebay: EbayPage
}

Then('[ebay] User can see product location in {string}', async (s) => {
    const storedData = SearchResultModel.getStoredData();
    const found = storedData.some(product => product.location && product.location.includes(s));
    console.log('Found:', found);
    await expect(found).toBe(true);
})

Then('[ebay] User can see delivery value {string}', async (s) => {
    const storedData = SearchResultModel.getStoredData();
    const found = storedData.some(product => product.delivery && product.delivery.includes(s));
    console.log('Found:', found);
    await expect(found).toBe(true);
})

Then('[ebay] User can see price with value {string}', async (s) => {
    const storedData = SearchResultModel.getStoredData();
    const found = storedData.some(product => product.price.includes(s));
    console.log('Found:', found);
    await expect(found).toBe(true);
})

Then('[ebay] User can see the search result contain product name {string}', async (s) => {
    // Wait for page load
    await browser.waitUntil(
        async () => await browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 15000,
            timeoutMsg: 'Page did not finish loading'
        }
    );

    const storedData = SearchResultModel.getStoredData();
    console.log('Searching for:', s);
    console.log('Stored titles:', storedData.map(p => p.title));

    const found = storedData.some(product => product.title && product.title.includes(s));
    console.log('Found:', found);
    await expect(found).toBe(true);
});

When('[ebay] User use filter {string}', async (s) => {
    await EbayPage.filterCategoryInSearchBoxSelect(s);
})

When('[ebay] User type {string} in search bar of the main page', async (s) => {
    await EbayPage.searchProduct(s)
})

// For page load after navigation, add this to your Given step
Given('[ebay] User open the main page', async () => {
    await EbayPage.openEbay();
});

When('[ebay] store data in local storage from search result', async () => {
    await browser.waitUntil(
        async () => await browser.execute(() => document.readyState === 'complete')
    );

    // Store first 5 products (or change number as needed)
    await SearchResultModel.storeMultipleProducts(5);

    // Log all stored products
    const storedData = SearchResultModel.getStoredData();
    console.log('Stored Product Data:', storedData);
    console.log('Total Products Stored:', storedData.length);
});
When('[ebay] User trigger to open shop by category beside search bar', async () => {
    await EbayPage.triggerToOpenShopByCategory();

});
Then('[ebay] User can see shop by category and select {string}', async (s) => {
    await expect(EbayPage.shopByCategoryFilterBtn).toBeDisplayed({
        message: "Shop by category button is not displayed"
    });
    await EbayPage.selectShopByCategoryMainPopup(s)
    //a[normalize-space()='Cell Phones, Smart Watches & Accessories']

});
Then('[ebay] User can see subcategory page with title {string}', async (s) => {
    const pageTitle = await EbayPage.getPageTitle();
    await expect(pageTitle).toContain(s);
});
When('[ebay] User select {string} in category navigation', async (s) => {
    await EbayPage.selectShopByCategorySideNavigation(s);
});
When('[ebay] user click filter button in filter list', async () =>{
    await EbayPage.clickAllFilterBtn();
});
Then('[ebay] user can see filter sidebar is showing up', async () =>{
    await expect(EbayPage.allFilterSidebar).toExist();
    await EbayPage.allFilterSidebar.waitForDisplayed({ timeout: 5000 });
});

When('[ebay] User click condition filter with {string} condition in filter sidebar', async (s)=> {
    await EbayPage.clickConditionAccordionInFilterSidebar();
    await EbayPage.clickCheckboxInFilterSidebar(s);
});
When('[ebay] User click price filter and choose {string} in filter sidebar', async (s) => {
    await EbayPage.clickPriceAccordionInFilterSidebar();
    await EbayPage.clickCheckboxInFilterSidebar(s);
});
When('[ebay] User click item location and choose {string} in filter sidebar', async (s) =>{
    await EbayPage.clickItemLocationAccordionInFilterSidebar();
    await EbayPage.clickCheckboxInFilterSidebar(s);
});
When('[ebay] User click apply at filter sidebar', async () =>{
await EbayPage.clickApplyInFilterSidebar();
});

Then('[ebay] User can see filter is applied in filter section', async () => {
    // Add implementation to verify filter section is displayed
    const filterSection = await $("//li[contains(@class, 'brwr__item brwr__item--applied')]");
    await expect(filterSection).toBeDisplayed();
});

Then('[ebay] User can see there are {string} filter that applied', async (count) => {
    const filterSectionBtn = await $("//li[contains(@class, 'brwr__item brwr__item--applied')]//button");
    await filterSectionBtn.click();
    // Add implementation to count applied filters
    const appliedFilters = await $$("//li[@class='brwr__item brwr__item--applied']//li");
    await expect(appliedFilters).toHaveLength(parseInt(count));
});

Then('[ebay] User can see applied filter with {string}', async (filterText) => {
    // Add implementation to verify specific filter is applied
    const filter = await $(`//*[contains(text(), '${filterText}')]`);
    await expect(filter).toBeDisplayed();
});