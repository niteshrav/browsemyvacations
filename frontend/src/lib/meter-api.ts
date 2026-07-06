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

export async function fetchMeterOptions(): Promise<MeterOptions | null> {
  try {
    const res = await fetch(getApiUrl("/meter/options"), { cache: "no-store" });
    if (!res.ok) return null;
    return res.json() as Promise<MeterOptions>;
  } catch {
    return null;
  }
}

export async function calculateMeter(body: {
  destinationSlugs: string[];
  totalNights: number;
  pickupTime: string;
  dropoffTime: string;
  travelDate: string;
  vehicleTierName: string;
  adults: number;
  children: number;
  pacing: "relaxed" | "moderate" | "busy";
}): Promise<MeterEstimate> {
  const res = await fetch(getApiUrl("/meter/calculate"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as MeterEstimate & { message?: unknown };
  if (!res.ok) {
    const msg =
      typeof data.message === "string"
        ? data.message
        : "Could not calculate estimate. Check your inputs.";
    throw new Error(msg);
  }
  return data;
}
