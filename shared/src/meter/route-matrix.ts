/** Approximate lat/lng for Rajasthan meter destinations (map + distance fallback). */
export const METER_DESTINATION_COORDS: Record<string, { lat: number; lng: number }> = {
  ajmer: { lat: 26.4499, lng: 74.6399 },
  alwar: { lat: 27.553, lng: 76.6346 },
  amer: { lat: 26.9855, lng: 75.8513 },
  barmer: { lat: 25.75, lng: 71.3833 },
  bharatpur: { lat: 27.2152, lng: 77.4951 },
  bikaner: { lat: 28.0229, lng: 73.3119 },
  bundi: { lat: 25.4305, lng: 75.6499 },
  chittorgarh: { lat: 24.8829, lng: 74.623 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  jaisalmer: { lat: 26.9157, lng: 70.9083 },
  jhalawar: { lat: 24.5973, lng: 76.161 },
  jodhpur: { lat: 26.2389, lng: 73.0243 },
  kota: { lat: 25.2138, lng: 75.8648 },
  kumbhalgarh: { lat: 25.1528, lng: 73.5855 },
  "mount-abu": { lat: 24.5926, lng: 72.7156 },
  nathdwara: { lat: 24.9297, lng: 73.82 },
  osian: { lat: 26.755, lng: 72.8983 },
  pushkar: { lat: 26.4897, lng: 74.5511 },
  ranakpur: { lat: 25.127, lng: 73.4597 },
  "sawai-madhopur": { lat: 26.0174, lng: 76.3456 },
  udaipur: { lat: 24.5854, lng: 73.7125 },
  jawai: { lat: 25.0833, lng: 73.1667 },
};

/** Curated road distances (km) between high-traffic pairs. */
const ROAD_DISTANCE_KM: Record<string, number> = {
  "jaipur|udaipur": 395,
  "jaipur|jodhpur": 335,
  "jaipur|jaisalmer": 570,
  "jaipur|ajmer": 135,
  "jaipur|pushkar": 145,
  "jaipur|bikaner": 330,
  "jaipur|mount-abu": 495,
  "udaipur|jodhpur": 260,
  "udaipur|jaisalmer": 490,
  "udaipur|mount-abu": 165,
  "udaipur|ranakpur": 95,
  "udaipur|nathdwara": 45,
  "udaipur|chittorgarh": 115,
  "jodhpur|jaisalmer": 285,
  "jodhpur|jaipur": 335,
  "ajmer|pushkar": 15,
  "bikaner|jaisalmer": 330,
  "sawai-madhopur|jaipur": 180,
  "kota|jaipur": 245,
  "bundi|jaipur": 215,
};

const AVG_ROAD_SPEED_KMH = 55;

function pairKey(a: string, b: string): string {
  const [x, y] = [a, b].sort();
  return `${x}|${y}`;
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const earthKm = 6371;
  return earthKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 1.25;
}

export function getRoadDistanceKm(fromSlug: string, toSlug: string): number {
  if (fromSlug === toSlug) return 0;
  const key = pairKey(fromSlug, toSlug);
  if (ROAD_DISTANCE_KM[key] !== undefined) return ROAD_DISTANCE_KM[key]!;

  const from = METER_DESTINATION_COORDS[fromSlug];
  const to = METER_DESTINATION_COORDS[toSlug];
  if (from && to) return Math.round(haversineKm(from, to));

  return 200;
}

export function getTravelHours(distanceKm: number): number {
  return Math.round((distanceKm / AVG_ROAD_SPEED_KMH) * 10) / 10;
}
