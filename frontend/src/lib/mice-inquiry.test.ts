import { describe, expect, it } from "vitest";
import { buildMiceInquiryMessage } from "./mice-inquiry";

describe("mice inquiry", () => {
  it("formats corporate inquiry details into the lead message", () => {
    expect(
      buildMiceInquiryMessage({
        company: "Acme Corp",
        contactPerson: "Jane Doe",
        destination: "Udaipur",
        groupSize: "45",
        travelDates: "November 2026",
        budget: "15–20 Lakh",
        requirementType: "Corporate Offsite",
        message: "Need lake-view venue",
      }),
    ).toContain("Company: Acme Corp");
    expect(
      buildMiceInquiryMessage({
        company: "Acme Corp",
        contactPerson: "Jane Doe",
        destination: "",
        groupSize: "45",
        travelDates: "",
        budget: "",
        requirementType: "Incentive Travel",
        message: "",
      }),
    ).toContain("Travel dates: Flexible");
  });
});
