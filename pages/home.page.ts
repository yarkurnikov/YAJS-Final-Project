import { Locator, Page } from '@playwright/test';

export class HomePage {
  page: Page;
  itemCard: Locator;
  constructor(page: Page) {
    this.page = page;
    this.itemCard = this.page.locator('a[data-test^="product"]');
 
  }

  async clickOnItemCardByName(name: string): Promise<void> {
    const element = this.itemCard.filter({ hasText: name });
    await element.click();
  }


}