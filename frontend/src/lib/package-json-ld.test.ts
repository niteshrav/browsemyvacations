import { describe, expect, it, vi } from "vitest";
import { buildPackageJsonLd } from "./package-json-ld";
import type { PackageDetail } from "@/types/catalog";

const pkg: PackageDetail = {
  id: "1",
  title: "Udaipur Gateway",
  slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
  category: { slug: "standalone-single-city", name: "Standalone Single-City Escapes" },
  displayOrder: 2,
  duration: { days: 4, nights: 3 },
  shortDescription: "City of lakes",
  price: { display: 24500, isFixed: false, currency: "INR" },
  images: ["https://images.unsplash.com/photo-1"],
  destinationSlugs: ["udaipur"],
  overview: { description: "Desc", highlights: [], inclusions: [], exclusions: [] },
  destinations: [{ id: "d1", name: "Udaipur", slug: "udaipur" }],
  itinerary: [],
};

describe("buildPackageJsonLd", () => {
  it("builds TouristTrip structured data", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.browsemyvacations.com");
    const json = buildPackageJsonLd(pkg);
    expect(json["@type"]).toBe("TouristTrip");
    expect(json.url).toBe("https://www.browsemyvacations.com/packages/standalone-single-city-udaipur-the-romantic-lake-escape");
    vi.unstubAllEnvs();
  });
});
