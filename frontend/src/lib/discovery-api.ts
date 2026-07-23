import {
  PACKAGE_BIBLE_CATALOG,
  cityNameToSlug,
  getPackageBibleDestinationNames,
  packageMatchesSearchQuery,
  packageRelatedToCity,
  resolveSearchQuery,
} from "@bmv/shared";
import { CATALOG_FETCH_CACHE } from "./catalog-api";
import { getApiUrl } from "./api";
import type { PackageCard } from "@/types/catalog";
import type { Suggestion } from "@/types/discovery";

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: CATALOG_FETCH_CACHE });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function fetchSuggestions(): Promise<Suggestion[]> {
  return safeFetch(getApiUrl("/suggestions"), []);
}

export type SearchResponse = {
  query: string;
  packages: PackageCard[];
  relatedPackages?: PackageCard[];
};

function toSearchable(pkg: (typeof PACKAGE_BIBLE_CATALOG)[number]) {
  return {
    title: pkg.title,
    slug: pkg.slug,
    destinationSlugs: getPackageBibleDestinationNames(pkg).map(cityNameToSlug),
    itineraryCities: pkg.itinerary.flatMap((day) => day.cities),
  };
}

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

export function searchPackagesOffline(query: string): SearchResponse {
  const trimmed = query.trim();
  if (!trimmed) return { query: "", packages: [] };

  const packages = PACKAGE_BIBLE_CATALOG.filter((pkg) =>
    packageMatchesSearchQuery(toSearchable(pkg), trimmed),
  ).map(buildFallbackPackageCard);

  if (packages.length > 0) {
    return { query: trimmed, packages };
  }

  const resolved = resolveSearchQuery(trimmed);
  if (resolved.mode !== "city") {
    return { query: trimmed, packages: [] };
  }

  const relatedPackages = PACKAGE_BIBLE_CATALOG.filter((pkg) =>
    packageRelatedToCity(toSearchable(pkg), resolved.citySlug, resolved.cityName),
  )
    .slice(0, 6)
    .map(buildFallbackPackageCard);

  const popularPackages = PACKAGE_BIBLE_CATALOG.slice(0, 6).map(buildFallbackPackageCard);

  return {
    query: trimmed,
    packages: [],
    relatedPackages: relatedPackages.length > 0 ? relatedPackages : popularPackages,
  };
}

export function formatSearchQueryLabel(query: string): string {
  const resolved = resolveSearchQuery(query);
  return resolved.mode === "city" ? resolved.cityName : query.trim();
}

export async function fetchSearch(query: string): Promise<SearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: "", packages: [] };
  }

  const fallback = searchPackagesOffline(trimmed);

  try {
    const res = await fetch(getApiUrl(`/search?q=${encodeURIComponent(trimmed)}`), {
      cache: "no-store",
    });
    if (res.status === 400) {
      return { query: trimmed, packages: [] };
    }
    if (!res.ok) {
      return fallback;
    }
    const data = (await res.json()) as SearchResponse;
    if (data.packages.length === 0 && fallback.packages.length > 0) {
      return fallback;
    }
    if (data.packages.length === 0 && (fallback.relatedPackages?.length ?? 0) > 0) {
      return { ...data, relatedPackages: fallback.relatedPackages };
    }
    return data;
  } catch {
    return fallback;
  }
}
