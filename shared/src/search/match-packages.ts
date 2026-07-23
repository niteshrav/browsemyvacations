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

/** Alternate marketing names used in titles/slugs for a destination slug. */
export const CITY_SEARCH_ALIASES: Record<string, string[]> = {
  "sawai-madhopur": ["ranthambore", "ranthambor"],
  alwar: ["sariska"],
  "mount-abu": ["abu"],
  nathdwara: ["shrinathji", "eklingji"],
  pushkar: ["ajmer"],
};

export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase();
}

export function resolveSearchQuery(rawTerm: string): ResolvedSearchQuery {
  const term = rawTerm.trim();
  const spaced = term.replace(/-/g, " ");
  const cityName =
    findRajasthanCityBySlug(term) ??
    findRajasthanCityByName(term) ??
    findRajasthanCityByName(spaced);
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

function packageMentionsCityLabel(pkg: SearchablePackage, citySlug: string, cityName: string): boolean {
  const name = cityName.toLowerCase();
  const aliases = CITY_SEARCH_ALIASES[normalizeSearchTerm(citySlug)] ?? [];
  const labels = [name, ...aliases];

  if (labels.some((label) => pkg.title.toLowerCase().includes(label))) return true;
  if (packageSlugIncludesCitySlug(pkg.slug, citySlug)) return true;
  if (aliases.some((alias) => packageSlugIncludesCitySlug(pkg.slug, alias.replace(/\s+/g, "-")))) {
    return true;
  }
  return false;
}

/** Strict filter for quick picks and city searches — excludes transfer-hub-only links. */
export function packageMatchesCityFilter(
  pkg: SearchablePackage,
  citySlug: string,
  cityName: string,
): boolean {
  const slug = normalizeSearchTerm(citySlug);
  const hasDestination = pkg.destinationSlugs.some(
    (destinationSlug) => normalizeSearchTerm(destinationSlug) === slug,
  );
  if (!hasDestination) return false;

  // Sole or primary destination is always a featured match (e.g. Ranthambore → Sawai Madhopur).
  if (pkg.destinationSlugs.length === 1 || normalizeSearchTerm(pkg.destinationSlugs[0] ?? "") === slug) {
    return true;
  }

  // Multi-city packages: keep only when the city is clearly featured in title/slug.
  return packageMentionsCityLabel(pkg, slug, cityName);
}

export function packageMatchesKeyword(pkg: SearchablePackage, rawTerm: string): boolean {
  const term = normalizeSearchTerm(rawTerm);
  if (!term) return false;
  const compact = term.replace(/\s+/g, "-");
  const spaced = term.replace(/-/g, " ");

  if (pkg.title.toLowerCase().includes(term) || pkg.title.toLowerCase().includes(spaced)) return true;
  if (pkg.slug.includes(compact) || pkg.slug.includes(term.replace(/\s+/g, "-"))) return true;
  if (pkg.destinationSlugs.some((s) => s.includes(term) || term.includes(s) || s.includes(compact))) {
    return true;
  }

  return pkg.itineraryCities.some((city) => {
    const lower = city.toLowerCase();
    return lower.includes(term) || lower.includes(spaced);
  });
}

export function packageMatchesSearchQuery(pkg: SearchablePackage, rawTerm: string): boolean {
  const query = resolveSearchQuery(rawTerm);
  if (query.mode === "city") {
    return packageMatchesCityFilter(pkg, query.citySlug, query.cityName);
  }
  return packageMatchesKeyword(pkg, query.term);
}

/** Broader related matches for empty-state suggestions (itinerary/transfer mentions allowed). */
export function packageRelatedToCity(
  pkg: SearchablePackage,
  citySlug: string,
  cityName: string,
): boolean {
  if (packageMatchesCityFilter(pkg, citySlug, cityName)) return true;
  const name = cityName.toLowerCase();
  const slug = normalizeSearchTerm(citySlug);
  const aliases = CITY_SEARCH_ALIASES[slug] ?? [];
  if (pkg.itineraryCities.some((city) => city.toLowerCase().includes(name))) return true;
  if (aliases.some((alias) => pkg.itineraryCities.some((city) => city.toLowerCase().includes(alias)))) {
    return true;
  }
  return pkg.destinationSlugs.some((destinationSlug) => normalizeSearchTerm(destinationSlug) === slug);
}

/** @deprecated Use packageMatchesSearchQuery — kept for direct keyword tests */
export function packageMatchesSearchTerm(pkg: SearchablePackage, rawTerm: string): boolean {
  return packageMatchesSearchQuery(pkg, rawTerm);
}
