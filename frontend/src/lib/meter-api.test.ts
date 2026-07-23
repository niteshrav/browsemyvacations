import { describe, expect, it } from "vitest";
import {
  METER_CALCULATOR_FALLBACK,
  METER_OPTIONS_FALLBACK,
  calculateMeterOffline,
} from "./meter-api";

describe("meter-api offline fallback", () => {
  it("provides destination options without the API", () => {
    expect(METER_OPTIONS_FALLBACK.destinations.length).toBeGreaterThan(5);
    expect(METER_OPTIONS_FALLBACK.destinations.some((d) => d.slug === "jaipur")).toBe(true);
  });

  it("calculates an indicative estimate offline", () => {
    const result = calculateMeterOffline({
      destinationSlugs: ["jaipur", "udaipur"],
      totalNights: 4,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      travelDate: "2026-08-01",
      vehicleTierName: "Sedan",
      adults: 2,
      children: 0,
      pacing: "moderate",
    });

    expect(result.sessionId).toMatch(/^offline-/);
    expect(result.estimateMin).toBeGreaterThan(0);
    expect(result.estimateMax).toBeGreaterThan(result.estimateMin!);
    expect(result.feasibility.feasibilityScore).toBeGreaterThan(0);
    expect(result.currency).toBe(METER_CALCULATOR_FALLBACK.currency);
  });
});
