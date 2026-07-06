import { describe, expect, it } from "vitest";
import { RAJASTHAN_TOURIST_CITIES } from "./rajasthan-cities";

describe("RAJASTHAN_TOURIST_CITIES", () => {
  it("contains key Rajasthan tourist cities", () => {
    expect(RAJASTHAN_TOURIST_CITIES).toEqual(
      expect.arrayContaining([
        "Jaipur",
        "Udaipur",
        "Jodhpur",
        "Jaisalmer",
        "Pushkar",
        "Mount Abu",
      ]),
    );
  });

  it("does not contain duplicates", () => {
    const unique = new Set(RAJASTHAN_TOURIST_CITIES);
    expect(unique.size).toBe(RAJASTHAN_TOURIST_CITIES.length);
  });
});
