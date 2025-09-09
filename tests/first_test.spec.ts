import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';

test.describe('Login test using fixtures', () => {
  test('Verify login with valid credentials', { tag: ['@smoke'] }, async ({ loggedInApp }) => {
    await loggedInApp.accountPage.page.goto('/account');
    await expect(loggedInApp.accountPage.pageTitle).toHaveText('My account');
    await expect(loggedInApp.accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
