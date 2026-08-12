import type { GoogleMapRoute } from "@bmv/shared";
import { isGoogleMapsJsPreferred } from "./google-maps-config";

export type VacationRouteMapMode = "empty" | "google" | "embed" | "fallback";

export function resolveVacationRouteMapMode(
  hasFeasibilityPoints: boolean,
  isGoogleMapsConfigured: boolean,
  route: GoogleMapRoute | null,
): VacationRouteMapMode {
  if (!hasFeasibilityPoints) return "empty";
  if (!route) return "fallback";
  // Iframe embed works without Maps JS API billing/referrer setup.
  if (isGoogleMapsConfigured && isGoogleMapsJsPreferred()) return "google";
  return "embed";
}
