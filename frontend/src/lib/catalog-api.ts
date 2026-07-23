import { getApiUrl } from "./api";
import {
  PACKAGE_BIBLE_CATALOG,
  buildPackageDetailContent,
  cityNameToSlug,
  getPackageBibleDestinationNames,
} from "@bmv/shared";
import type { Destination, PackageCard, PackageDetail } from "@/types/catalog";

export const CATALOG_FETCH_CACHE = "no-store" as const;

function buildFallbackPackageCard(pkg: (typeof PACKAGE_BIBLE_CATALOG)[number]): PackageCard {
  return {
    id: pkg.slug,
    title: pkg.title,
    slug: pkg.slug,
    category: { slug: pkg.categorySlug, name: pkg.categoryName },
    displayOrder: pkg.displayOrder,
    duration: { days: pkg.durationDays, nights: pkg.durationNights },
    shortDescription: pkg.shortDescription,
    price: { display: pkg.priceFrom, isFixed: false, currency: "INR" },
    images: pkg.images,
    destinationSlugs: getPackageBibleDestinationNames(pkg).map(cityNameToSlug),
  };
}

function buildFallbackPackageDetail(pkg: (typeof PACKAGE_BIBLE_CATALOG)[number]): PackageDetail {
  const card = buildFallbackPackageCard(pkg);
  const destinations = getPackageBibleDestinationNames(pkg).map((name) => ({
    id: cityNameToSlug(name),
    name,
    slug: cityNameToSlug(name),
  }));
  const detailContent = buildPackageDetailContent({
    title: pkg.title,
    durationDays: pkg.durationDays,
    durationNights: pkg.durationNights,
    shortDescription: pkg.shortDescription,
    destinations: destinations.map((d) => d.name),
    itinerary: pkg.itinerary,
  });

  return {
    ...card,
    overview: {
      description: pkg.shortDescription,
      highlights: detailContent.highlights,
      inclusions: detailContent.inclusions,
      exclusions: detailContent.exclusions,
      knowBeforeYouGo: detailContent.knowBeforeYouGo,
      featureBadges: detailContent.featureBadges,
    },
    destinations,
    itinerary: pkg.itinerary,
  };
}

const FALLBACK_PACKAGES: PackageCard[] = PACKAGE_BIBLE_CATALOG.map(buildFallbackPackageCard);

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: CATALOG_FETCH_CACHE });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function fetchDestinations(): Promise<Destination[]> {
  return safeFetch(getApiUrl("/destinations"), []);
}

export async function fetchPackages(destinationSlug?: string): Promise<PackageCard[]> {
  const url = destinationSlug
    ? getApiUrl(`/packages?destination=${encodeURIComponent(destinationSlug)}`)
    : getApiUrl("/packages");
  const fallback = destinationSlug
    ? FALLBACK_PACKAGES.filter((pkg) => pkg.destinationSlugs.includes(destinationSlug))
    : FALLBACK_PACKAGES;

  try {
    const res = await fetch(url, { cache: CATALOG_FETCH_CACHE });
    if (!res.ok) return fallback;
    const data = (await res.json()) as PackageCard[];
    // API up but catalog empty (unseeded DB) — still show Package Bible packages.
    if (!Array.isArray(data) || data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export async function fetchPackageBySlug(slug: string): Promise<PackageDetail | null> {
  try {
    const res = await fetch(getApiUrl(`/packages/${encodeURIComponent(slug)}`), {
      cache: CATALOG_FETCH_CACHE,
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const fallbackPkg = PACKAGE_BIBLE_CATALOG.find((pkg) => pkg.slug === slug);
      return fallbackPkg ? buildFallbackPackageDetail(fallbackPkg) : null;
    }
    return res.json() as Promise<PackageDetail>;
  } catch {
    const fallbackPkg = PACKAGE_BIBLE_CATALOG.find((pkg) => pkg.slug === slug);
    return fallbackPkg ? buildFallbackPackageDetail(fallbackPkg) : null;
  }
}

export async function isCatalogApiReachable(): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl("/health"), { cache: CATALOG_FETCH_CACHE });
    return res.ok;
  } catch {
    return false;
  }
}
