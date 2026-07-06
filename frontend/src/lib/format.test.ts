import { describe, expect, it } from "vitest";
import { formatInrPrice } from "./format";

describe("formatInrPrice", () => {
  it("formats fixed price", () => {
    expect(formatInrPrice(24500, true)).toBe("₹24,500");
  });

  it("formats from price", () => {
    expect(formatInrPrice(24500, false)).toBe("From ₹24,500");
  });
});
