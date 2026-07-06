import { isBannedTourismPhotoUrl } from "@bmv/shared";
import { describe, expect, it } from "vitest";
import {
  getCityPlanImageUrls,
  hasCityLandmarkMapping,
  hasRajasthanCityImageSupport,
} from "./city-plan-images";
import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

describe("city plan images", () => {
  it("builds 3 Unsplash tourism image urls for Udaipur", () => {
    const urls = getCityPlanImageUrls("Udaipur");
    expect(urls).toHaveLength(3);
    expect(urls.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(urls.every((url) => !isBannedTourismPhotoUrl(url))).toBe(true);
    expect(urls[0]).toContain("1599661046289");
  });

  it("uses Jaipur tourism photos for Jaipur city plans", () => {
    const urls = getCityPlanImageUrls("Jaipur");
    expect(urls[0]).toContain("1477587458883");
    expect(urls[1]).toContain("1705861145407");
  });

  it("uses Jodhpur tourism photos for western Rajasthan cities", () => {
    const urls = getCityPlanImageUrls("Bikaner");
    expect(urls[0]).toContain("1602643454724");
    expect(urls[2]).toContain("1764243213897");
  });

  it("supports all Rajasthan tourist cities", () => {
    for (const city of RAJASTHAN_TOURIST_CITIES) {
      expect(hasRajasthanCityImageSupport(city)).toBe(true);
      expect(hasCityLandmarkMapping(city)).toBe(true);
      const urls = getCityPlanImageUrls(city);
      expect(urls.length).toBe(3);
      expect(urls.every((url) => !isBannedTourismPhotoUrl(url))).toBe(true);
    }
  });
});
