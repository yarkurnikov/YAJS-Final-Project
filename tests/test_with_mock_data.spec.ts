import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

const mockProducts = {
  data: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 10,
    product_image: {},
    category: {},
    brand: {}
  }))
};

test('mocks 20 products and doesn\'t call real API', async ({ page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
    await route.fulfill({ json: mockProducts });
  });
  
  await page.goto('');
  
  await expect(page.locator('a[data-test^="product"]')).toHaveCount(20);
});
