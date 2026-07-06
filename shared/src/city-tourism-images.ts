/**
 * Verified Unsplash tourism photos (https://unsplash.com/license).
 * Single source of truth for package fallbacks, city plans, and seed images.
 */

export const BANNED_TOURISM_PHOTO_IDS = ["1524492412937"] as const;

export const UNSPLASH_IMAGE_PARAMS = "?auto=format&fit=crop&w=1200&q=80";

export function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}${UNSPLASH_IMAGE_PARAMS}`;
}

export function isBannedTourismPhotoUrl(url: string): boolean {
  return BANNED_TOURISM_PHOTO_IDS.some((id) => url.includes(id));
}

export type CityPhotoSet = "udaipur" | "jaipur" | "jodhpur";

const UDAIPUR_PHOTO_IDS = [
  "1599661046289-e31897846e41",
  "1703092289078-ff03b771237c",
  "1674229010920-ad8493dc19eb",
  "1770665567877-72ee8a7c9051",
] as const;

const JAIPUR_PHOTO_IDS = [
  "1477587458883-47145ed94245",
  "1705861145407-62f12184e563",
  "1723529983733-9a30e30d841d",
] as const;

const JODHPUR_PHOTO_IDS = [
  "1602643454724-21d5a40722db",
  "1551717256-ad2ac9ab0261",
  "1764243213897-45e6def5ad3e",
] as const;

export const CITY_TOURISM_PHOTO_SETS: Record<CityPhotoSet, readonly string[]> = {
  udaipur: UDAIPUR_PHOTO_IDS.slice(0, 3).map(buildUnsplashUrl),
  jaipur: JAIPUR_PHOTO_IDS.map(buildUnsplashUrl),
  jodhpur: JODHPUR_PHOTO_IDS.map(buildUnsplashUrl),
};

export const DEFAULT_TOURISM_FALLBACK_URL = buildUnsplashUrl(UDAIPUR_PHOTO_IDS[0]);

export const PACKAGE_CITY_FALLBACKS: Record<string, string> = {
  udaipur: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[0]),
  jaipur: buildUnsplashUrl(JAIPUR_PHOTO_IDS[0]),
  jodhpur: buildUnsplashUrl(JODHPUR_PHOTO_IDS[0]),
  jaisalmer: buildUnsplashUrl(JODHPUR_PHOTO_IDS[0]),
  bikaner: buildUnsplashUrl(JODHPUR_PHOTO_IDS[1]),
  pushkar: buildUnsplashUrl(JAIPUR_PHOTO_IDS[0]),
  ajmer: buildUnsplashUrl(JAIPUR_PHOTO_IDS[0]),
};

export const CITY_TO_PHOTO_SET: Record<string, CityPhotoSet> = {
  Udaipur: "udaipur",
  Nathdwara: "udaipur",
  Ranakpur: "udaipur",
  Kumbhalgarh: "udaipur",
  Chittorgarh: "udaipur",
  "Mount Abu": "udaipur",
  Ajmer: "jaipur",
  Alwar: "jaipur",
  Amer: "jaipur",
  Bharatpur: "jaipur",
  Bundi: "jaipur",
  Jaipur: "jaipur",
  Jhalawar: "jaipur",
  Kota: "jaipur",
  Pushkar: "jaipur",
  "Sawai Madhopur": "jaipur",
  Barmer: "jodhpur",
  Bikaner: "jodhpur",
  Jaisalmer: "jodhpur",
  Jodhpur: "jodhpur",
  Osian: "jodhpur",
};

export function resolveCityPhotoSet(cityName: string): CityPhotoSet | null {
  const trimmed = cityName.trim();
  if (!trimmed) return null;
  return CITY_TO_PHOTO_SET[trimmed] ?? null;
}

export function getCityPlanImageUrls(city: string): string[] {
  const photoSet = resolveCityPhotoSet(city);
  if (!photoSet) return [];
  return [...CITY_TOURISM_PHOTO_SETS[photoSet]];
}

export function resolvePackageImageFallback(title: string, slug: string): string {
  const searchable = `${title} ${slug}`.toLowerCase();
  const cityEntry = Object.entries(PACKAGE_CITY_FALLBACKS).find(([city]) =>
    searchable.includes(city),
  );
  return cityEntry?.[1] ?? DEFAULT_TOURISM_FALLBACK_URL;
}

/** Seeded Udaipur destination and package images — all Lake Palace / Udaipur tourism. */
export const UDAIPUR_SEED_IMAGES = {
  destinationUdaipur: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[1]),
  packageGateway: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[0]),
  packageRomantic: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[2]),
  packageMountAbu: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[3]),
  packageBudget: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[1]),
  packageLuxury: buildUnsplashUrl(UDAIPUR_PHOTO_IDS[3]),
} as const;

export function collectHeroTourismPhotoUrls(): string[] {
  const urls = new Set<string>([
    ...UDAIPUR_PHOTO_IDS.map(buildUnsplashUrl),
    ...JAIPUR_PHOTO_IDS.map(buildUnsplashUrl),
    ...JODHPUR_PHOTO_IDS.map(buildUnsplashUrl),
  ]);
  return [...urls];
}

export function collectAllTourismPhotoUrls(): string[] {
  const urls = new Set<string>([
    DEFAULT_TOURISM_FALLBACK_URL,
    ...Object.values(PACKAGE_CITY_FALLBACKS),
    ...Object.values(CITY_TOURISM_PHOTO_SETS).flat(),
    ...Object.values(UDAIPUR_SEED_IMAGES),
    ...collectHeroTourismPhotoUrls(),
  ]);
  return [...urls];
}
