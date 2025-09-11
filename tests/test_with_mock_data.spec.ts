import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { BASE_API_URL } from '../config/baseConfig';

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

test('mocks 20 products and doesn\'t call real API', { tag: ['@smoke'] }, async ({ page }) => {
  await test.step('Set up API route mocking', async () => {
    await page.route(`${BASE_API_URL}/products*`, async route => {
      await route.fulfill({ json: mockProducts });
    });
  });
  
  await test.step('Navigate to home page', async () => {
    await page.goto('/');
  });
  
  await test.step('Verify mocked products are displayed', async () => {
    await expect(page.locator('a[data-test^="product"]')).toHaveCount(20);
  });
});
