export function formatCurrency(number) {
  if (typeof number != 'number') return undefined;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
