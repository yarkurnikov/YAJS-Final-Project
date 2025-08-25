import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { CREDIT_CARD_DATA } from '../constants/payments.constants';

test('Verify user can make an order by Credit Card', async ({ loggedInApp }) => {
  await loggedInApp.homePage.page.goto('/');
  const firstCard = await loggedInApp.homePage.getFirstProductCard();

  await loggedInApp.homePage.clickOnItemCardByName(firstCard);

  await expect(loggedInApp.productPage.page).toHaveURL(/.*\/product\/.*/);

  await expect(loggedInApp.productPage.addToCartButton).toBeVisible();

  await loggedInApp.productPage.addToCartButtonClick();
  await expect(loggedInApp.productPage.productAddAlert).toBeVisible();

  await loggedInApp.productPage.headerFragment.cartQuantityIcon.click();
  await expect(loggedInApp.checkOutPage.page).toHaveURL(/checkout$/);

  expect(await loggedInApp.checkOutPage.getProductQuantityByName(firstCard)).toBe('1');
  await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeVisible();
  await expect(loggedInApp.checkOutPage.totalPrice).toBeVisible();
  
  await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
  await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();

  await expect(loggedInApp.checkOutPage.alreadyLoggedMessage).toBeVisible();
  await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
  await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();
  
  await loggedInApp.checkOutPage.fillStateField('Test State');
  await loggedInApp.checkOutPage.fillPostCodeField('12345');
  await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
  await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();

  await loggedInApp.checkOutPage.selectPaymentMethod('Credit Card');
  await loggedInApp.checkOutPage.fillCreditCardDataAndContinue(CREDIT_CARD_DATA.creditCardNumber, CREDIT_CARD_DATA.creditCardExpirationDate, 
    CREDIT_CARD_DATA.creditCardCvv, CREDIT_CARD_DATA.creditCardHolderName);
  await loggedInApp.checkOutPage.confirmButtonClick();

  await expect(loggedInApp.checkOutPage.paymentConfirmationMessage).toBeVisible();

});