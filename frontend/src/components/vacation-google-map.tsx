"use client";

import { useEffect } from "react";
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
  useApiLoadingStatus,
  useMap,
} from "@vis.gl/react-google-maps";
import type { GoogleMapRoute } from "@bmv/shared";
import { getGoogleMapsMapId, isGoogleMapsMapIdConfigured } from "@/lib/google-maps-config";
import { VacationRouteMapEmbed } from "./vacation-route-map-embed";

type Props = {
  route: GoogleMapRoute;
  apiKey: string;
};

function FitBounds({ route }: { route: GoogleMapRoute }) {
  const map = useMap();

  useEffect(() => {
    if (!map || route.markers.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    for (const marker of route.markers) {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    }
    map.fitBounds(bounds, 48);
  }, [map, route]);

  return null;
}

function RoutePolyline({ path }: { path: GoogleMapRoute["path"] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || path.length < 2) return;
    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#0d9488",
      strokeOpacity: 0.9,
      strokeWeight: 4,
    });
    polyline.setMap(map);
    return () => polyline.setMap(null);
  }, [map, path]);

  return null;
}

function RouteMarkers({ route }: { route: GoogleMapRoute }) {
  const useAdvancedMarkers = isGoogleMapsMapIdConfigured();

  if (useAdvancedMarkers) {
    return (
      <>
        {route.markers.map((marker) => (
          <AdvancedMarker key={marker.slug} position={{ lat: marker.lat, lng: marker.lng }} title={marker.name}>
            <div className="flex flex-col items-center">
              <div className="h-3.5 w-3.5 rounded-full border-2 border-white bg-teal-800 shadow" />
              <span className="mt-0.5 max-w-24 truncate rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-teal-900 shadow-sm">
                {marker.name}
              </span>
            </div>
          </AdvancedMarker>
        ))}
      </>
    );
  }

  return (
    <>
      {route.markers.map((marker) => (
        <Marker key={marker.slug} position={{ lat: marker.lat, lng: marker.lng }} title={marker.name} />
      ))}
    </>
  );
}

function VacationGoogleMapCanvas({ route }: { route: GoogleMapRoute }) {
  const mapId = getGoogleMapsMapId();
  const useAdvancedMarkers = isGoogleMapsMapIdConfigured();

  return (
    <Map
      {...(useAdvancedMarkers ? { mapId } : {})}
      defaultCenter={route.center}
      defaultZoom={7}
      gestureHandling="cooperative"
      disableDefaultUI
      mapTypeId="roadmap"
      style={{ width: "100%", height: "100%" }}
      aria-label="Google Maps route preview"
    >
      <FitBounds route={route} />
      <RoutePolyline path={route.path} />
      <RouteMarkers route={route} />
    </Map>
  );
}

function GoogleMapsLoadGate({ route }: { route: GoogleMapRoute }) {
  const status = useApiLoadingStatus();

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return <VacationRouteMapEmbed route={route} />;
  }

  if (status === APILoadingStatus.NOT_LOADED || status === APILoadingStatus.LOADING) {
    return (
      <div className="flex h-full items-center justify-center bg-sky-50 text-sm text-stone-500">
        Loading map…
      </div>
    );
  }

  return <VacationGoogleMapCanvas route={route} />;
}

export function VacationGoogleMap({ route, apiKey }: Props) {
  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMapsLoadGate route={route} />
    </APIProvider>
  );
}
