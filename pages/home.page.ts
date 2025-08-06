import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    itemCard: Locator;
    constructor(page: Page) {
        this.page = page;
        this.itemCard = this.page.locator('[data-test^="product-01"]');
 
    }

    async clickOnItemCardByName(name: string): Promise<void> {
        const element = this.itemCard.filter({
            has: this.page.getByTestId("product-name").getByText(name)
        });
        await element.click();
    }


}