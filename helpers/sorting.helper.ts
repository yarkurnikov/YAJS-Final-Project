export function arraySorting(array: Array<string>, method: string): Array<string> {
  const direction = method === 'asc' ? 1 : -1;
  return [...array].sort((a, b) =>
    a.trim().toLowerCase() > b.trim().toLowerCase() ? direction : -direction);
}
