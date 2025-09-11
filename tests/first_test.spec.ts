import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

test.describe('Login test using fixtures', () => {
  test('Verify login with valid credentials', { tag: ['@smoke'] }, async ({ loggedInApp }) => {
    await test.step('Navigate to account page', async () => {
      await loggedInApp.accountPage.page.goto('/account');
    });

    await test.step('Verify account page title', async () => {
      await expect(loggedInApp.accountPage.pageTitle).toHaveText('My account');
    });

    await test.step('Verify user is logged in', async () => {
      await expect(loggedInApp.accountPage.header.navMenu).toHaveText('Jane Doe');
    });
  });
});
