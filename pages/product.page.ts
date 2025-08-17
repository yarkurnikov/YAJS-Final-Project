import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class ProductPage {

  page: Page;
  productTitle: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  addToFavoriteButton: Locator;
  productAddAlert: Locator;
  headerFragment: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.productTitle = page.getByTestId('product-name');
    this.productPrice = page.getByLabel('unit-price');
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.addToFavoriteButton = page.locator('#btn-add-to-favorites');
    this.productAddAlert = page.getByRole('alert', { name: 'Product added to shopping' });

  }

  async addToCartButtonClick(): Promise<void> {
    await this.addToCartButton.click();
  }

}