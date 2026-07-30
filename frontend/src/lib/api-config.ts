import { BMV_DEV_API_V1_URL } from "@bmv/shared";

/** Matches backend default PORT in backend/.env.example */
export const DEFAULT_LOCAL_API_BASE = BMV_DEV_API_V1_URL;

const API_V1 = "/api/v1";

function isLoopbackHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Ensures the API base ends with `/api/v1`.
 * Fixes common misconfig like `https://domain.com` (missing path).
 */
export function ensureApiV1Base(base: string): string {
  const trimmed = base.trim().replace(/\/$/, "");
  if (!trimmed) return DEFAULT_LOCAL_API_BASE;
  if (trimmed === API_V1 || trimmed.endsWith(API_V1)) return trimmed;
  if (trimmed.startsWith("/")) return API_V1;

  try {
    const url = new URL(trimmed);
    const path = url.pathname.replace(/\/$/, "");
    if (path.endsWith(API_V1)) {
      return `${url.origin}${path}`;
    }
    return `${url.origin}${API_V1}`;
  } catch {
    return trimmed;
  }
}

export function resolveApiBaseUrl(envValue?: string): string {
  const trimmed = envValue?.trim();
  if (!trimmed) return DEFAULT_LOCAL_API_BASE;
  return ensureApiV1Base(trimmed);
}

/**
 * Browser API base: use same-origin `/api/v1` for public hosts so HTTPS pages
 * never call an HTTP API (mixed content) after SSL is enabled.
 * Keeps localhost:3101 absolute for local/e2e split-port setups.
 */
export function resolveClientApiBaseUrl(envValue?: string): string {
  const resolved = resolveApiBaseUrl(envValue);
  if (resolved.startsWith("/")) return resolved;

  try {
    const apiUrl = new URL(resolved);
    if (isLoopbackHost(apiUrl.hostname)) return resolved;
  } catch {
    return resolved;
  }

  return API_V1;
}

/** Absolute base for server-side fetch when env is a relative path. */
export function resolveServerApiBaseUrl(envValue?: string): string {
  const resolved = resolveApiBaseUrl(envValue);
  if (!resolved.startsWith("/")) {
    try {
      const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
      if (site) {
        const siteUrl = new URL(site);
        const apiUrl = new URL(resolved);
        if (
          siteUrl.protocol === "https:" &&
          apiUrl.protocol === "http:" &&
          apiUrl.hostname === siteUrl.hostname
        ) {
          apiUrl.protocol = "https:";
          return `${apiUrl.origin}${apiUrl.pathname.replace(/\/$/, "")}`;
        }
      }
    } catch {
      /* keep resolved */
    }
    return resolved;
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (site) return `${site}${resolved}`;
  return `http://127.0.0.1:3101${resolved}`;
}
