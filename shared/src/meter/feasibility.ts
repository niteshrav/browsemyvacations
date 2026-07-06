import { findRajasthanCityBySlug } from "../city-slug";
import { getRoadDistanceKm, getTravelHours, METER_DESTINATION_COORDS } from "./route-matrix";

export type MeterPacing = "relaxed" | "moderate" | "busy";

export type FeasibilityInput = {
  destinationSlugs: string[];
  totalNights: number;
  pickupTime: string;
  dropoffTime: string;
  pacing: MeterPacing;
  adults?: number;
  children?: number;
};

export type RouteSegment = {
  fromSlug: string;
  toSlug: string;
  fromName: string;
  toName: string;
  distanceKm: number;
  travelHours: number;
};

export type MapPoint = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
};

export type FeasibilityResult = {
  totalDistanceKm: number;
  totalTravelHours: number;
  feasibilityScore: number;
  descriptor: string;
  proTip: string;
  routeSegments: RouteSegment[];
  mapPoints: MapPoint[];
  distanceBarPercent: number;
  travelBarPercent: number;
};

const PACING_MAX_HOURS_PER_DAY: Record<MeterPacing, number> = {
  relaxed: 4,
  moderate: 6,
  busy: 8,
};

function slugToName(slug: string): string {
  return findRajasthanCityBySlug(slug) ?? slug.replace(/-/g, " ");
}

function descriptorForScore(score: number): string {
  if (score >= 80) return "Logistically Practical";
  if (score >= 65) return "Comfortable Pace";
  if (score >= 50) return "Ambitious Itinerary";
  if (score >= 35) return "Tight Schedule";
  return "Overpacked — Consider Adjusting";
}

function buildProTip(input: FeasibilityInput, score: number, segments: RouteSegment[]): string {
  const names = input.destinationSlugs.map(slugToName);
  const longest = segments.reduce(
    (max, seg) => (seg.distanceKm > max.distanceKm ? seg : max),
    segments[0],
  );

  if (score >= 80) {
    return `Your ${names.join(" → ")} route looks well-paced. Add a buffer day if you want more leisure time at each stop.`;
  }

  if (longest && longest.distanceKm >= 350) {
    return `${longest.fromName}–${longest.toName} is a long drive (~${longest.distanceKm} km). We suggest adding a stopover night or switching to a relaxed pacing.`;
  }

  if (input.totalNights < input.destinationSlugs.length) {
    return `You selected ${input.destinationSlugs.length} cities but only ${input.totalNights} nights. Consider one night per city for a comfortable Rajasthan loop.`;
  }

  if (input.pacing === "busy" && score < 65) {
    return "Even on a busy pace this route packs a lot of road time. Drop one city or add an extra night to enjoy the journey.";
  }

  return "This itinerary is doable but tight. Our travel team can fine-tune pick-up times and overnight stops for you.";
}

function computeFeasibilityScore(
  totalTravelHours: number,
  totalNights: number,
  cityCount: number,
  pacing: MeterPacing,
): number {
  const maxHoursPerDay = PACING_MAX_HOURS_PER_DAY[pacing];
  const tripDays = Math.max(totalNights + 1, 1);
  const availableHours = tripDays * maxHoursPerDay;
  const loadRatio = availableHours > 0 ? totalTravelHours / availableHours : 1;

  let score: number;
  if (loadRatio <= 0.25) score = 92;
  else if (loadRatio <= 0.4) score = 84;
  else if (loadRatio <= 0.55) score = 72;
  else if (loadRatio <= 0.7) score = 58;
  else if (loadRatio <= 0.85) score = 42;
  else score = 28;

  if (totalNights < cityCount) {
    score -= (cityCount - totalNights) * 12;
  }

  return Math.max(5, Math.min(98, Math.round(score)));
}

function buildMapPoints(slugs: string[]): MapPoint[] {
  const coords = slugs
    .map((slug) => ({ slug, coord: METER_DESTINATION_COORDS[slug] }))
    .filter((entry): entry is { slug: string; coord: { lat: number; lng: number } } => !!entry.coord);

  if (coords.length === 0) return [];

  const lats = coords.map((c) => c.coord.lat);
  const lngs = coords.map((c) => c.coord.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latSpan = Math.max(maxLat - minLat, 0.5);
  const lngSpan = Math.max(maxLng - minLng, 0.5);

  return coords.map(({ slug, coord }) => ({
    slug,
    name: slugToName(slug),
    lat: coord.lat,
    lng: coord.lng,
    x: Math.round(((coord.lng - minLng) / lngSpan) * 80 + 10),
    y: Math.round((1 - (coord.lat - minLat) / latSpan) * 70 + 15),
  }));
}

export function calculateVacationFeasibility(input: FeasibilityInput): FeasibilityResult {
  const slugs = input.destinationSlugs.map((s) => s.trim().toLowerCase()).filter(Boolean);
  const uniqueSlugs = [...new Set(slugs)];

  const routeSegments: RouteSegment[] = [];
  for (let i = 0; i < uniqueSlugs.length - 1; i++) {
    const fromSlug = uniqueSlugs[i]!;
    const toSlug = uniqueSlugs[i + 1]!;
    const distanceKm = getRoadDistanceKm(fromSlug, toSlug);
    routeSegments.push({
      fromSlug,
      toSlug,
      fromName: slugToName(fromSlug),
      toName: slugToName(toSlug),
      distanceKm,
      travelHours: getTravelHours(distanceKm),
    });
  }

  const totalDistanceKm = routeSegments.reduce((sum, seg) => sum + seg.distanceKm, 0);
  const totalTravelHours = routeSegments.reduce((sum, seg) => sum + seg.travelHours, 0);
  const feasibilityScore = computeFeasibilityScore(
    totalTravelHours,
    input.totalNights,
    uniqueSlugs.length,
    input.pacing,
  );

  const maxReferenceKm = 1200;
  const maxReferenceHours = 24;

  return {
    totalDistanceKm,
    totalTravelHours,
    feasibilityScore,
    descriptor: descriptorForScore(feasibilityScore),
    proTip: buildProTip(input, feasibilityScore, routeSegments),
    routeSegments,
    mapPoints: buildMapPoints(uniqueSlugs),
    distanceBarPercent: Math.min(100, Math.round((totalDistanceKm / maxReferenceKm) * 100)),
    travelBarPercent: Math.min(100, Math.round((totalTravelHours / maxReferenceHours) * 100)),
  };
}

export function pacingLabel(pacing: MeterPacing): string {
  if (pacing === "relaxed") return "RELAXED";
  if (pacing === "busy") return "BUSY";
  return "MODERATE";
}

export function pacingFromSlider(value: number): MeterPacing {
  if (value <= 33) return "relaxed";
  if (value >= 67) return "busy";
  return "moderate";
}

export function pacingToSlider(pacing: MeterPacing): number {
  if (pacing === "relaxed") return 0;
  if (pacing === "busy") return 100;
  return 50;
}
