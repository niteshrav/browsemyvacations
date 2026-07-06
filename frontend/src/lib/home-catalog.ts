import { packageMatchesCityFilter } from "@bmv/shared";
import { fetchDestinations, fetchPackages, isCatalogApiReachable } from "./catalog-api";
import { fetchSuggestions } from "./discovery-api";
import { resolveHomeQuickPickSuggestions } from "./quick-pick-suggestions";
import type { Destination, PackageCard } from "@/types/catalog";
import type { Suggestion } from "@/types/discovery";

export const HOME_PAGE_API_FETCH_COUNT = 4;

export type PackageCardWithDestinations = PackageCard & {
  destinationSlugs: string[];
};

export type HomeDestinationPackages = {
  destination: Destination;
  packages: PackageCard[];
};

export function groupHomePackagesByDestination(
  destinations: Destination[],
  packages: PackageCardWithDestinations[],
): HomeDestinationPackages[] {
  return destinations.map((destination) => ({
    destination,
    packages: packages
      .filter((pkg) =>
        packageMatchesCityFilter(
          {
            title: pkg.title,
            slug: pkg.slug,
            destinationSlugs: pkg.destinationSlugs,
            itineraryCities: [],
          },
          destination.slug,
          destination.name,
        ),
      )
      .sort(
        (left, right) =>
          left.displayOrder - right.displayOrder || left.title.localeCompare(right.title),
      ),
  }));
}

export async function loadHomePageData(): Promise<{
  destinations: Destination[];
  suggestions: Suggestion[];
  packagesByDest: HomeDestinationPackages[];
  catalogAvailable: boolean;
}> {
  const [destinations, suggestions, packages, catalogAvailable] = await Promise.all([
    fetchDestinations(),
    fetchSuggestions(),
    fetchPackages(),
    isCatalogApiReachable(),
  ]);

  return {
    destinations,
    suggestions: resolveHomeQuickPickSuggestions(suggestions),
    packagesByDest: groupHomePackagesByDestination(
      destinations,
      packages as PackageCardWithDestinations[],
    ),
    catalogAvailable,
  };
}
