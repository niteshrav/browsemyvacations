import type { GoogleMapRoute } from "@bmv/shared";

export type VacationRouteMapMode = "empty" | "google" | "embed" | "fallback";

export function resolveVacationRouteMapMode(
  hasFeasibilityPoints: boolean,
  isGoogleMapsConfigured: boolean,
  route: GoogleMapRoute | null,
): VacationRouteMapMode {
  if (!hasFeasibilityPoints) return "empty";
  if (!route) return "fallback";
  if (isGoogleMapsConfigured) return "google";
  return "embed";
}
