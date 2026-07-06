import {
  calculateVacationFeasibility,
  findRajasthanCityBySlug,
  type MeterPacing,
} from "@bmv/shared";

export const VACATION_RADAR_POPUP_STORAGE_KEY = "meter_popup_dismissed";
export const VACATION_RADAR_POPUP_TITLE = "VACATION FEASIBILITY RADAR";
export const VACATION_RADAR_POPUP_CTA = "Submit Custom Request & Check Feasibility";
export const VACATION_RADAR_POPUP_HREF = "/vacation-meter";

export const VACATION_RADAR_POPUP_ROUTE = {
  fromSlug: "jaipur",
  toSlug: "udaipur",
} as const;

export type VacationRadarPopupContent = {
  fromName: string;
  toName: string;
  feasibilityScore: number;
  summary: string;
  href: string;
};

export function formatFeasibilityScoreLabel(score: number): string {
  return `FEASIBILITY: ${score}%`;
}

export function buildVacationRadarPopupSummary(fromName: string, toName: string): string {
  return `Door-to-door feasibility between ${fromName} and ${toName}. Open the radar to fine-tune nights, pacing, and request a custom quote.`;
}

export function buildVacationRadarPopupContent(options?: {
  totalNights?: number;
  pacing?: MeterPacing;
}): VacationRadarPopupContent {
  const fromName =
    findRajasthanCityBySlug(VACATION_RADAR_POPUP_ROUTE.fromSlug) ?? "Jaipur";
  const toName = findRajasthanCityBySlug(VACATION_RADAR_POPUP_ROUTE.toSlug) ?? "Udaipur";

  const feasibility = calculateVacationFeasibility({
    destinationSlugs: [VACATION_RADAR_POPUP_ROUTE.fromSlug, VACATION_RADAR_POPUP_ROUTE.toSlug],
    totalNights: options?.totalNights ?? 4,
    pickupTime: "09:00",
    dropoffTime: "18:00",
    pacing: options?.pacing ?? "moderate",
  });

  return {
    fromName,
    toName,
    feasibilityScore: feasibility.feasibilityScore,
    summary: buildVacationRadarPopupSummary(fromName, toName),
    href: VACATION_RADAR_POPUP_HREF,
  };
}
