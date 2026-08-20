import { describe, expect, it } from "vitest";
import {
  feasibilityGaugeColor,
  feasibilityGaugeRotation,
  formatTravelHours,
  formatTravelSummary,
} from "./feasibility-display";

describe("feasibility-display", () => {
  it("maps score to gauge rotation", () => {
    expect(feasibilityGaugeRotation(0)).toBe(-90);
    expect(feasibilityGaugeRotation(50)).toBe(0);
    expect(feasibilityGaugeRotation(100)).toBe(90);
  });

  it("picks green for high feasibility", () => {
    expect(feasibilityGaugeColor(85)).toBe("#16a34a");
    expect(feasibilityGaugeColor(40)).toBe("#ea580c");
  });

  it("formats travel summary line", () => {
    expect(
      formatTravelSummary({
        totalDistanceKm: 655,
        totalTravelHours: 11.9,
        feasibilityScore: 72,
        descriptor: "Comfortable Pace",
        proTip: "Tip",
        routeSegments: [],
        mapPoints: [],
        distanceBarPercent: 55,
        travelBarPercent: 50,
      }),
    ).toBe("Total: 655 km, ~11.9 hrs travel");
  });

  it("rounds floating-point travel hours for display", () => {
    expect(formatTravelHours(15.899999999999999)).toBe("15.9");
    expect(formatTravelHours(22.700000000000003)).toBe("22.7");
    expect(
      formatTravelSummary({
        totalDistanceKm: 873,
        totalTravelHours: 15.899999999999999,
        feasibilityScore: 16,
        descriptor: "Overpacked",
        proTip: "Tip",
        routeSegments: [],
        mapPoints: [],
        distanceBarPercent: 70,
        travelBarPercent: 80,
      }),
    ).toBe("Total: 873 km, ~15.9 hrs travel");
  });
});
