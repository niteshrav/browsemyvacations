import { describe, expect, it, vi } from "vitest";
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

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns empty when no destinations selected", () => {
    expect(resolveVacationRouteMapMode(false, true, route)).toBe("empty");
  });

  it("returns embed by default even when a key is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_USE_JS", "");
    expect(resolveVacationRouteMapMode(true, true, route)).toBe("embed");
  });

  it("returns google only when JS maps are explicitly enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_USE_JS", "true");
    expect(resolveVacationRouteMapMode(true, true, route)).toBe("google");
  });

  it("returns embed when key is missing", () => {
    expect(resolveVacationRouteMapMode(true, false, route)).toBe("embed");
  });
});
