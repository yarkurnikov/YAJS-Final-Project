const addMonths = (date: number, months: number): string => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);

  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${year}`;
};

export const CREDIT_CARD_DATA = {
  creditCardNumber: '1111-1111-1111-1111',
  creditCardExpirationDate: addMonths(Date.now(), 3),
  creditCardCvv: '123',
  creditCardHolderName: 'Yaroslav Test'
};