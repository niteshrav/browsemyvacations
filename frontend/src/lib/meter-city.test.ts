import { describe, expect, it } from "vitest";
import { resolveMeterCitySlug } from "./meter-city";

describe("resolveMeterCitySlug", () => {
  it("returns slug for valid Rajasthan city", () => {
    expect(resolveMeterCitySlug("Jaipur")).toBe("jaipur");
  });

  it("prefers API destination slug when available", () => {
    expect(
      resolveMeterCitySlug("Udaipur", [{ name: "Udaipur", slug: "udaipur" }]),
    ).toBe("udaipur");
  });

  it("returns null for unknown city", () => {
    expect(resolveMeterCitySlug("Goa")).toBeNull();
  });
});
