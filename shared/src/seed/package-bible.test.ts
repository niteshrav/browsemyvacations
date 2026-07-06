import { describe, expect, it } from "vitest";
import {
  PACKAGE_BIBLE_CATALOG,
  PACKAGE_BIBLE_CATEGORIES,
  PACKAGE_BIBLE_E2E_SLUG,
  getPackageBibleDestinationNames,
  validatePackageBibleCatalog,
} from "./package-bible";

describe("Package Bible catalog", () => {
  it("contains 101 packages across four categories", () => {
    expect(PACKAGE_BIBLE_CATALOG).toHaveLength(101);
    expect(PACKAGE_BIBLE_CATEGORIES).toEqual([
      expect.objectContaining({ slug: "standalone-single-city", packageCount: 13 }),
      expect.objectContaining({ slug: "dual-city-combinations", packageCount: 30 }),
      expect.objectContaining({ slug: "three-city-circuits", packageCount: 40 }),
      expect.objectContaining({ slug: "regional-deep-dives", packageCount: 18 }),
    ]);
  });

  it("passes catalog integrity validation", () => {
    expect(() => validatePackageBibleCatalog()).not.toThrow();
  });

  it("includes full itineraries and why-book copy for sample packages", () => {
    const jaipur = PACKAGE_BIBLE_CATALOG.find(
      (pkg) => pkg.slug === "standalone-single-city-jaipur-the-quick-pink-city-break",
    );
    expect(jaipur?.shortDescription).toContain("famous palaces");
    expect(jaipur?.itinerary).toHaveLength(2);
    expect(jaipur?.itinerary[0]?.summary).toContain("Amber Fort");
  });

  it("resolves destination names for multi-city packages", () => {
    const combo = PACKAGE_BIBLE_CATALOG.find(
      (pkg) => pkg.slug === "dual-city-combinations-jaipur-ranthambore-the-culture-cats-weekend",
    );
    expect(combo).toBeTruthy();
    expect(getPackageBibleDestinationNames(combo!)).toEqual(
      expect.arrayContaining(["Jaipur", "Sawai Madhopur"]),
    );
  });

  it("defines the E2E seed package slug from the catalog", () => {
    expect(PACKAGE_BIBLE_CATALOG.some((pkg) => pkg.slug === PACKAGE_BIBLE_E2E_SLUG)).toBe(true);
  });
});
