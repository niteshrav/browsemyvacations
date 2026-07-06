import { CATALOG_FETCH_CACHE } from "./catalog-api";
import { getApiUrl } from "./api";
import type { PackageCard } from "@/types/catalog";
import type { Suggestion } from "@/types/discovery";

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: CATALOG_FETCH_CACHE });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function fetchSuggestions(): Promise<Suggestion[]> {
  return safeFetch(getApiUrl("/suggestions"), []);
}

export type SearchResponse = {
  query: string;
  packages: PackageCard[];
};

export async function fetchSearch(query: string): Promise<SearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: "", packages: [] };
  }
  try {
    const res = await fetch(getApiUrl(`/search?q=${encodeURIComponent(trimmed)}`), {
      cache: "no-store",
    });
    if (res.status === 400) {
      return { query: trimmed, packages: [] };
    }
    if (!res.ok) {
      return { query: trimmed, packages: [] };
    }
    return (await res.json()) as SearchResponse;
  } catch {
    return { query: trimmed, packages: [] };
  }
}
