import type { GoogleMapRoute } from "@bmv/shared";

export type VacationRouteMapMode = "empty" | "google" | "fallback";

export function resolveVacationRouteMapMode(
  hasFeasibilityPoints: boolean,
  isGoogleMapsConfigured: boolean,
  route: GoogleMapRoute | null,
): VacationRouteMapMode {
  if (!hasFeasibilityPoints) return "empty";
  if (isGoogleMapsConfigured && route) return "google";
  return "fallback";
}
