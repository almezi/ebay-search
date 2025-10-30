const {$} = require('@wdio/globals')
const Page = require('./page');
const SearchResultModel = require('../step-definitions/model/searchResult.model');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EbayPage extends Page {

    get inputSearch() {
        return $("//input[@id='gh-ac']");
    }

    get btnSearch() {
        return $("//button[@id='gh-search-btn']");
    }

    get filterCategoryInSearchBox() {
        return $("//select[@id='gh-cat']");
    }
    get allFilterSidebar() {
        return $(`//h2/span[contains(text(),'Filter')]`);
    }

    get productTitle() {
        return $(SearchResultModel.product.productTitle);
    }

    get productPrice() {
        return $(SearchResultModel.product.productPrice);
    }

    get productLocation() {
        return $(SearchResultModel.product.productLocation);
    }

    get deliveryInfo() {
        return $(SearchResultModel.product.deliveryInfo);
    }

    get shopByCategoryFilterBtn() {
        return $("//div[@class='gh-categories']//button");
    }

    get shopByCategoryMainPopup() {
        return $("//div[@class='gh-categories__main']");
    }

    get textualDisplayPageCategory() {
        return $("h1.page-title")
    }
    get allFilterBtn() {
        return $("//button[contains(@class,'brwr__all-filters')]");
    }

    async filterCategoryInSearchBoxSelect(category) {
        try {
            await this.filterCategoryInSearchBox.waitForDisplayed();
            await this.filterCategoryInSearchBox.selectByVisibleText(category);
        } catch (error) {
            throw new Error(`Failed to select category ${category}: ${error.message}`);
        }
    }


    async searchProduct(product) {
        try {
            await this.inputSearch.waitForDisplayed();
            await this.inputSearch.setValue(product);
            await this.btnSearch.click();
        } catch (error) {
            throw new Error(`Failed to search for product ${product}: ${error.message}`);
        }
    }

    async triggerToOpenShopByCategory() {
        try {
            await this.shopByCategoryFilterBtn.waitForDisplayed({timeout: 5000});
            await this.shopByCategoryFilterBtn.click();
            await this.shopByCategoryMainPopup.waitForDisplayed({timeout: 5000});
        } catch (error) {
            throw new Error(`Failed to open shop by category: ${error.message}`);
        }
    }

    async selectShopByCategoryMainPopup(category) {
        try {
            await this.shopByCategoryMainPopup.waitForDisplayed({timeout: 5000});

            // If this is actually a dropdown/select element, use selectByVisibleText
            // Otherwise, find and click the category option within the div
            const categoryOption = await $(`//div[@class='gh-categories__main']//a[normalize-space()='${category}']`);
            await categoryOption.waitForDisplayed({timeout: 5000});
            await categoryOption.click();
        } catch (error) {
            throw new Error(`Failed to select category '${category}' from shop by category popup: ${error.message}`);
        }
    }

    async getPageTitle() {
        try {
            await this.textualDisplayPageCategory.waitForDisplayed({
                timeout: 10000,
                timeoutMsg: 'Page title element was not displayed within timeout'
            });
            const title = await this.textualDisplayPageCategory.getText();

            if (!title || title.trim().length === 0) {
                throw new Error('Page title is empty or contains only whitespace');
            }

            return title;
        } catch (error) {
            console.error(`Failed to get page title: ${error.message}`);
            throw new Error(`Unable to retrieve page title: ${error.message}`);
        }
    }

    async selectShopByCategorySideNavigation(category) {
        const categoryOption = await $(`//a[normalize-space()='${category}']`);
        await categoryOption.waitForDisplayed({timeout: 5000});
        await categoryOption.click();
    }

    async clickAllFilterBtn() {
        await this.allFilterBtn.waitForDisplayed();
        await this.allFilterBtn.click();
    }

    async clickConditionAccordionInFilterSidebar(){
        const accordion = await $(`//h3[@aria-label='Condition']`);
        await accordion.waitForDisplayed({ timeout: 5000 });
        await accordion.click();
    }
    async clickPriceAccordionInFilterSidebar(){
        const accordion = await $(`//h3[@aria-label='Price']`);
        await accordion.waitForDisplayed({ timeout: 5000 });
        await accordion.click();
    }
    async clickItemLocationAccordionInFilterSidebar(){
        const accordion = await $(`//h3[@aria-label='Item location']`);
        await accordion.waitForDisplayed({ timeout: 5000 });
        await accordion.click();
    }
    async clickCheckboxInFilterSidebar(s) {
        let checkbox;

        if (s === 'New') {
            checkbox = await $(`//input[@id='group-checkbox-New']`);
        }
        else if (s.includes('Under')) {
            checkbox = await $(`//input[@id='group-radio-under-idr1,909,920']`);
        }
        else if (s === 'Worldwide') {
            checkbox = await $(`//input[@id='group-radio-worldwide']`);
        }
        else {
            // Fallback for dynamic IDs
            checkbox = await $(`//input[@id='group-checkbox-${s}']`);
        }

        if (checkbox) {
            // await checkbox.waitForDisplayed({ timeout: 55000 });
            await checkbox.click();
        }
        else {
            throw new Error(`Checkbox for '${s}' not found`);
        }
    }

    async clickApplyInFilterSidebar() {
        const submitBtn = $("//button[contains(@class,'btn-submit')]");
        try {
            await submitBtn.waitForDisplayed({timeout: 5000});
            await submitBtn.click();
        } catch (error) {
            throw new Error(`Failed to click apply button: ${error.message}`);
        }
    }
}

module.exports = new EbayPage();