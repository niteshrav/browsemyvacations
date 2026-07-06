import { describe, expect, it } from "vitest";
import { resolveCatalogEmptyMessage } from "./catalog-empty-state";

describe("catalog empty state", () => {
  it("explains when the catalog API is unreachable", () => {
    expect(resolveCatalogEmptyMessage({ catalogAvailable: false, packageCount: 0 })).toContain(
      "Catalog API is unavailable",
    );
    expect(resolveCatalogEmptyMessage({ catalogAvailable: false, packageCount: 0 })).toContain(
      "3101",
    );
  });

  it("shows the published-empty message only when the API is reachable", () => {
    expect(resolveCatalogEmptyMessage({ catalogAvailable: true, packageCount: 0 })).toContain(
      "No packages published yet",
    );
  });

  it("returns no message when packages are available", () => {
    expect(resolveCatalogEmptyMessage({ catalogAvailable: true, packageCount: 3 })).toBeNull();
    expect(resolveCatalogEmptyMessage({ catalogAvailable: false, packageCount: 3 })).toBeNull();
  });

  it("shows a destination-specific message when a filter returns no packages", () => {
    expect(
      resolveCatalogEmptyMessage({
        catalogAvailable: true,
        packageCount: 0,
        destinationFilter: "udaipur",
      }),
    ).toContain("No packages found");
  });
});
