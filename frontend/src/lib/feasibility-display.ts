import type { FeasibilityResult } from "@bmv/shared";

/** Needle rotation for semi-circular gauge: score 0 → -90°, score 100 → +90°. */
export function feasibilityGaugeRotation(score: number): number {
  const clamped = Math.max(0, Math.min(100, score));
  return (clamped / 100) * 180 - 90;
}

export function feasibilityGaugeColor(score: number): string {
  if (score >= 75) return "#16a34a";
  if (score >= 55) return "#ca8a04";
  if (score >= 35) return "#ea580c";
  return "#dc2626";
}

export function formatTravelSummary(feasibility: FeasibilityResult): string {
  return `Total: ${feasibility.totalDistanceKm} km, ~${feasibility.totalTravelHours} hrs travel`;
}
