export function decimalToNumber(value: { toString(): string } | number): number {
  if (typeof value === "number") return value;
  return Number(value.toString());
}
