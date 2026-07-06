import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

export function cityNameToSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

export function findRajasthanCityByName(input: string): string | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;
  const match = RAJASTHAN_TOURIST_CITIES.find((city) => city.toLowerCase() === normalized);
  return match ?? null;
}

export function findRajasthanCityBySlug(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return null;
  const match = RAJASTHAN_TOURIST_CITIES.find((city) => cityNameToSlug(city) === normalized);
  return match ?? null;
}
