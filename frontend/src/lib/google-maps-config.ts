/** Reads the public Google Maps API key from Next.js env. */
export function getGoogleMapsApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
}

export function getGoogleMapsMapId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() || "DEMO_MAP_ID";
}

/** Google browser API keys start with AIza and are typically 39 characters. */
export function isValidGoogleMapsApiKeyFormat(key: string): boolean {
  return /^AIza[0-9A-Za-z_-]{35}$/.test(key.trim());
}

export function isGoogleMapsConfigured(): boolean {
  const key = getGoogleMapsApiKey();
  return key.length > 0 && isValidGoogleMapsApiKeyFormat(key);
}
