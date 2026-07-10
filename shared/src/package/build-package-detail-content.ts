export type PackageDetailContentInput = {
  title: string;
  durationDays: number;
  durationNights: number;
  shortDescription: string;
  destinations: string[];
  itinerary: Array<{ dayNumber: number; title: string; cities: string[]; summary: string }>;
};

export type PackageDetailContent = {
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  knowBeforeYouGo: string[];
  featureBadges: string[];
};

const BOILERPLATE_PREFIXES = [
  "pickup from",
  "check-in",
  "morning breakfast",
  "breakfast at",
  "drop at",
  "drop-off",
  "shopping drop-off",
  "shopping drop",
  "departure",
  "hotel check-out",
  "check-out",
];

export const PACKAGE_KNOW_BEFORE_YOU_GO = [
  "All travellers must carry a valid government-issued photo ID for hotel check-in.",
  "Standard hotel rooms are provided unless a different category is confirmed before booking.",
  "Itinerary timings may shift slightly due to weather, traffic, or local conditions.",
  "Monument entry fees, camera charges, and personal expenses are not included unless stated.",
  "Final pricing and availability are confirmed by our travel team after you submit a quote request.",
] as const;

export function extractItinerarySegments(summary: string): string[] {
  return summary
    .split("->")
    .map((segment) => segment.trim().replace(/\.$/, ""))
    .filter((segment) => segment.length > 0);
}

export function isBoilerplateItinerarySegment(segment: string): boolean {
  const lower = segment.toLowerCase();
  return BOILERPLATE_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

export function formatHighlightFromSegment(segment: string): string {
  const cleaned = segment.trim().replace(/\.$/, "");
  if (!cleaned) return "";
  if (/^visit\b/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}.`;
  }
  if (/^(enjoy|explore|experience|discover|witness|marvel)\b/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}.`;
  }
  return `Experience ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}.`;
}

export function buildPackageHighlights(input: PackageDetailContentInput): string[] {
  const highlights: string[] = [];
  const destinationLabel =
    input.destinations.length > 0 ? input.destinations.join(", ") : "Rajasthan";

  highlights.push(
    `Discover ${destinationLabel} across ${input.durationDays} days with a curated route covering the best palaces, markets, and local experiences.`,
  );

  for (const day of input.itinerary) {
    for (const segment of extractItinerarySegments(day.summary)) {
      if (isBoilerplateItinerarySegment(segment)) continue;
      const highlight = formatHighlightFromSegment(segment);
      if (highlight && !highlights.includes(highlight)) {
        highlights.push(highlight);
      }
      if (highlights.length >= 5) {
        return highlights;
      }
    }
  }

  if (highlights.length < 3) {
    highlights.push(input.shortDescription.endsWith(".") ? input.shortDescription : `${input.shortDescription}.`);
  }

  return highlights.slice(0, 5);
}

export function buildPackageInclusions(input: PackageDetailContentInput): string[] {
  const stayCity =
    input.destinations[0] ?? input.itinerary[0]?.cities[0] ?? "Rajasthan";
  const nightsLabel = input.durationNights === 1 ? "night" : "nights";

  return [
    `Pickup and drop from airport or railway station in ${stayCity}`,
    `${input.durationNights} ${nightsLabel} hotel stay in ${stayCity} with daily breakfast`,
    "Private air-conditioned vehicle for sightseeing as per itinerary",
    "Driver allowances, tolls, parking, and interstate permits where applicable",
    "Sightseeing and transfers as outlined in the day-wise plan",
    "Dedicated support from the Browse My Vacations travel team",
  ];
}

export function buildPackageExclusions(): string[] {
  return [
    "Expenses of a personal nature such as laundry, telephone calls, or tips",
    "Lunch, dinner, and meals not mentioned in the inclusions",
    "Monument entry tickets, camera fees, and activity charges unless specified",
    "Travel insurance, visa fees, and international or domestic flights",
    "Anything not listed under package inclusions",
  ];
}

export function buildPackageFeatureBadges(): string[] {
  return ["Transfer Included", "Stay Included", "Breakfast Included", "Sightseeing Included"];
}

export function buildPackageDetailContent(input: PackageDetailContentInput): PackageDetailContent {
  return {
    highlights: buildPackageHighlights(input),
    inclusions: buildPackageInclusions(input),
    exclusions: buildPackageExclusions(),
    knowBeforeYouGo: [...PACKAGE_KNOW_BEFORE_YOU_GO],
    featureBadges: buildPackageFeatureBadges(),
  };
}

export function resolvePackageOverviewContent(
  stored: { highlights: string[]; inclusions: string[]; exclusions: string[] },
  input: PackageDetailContentInput,
): PackageDetailContent {
  const generated = buildPackageDetailContent(input);
  return {
    ...generated,
    highlights: stored.highlights.length > 0 ? stored.highlights : generated.highlights,
    inclusions: stored.inclusions.length > 0 ? stored.inclusions : generated.inclusions,
    exclusions: stored.exclusions.length > 0 ? stored.exclusions : generated.exclusions,
  };
}
