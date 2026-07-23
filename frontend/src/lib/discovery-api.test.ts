import { describe, expect, it } from "vitest";
import { formatSearchQueryLabel, searchPackagesOffline } from "./discovery-api";

describe("discovery-api search fallback", () => {
  it("formats slug queries as friendly city names", () => {
    expect(formatSearchQueryLabel("mount-abu")).toBe("Mount Abu");
    expect(formatSearchQueryLabel("Udaipur")).toBe("Udaipur");
  });

  it("finds Mount Abu packages offline when API is unavailable", () => {
    const result = searchPackagesOffline("mount-abu");
    expect(result.packages.length).toBeGreaterThan(0);
    expect(result.packages.some((pkg) => /mount abu/i.test(pkg.title))).toBe(true);
  });

  it("finds Sawai Madhopur / Ranthambore packages offline", () => {
    const result = searchPackagesOffline("Sawai Madhopur");
    expect(result.packages.length).toBeGreaterThan(0);
  });

  it("suggests related journeys when a city has no dedicated packages", () => {
    const result = searchPackagesOffline("Bharatpur");
    expect(result.packages).toHaveLength(0);
    expect(result.relatedPackages?.length ?? 0).toBeGreaterThan(0);
  });
});
