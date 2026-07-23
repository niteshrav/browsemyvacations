import {
  PACKAGE_BIBLE_CATALOG,
  RAJASTHAN_TOURIST_CITIES,
  cityNameToSlug,
  getPackageBibleDestinationNames,
} from "@bmv/shared";

export type HeroSmartSuggestionKind = "city" | "destination" | "package" | "combo";

export type HeroSmartSuggestion = {
  id: string;
  label: string;
  kind: HeroSmartSuggestionKind;
  href: string;
  meta?: string;
};

const CURATED_COMBOS: Array<{ label: string; query: string; keywords: string[] }> = [
  {
    label: "Jaipur + Udaipur",
    query: "Jaipur Udaipur",
    keywords: ["jaipur", "udaipur", "combo", "dual"],
  },
  {
    label: "Udaipur + Mount Abu",
    query: "Udaipur Mount Abu",
    keywords: ["udaipur", "mount abu", "abu", "combo"],
  },
  {
    label: "Romantic Rajasthan",
    query: "Romantic",
    keywords: ["romantic", "udaipur", "rajasthan", "couple"],
  },
  {
    label: "Rajasthan Heritage Tour",
    query: "Heritage",
    keywords: ["heritage", "rajasthan", "jaipur", "jodhpur"],
  },
  {
    label: "Udaipur Weekend Tour",
    query: "Udaipur Weekend",
    keywords: ["udaipur", "weekend", "lake", "escape"],
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesQuery(haystack: string, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return normalize(haystack).includes(q);
}

export function buildHeroSmartSuggestionIndex(): HeroSmartSuggestion[] {
  const cities: HeroSmartSuggestion[] = RAJASTHAN_TOURIST_CITIES.map((city) => ({
    id: `city-${cityNameToSlug(city)}`,
    label: city,
    kind: "city",
    href: `/search?q=${encodeURIComponent(city)}`,
    meta: "City",
  }));

  const destinations: HeroSmartSuggestion[] = RAJASTHAN_TOURIST_CITIES.map((city) => ({
    id: `destination-${cityNameToSlug(city)}`,
    label: `${city} Destinations`,
    kind: "destination",
    href: `/packages?destination=${encodeURIComponent(cityNameToSlug(city))}`,
    meta: "Destination",
  }));

  const packages: HeroSmartSuggestion[] = PACKAGE_BIBLE_CATALOG.map((pkg) => {
    const citiesInPkg = getPackageBibleDestinationNames(pkg);
    return {
      id: `package-${pkg.slug}`,
      label: pkg.title,
      kind: citiesInPkg.length > 1 ? "combo" : "package",
      href: `/packages/${pkg.slug}`,
      meta: citiesInPkg.length > 1 ? "Package combination" : "Package",
    };
  });

  const curated: HeroSmartSuggestion[] = CURATED_COMBOS.map((combo) => ({
    id: `curated-${normalize(combo.label).replace(/\s+/g, "-")}`,
    label: combo.label,
    kind: "combo",
    href: `/search?q=${encodeURIComponent(combo.query)}`,
    meta: "Package combination",
  }));

  return [...cities, ...destinations, ...packages, ...curated];
}

export function filterHeroSmartSuggestions(
  query: string,
  index: readonly HeroSmartSuggestion[],
  limit = 8,
): HeroSmartSuggestion[] {
  const q = normalize(query);
  if (!q) {
    return index
      .filter((item) => item.kind === "city" || item.kind === "combo")
      .slice(0, limit);
  }

  const scored = index
    .map((item) => {
      const label = normalize(item.label);
      let score = 0;
      if (label === q) score += 100;
      else if (label.startsWith(q)) score += 60;
      else if (label.includes(q)) score += 40;
      else if (matchesQuery(item.meta ?? "", q)) score += 10;
      else return null;

      if (item.kind === "package" || item.kind === "combo") score += 5;
      if (item.kind === "city") score += 3;
      return { item, score };
    })
    .filter((entry): entry is { item: HeroSmartSuggestion; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label));

  // Prefer diverse kinds while keeping top matches
  const picked: HeroSmartSuggestion[] = [];
  const seenLabels = new Set<string>();
  for (const { item } of scored) {
    const key = normalize(item.label);
    if (seenLabels.has(key)) continue;
    seenLabels.add(key);
    picked.push(item);
    if (picked.length >= limit) break;
  }
  return picked;
}

export function highlightMatchParts(label: string, query: string): Array<{ text: string; match: boolean }> {
  const q = query.trim();
  if (!q) return [{ text: label, match: false }];
  const lower = label.toLowerCase();
  const index = lower.indexOf(q.toLowerCase());
  if (index < 0) return [{ text: label, match: false }];
  return [
    { text: label.slice(0, index), match: false },
    { text: label.slice(index, index + q.length), match: true },
    { text: label.slice(index + q.length), match: false },
  ].filter((part) => part.text.length > 0);
}
