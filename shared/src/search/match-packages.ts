/** Pure helpers for package search matching (BUS-003 / OQ-005). */

import { cityNameToSlug, findRajasthanCityByName, findRajasthanCityBySlug } from "../city-slug";

export type SearchablePackage = {
  title: string;
  slug: string;
  destinationSlugs: string[];
  itineraryCities: string[];
};

export type ResolvedSearchQuery =
  | { mode: "city"; term: string; citySlug: string; cityName: string }
  | { mode: "keyword"; term: string };

export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase();
}

export function resolveSearchQuery(rawTerm: string): ResolvedSearchQuery {
  const term = rawTerm.trim();
  const cityName = findRajasthanCityBySlug(term) ?? findRajasthanCityByName(term);
  if (cityName) {
    return {
      mode: "city",
      term,
      citySlug: cityNameToSlug(cityName),
      cityName,
    };
  }
  return { mode: "keyword", term };
}

export function packageSlugIncludesCitySlug(packageSlug: string, citySlug: string): boolean {
  const normalized = packageSlug.toLowerCase();
  const slug = normalizeSearchTerm(citySlug);
  return (
    normalized.includes(`-${slug}-`) ||
    normalized.endsWith(`-${slug}`) ||
    normalized.startsWith(`${slug}-`)
  );
}

/** Strict filter for quick picks and city searches — excludes transfer-hub-only links. */
export function packageMatchesCityFilter(
  pkg: SearchablePackage,
  citySlug: string,
  cityName: string,
): boolean {
  const slug = normalizeSearchTerm(citySlug);
  const name = cityName.toLowerCase();

  if (!pkg.destinationSlugs.some((destinationSlug) => normalizeSearchTerm(destinationSlug) === slug)) {
    return false;
  }

  if (pkg.title.toLowerCase().includes(name)) return true;
  return packageSlugIncludesCitySlug(pkg.slug, slug);
}

export function packageMatchesKeyword(pkg: SearchablePackage, rawTerm: string): boolean {
  const term = normalizeSearchTerm(rawTerm);
  if (!term) return false;

  if (pkg.title.toLowerCase().includes(term)) return true;
  if (pkg.slug.includes(term.replace(/\s+/g, "-"))) return true;
  if (pkg.destinationSlugs.some((s) => s.includes(term) || term.includes(s))) return true;

  return pkg.itineraryCities.some((city) => city.toLowerCase().includes(term));
}

export function packageMatchesSearchQuery(pkg: SearchablePackage, rawTerm: string): boolean {
  const query = resolveSearchQuery(rawTerm);
  if (query.mode === "city") {
    return packageMatchesCityFilter(pkg, query.citySlug, query.cityName);
  }
  return packageMatchesKeyword(pkg, query.term);
}

/** @deprecated Use packageMatchesSearchQuery — kept for direct keyword tests */
export function packageMatchesSearchTerm(pkg: SearchablePackage, rawTerm: string): boolean {
  return packageMatchesSearchQuery(pkg, rawTerm);
}
