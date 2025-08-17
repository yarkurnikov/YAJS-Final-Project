import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class CheckOutPage {
  page: Page;
  header: HeaderFragment;
  proceedToCheckOutButton: Locator;
  productQuantityField: Locator;
  productsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.proceedToCheckOutButton = page.getByTestId('proceed-1');
    this.productsTitle = page.getByTestId('product-title');
    this.productQuantityField = page.getByTestId('product-quantity');
  }

  async getProductQuantityByName(productName: string): Promise<string> {
    return this.page.getByText(`Quantity for ${productName}`).locator('+input').inputValue();
  }
}