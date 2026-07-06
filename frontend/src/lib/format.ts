export function formatInrPrice(amount: number, isFixed: boolean): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  return isFixed ? formatted : `From ${formatted}`;
}
