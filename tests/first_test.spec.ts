import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

test.use({ storageState: './playwright/.auth/user.json' });
test.describe('Login test using storage file', () => {
  test.use({ storageState: './playwright/.auth/user.json' });
  test('Verify login with valid credentials', async ({ allPages, page }) => {

    await page.goto('/account');
    await expect(allPages.accountPage.pageTitle).toHaveText('My account');
    await expect(allPages.accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
