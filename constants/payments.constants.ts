import { addMonths } from '../helpers/addMonths.helper';
import { CREDIT_CARD_NUMBER, CREDIT_CARD_CVV, CREDIT_CARD_HOLDER_NAME } from '../config/baseConfig';

export const CREDIT_CARD_DATA = {
  creditCardNumber: CREDIT_CARD_NUMBER,
  creditCardExpirationDate: addMonths(Date.now(), 3),
  creditCardCvv: CREDIT_CARD_CVV,
  creditCardHolderName: CREDIT_CARD_HOLDER_NAME
};