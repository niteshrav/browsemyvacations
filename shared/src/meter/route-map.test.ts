import { describe, expect, it } from "vitest";
import { calculateVacationFeasibility } from "./feasibility";
import { buildDefaultVacationMapRoute, buildGoogleMapRoute, buildVacationRouteMapsEmbedUrl, buildVacationRouteMapsExternalUrl, getDestinationLatLng } from "./route-map";

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

  it("builds a Google Maps embed URL for single and multi-stop routes", () => {
    const twoStop = calculateVacationFeasibility({
      destinationSlugs: ["udaipur", "jaipur"],
      totalNights: 4,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "moderate",
    });
    const twoStopRoute = buildGoogleMapRoute(twoStop)!;
    expect(buildVacationRouteMapsEmbedUrl(twoStopRoute)).toMatch(/^https:\/\/maps\.google\.com\/maps\?saddr=/);
    expect(buildVacationRouteMapsEmbedUrl(twoStopRoute)).toContain("daddr=");
    expect(buildVacationRouteMapsEmbedUrl(twoStopRoute)).toContain("output=embed");

    const multi = calculateVacationFeasibility({
      destinationSlugs: ["mount-abu", "kumbhalgarh", "udaipur"],
      totalNights: 4,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "moderate",
    });
    const multiRoute = buildGoogleMapRoute(multi)!;
    expect(buildVacationRouteMapsEmbedUrl(multiRoute)).toMatch(/^https:\/\/maps\.google\.com\/maps\?saddr=/);
    expect(buildVacationRouteMapsEmbedUrl(multiRoute)).toContain("+to:");
    expect(buildVacationRouteMapsEmbedUrl(multiRoute)).toContain("output=embed");

    const single = calculateVacationFeasibility({
      destinationSlugs: ["udaipur"],
      totalNights: 3,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "relaxed",
    });
    const singleRoute = buildGoogleMapRoute(single)!;
    expect(buildVacationRouteMapsEmbedUrl(singleRoute)).toMatch(/^https:\/\/maps\.google\.com\/maps\?q=/);
    expect(buildVacationRouteMapsEmbedUrl(singleRoute)).toContain("output=embed");
  });

  it("uses Maps Embed API when an API key is supplied", () => {
    const feasibility = calculateVacationFeasibility({
      destinationSlugs: ["udaipur", "jaipur"],
      totalNights: 4,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "moderate",
    });
    const route = buildGoogleMapRoute(feasibility)!;
    const url = buildVacationRouteMapsEmbedUrl(route, { apiKey: "AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" });
    expect(url).toContain("maps/embed/v1/directions");
    expect(url).toContain("origin=");
    expect(url).toContain("destination=");
  });

  it("builds a Rajasthan overview route when no destinations are selected", () => {
    const route = buildDefaultVacationMapRoute();
    expect(route.markers).toHaveLength(1);
    expect(route.markers[0]?.slug).toBe("rajasthan");
    const url = buildVacationRouteMapsEmbedUrl(route);
    expect(url).toContain("Rajasthan");
    expect(url).toContain("z=7");
    expect(url).toContain("output=embed");
  });

  it("builds a multi-stop embed URL with chained daddr waypoints", () => {
    const feasibility = calculateVacationFeasibility({
      destinationSlugs: ["ajmer", "alwar", "mount-abu"],
      totalNights: 4,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      pacing: "moderate",
    });
    const route = buildGoogleMapRoute(feasibility)!;
    const url = buildVacationRouteMapsEmbedUrl(route);
    expect(url).toMatch(/^https:\/\/maps\.google\.com\/maps\?saddr=/);
    expect(url).toContain("Ajmer");
    expect(url).toContain("Alwar");
    expect(url).toContain("Mount%20Abu");
    expect(url).not.toContain("www.google.com/maps/dir/");
  });
});
