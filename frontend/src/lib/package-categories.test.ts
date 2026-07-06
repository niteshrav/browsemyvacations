import { describe, expect, it } from "vitest";
import type { PackageCard } from "@/types/catalog";
import { groupPackagesByCategory } from "./package-categories";

function makePackage(slug: string, categorySlug: string, categoryName: string): PackageCard {
  return {
    id: slug,
    slug,
    title: slug,
    category: { slug: categorySlug, name: categoryName },
    displayOrder: 1,
    duration: { days: 2, nights: 1 },
    shortDescription: "Sample package",
    price: { display: 10000, isFixed: false, currency: "INR" },
    images: [],
    destinationSlugs: [],
  };
}

describe("groupPackagesByCategory", () => {
  it("groups catalog packages under Package Bible categories", () => {
    const groups = groupPackagesByCategory([
      makePackage("a", "standalone-single-city", "Standalone Single-City Escapes"),
      makePackage("b", "dual-city-combinations", "Dual-City Short Combinations"),
      makePackage("c", "standalone-single-city", "Standalone Single-City Escapes"),
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0]?.slug).toBe("standalone-single-city");
    expect(groups[0]?.packages).toHaveLength(2);
    expect(groups[1]?.slug).toBe("dual-city-combinations");
  });
});
