import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SortOption, PowerTools } from '../enums/categories.enum';
import { arraySorting } from '../helpers/sorting.helper';

[
  {
    dropdownSortType: SortOption.BY_NAME_DESC,
    manualSortType: 'desc'
  },
  {
    dropdownSortType: SortOption.BY_NAME_ASC,
    manualSortType: 'asc'
  }
].forEach(({ dropdownSortType, manualSortType }) => {
  test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('');
    await homePage.sortDropdown.selectOption({ value: dropdownSortType });
    await page.waitForTimeout(1000);
    
    const afterSortingCardsNames = await homePage.getProductCardsNames();
    const afterSortingManual = arraySorting([...afterSortingCardsNames], manualSortType);
    expect(afterSortingCardsNames).toEqual(afterSortingManual);
  });
});

[
  {
    dropdownSortType: SortOption.BY_PRICE_DESC,
    manualSortType: 'desc'
  },
  {
    dropdownSortType: SortOption.BY_PRICE_ASC,
    manualSortType: 'asc'
  }
].forEach(({ dropdownSortType, manualSortType }) => {
  test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('');
    await homePage.sortDropdown.selectOption({ value: dropdownSortType });
    await page.waitForTimeout(1000);
    
    const afterSortingCardsPrices = await homePage.getProductCardsPrices();
    const afterSortingManual = arraySorting([...afterSortingCardsPrices], manualSortType);
    expect(afterSortingCardsPrices).toEqual(afterSortingManual);
  });
});

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('');
  await homePage.selectCategoryFilter(PowerTools.SANDER);
  await page.waitForTimeout(1000);
  
  expect(await homePage.checkProductNames('Sander')).toBeTruthy();
});
