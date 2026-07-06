import { BMV_DEV_SITE_URL } from "@bmv/shared";

/** Canonical public site origin (no trailing slash). */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? BMV_DEV_SITE_URL;
  return url.replace(/\/$/, "");
}
