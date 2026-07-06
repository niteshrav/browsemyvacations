import { describe, expect, it } from "vitest";
import { getRoadDistanceKm, getTravelHours } from "./route-matrix";
import { calculateVacationFeasibility, pacingFromSlider } from "./feasibility";

describe("route-matrix", () => {
  it("returns curated distance for Jaipur to Udaipur", () => {
    expect(getRoadDistanceKm("jaipur", "udaipur")).toBe(395);
  });

  it("estimates travel hours from distance", () => {
    expect(getTravelHours(395)).toBeCloseTo(7.2, 1);
  });
});

describe("calculateVacationFeasibility", () => {
  it("scores a short single-city trip as highly feasible", () => {
    const result = calculateVacationFeasibility({
      destinationSlugs: ["udaipur"],
      totalNights: 3,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "relaxed",
    });

    expect(result.totalDistanceKm).toBe(0);
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(80);
    expect(result.descriptor).toBe("Logistically Practical");
    expect(result.mapPoints).toHaveLength(1);
  });

  it("computes route distance and lowers score for a long multi-city loop", () => {
    const relaxed = calculateVacationFeasibility({
      destinationSlugs: ["jaipur", "udaipur", "jodhpur"],
      totalNights: 2,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "relaxed",
    });
    const busy = calculateVacationFeasibility({
      destinationSlugs: ["jaipur", "udaipur", "jodhpur"],
      totalNights: 2,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "busy",
    });

    expect(relaxed.totalDistanceKm).toBeGreaterThan(500);
    expect(relaxed.routeSegments).toHaveLength(2);
    expect(relaxed.feasibilityScore).toBeLessThan(busy.feasibilityScore);
    expect(relaxed.proTip.length).toBeGreaterThan(20);
  });

  it("maps pacing slider values to pacing modes", () => {
    expect(pacingFromSlider(10)).toBe("relaxed");
    expect(pacingFromSlider(50)).toBe("moderate");
    expect(pacingFromSlider(90)).toBe("busy");
  });
});
