import { describe, expect, it } from "vitest";
import {
  packageMatchesCityFilter,
  packageMatchesKeyword,
  packageMatchesSearchQuery,
  packageSlugIncludesCitySlug,
  resolveSearchQuery,
} from "./match-packages";

const udaipurPackage = {
  title: "2D/1N Udaipur: The Romantic Lake Escape",
  slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
  destinationSlugs: ["udaipur"],
  itineraryCities: ["Udaipur"],
};

const kumbhalgarhHubPackage = {
  title: "2D/1N Kumbhalgarh: The Great Wall of India Trek",
  slug: "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
  destinationSlugs: ["kumbhalgarh", "udaipur"],
  itineraryCities: ["Kumbhalgarh", "Udaipur"],
};

const jaipurPackage = {
  title: "2D/1N Jaipur: The Quick Pink City Break",
  slug: "standalone-single-city-jaipur-the-quick-pink-city-break",
  destinationSlugs: ["jaipur"],
  itineraryCities: ["Jaipur"],
};

describe("resolveSearchQuery", () => {
  it("resolves Rajasthan city names and slugs to city mode", () => {
    expect(resolveSearchQuery("Udaipur")).toEqual({
      mode: "city",
      term: "Udaipur",
      citySlug: "udaipur",
      cityName: "Udaipur",
    });
    expect(resolveSearchQuery("udaipur")).toEqual({
      mode: "city",
      term: "udaipur",
      citySlug: "udaipur",
      cityName: "Udaipur",
    });
    expect(resolveSearchQuery("mount-abu")).toEqual({
      mode: "city",
      term: "mount-abu",
      citySlug: "mount-abu",
      cityName: "Mount Abu",
    });
  });

  it("falls back to keyword mode for free-text search", () => {
    expect(resolveSearchQuery("gateway")).toEqual({ mode: "keyword", term: "gateway" });
  });
});

describe("packageMatchesCityFilter", () => {
  it("matches packages featured for the selected city", () => {
    expect(packageMatchesCityFilter(udaipurPackage, "udaipur", "Udaipur")).toBe(true);
    expect(packageMatchesCityFilter(jaipurPackage, "jaipur", "Jaipur")).toBe(true);
  });

  it("excludes packages that only list the city as a transfer hub", () => {
    expect(packageMatchesCityFilter(kumbhalgarhHubPackage, "udaipur", "Udaipur")).toBe(false);
    expect(packageMatchesCityFilter(kumbhalgarhHubPackage, "kumbhalgarh", "Kumbhalgarh")).toBe(true);
  });

  it("does not match unrelated cities", () => {
    expect(packageMatchesCityFilter(udaipurPackage, "jaipur", "Jaipur")).toBe(false);
  });
});

describe("packageMatchesKeyword", () => {
  it("matches package title keyword", () => {
    expect(packageMatchesKeyword(udaipurPackage, "romantic")).toBe(true);
  });

  it("does not match unrelated cities", () => {
    expect(packageMatchesKeyword(udaipurPackage, "Goa")).toBe(false);
  });
});

describe("packageMatchesSearchQuery", () => {
  it("uses strict city filtering for known cities", () => {
    expect(packageMatchesSearchQuery(udaipurPackage, "Udaipur")).toBe(true);
    expect(packageMatchesSearchQuery(kumbhalgarhHubPackage, "udaipur")).toBe(false);
    expect(packageMatchesSearchQuery(kumbhalgarhHubPackage, "Kumbhalgarh")).toBe(true);
  });

  it("uses keyword matching for non-city terms", () => {
    expect(packageMatchesSearchQuery(udaipurPackage, "romantic")).toBe(true);
  });
});

describe("packageSlugIncludesCitySlug", () => {
  it("detects city segments inside package slugs", () => {
    expect(packageSlugIncludesCitySlug(udaipurPackage.slug, "udaipur")).toBe(true);
    expect(packageSlugIncludesCitySlug(kumbhalgarhHubPackage.slug, "udaipur")).toBe(false);
  });
});
