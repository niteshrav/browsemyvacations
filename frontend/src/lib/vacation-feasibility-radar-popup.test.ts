import { describe, expect, it } from "vitest";
import {
  VACATION_RADAR_POPUP_CTA,
  VACATION_RADAR_POPUP_HREF,
  VACATION_RADAR_POPUP_TITLE,
  buildVacationRadarPopupContent,
  buildVacationRadarPopupSummary,
  formatFeasibilityScoreLabel,
} from "./vacation-feasibility-radar-popup";

describe("vacation-feasibility-radar-popup", () => {
  it("exposes popup copy constants", () => {
    expect(VACATION_RADAR_POPUP_TITLE).toBe("VACATION FEASIBILITY RADAR");
    expect(VACATION_RADAR_POPUP_CTA).toBe("Submit Custom Request & Check Feasibility");
    expect(VACATION_RADAR_POPUP_HREF).toBe("/vacation-meter");
  });

  it("formats feasibility score label", () => {
    expect(formatFeasibilityScoreLabel(85)).toBe("FEASIBILITY: 85%");
  });

  it("builds summary for featured route", () => {
    expect(buildVacationRadarPopupSummary("Jaipur", "Udaipur")).toContain("Jaipur");
    expect(buildVacationRadarPopupSummary("Jaipur", "Udaipur")).toContain("Udaipur");
  });

  it("builds popup content with Jaipur to Udaipur feasibility", () => {
    const content = buildVacationRadarPopupContent();
    expect(content.fromName).toBe("Jaipur");
    expect(content.toName).toBe("Udaipur");
    expect(content.feasibilityScore).toBeGreaterThan(0);
    expect(content.href).toBe("/vacation-meter");
    expect(content.summary).toContain("Jaipur");
  });
});
