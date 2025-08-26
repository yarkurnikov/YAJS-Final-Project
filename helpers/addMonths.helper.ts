export const addMonths = (date: number, months: number): string => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);

  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${year}`;
};