import { describe, expect, it } from "vitest";
import { getCityTouristPlans } from "./city-tourist-plans";
import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

describe("getCityTouristPlans", () => {
  it("returns plans for Ajmer", () => {
    const plans = getCityTouristPlans("Ajmer");
    expect(plans).toHaveLength(3);
    expect(plans[0]?.city).toBe("Ajmer");
    expect(plans[0]?.imageUrl).toContain("images.unsplash.com");
  });

  it("returns plans for Jaipur", () => {
    const plans = getCityTouristPlans("Jaipur");
    expect(plans).toHaveLength(3);
    expect(plans[0]?.city).toBe("Jaipur");
    expect(plans[0]?.imageUrl).toContain("1477587458883");
  });

  it("matches city names case-insensitively", () => {
    const plans = getCityTouristPlans("jAiPuR");
    expect(plans[0]?.city).toBe("Jaipur");
  });

  it("returns no plans for non-Rajasthan city", () => {
    expect(getCityTouristPlans("Goa")).toEqual([]);
  });

  it("supports all Rajasthan tourist cities in filter list", () => {
    for (const city of RAJASTHAN_TOURIST_CITIES) {
      const plans = getCityTouristPlans(city);
      expect(plans.length).toBeGreaterThan(0);
      expect(plans[0]?.city).toBe(city);
    }
  });
});
