import { describe, expect, it } from "vitest";
import {
  feasibilityGaugeColor,
  feasibilityGaugeRotation,
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
});
