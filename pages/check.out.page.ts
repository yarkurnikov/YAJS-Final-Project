import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class CheckOutPage {
  page: Page;
  header: HeaderFragment;
  proceedToCheckOutButton: Locator;
  productQuantityField: Locator;

  totalPrice: Locator;
  alreadyLoggedMessage: Locator;
  stateField: Locator;
  postCodeField: Locator;

  paymentMethodDropdown: Locator;
  creditCardNumberField: Locator;
  creditCardExpirationDateField: Locator;
  creditCardCvvField: Locator;
  creditCardCardHolderNameField: Locator;
  confirmButton: Locator;
  paymentConfirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.proceedToCheckOutButton = page.getByRole('button', { name: 'Proceed to checkout', exact: true });
    this.productQuantityField = page.getByTestId('product-quantity');
    this.totalPrice = page.getByTestId('cart-total');
    this.alreadyLoggedMessage = page.locator('aw-wizard-step>app-login p');
    this.stateField = page.getByTestId('state');
    this.postCodeField = page.getByTestId('postal_code');
    this.paymentMethodDropdown = page.locator('#payment-method');
    this.creditCardNumberField = page.locator('input#credit_card_number');
    this.creditCardExpirationDateField = page.getByTestId('expiration_date');
    this.creditCardCvvField = page.getByTestId('cvv');
    this.creditCardCardHolderNameField = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.paymentConfirmationMessage = page.getByTestId('payment-success-message');
  }

  async getProductQuantityByName(productName: string): Promise<string> {
    return this.page.getByText(`Quantity for ${productName}`).locator('+input').inputValue();
  }

  async proceedToCheckOutButtonClick(): Promise<void> {
    await this.proceedToCheckOutButton.waitFor({ state: 'visible' });
    await this.proceedToCheckOutButton.click();
  }

  async fillStateField(state: string): Promise<void> {
    await this.stateField.focus();
    await this.stateField.fill(state);
  }

  async fillPostCodeField(postCode: string): Promise<void> {
    await this.postCodeField.focus();
    await this.postCodeField.fill(postCode);
  }

  async selectPaymentMethod(paymentMethodName: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption(paymentMethodName);
  }

  async fillCreditCardDataAndContinue(creditCardNumber: string, expirationDate: string, cvvCode: string, cardHolderName: string): Promise<void> {
    await this.creditCardNumberField.fill(creditCardNumber);
    await this.creditCardExpirationDateField.fill(expirationDate);
    await this.creditCardCvvField.fill(cvvCode);
    await this.creditCardCardHolderNameField.fill(cardHolderName);
  }

  async confirmButtonClick(): Promise<void> {
    await this.confirmButton.waitFor({ state: 'visible' });
    await this.confirmButton.click();
  }

}