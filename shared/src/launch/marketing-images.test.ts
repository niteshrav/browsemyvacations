import { describe, expect, it } from "vitest";
import { MARKETING_IMAGES } from "./marketing-images";

describe("MARKETING_IMAGES destinations", () => {
  it("uses a unique image for each corporate destination card", () => {
    const urls = Object.values(MARKETING_IMAGES.destinations);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("avoids the retired India Gate photo for Darjeeling", () => {
    expect(MARKETING_IMAGES.destinations.darjeeling).not.toContain("1587474260584");
  });

  it("uses live Unsplash photos for Thailand and Singapore", () => {
    expect(MARKETING_IMAGES.destinations.thailand).toContain("1671625120025-49a3c3476d8c");
    expect(MARKETING_IMAGES.destinations.singapore).toContain("1525625293386-3f8f99389edd");
  });

  it("uses verified Rajasthan destination photos for MICE cards", () => {
    expect(MARKETING_IMAGES.destinations.jaisalmer).toContain("1710347454810-e3d493dcc538");
    expect(MARKETING_IMAGES.destinations.kumbhalgarh).toContain("1651478881218-b5da97b8dbef");
    expect(MARKETING_IMAGES.destinations.mountAbu).toContain("1630825828191-6f14ad0b84b8");
    expect(MARKETING_IMAGES.formats.jaisalmerIncentive).toContain("1709620220232-12ecd7ca33a8");
  });
});
