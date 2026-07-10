import { describe, expect, it } from "vitest";
import { BMV_CONTACT } from "./contact-info";
import { CONTACT_PAGE, CONTACT_TRAVEL_TYPES } from "./contact-content";

describe("CONTACT_PAGE", () => {
  it("exposes hero, form, FAQ, and CTA content for the contact page", () => {
    expect(CONTACT_PAGE.hero.heading).toBe("Let's Plan Your Next Journey");
    expect(CONTACT_PAGE.hero.secondaryCta.href).toBe(BMV_CONTACT.telHref);
    expect(CONTACT_PAGE.form.submitLabel).toBe("Send Inquiry");
    expect(CONTACT_PAGE.faq.items).toHaveLength(5);
    expect(CONTACT_PAGE.cta.primaryCta.href).toBe("/packages");
  });

  it("lists all travel types for the inquiry form", () => {
    expect(CONTACT_TRAVEL_TYPES).toContain("MICE");
    expect(CONTACT_TRAVEL_TYPES).toContain("Honeymoon");
  });
});
