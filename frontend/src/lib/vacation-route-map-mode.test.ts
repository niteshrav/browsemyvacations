import { describe, expect, it } from "vitest";
import { buildGoogleMapRoute, calculateVacationFeasibility } from "@bmv/shared";
import { resolveVacationRouteMapMode } from "./vacation-route-map-mode";

describe("resolveVacationRouteMapMode", () => {
  const feasibility = calculateVacationFeasibility({
    destinationSlugs: ["udaipur"],
    totalNights: 3,
    pickupTime: "09:00",
    dropoffTime: "18:00",
    pacing: "moderate",
  });
  const route = buildGoogleMapRoute(feasibility);

  it("returns empty when no destinations selected", () => {
    expect(resolveVacationRouteMapMode(false, true, route)).toBe("empty");
  });

  it("returns google when key is configured and route exists", () => {
    expect(resolveVacationRouteMapMode(true, true, route)).toBe("google");
  });

  it("returns fallback when key is missing", () => {
    expect(resolveVacationRouteMapMode(true, false, route)).toBe("fallback");
  });
});
