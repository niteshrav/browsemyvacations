import { describe, expect, it } from "vitest";
import { calculateVacationFeasibility } from "./feasibility";
import { buildGoogleMapRoute, getDestinationLatLng } from "./route-map";

describe("route-map", () => {
  it("resolves lat/lng for known destinations", () => {
    expect(getDestinationLatLng("udaipur")).toEqual({ lat: 24.5854, lng: 73.7125 });
    expect(getDestinationLatLng("mount-abu")).toEqual({ lat: 24.5926, lng: 72.7156 });
  });

  it("builds markers and polyline path for a multi-city route", () => {
    const feasibility = calculateVacationFeasibility({
      destinationSlugs: ["mount-abu", "kumbhalgarh", "kota", "udaipur"],
      totalNights: 5,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "moderate",
    });

    const route = buildGoogleMapRoute(feasibility);
    expect(route).not.toBeNull();
    expect(route!.markers).toHaveLength(4);
    expect(route!.path.length).toBeGreaterThanOrEqual(4);
    expect(route!.markers.map((m) => m.name)).toEqual([
      "Mount Abu",
      "Kumbhalgarh",
      "Kota",
      "Udaipur",
    ]);
    expect(route!.bounds.north).toBeGreaterThan(route!.bounds.south);
  });

  it("returns a single-marker route for one destination", () => {
    const feasibility = calculateVacationFeasibility({
      destinationSlugs: ["udaipur"],
      totalNights: 3,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "relaxed",
    });

    const route = buildGoogleMapRoute(feasibility);
    expect(route!.markers).toHaveLength(1);
    expect(route!.path).toHaveLength(1);
  });
});
