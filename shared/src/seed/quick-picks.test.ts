import { describe, expect, it } from "vitest";
import {
  HOME_QUICK_PICKS,
  buildQuickPickThumbUrl,
  findHomeQuickPickByCity,
  findHomeQuickPickBySlug,
  getHomeQuickPicks,
  validateHomeQuickPickCities,
} from "./quick-picks";

describe("HOME_QUICK_PICKS", () => {
  it("lists nine featured destinations with landmark photos including Jaisalmer", () => {
    expect(HOME_QUICK_PICKS.map((pick) => pick.city)).toEqual([
      "Udaipur",
      "Jaipur",
      "Jodhpur",
      "Jaisalmer",
      "Mount Abu",
      "Bikaner",
      "Kota",
      "Ajmer",
      "Pushkar",
    ]);
    expect(HOME_QUICK_PICKS.find((pick) => pick.city === "Udaipur")?.landmark).toBe("Lake Pichola");
    expect(HOME_QUICK_PICKS.find((pick) => pick.city === "Jaisalmer")?.landmark).toBe("Desert Safari");
  });

  it("builds small thumbnail urls", () => {
    const url = buildQuickPickThumbUrl("1703092289078-ff03b771237c");
    expect(url).toContain("images.unsplash.com");
    expect(url).toContain("w=80");
    expect(url).toContain("h=80");
  });

  it("resolves quick pick metadata by city and slug", () => {
    expect(findHomeQuickPickByCity("Jaipur")?.landmark).toBe("Hawa Mahal");
    expect(findHomeQuickPickBySlug("jaipur")?.city).toBe("Jaipur");
    expect(getHomeQuickPicks()).toHaveLength(9);
  });

  it("passes validation against Rajasthan tourist cities", () => {
    expect(() => validateHomeQuickPickCities()).not.toThrow();
  });
});
