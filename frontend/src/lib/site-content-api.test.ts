import { describe, expect, it } from "vitest";
import { resolveContactDetails } from "./site-content-api";

describe("resolveContactDetails", () => {
  it("falls back to defaults when content is empty", () => {
    const contact = resolveContactDetails({});
    expect(contact.address).toContain("Jaipur");
    expect(contact.email).toContain("@");
    expect(contact.telHref).toMatch(/^tel:/);
    expect(contact.websiteHref).toMatch(/^https:\/\//);
  });

  it("applies admin overrides", () => {
    const contact = resolveContactDetails({
      "settings.contact.address": "MI Road, Jaipur",
      "settings.contact.phone": "+91 90000 11111",
      "settings.contact.email": "sales@example.com",
      "settings.contact.hours": "Mon–Fri 9–6",
      "settings.contact.website": "www.example.com",
    });
    expect(contact.address).toBe("MI Road, Jaipur");
    expect(contact.phoneDisplay).toBe("+91 90000 11111");
    expect(contact.telHref).toBe("tel:+919000011111");
    expect(contact.email).toBe("sales@example.com");
    expect(contact.mailtoHref).toBe("mailto:sales@example.com");
    expect(contact.hours).toBe("Mon–Fri 9–6");
    expect(contact.websiteDisplay).toBe("www.example.com");
    expect(contact.websiteHref).toBe("https://www.example.com");
  });
});
