import { resolveClientApiBaseUrl, resolveServerApiBaseUrl } from "./api-config";

export function getApiBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    return resolveClientApiBaseUrl(env);
  }
  return resolveServerApiBaseUrl(env);
}

export function getApiUrl(path: string, apiBase?: string): string {
  const base = (apiBase ?? getApiBaseUrl()).replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(getApiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    next: init?.next ?? { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}

export { resolveApiBaseUrl } from "./api-config";
