"use client";

import dynamic from "next/dynamic";
import {
  buildDefaultVacationMapRoute,
  buildGoogleMapRoute,
  type FeasibilityResult,
} from "@bmv/shared";
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from "@/lib/google-maps-config";
import { resolveVacationRouteMapMode } from "@/lib/vacation-route-map-mode";
import { VacationRouteMapEmbed } from "./vacation-route-map-embed";
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
  const hasSelection = Boolean(feasibility?.mapPoints.length);
  const route = hasSelection
    ? buildGoogleMapRoute(feasibility!)
    : buildDefaultVacationMapRoute();

  if (!route) {
    return <VacationRouteMapEmbed route={buildDefaultVacationMapRoute()} />;
  }

  const apiKey = getGoogleMapsApiKey();
  const mode = hasSelection
    ? resolveVacationRouteMapMode(true, isGoogleMapsConfigured(), route)
    : "embed";

  if (mode === "google" && hasSelection && feasibility) {
    return (
      <div
        className="h-64 overflow-hidden rounded-xl border border-sky-100"
        data-testid="vacation-google-map"
      >
        <VacationGoogleMap route={route} apiKey={apiKey} feasibility={feasibility} />
      </div>
    );
  }

  if (mode === "embed") {
    return (
      <VacationRouteMapEmbed
        route={route}
        feasibility={feasibility}
        isDefault={!hasSelection}
      />
    );
  }

  if (feasibility) {
    return <VacationRouteMapFallback feasibility={feasibility} />;
  }

  return <VacationRouteMapEmbed route={route} isDefault />;
}
