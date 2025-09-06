import { addMonths } from '../helpers/addMonths.helper';

export const CREDIT_CARD_DATA = {
  creditCardNumber: process.env.CREDIT_CARD_NUMBER!,
  creditCardExpirationDate: addMonths(Date.now(), 3),
  creditCardCvv: process.env.CREDIT_CARD_CVV!,
  creditCardHolderName: process.env.CREDIT_CARD_HOLDER_NAME || 'Test User'
};