import { addMonths } from '../helpers/addMonths.helper';

export const CREDIT_CARD_DATA = {
  creditCardNumber: '1111-1111-1111-1111',
  creditCardExpirationDate: addMonths(Date.now(), 3),
  creditCardCvv: '123',
  creditCardHolderName: 'Yaroslav Test'
};