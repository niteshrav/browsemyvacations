import { describe, expect, it } from "vitest";
import { buildMiceInquiryMessage } from "./mice-inquiry";

describe("mice inquiry", () => {
  it("formats corporate inquiry details into the lead message", () => {
    expect(
      buildMiceInquiryMessage({
        company: "Acme Corp",
        eventType: "Annual offsite",
        groupSize: "45",
        preferredDates: "November 2026",
        message: "Need lake-view venue",
      }),
    ).toContain("Company: Acme Corp");
    expect(
      buildMiceInquiryMessage({
        company: "Acme Corp",
        eventType: "Annual offsite",
        groupSize: "45",
        preferredDates: "",
        message: "",
      }),
    ).toContain("Preferred dates: Flexible");
  });
});
