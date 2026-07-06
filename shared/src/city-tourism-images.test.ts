import { describe, expect, it } from "vitest";
import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";
import {
  BANNED_TOURISM_PHOTO_IDS,
  CITY_TOURISM_PHOTO_SETS,
  collectAllTourismPhotoUrls,
  collectHeroTourismPhotoUrls,
  DEFAULT_TOURISM_FALLBACK_URL,
  getCityPlanImageUrls,
  isBannedTourismPhotoUrl,
  resolvePackageImageFallback,
  UDAIPUR_SEED_IMAGES,
} from "./city-tourism-images";

describe("city tourism images", () => {
  it("never includes banned Taj Mahal photo IDs in curated URLs", () => {
    for (const url of collectAllTourismPhotoUrls()) {
      expect(isBannedTourismPhotoUrl(url)).toBe(false);
    }
  });

  it("bans the Taj Mahal Unsplash photo ID", () => {
    expect(
      isBannedTourismPhotoUrl(
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      ),
    ).toBe(true);
    expect(BANNED_TOURISM_PHOTO_IDS).toContain("1524492412937");
  });

  it("uses Udaipur tourism photos for Udaipur seed packages", () => {
    const udaipurPhotoIds = [
      "1599661046289",
      "1703092289078",
      "1674229010920",
      "1770665567877",
    ];
    for (const url of Object.values(UDAIPUR_SEED_IMAGES)) {
      expect(url).toContain("images.unsplash.com");
      expect(isBannedTourismPhotoUrl(url)).toBe(false);
      expect(udaipurPhotoIds.some((id) => url.includes(id))).toBe(true);
    }
  });

  it("resolves Udaipur package fallbacks to Udaipur tourism photos", () => {
    const image = resolvePackageImageFallback("Budget Udaipur Highlights", "udaipur-budget-2n");
    expect(image).toContain("1599661046289");
    expect(isBannedTourismPhotoUrl(image)).toBe(false);
  });

  it("resolves Jaipur package fallbacks to Jaipur tourism photos", () => {
    const image = resolvePackageImageFallback("Jaipur Heritage Tour", "jaipur-heritage-3n");
    expect(image).toContain("1477587458883");
  });

  it("resolves Jodhpur package fallbacks to Jodhpur tourism photos", () => {
    const image = resolvePackageImageFallback("Jodhpur Blue City Escape", "jodhpur-blue-2n");
    expect(image).toContain("1602643454724");
  });

  it("defaults unknown packages to Udaipur tourism, not Taj Mahal", () => {
    expect(DEFAULT_TOURISM_FALLBACK_URL).toContain("1599661046289");
    expect(isBannedTourismPhotoUrl(DEFAULT_TOURISM_FALLBACK_URL)).toBe(false);

    const image = resolvePackageImageFallback("E2E Package", "e2e-package");
    expect(image).toBe(DEFAULT_TOURISM_FALLBACK_URL);
  });

  it("returns three Unsplash city-plan images per photo set", () => {
    const udaipur = getCityPlanImageUrls("Udaipur");
    const jaipur = getCityPlanImageUrls("Jaipur");
    const jodhpur = getCityPlanImageUrls("Jodhpur");

    expect(udaipur).toHaveLength(3);
    expect(jaipur).toHaveLength(3);
    expect(jodhpur).toHaveLength(3);

    expect(udaipur.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(jaipur[0]).toContain("1477587458883");
    expect(jodhpur[0]).toContain("1602643454724");
  });

  it("maps every Rajasthan tourist city to a tourism photo set", () => {
    for (const city of RAJASTHAN_TOURIST_CITIES) {
      const urls = getCityPlanImageUrls(city);
      expect(urls.length).toBe(3);
      expect(urls.every((url) => !isBannedTourismPhotoUrl(url))).toBe(true);
    }
  });

  it("collects a broad hero tourism pool from Rajasthan photo sets", () => {
    const heroUrls = collectHeroTourismPhotoUrls();
    expect(heroUrls.length).toBeGreaterThanOrEqual(10);
    expect(heroUrls.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(heroUrls.every((url) => !isBannedTourismPhotoUrl(url))).toBe(true);
  });
});
