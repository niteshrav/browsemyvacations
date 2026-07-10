import { describe, expect, it } from "vitest";
import {
  buildContactInquiryMessage,
  isValidContactEmail,
  isValidContactPhone,
} from "./contact-inquiry";

describe("contact-inquiry", () => {
  it("validates email and phone", () => {
    expect(isValidContactEmail("hello@browsemyvacations.com")).toBe(true);
    expect(isValidContactEmail("not-an-email")).toBe(false);
    expect(isValidContactPhone("+91 98765 43210")).toBe(true);
    expect(isValidContactPhone("123")).toBe(false);
  });

  it("builds a structured inquiry message", () => {
    const message = buildContactInquiryMessage({
      destination: "Udaipur",
      travelDates: "December 2026",
      budget: "₹80,000 per couple",
      travelType: "Honeymoon",
      message: "Prefer lake-view heritage hotel.",
    });
    expect(message).toContain("Destination: Udaipur");
    expect(message).toContain("Travel type: Honeymoon");
    expect(message).toContain("Prefer lake-view heritage hotel.");
  });
});
