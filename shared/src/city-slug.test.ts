import { describe, expect, it } from "vitest";
import { cityNameToSlug, findRajasthanCityByName, findRajasthanCityBySlug } from "./city-slug";

describe("cityNameToSlug", () => {
  it("converts multi-word city names", () => {
    expect(cityNameToSlug("Mount Abu")).toBe("mount-abu");
    expect(cityNameToSlug("Sawai Madhopur")).toBe("sawai-madhopur");
  });
});

describe("findRajasthanCityByName", () => {
  it("matches city case-insensitively", () => {
    expect(findRajasthanCityByName("jaipur")).toBe("Jaipur");
  });

  it("returns null for unknown city", () => {
    expect(findRajasthanCityByName("Goa")).toBeNull();
  });
});

describe("findRajasthanCityBySlug", () => {
  it("resolves slug to canonical city name", () => {
    expect(findRajasthanCityBySlug("mount-abu")).toBe("Mount Abu");
  });
});
