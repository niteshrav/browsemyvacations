/**
 * Verified Unsplash tourism photos (https://unsplash.com/license).
 * Single source of truth for package fallbacks, city plans, and seed images.
 * When Cloudinary is configured, delivery goes through the image CDN.
 */

import { deliverCdnImageUrl } from "./cdn/cloudinary";

export const BANNED_TOURISM_PHOTO_IDS = [
  "1524492412937", // Taj Mahal — out of brand scope
  "1477587458883", // Hawa Mahal — replaced by City Palace Udaipur marketing asset
] as const;

/** Local City Palace (Udaipur) — served from frontend/public/marketing. */
export const CITY_PALACE_UDAIPUR_IMAGE = "/marketing/city-palace-udaipur.jpg";

/** Retina-friendly Unsplash params for destination photography. */
export const UNSPLASH_IMAGE_PARAMS = "?auto=format&fit=crop&w=1600&q=85";

/** Package card / cover delivery — sharper than default q_auto on travel photos. */
export const PACKAGE_COVER_IMAGE_OPTIONS = {
  width: 1600,
  crop: "fill" as const,
  quality: "auto:good" as const,
};

export function buildUnsplashOriginUrl(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}${UNSPLASH_IMAGE_PARAMS}`;
}

export function buildUnsplashUrl(photoId: string): string {
  return deliverCdnImageUrl(buildUnsplashOriginUrl(photoId), { ...PACKAGE_COVER_IMAGE_OPTIONS });
}

/** Swap retired Hawa Mahal Unsplash URLs for the City Palace marketing asset. */
export function rewriteRetiredTourismPhotoUrl(url: string): string {
  if (url.includes("1477587458883")) return CITY_PALACE_UDAIPUR_IMAGE;
  return url;
}

/** Admin uploads and local marketing art should not be force-cropped. */
export function isPackageMarketingImageUrl(url: string): boolean {
  return /\/uploads\//.test(url) || url.includes("/marketing/");
}

export function deliverPackageCoverUrl(sourceUrl: string, env?: NodeJS.ProcessEnv): string {
  const source = rewriteRetiredTourismPhotoUrl(sourceUrl);
  const options = isPackageMarketingImageUrl(source)
    ? { width: 1600, crop: "limit" as const, quality: "auto:good" as const }
    : { ...PACKAGE_COVER_IMAGE_OPTIONS };
  return deliverCdnImageUrl(source, options, env);
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
  "1705861145407-62f12184e563",
  "1723529983733-9a30e30d841d",
  "1695956353120-54ce5e91632b",
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

const PACKAGE_CITY_FALLBACK_IDS: Record<string, string> = {
  udaipur: UDAIPUR_PHOTO_IDS[0],
  jaipur: JAIPUR_PHOTO_IDS[0],
  jodhpur: JODHPUR_PHOTO_IDS[0],
  jaisalmer: JODHPUR_PHOTO_IDS[0],
  bikaner: JODHPUR_PHOTO_IDS[1],
  pushkar: JAIPUR_PHOTO_IDS[0],
  ajmer: JAIPUR_PHOTO_IDS[0],
};

export const PACKAGE_CITY_FALLBACKS: Record<string, string> = Object.fromEntries(
  Object.entries(PACKAGE_CITY_FALLBACK_IDS).map(([city, photoId]) => [city, buildUnsplashUrl(photoId)]),
);

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

export function resolvePackageFallbackPhotoId(title: string, slug: string): string {
  const searchable = `${title} ${slug}`.toLowerCase();
  const cityEntry = Object.entries(PACKAGE_CITY_FALLBACK_IDS).find(([city]) =>
    searchable.includes(city),
  );
  return cityEntry?.[1] ?? UDAIPUR_PHOTO_IDS[0];
}

/** Raw Unsplash origin — apply {@link deliverPackageCoverUrl} at the edge. */
export function resolvePackageImageFallbackOrigin(title: string, slug: string): string {
  return buildUnsplashOriginUrl(resolvePackageFallbackPhotoId(title, slug));
}

export function resolvePackageImageFallback(title: string, slug: string): string {
  return deliverPackageCoverUrl(resolvePackageImageFallbackOrigin(title, slug));
}

/** First package image when present; otherwise city tourism fallback origin. */
export function resolvePackageImageSource(
  images: readonly string[],
  title: string,
  slug: string,
): string {
  const primary = images.find((image) => typeof image === "string" && image.trim().length > 0)?.trim();
  if (primary) return rewriteRetiredTourismPhotoUrl(primary);
  return resolvePackageImageFallbackOrigin(title, slug);
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
