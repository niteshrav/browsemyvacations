import { BMV_DEV_API_V1_URL } from "@bmv/shared";

/** Matches backend default PORT in backend/.env.example */
export const DEFAULT_LOCAL_API_BASE = BMV_DEV_API_V1_URL;

export function resolveApiBaseUrl(envValue?: string): string {
  const trimmed = envValue?.trim();
  if (trimmed) return trimmed.replace(/\/$/, "");
  return DEFAULT_LOCAL_API_BASE;
}
