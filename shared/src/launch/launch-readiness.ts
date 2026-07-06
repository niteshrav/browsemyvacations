import { cityNameToSlug } from "../city-slug";
import { packageMatchesCityFilter } from "../search/match-packages";
import {
  getPackageBibleDestinationNames,
  PACKAGE_BIBLE_E2E_SLUG,
  type PackageBibleSeedPackage,
} from "../seed/package-bible";

export const PILOT_LAUNCH_DESTINATION_SLUG = "udaipur";
export const PILOT_LAUNCH_DESTINATION_NAME = "Udaipur";
export const MIN_PILOT_LAUNCH_PACKAGES = 5;

export function filterPilotLaunchPackages(
  catalog: PackageBibleSeedPackage[],
): PackageBibleSeedPackage[] {
  return catalog.filter((pkg) =>
    packageMatchesCityFilter(
      {
        title: pkg.title,
        slug: pkg.slug,
        destinationSlugs: getPackageBibleDestinationNames(pkg).map((name) => cityNameToSlug(name)),
        itineraryCities: pkg.itinerary.flatMap((day) => day.cities),
      },
      PILOT_LAUNCH_DESTINATION_SLUG,
      PILOT_LAUNCH_DESTINATION_NAME,
    ),
  );
}

export function validatePilotCatalogForLaunch(catalog: PackageBibleSeedPackage[]): void {
  const pilotPackages = filterPilotLaunchPackages(catalog);

  if (pilotPackages.length < MIN_PILOT_LAUNCH_PACKAGES) {
    throw new Error(
      `Pilot launch requires at least ${MIN_PILOT_LAUNCH_PACKAGES} ${PILOT_LAUNCH_DESTINATION_NAME} packages, found ${pilotPackages.length}`,
    );
  }

  for (const pkg of pilotPackages) {
    if (pkg.images.length < 1) {
      throw new Error(`Pilot package ${pkg.slug} is missing images`);
    }
    if (pkg.priceFrom <= 0) {
      throw new Error(`Pilot package ${pkg.slug} is missing a starting price`);
    }
    if (!pkg.shortDescription.trim()) {
      throw new Error(`Pilot package ${pkg.slug} is missing a description`);
    }
    if (pkg.itinerary.length < 1) {
      throw new Error(`Pilot package ${pkg.slug} is missing itinerary days`);
    }
  }

  if (!pilotPackages.some((pkg) => pkg.slug === PACKAGE_BIBLE_E2E_SLUG)) {
    throw new Error(`Pilot catalog must include E2E seed package: ${PACKAGE_BIBLE_E2E_SLUG}`);
  }
}
