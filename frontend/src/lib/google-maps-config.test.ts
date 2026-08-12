import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  isGoogleMapsConfigured,
  isGoogleMapsMapIdConfigured,
  isValidGoogleMapsApiKeyFormat,
} from "./google-maps-config";

describe("google-maps-config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns empty string when key is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "");
    expect(getGoogleMapsApiKey()).toBe("");
    expect(isGoogleMapsConfigured()).toBe(false);
  });

  it("detects configured API key with valid format", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    expect(getGoogleMapsApiKey()).toBe("AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    expect(isValidGoogleMapsApiKeyFormat(getGoogleMapsApiKey())).toBe(true);
    expect(isGoogleMapsConfigured()).toBe(true);
  });

  it("rejects malformed keys", () => {
    expect(isValidGoogleMapsApiKeyFormat("test-key-123")).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "not-a-real-key");
    expect(isGoogleMapsConfigured()).toBe(false);
  });

  it("returns empty map id when unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID", "");
    expect(getGoogleMapsMapId()).toBe("");
    expect(isGoogleMapsMapIdConfigured()).toBe(false);
  });

  it("detects configured cloud map id", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID", "abc123map");
    expect(isGoogleMapsMapIdConfigured()).toBe(true);
  });
});
