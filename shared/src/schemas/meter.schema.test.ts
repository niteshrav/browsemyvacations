import { describe, expect, it } from "vitest";
import { calculateMeterSchema } from "./meter.schema";

describe("calculateMeterSchema", () => {
  it("accepts valid meter input", () => {
    const result = calculateMeterSchema.parse({
      destinationSlugs: ["udaipur"],
      totalNights: 3,
      pickupTime: "09:30",
      dropoffTime: "18:00",
      travelDate: "2026-12-01",
      vehicleTierName: "Sedan",
    });
    expect(result.totalNights).toBe(3);
    expect(result.adults).toBe(2);
    expect(result.pacing).toBe("moderate");
  });

  it("accepts multi-destination input with pacing and passengers", () => {
    const result = calculateMeterSchema.parse({
      destinationSlugs: ["jaipur", "udaipur"],
      totalNights: 5,
      pickupTime: "08:00",
      dropoffTime: "19:00",
      travelDate: "2026-12-01",
      vehicleTierName: "SUV",
      adults: 4,
      children: 1,
      pacing: "relaxed",
    });
    expect(result.destinationSlugs).toHaveLength(2);
    expect(result.children).toBe(1);
    expect(result.pacing).toBe("relaxed");
  });

  it("rejects invalid pickup time", () => {
    expect(() =>
      calculateMeterSchema.parse({
        destinationSlugs: ["udaipur"],
        totalNights: 1,
        pickupTime: "9:30",
        dropoffTime: "18:00",
        travelDate: "2026-12-01",
        vehicleTierName: "Sedan",
      }),
    ).toThrow();
  });
});
