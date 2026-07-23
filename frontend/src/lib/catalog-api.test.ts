import { describe, expect, it, vi, afterEach } from "vitest";
import { DEFAULT_LOCAL_API_BASE } from "./api-config";
import { getApiBaseUrl, getApiUrl } from "./api";
import {
  CATALOG_FETCH_CACHE,
  fetchDestinations,
  fetchPackages,
  isCatalogApiReachable,
} from "./catalog-api";

describe("catalog-api", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("uses no-store cache for live catalog data", () => {
    expect(CATALOG_FETCH_CACHE).toBe("no-store");
  });

  it("fetchDestinations calls the destinations endpoint", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const destinations = [{ id: "1", name: "Udaipur", slug: "udaipur" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => destinations,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchDestinations()).resolves.toEqual(destinations);
    expect(fetchMock).toHaveBeenCalledWith(getApiUrl("/destinations"), {
      cache: "no-store",
    });
    expect(getApiBaseUrl()).toBe(DEFAULT_LOCAL_API_BASE);
  });

  it("fetchPackages calls the packages endpoint", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const packages = [{ id: "p1", title: "Test Package", slug: "test", destinationSlugs: ["udaipur"] }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => packages,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchPackages()).resolves.toEqual(packages);
    expect(fetchMock).toHaveBeenCalledWith(getApiUrl("/packages"), {
      cache: "no-store",
    });
  });

  it("fetchPackages filters by destination slug", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const packages = [
      { id: "p1", title: "Udaipur Escape", slug: "udaipur-escape", destinationSlugs: ["udaipur"] },
    ];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => packages,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchPackages("udaipur")).resolves.toEqual(packages);
    expect(fetchMock).toHaveBeenCalledWith(getApiUrl("/packages?destination=udaipur"), {
      cache: "no-store",
    });
  });

  it("fetchPackages falls back to Package Bible when API returns an empty list", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    const packages = await fetchPackages();
    expect(packages.length).toBeGreaterThan(0);
    expect(packages.some((pkg) => /udaipur/i.test(pkg.title) || pkg.destinationSlugs.includes("udaipur"))).toBe(
      true,
    );
  });

  it("isCatalogApiReachable checks the health endpoint", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await expect(isCatalogApiReachable()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(getApiUrl("/health"), { cache: "no-store" });
  });

  it("isCatalogApiReachable returns false when the API is down", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));

    await expect(isCatalogApiReachable()).resolves.toBe(false);
  });
});
