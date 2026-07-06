import {
  PACKAGE_BIBLE_CATALOG,
  PACKAGE_BIBLE_CATEGORIES,
  type PackageBibleSeedPackage,
} from "./package-bible-catalog";

export { PACKAGE_BIBLE_CATALOG, PACKAGE_BIBLE_CATEGORIES };
export type { PackageBibleCategorySlug, PackageBibleSeedPackage } from "./package-bible-catalog";

export const PACKAGE_BIBLE_E2E_SLUG = "standalone-single-city-udaipur-the-romantic-lake-escape";

const CITY_TO_DESTINATION: Record<string, string> = {
  Jawai: "Jawai",
  Ranthambore: "Sawai Madhopur",
  "Abu Road": "Mount Abu",
  Sariska: "Alwar",
  Bhangarh: "Alwar",
  Eklingji: "Nathdwara",
  Haldighati: "Chittorgarh",
  "Tanot Mata": "Jaisalmer",
  "Bada Bagh": "Jaisalmer",
  Kuldhara: "Jaisalmer",
};

export function resolvePackageDestinationName(city: string): string | null {
  const trimmed = city.trim();
  if (!trimmed) return null;
  if (CITY_TO_DESTINATION[trimmed]) return CITY_TO_DESTINATION[trimmed];

  const normalized = trimmed.toLowerCase();
  const alias = Object.entries(CITY_TO_DESTINATION).find(([key]) => key.toLowerCase() === normalized);
  if (alias) return alias[1];

  return trimmed;
}

export function getPackageBibleDestinationNames(pkg: PackageBibleSeedPackage): string[] {
  const names = new Set<string>();
  for (const city of pkg.destinations) {
    const resolved = resolvePackageDestinationName(city);
    if (resolved) names.add(resolved);
  }
  return [...names];
}

export function validatePackageBibleCatalog(): void {
  if (PACKAGE_BIBLE_CATALOG.length !== 101) {
    throw new Error(`Expected 101 Package Bible packages, found ${PACKAGE_BIBLE_CATALOG.length}`);
  }

  const slugs = new Set<string>();
  for (const category of PACKAGE_BIBLE_CATEGORIES) {
    const inCategory = PACKAGE_BIBLE_CATALOG.filter((pkg) => pkg.categorySlug === category.slug);
    if (inCategory.length !== category.packageCount) {
      throw new Error(
        `Category ${category.slug} expected ${category.packageCount} packages, found ${inCategory.length}`,
      );
    }
  }

  for (const pkg of PACKAGE_BIBLE_CATALOG) {
    if (slugs.has(pkg.slug)) {
      throw new Error(`Duplicate package slug: ${pkg.slug}`);
    }
    slugs.add(pkg.slug);

    if (pkg.shortDescription.length < 20) {
      throw new Error(`Package ${pkg.slug} has an incomplete description`);
    }
    if (pkg.itinerary.length < 1) {
      throw new Error(`Package ${pkg.slug} is missing itinerary days`);
    }
    if (getPackageBibleDestinationNames(pkg).length < 1) {
      throw new Error(`Package ${pkg.slug} has no resolvable destinations`);
    }
  }
}
