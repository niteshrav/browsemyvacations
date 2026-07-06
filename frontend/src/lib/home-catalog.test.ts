import { describe, expect, it, vi, afterEach } from "vitest";
import {
  HOME_PAGE_API_FETCH_COUNT,
  groupHomePackagesByDestination,
  loadHomePageData,
  type PackageCardWithDestinations,
} from "./home-catalog";
import type { Destination } from "@/types/catalog";

const destinations: Destination[] = [
  {
    id: "d1",
    name: "Udaipur",
    slug: "udaipur",
    imageUrl: null,
    displayOrder: 1,
    active: true,
  },
  {
    id: "d2",
    name: "Kumbhalgarh",
    slug: "kumbhalgarh",
    imageUrl: null,
    displayOrder: 2,
    active: true,
  },
];

function makePackage(
  overrides: Partial<PackageCardWithDestinations> & Pick<PackageCardWithDestinations, "id" | "slug" | "title">,
): PackageCardWithDestinations {
  return {
    category: { slug: "standalone-single-city", name: "Standalone" },
    displayOrder: 1,
    duration: { days: 2, nights: 1 },
    shortDescription: "Desc",
    price: { display: 10000, isFixed: false, currency: "INR" },
    images: [],
    destinationSlugs: ["udaipur"],
    ...overrides,
  };
}

describe("home-catalog", () => {
  it("loads home data with a fixed small number of API calls", () => {
    expect(HOME_PAGE_API_FETCH_COUNT).toBe(4);
  });

  it("groups packages by destination using strict city matching", () => {
    const packages = [
      makePackage({
        id: "p1",
        title: "2D/1N Udaipur: The Romantic Lake Escape",
        slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
        destinationSlugs: ["udaipur"],
      }),
      makePackage({
        id: "p2",
        title: "2D/1N Kumbhalgarh: The Great Wall of India Trek",
        slug: "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
        destinationSlugs: ["kumbhalgarh", "udaipur"],
        displayOrder: 2,
      }),
    ];

    const grouped = groupHomePackagesByDestination(destinations, packages);
    expect(grouped[0]?.packages).toHaveLength(1);
    expect(grouped[0]?.packages[0]?.slug).toBe(
      "standalone-single-city-udaipur-the-romantic-lake-escape",
    );
    expect(grouped[1]?.packages).toHaveLength(1);
    expect(grouped[1]?.packages[0]?.slug).toBe(
      "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
    );
  });
});

describe("loadHomePageData", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports when the catalog API is unavailable", async () => {
    vi.spyOn(await import("./catalog-api"), "fetchDestinations").mockResolvedValue([]);
    vi.spyOn(await import("./discovery-api"), "fetchSuggestions").mockResolvedValue([]);
    vi.spyOn(await import("./catalog-api"), "fetchPackages").mockResolvedValue([]);
    vi.spyOn(await import("./catalog-api"), "isCatalogApiReachable").mockResolvedValue(false);

    await expect(loadHomePageData()).resolves.toMatchObject({
      destinations: [],
      packagesByDest: [],
      catalogAvailable: false,
    });
  });
});
