import { describe, expect, it } from "vitest";
import { filterRajasthanCities } from "./filter-rajasthan-cities";

describe("filterRajasthanCities", () => {
  it("returns all cities when query is empty", () => {
    expect(filterRajasthanCities("")).toContain("Jaipur");
    expect(filterRajasthanCities("").length).toBeGreaterThan(20);
  });

  it("filters cities by partial match", () => {
    const results = filterRajasthanCities("pur");
    expect(results).toContain("Jaipur");
    expect(results).toContain("Udaipur");
    expect(results).not.toContain("Bikaner");
  });
});
