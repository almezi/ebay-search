class SearchResultModel {
    #storedData;
    #productSection;

    constructor() {
        // Product section selectors
        this.#storedData = [];
        this.#productSection = {
            productTitle: "//div[contains(concat(' ', normalize-space(@class), ' '), ' su-card-container__header ')]//span[contains(@class, 'primary')]",
            // productPrice: "//div[contains(@class, 's-card__attribute-row')]//span[contains(@class, 'bold')]",
            productPrice: "//div[@class='su-card-container__attributes__primary']/div[1]/span[1]",
            productLocation: "//div[@class='su-card-container__attributes__primary']/div[4]",
            deliveryInfo: "//div[@class='su-card-container__attributes__primary']/div[3]"
        };

    }

    get product() { return this.#productSection; }

    // async storeProductData(index = 1) {
    //     try {
    //         const baseXPath = (selector) => `(${selector})[${index}]`;

    //         this.#storedData = {
    //             title: await $(baseXPath(this.#productSection.productTitle)).getText(),
    //             price: await $(baseXPath(this.#productSection.productPrice)).getText(),
    //             location: await $(baseXPath(this.#productSection.productLocation)).getText(),
    //             delivery: await $(baseXPath(this.#productSection.deliveryInfo)).getText()
    //         };

    //         return this.#storedData;
    //     } catch (error) {
    //         throw new Error(`Failed to store product data at index ${index}: ${error.message}`);
    //     }
    // }

        async storeMultipleProducts(count = 6) {
        try {
            this.#storedData = [];  // Reset stored data
            
            for (let i = 1; i <= count; i++) {
                const productData = {
                    title: await $(this.buildXPath(this.#productSection.productTitle, i)).getText(),
                    price: await $(this.buildXPath(this.#productSection.productPrice, i)).getText(),
                    location: await $(this.buildXPath(this.#productSection.productLocation, i)).getText(),
                    delivery: await $(this.buildXPath(this.#productSection.deliveryInfo, i)).getText()
                };
                this.#storedData.push(productData);
            }
            
            return this.#storedData;
        } catch (error) {
            throw new Error(`Failed to store multiple products: ${error.message}`);
        }
    }

    buildXPath(selector, index) {
        return `(${selector})[${index}]`;
    }

    getStoredData() {
        return this.#storedData;
    }
}

module.exports = new SearchResultModel();