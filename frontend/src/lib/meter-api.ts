import {
  RAJASTHAN_TOURIST_CITIES,
  calculateMeterEstimate,
  calculateVacationFeasibility,
  cityNameToSlug,
  type MeterCalculatorConfig,
} from "@bmv/shared";
import { getApiUrl } from "./api";
import type { FeasibilityResult } from "@bmv/shared";

export type MeterOptions = {
  disclaimer: string;
  destinations: Array<{ id: string; name: string; slug: string }>;
  vehicleTiers: Array<{ name: string; multiplier: number }>;
};

export type MeterEstimate = {
  sessionId: string;
  currency: string;
  disclaimer: string;
  estimateMin?: number;
  estimateMax?: number;
  estimateFixed?: number;
  breakdown: Array<{ label: string; amount: number }>;
  feasibility: FeasibilityResult;
};

export type MeterCalculateBody = {
  destinationSlugs: string[];
  totalNights: number;
  pickupTime: string;
  dropoffTime: string;
  travelDate: string;
  vehicleTierName: string;
  adults: number;
  children: number;
  pacing: "relaxed" | "moderate" | "busy";
};

export const METER_OPTIONS_FALLBACK: MeterOptions = {
  disclaimer: "Indicative estimate only. Final quote confirmed by our travel team.",
  destinations: RAJASTHAN_TOURIST_CITIES.map((name) => {
    const slug = cityNameToSlug(name);
    return { id: slug, name, slug };
  }),
  vehicleTiers: [
    { name: "Sedan", multiplier: 1 },
    { name: "SUV", multiplier: 1.25 },
    { name: "Tempo Traveller", multiplier: 1.6 },
  ],
};

/** Client-side rates when API is unavailable (aligned with seed ~₹8500/night). */
export const METER_CALCULATOR_FALLBACK: MeterCalculatorConfig = {
  currency: "INR",
  disclaimer: METER_OPTIONS_FALLBACK.disclaimer,
  outputMode: "range",
  rangeSpreadPercent: 10,
  destinations: METER_OPTIONS_FALLBACK.destinations.map((d) => ({
    slug: d.slug,
    baseRatePerNight: 8500,
  })),
  vehicleTiers: METER_OPTIONS_FALLBACK.vehicleTiers,
};

export async function fetchMeterOptions(): Promise<MeterOptions> {
  try {
    const res = await fetch(getApiUrl("/meter/options"), { cache: "no-store" });
    if (!res.ok) return METER_OPTIONS_FALLBACK;
    const data = (await res.json()) as MeterOptions;
    if (!data.destinations?.length) {
      return { ...METER_OPTIONS_FALLBACK, ...data, destinations: METER_OPTIONS_FALLBACK.destinations };
    }
    return data;
  } catch {
    return METER_OPTIONS_FALLBACK;
  }
}

export function calculateMeterOffline(body: MeterCalculateBody): MeterEstimate {
  const estimate = calculateMeterEstimate(body, METER_CALCULATOR_FALLBACK);
  const feasibility = calculateVacationFeasibility({
    destinationSlugs: body.destinationSlugs,
    totalNights: body.totalNights,
    pickupTime: body.pickupTime,
    dropoffTime: body.dropoffTime,
    pacing: body.pacing,
    adults: body.adults,
    children: body.children,
  });

  return {
    sessionId: `offline-${Date.now()}`,
    ...estimate,
    feasibility,
  };
}

export async function calculateMeter(body: MeterCalculateBody): Promise<MeterEstimate> {
  try {
    const res = await fetch(getApiUrl("/meter/calculate"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as MeterEstimate & { message?: unknown };
    if (!res.ok) {
      // Prefer offline estimate over hard failure when API rejects/unreachable shape.
      return calculateMeterOffline(body);
    }
    return data;
  } catch {
    return calculateMeterOffline(body);
  }
}
