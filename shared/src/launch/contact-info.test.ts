import { describe, expect, it } from "vitest";
import {
  BMV_CONTACT,
  buildPackageWhatsAppMessage,
  buildWhatsAppHref,
  normalizeWhatsAppNumber,
} from "./contact-info";

describe("BMV contact info", () => {
  it("exposes phone, email, address, and hours for the contact page", () => {
    expect(BMV_CONTACT.phoneDisplay).toContain("+91");
    expect(BMV_CONTACT.telHref).toMatch(/^tel:/);
    expect(BMV_CONTACT.email).toContain("@");
    expect(BMV_CONTACT.mailtoHref).toMatch(/^mailto:/);
    expect(BMV_CONTACT.address.length).toBeGreaterThan(10);
    expect(BMV_CONTACT.hours).toContain("IST");
  });

  it("exposes WhatsApp contact details and deep links", () => {
    expect(BMV_CONTACT.whatsappDisplay).toContain("+91");
    expect(BMV_CONTACT.whatsappNumber).toMatch(/^\d+$/);
    const href = buildWhatsAppHref("Hello");
    expect(href).toContain("https://wa.me/");
    expect(href).toContain(encodeURIComponent("Hello"));
  });

  it("normalizes Indian WhatsApp numbers", () => {
    expect(normalizeWhatsAppNumber("+91 98765 43210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("9876543210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("09876543210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("123")).toBeNull();
  });

  it("builds tel and website links from editable contact fields", async () => {
    const { buildTelHref, buildMailtoHref, resolveWebsiteLink } = await import("./contact-info");
    expect(buildTelHref("+91 98765 43210")).toBe("tel:+919876543210");
    expect(buildMailtoHref("sales@example.com")).toBe("mailto:sales@example.com");
    expect(resolveWebsiteLink("www.example.com")).toEqual({
      display: "www.example.com",
      href: "https://www.example.com",
    });
    expect(resolveWebsiteLink("https://browsemyvacations.com/")).toEqual({
      display: "browsemyvacations.com",
      href: "https://browsemyvacations.com/",
    });
  });
});
