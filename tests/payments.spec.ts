import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { CREDIT_CARD_DATA } from '../constants/payments.constants';

test('Verify user can make purchase by Credit Card', { tag: ['@regression'] }, async ({ loggedInApp }) => {
  let firstCard: string;
  
  await test.step('Navigate to home page and select product', async () => {
    await loggedInApp.homePage.page.goto('');
    await loggedInApp.homePage.page.reload();
    
    firstCard = await loggedInApp.homePage.getFirstProductCard();
    await loggedInApp.homePage.clickOnItemCardByName(firstCard);
    await expect(loggedInApp.productPage.page).toHaveURL(/.*\/product\/.*/);
  });

  await test.step('Add product to cart', async () => {
    await expect(loggedInApp.productPage.addToCartButton).toBeVisible();
    await loggedInApp.productPage.addToCartButtonClick();
    await expect(loggedInApp.productPage.productAddAlert).toBeVisible();
  });

  await test.step('Proceed to checkout', async () => {
    await loggedInApp.productPage.headerFragment.cartQuantityIcon.click();
    await expect(loggedInApp.checkOutPage.page).toHaveURL(/checkout$/);
    
    expect(await loggedInApp.checkOutPage.getProductQuantityByName(firstCard)).toBe('1');
    await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeVisible();
    await expect(loggedInApp.checkOutPage.totalPrice).toBeVisible();
  });
  
  await test.step('Proceed through login step', async () => {
    await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();

    await expect(loggedInApp.checkOutPage.alreadyLoggedMessage).toBeVisible();
    await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();
  });
  
  await test.step('Fill shipping information', async () => {
    await loggedInApp.checkOutPage.fillStateField('Test State');
    await loggedInApp.checkOutPage.fillPostCodeField('12345');
    await expect(loggedInApp.checkOutPage.proceedToCheckOutButton).toBeEnabled();
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();
  });

  await test.step('Complete payment with Credit Card', async () => {
    await loggedInApp.checkOutPage.selectPaymentMethod('Credit Card');
    await loggedInApp.checkOutPage.fillCreditCardData(CREDIT_CARD_DATA.creditCardNumber, CREDIT_CARD_DATA.creditCardExpirationDate, 
      CREDIT_CARD_DATA.creditCardCvv, CREDIT_CARD_DATA.creditCardHolderName);
    await loggedInApp.checkOutPage.confirmButtonClick();
  });

  await test.step('Verify payment confirmation', async () => {
    await expect(loggedInApp.checkOutPage.paymentConfirmationMessage).toBeVisible();
  });
});