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

/** Google Maps iframe embed for vacation routes — works without a Maps JavaScript API key. */
export type VacationRouteMapsEmbedOptions = {
  apiKey?: string;
};

function placeLabel(name: string): string {
  return `${name}, Rajasthan, India`;
}

function encodedPlace(name: string): string {
  return encodeURIComponent(placeLabel(name));
}

export function buildVacationRouteMapsExternalUrl(route: GoogleMapRoute): string {
  const { markers } = route;
  if (markers.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${encodedPlace(markers[0]!.name)}`;
  }
  if (markers.length === 2) {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodedPlace(markers[0]!.name)}&destination=${encodedPlace(markers[1]!.name)}`;
  }
  const path = markers.map((marker) => encodedPlace(marker.name)).join("/");
  return `https://www.google.com/maps/dir/${path}`;
}

export function buildVacationRouteMapsEmbedUrl(
  route: GoogleMapRoute,
  options?: VacationRouteMapsEmbedOptions,
): string {
  const { markers } = route;
  const apiKey = options?.apiKey?.trim();

  if (apiKey) {
    if (markers.length === 1) {
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodedPlace(markers[0]!.name)}&zoom=9`;
    }

    const origin = encodedPlace(markers[0]!.name);
    const destination = encodedPlace(markers[markers.length - 1]!.name);
    let url = `https://www.google.com/maps/embed/v1/directions?key=${encodeURIComponent(apiKey)}&origin=${origin}&destination=${destination}&mode=driving`;
    const waypoints = markers.slice(1, -1);
    if (waypoints.length > 0) {
      url += `&waypoints=${waypoints.map((marker) => encodedPlace(marker.name)).join("|")}`;
    }
    return url;
  }

  if (markers.length === 1) {
    return `https://maps.google.com/maps?q=${encodedPlace(markers[0]!.name)}&z=10&output=embed`;
  }

  if (markers.length === 2) {
    return `https://maps.google.com/maps?saddr=${encodedPlace(markers[0]!.name)}&daddr=${encodedPlace(markers[1]!.name)}&output=embed`;
  }

  const path = markers.map((marker) => encodedPlace(marker.name)).join("/");
  return `https://www.google.com/maps/dir/${path}/@${route.center.lat},${route.center.lng},7z/data=!3m1!4b1!4m2!4m1!3e0?hl=en&output=embed`;
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
