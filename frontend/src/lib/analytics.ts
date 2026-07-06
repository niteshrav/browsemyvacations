export const ANALYTICS_EVENTS = {
  search: "search",
  quote_submit: "quote_submit",
  meter_complete: "meter_complete",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", name, props ?? {});
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (posthogKey && window.posthog?.capture) {
    window.posthog.capture(name, props ?? {});
  }
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_POSTHOG_KEY,
  );
}
