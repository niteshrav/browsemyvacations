import { getCityPlanImageUrls as getSharedCityPlanImageUrls, resolveCityPhotoSet } from "@bmv/shared";
import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

export function getCityPlanImageUrls(city: string): string[] {
  return getSharedCityPlanImageUrls(city);
}

export function hasRajasthanCityImageSupport(city: string): boolean {
  const normalized = city.trim().toLowerCase();
  return RAJASTHAN_TOURIST_CITIES.some((c) => c.toLowerCase() === normalized);
}

export function hasCityLandmarkMapping(city: string): boolean {
  return resolveCityPhotoSet(city) !== null;
}
