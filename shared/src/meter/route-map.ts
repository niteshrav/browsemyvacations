import type { FeasibilityResult, MapPoint } from "./feasibility";
import { METER_DESTINATION_COORDS } from "./route-matrix";

export type LatLng = {
  lat: number;
  lng: number;
};

export type GoogleMapRoute = {
  markers: Array<MapPoint & LatLng>;
  path: LatLng[];
  center: LatLng;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
};

export function getDestinationLatLng(slug: string): LatLng | null {
  const coord = METER_DESTINATION_COORDS[slug.trim().toLowerCase()];
  if (!coord) return null;
  return { lat: coord.lat, lng: coord.lng };
}

export function buildGoogleMapRoute(feasibility: FeasibilityResult): GoogleMapRoute | null {
  const markers = feasibility.mapPoints
    .map((point) => {
      const coord = getDestinationLatLng(point.slug);
      if (!coord) return null;
      return { ...point, ...coord };
    })
    .filter((point): point is MapPoint & LatLng => point !== null);

  if (markers.length === 0) return null;

  const path: LatLng[] = [];
  for (const segment of feasibility.routeSegments) {
    const from = markers.find((m) => m.slug === segment.fromSlug);
    const to = markers.find((m) => m.slug === segment.toSlug);
    if (!from || !to) continue;
    if (path.length === 0) path.push({ lat: from.lat, lng: from.lng });
    path.push({ lat: to.lat, lng: to.lng });
  }

  if (path.length === 0 && markers.length === 1) {
    path.push({ lat: markers[0]!.lat, lng: markers[0]!.lng });
  }

  const lats = markers.map((m) => m.lat);
  const lngs = markers.map((m) => m.lng);
  const north = Math.max(...lats);
  const south = Math.min(...lats);
  const east = Math.max(...lngs);
  const west = Math.min(...lngs);

  return {
    markers,
    path,
    center: {
      lat: (north + south) / 2,
      lng: (east + west) / 2,
    },
    bounds: { north, south, east, west },
  };
}
