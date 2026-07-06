import { describe, expect, it } from "vitest";
import { formatMeterEstimate } from "./format-meter";

describe("formatMeterEstimate", () => {
  it("formats a range estimate", () => {
    const text = formatMeterEstimate({
      estimateMin: 20000,
      estimateMax: 25000,
    });
    expect(text).toContain("20,000");
    expect(text).toContain("25,000");
  });
});
