import { describe, expect, it } from "vitest";
import {
  calculateMeterEstimate,
  MeterCalculationError,
  type MeterCalculatorConfig,
} from "./calculator";

const testConfig: MeterCalculatorConfig = {
  currency: "INR",
  disclaimer: "Indicative estimate only.",
  outputMode: "range",
  rangeSpreadPercent: 10,
  destinations: [{ slug: "udaipur", baseRatePerNight: 8000 }],
  vehicleTiers: [
    { name: "Sedan", multiplier: 1 },
    { name: "SUV", multiplier: 1.2 },
  ],
};

describe("calculateMeterEstimate", () => {
  it("computes range estimate for Udaipur 3 nights Sedan", () => {
    const result = calculateMeterEstimate(
      {
        destinationSlugs: ["udaipur"],
        totalNights: 3,
        pickupTime: "09:00",
        dropoffTime: "18:00",
        travelDate: "2026-08-01",
        vehicleTierName: "Sedan",
      },
      testConfig,
    );

    expect(result.estimateMin).toBe(21600);
    expect(result.estimateMax).toBe(26400);
    expect(result.currency).toBe("INR");
  });

  it("applies SUV multiplier", () => {
    const sedan = calculateMeterEstimate(
      {
        destinationSlugs: ["udaipur"],
        totalNights: 2,
        pickupTime: "10:00",
        dropoffTime: "17:00",
        travelDate: "2026-08-01",
        vehicleTierName: "Sedan",
      },
      testConfig,
    );
    const suv = calculateMeterEstimate(
      {
        destinationSlugs: ["udaipur"],
        totalNights: 2,
        pickupTime: "10:00",
        dropoffTime: "17:00",
        travelDate: "2026-08-01",
        vehicleTierName: "SUV",
      },
      testConfig,
    );
    expect(suv.estimateMin!).toBeGreaterThan(sedan.estimateMin!);
  });

  it("throws for unsupported destination", () => {
    expect(() =>
      calculateMeterEstimate(
        {
          destinationSlugs: ["goa"],
          totalNights: 2,
          pickupTime: "10:00",
          dropoffTime: "17:00",
          travelDate: "2026-08-01",
          vehicleTierName: "Sedan",
        },
        testConfig,
      ),
    ).toThrow(MeterCalculationError);
  });
});
