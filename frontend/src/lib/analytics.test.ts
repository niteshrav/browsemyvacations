import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYTICS_EVENTS, trackEvent } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("does not throw when analytics is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    expect(() => trackEvent(ANALYTICS_EVENTS.search, { query: "Udaipur" })).not.toThrow();
  });
});
