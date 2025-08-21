import { Locator, Page } from '@playwright/test';
import { HandTools, PowerTools, Other } from '../enums/categories.enum';

export class HomePage {
  page: Page;
  card: Locator;
  sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = this.page.locator('a[data-test^="product"]');
    this.sortDropdown = this.page.getByTestId('sort');
  }

  async getProductCardsNames(): Promise<Array<string>> {
    return this.card.getByTestId('product-name').allInnerTexts();
  }

  async getProductCardsPrices(): Promise<Array<string>> {
    return this.card.getByTestId('product-price').allInnerTexts();
  }

  async selectCategoryFilter(category: HandTools | PowerTools | Other): Promise<void> {
    await this.page.locator(`label:has-text("${category}") input[type="checkbox"]`).check();
  }

  async checkProductNames(name: string): Promise<boolean> {
    const namesArray = await this.getProductCardsNames();
    return namesArray.every(element => element.includes(name));
  }

  async clickOnItemCardByName(name: string): Promise<void> {
    await this.card.filter({ hasText: `${name}` }).click();
  }

  async waitForProductsResponse(sortType: 'asc' | 'desc', sortField: 'name' | 'price' = 'name') {
    return this.page.waitForResponse(res =>
      res.url().includes(`/products?page=0&sort=${sortField},${sortType}&between=price,1,100`) &&
      res.status() === 200
    );
  }

  async waitForCategoryFilterResponse() {
    return this.page.waitForResponse(res => {
      const url = res.url();
      return url.includes('/products') && url.includes('by_category=01K31V80S72P269MMJASSTPZ7R') &&
      res.status() === 200;
    });
  }
}