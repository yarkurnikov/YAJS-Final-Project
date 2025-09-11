import { expect } from '@playwright/test';
import { SortOption, PowerTools } from '../enums/categories.enum';
import { arraySorting } from '../helpers/sorting.helper';
import { test } from '../fixtures/myFixtures';

[
  {
    dropdownSortType: SortOption.BY_NAME_DESC,
    manualSortType: 'desc' as const
  },
  {
    dropdownSortType: SortOption.BY_NAME_ASC,
    manualSortType: 'asc' as const
  }
].forEach(({ dropdownSortType, manualSortType }) => {
  test(`Verify user can perform sorting by ${dropdownSortType}`, { tag: ['@regression'] }, async ({ allPages, page }) => {

    await test.step('Navigate to home page', async () => {
      await page.goto('');
    });

    await test.step('Apply sorting by name', async () => {
      const responsePromise = allPages.homePage.waitForProductsResponse(manualSortType, 'name');
      await allPages.homePage.sortDropdown.selectOption({ value: dropdownSortType });
      await responsePromise;
    });

    await test.step('Verify sorting is applied correctly', async () => {
      const afterSortingCardsNames = await allPages.homePage.getProductCardsNames();
      const afterSortingManual = arraySorting([...afterSortingCardsNames], manualSortType);
      expect(afterSortingCardsNames).toEqual(afterSortingManual);
    });
  });
});

[
  {
    dropdownSortType: SortOption.BY_PRICE_DESC,
    manualSortType: 'desc' as const
  },
  {
    dropdownSortType: SortOption.BY_PRICE_ASC,
    manualSortType: 'asc' as const
  }
].forEach(({ dropdownSortType, manualSortType }) => {
  test(`Verify user can perform sorting by ${dropdownSortType}`, { tag: ['@regression'] }, async ({ allPages, page }) => {

    await test.step('Navigate to home page', async () => {
      await page.goto('');
    });

    await test.step('Apply sorting by price', async () => {
      const responsePromise = allPages.homePage.waitForProductsResponse(manualSortType, 'price');
      await allPages.homePage.sortDropdown.selectOption({ value: dropdownSortType });
      await responsePromise;
    });
    
    await test.step('Verify sorting is applied correctly', async () => {
      const afterSortingCardsPrices = await allPages.homePage.getProductCardsPrices();
      const afterSortingManual = arraySorting([...afterSortingCardsPrices], manualSortType);
      expect(afterSortingCardsPrices).toEqual(afterSortingManual);
    });
  });
});

test('Verify user can filter products by category', async ({ allPages, page }) => {

  await test.step('Navigate to home page', async () => {
    await page.goto('');
  });

  await test.step('Apply category filter', async () => {
    const responsePromise = allPages.homePage.waitForCategoryFilterResponse();
    await allPages.homePage.selectCategoryFilter(PowerTools.SANDER);
    await responsePromise;
  });
  
  await test.step('Verify filter is applied correctly', async () => {
    expect(await allPages.homePage.checkProductNames('Sander')).toBeTruthy();
  });
});
