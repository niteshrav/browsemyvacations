/** Reads the public Google Maps API key from Next.js env. */
export function getGoogleMapsApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
}

export function getGoogleMapsMapId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() ?? "";
}

/** Advanced markers need a Cloud Console map style id — not the demo placeholder. */
export function isGoogleMapsMapIdConfigured(): boolean {
  const mapId = getGoogleMapsMapId();
  return mapId.length > 0 && mapId !== "DEMO_MAP_ID";
}

/** Google browser API keys start with AIza and are typically 39 characters. */
export function isValidGoogleMapsApiKeyFormat(key: string): boolean {
  return /^AIza[0-9A-Za-z_-]{35}$/.test(key.trim());
}

export function isGoogleMapsConfigured(): boolean {
  const key = getGoogleMapsApiKey();
  return key.length > 0 && isValidGoogleMapsApiKeyFormat(key);
}

/** Opt in to Maps JavaScript API (billing + referrer restrictions required). Default is iframe embed. */
export function isGoogleMapsJsPreferred(): boolean {
  const flag = process.env.NEXT_PUBLIC_GOOGLE_MAPS_USE_JS?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}
