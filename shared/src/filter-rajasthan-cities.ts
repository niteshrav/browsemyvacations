import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

export function filterRajasthanCities(
  query: string,
  cities: readonly string[] = RAJASTHAN_TOURIST_CITIES,
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...cities];
  return cities.filter((city) => city.toLowerCase().includes(q));
}
