"use client";

import dynamic from "next/dynamic";
import { buildGoogleMapRoute, type FeasibilityResult } from "@bmv/shared";
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from "@/lib/google-maps-config";
import { resolveVacationRouteMapMode } from "@/lib/vacation-route-map-mode";
import { VacationRouteMapFallback } from "./vacation-route-map-fallback";

const VacationGoogleMap = dynamic(
  () => import("./vacation-google-map").then((mod) => mod.VacationGoogleMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-64 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sm text-stone-500"
        data-testid="vacation-google-map-loading"
      >
        Loading map…
      </div>
    ),
  },
);

type Props = {
  feasibility: FeasibilityResult | null;
};

export function VacationRouteMap({ feasibility }: Props) {
  if (!feasibility || feasibility.mapPoints.length === 0) {
    return (
      <div
        className="flex h-64 items-center justify-center rounded-xl border border-dashed border-sky-200 bg-sky-50/50 text-sm text-stone-500"
        data-testid="vacation-route-map-empty"
      >
        Select destinations to preview your route
      </div>
    );
  }

  const route = buildGoogleMapRoute(feasibility);
  const apiKey = getGoogleMapsApiKey();
  const mode = resolveVacationRouteMapMode(true, isGoogleMapsConfigured(), route);

  if (mode === "google" && route) {
    return (
      <div
        className="h-64 overflow-hidden rounded-xl border border-sky-100"
        data-testid="vacation-google-map"
      >
        <VacationGoogleMap route={route} apiKey={apiKey} />
      </div>
    );
  }

  return <VacationRouteMapFallback feasibility={feasibility} />;
}
