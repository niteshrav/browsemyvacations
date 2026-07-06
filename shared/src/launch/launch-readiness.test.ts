import { describe, expect, it } from "vitest";
import { PACKAGE_BIBLE_CATALOG } from "../seed/package-bible-catalog";
import { PACKAGE_BIBLE_E2E_SLUG } from "../seed/package-bible";
import {
  filterPilotLaunchPackages,
  MIN_PILOT_LAUNCH_PACKAGES,
  PILOT_LAUNCH_DESTINATION_NAME,
  validatePilotCatalogForLaunch,
} from "./launch-readiness";

describe("launch readiness", () => {
  it("finds enough Udaipur pilot packages in the seeded catalog", () => {
    const pilotPackages = filterPilotLaunchPackages(PACKAGE_BIBLE_CATALOG);
    expect(pilotPackages.length).toBeGreaterThanOrEqual(MIN_PILOT_LAUNCH_PACKAGES);
    expect(pilotPackages.some((pkg) => pkg.slug === PACKAGE_BIBLE_E2E_SLUG)).toBe(true);
    expect(() => validatePilotCatalogForLaunch(PACKAGE_BIBLE_CATALOG)).not.toThrow();
  });

  it("rejects catalogs that do not meet the pilot launch threshold", () => {
    expect(() => validatePilotCatalogForLaunch([])).toThrow(
      `Pilot launch requires at least ${MIN_PILOT_LAUNCH_PACKAGES} ${PILOT_LAUNCH_DESTINATION_NAME} packages`,
    );
  });
});
