import { describe, expect, it } from "vitest";
import { BMV_CONTACT, buildPackageWhatsAppMessage, buildWhatsAppHref } from "./contact-info";

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

  it("builds a package inquiry message with title and link", () => {
    const message = buildPackageWhatsAppMessage({
      title: "2D/1N Jaipur",
      packageUrl: "https://www.browsemyvacations.com/packages/jaipur",
    });
    expect(message).toContain("2D/1N Jaipur");
    expect(message).toContain("custom quote");
    expect(message).toContain("https://www.browsemyvacations.com/packages/jaipur");
  });
});
