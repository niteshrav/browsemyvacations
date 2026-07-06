import { getApiUrl } from "./api";
import type { Destination, PackageCard, PackageDetail } from "@/types/catalog";

export const CATALOG_FETCH_CACHE = "no-store" as const;

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: CATALOG_FETCH_CACHE });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function fetchDestinations(): Promise<Destination[]> {
  return safeFetch(getApiUrl("/destinations"), []);
}

export async function fetchPackages(destinationSlug?: string): Promise<PackageCard[]> {
  const url = destinationSlug
    ? getApiUrl(`/packages?destination=${encodeURIComponent(destinationSlug)}`)
    : getApiUrl("/packages");
  return safeFetch(url, []);
}

export async function fetchPackageBySlug(slug: string): Promise<PackageDetail | null> {
  const res = await fetch(getApiUrl(`/packages/${encodeURIComponent(slug)}`), {
    cache: CATALOG_FETCH_CACHE,
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load package");
  return res.json() as Promise<PackageDetail>;
}

export async function isCatalogApiReachable(): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl("/health"), { cache: CATALOG_FETCH_CACHE });
    return res.ok;
  } catch {
    return false;
  }
}
