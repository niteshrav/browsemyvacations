import { describe, expect, it } from "vitest";
import { BMV_CONTACT } from "./contact-info";

describe("BMV contact info", () => {
  it("exposes phone, email, address, and hours for the contact page", () => {
    expect(BMV_CONTACT.phoneDisplay).toContain("+91");
    expect(BMV_CONTACT.telHref).toMatch(/^tel:/);
    expect(BMV_CONTACT.email).toContain("@");
    expect(BMV_CONTACT.mailtoHref).toMatch(/^mailto:/);
    expect(BMV_CONTACT.address.length).toBeGreaterThan(10);
    expect(BMV_CONTACT.hours).toContain("IST");
  });
});
