"use client";

import type { FeasibilityResult, GoogleMapRoute } from "@bmv/shared";
import { buildVacationRouteMapsEmbedUrl, buildVacationRouteMapsExternalUrl } from "@bmv/shared";
import { getGoogleMapsApiKey, isGoogleMapsConfigured, isGoogleMapsEmbedApiPreferred } from "@/lib/google-maps-config";
import { VacationRouteMapFallback } from "./vacation-route-map-fallback";

type Props = {
  route: GoogleMapRoute;
  feasibility: FeasibilityResult;
};

export function VacationRouteMapEmbed({ route, feasibility }: Props) {
  const useEmbedApi = isGoogleMapsEmbedApiPreferred();
  const apiKey = useEmbedApi && isGoogleMapsConfigured() ? getGoogleMapsApiKey() : undefined;
  const embedUrl = buildVacationRouteMapsEmbedUrl(route, apiKey ? { apiKey } : undefined);
  const externalUrl = buildVacationRouteMapsExternalUrl(route);

  return (
    <div
      className="relative h-64 overflow-hidden rounded-xl border border-sky-100 bg-white"
      data-testid="vacation-google-map-embed"
    >
      <iframe
        title="Google Maps route preview"
        src={embedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-teal-800 shadow-sm ring-1 ring-stone-200 hover:bg-teal-50"
      >
        Open in Google Maps
      </a>
      <noscript>
        <VacationRouteMapFallback feasibility={feasibility} />
      </noscript>
    </div>
  );
}
