import { describe, expect, it } from "vitest";
import { resolveContactDetails, resolveContactMapCopy } from "./site-content-api";

describe("resolveContactDetails", () => {
  it("falls back to defaults when content is empty", () => {
    const contact = resolveContactDetails({});
    expect(contact.address).toContain("Jaipur");
    expect(contact.email).toContain("@");
    expect(contact.telHref).toMatch(/^tel:/);
    expect(contact.websiteHref).toMatch(/^https:\/\//);
    expect(contact.infoDescription).toContain("Jaipur");
  });

  it("applies admin overrides", () => {
    const contact = resolveContactDetails({
      "settings.contact.address":
        "Browser Hotels 109, HQ Workspace The Keys Hotel, E-263, MIA, Transport Nagar, Udaipur, Rajasthan 313003",
      "settings.contact.phone": "+91 90000 11111",
      "settings.contact.email": "sales@example.com",
      "settings.contact.hours": "Mon–Fri 9–6",
      "settings.contact.website": "www.example.com",
    });
    expect(contact.address).toContain("Udaipur");
    expect(contact.phoneDisplay).toBe("+91 90000 11111");
    expect(contact.telHref).toBe("tel:+919000011111");
    expect(contact.email).toBe("sales@example.com");
    expect(contact.mailtoHref).toBe("mailto:sales@example.com");
    expect(contact.hours).toBe("Mon–Fri 9–6");
    expect(contact.websiteDisplay).toBe("www.example.com");
    expect(contact.websiteHref).toBe("https://www.example.com");
    expect(contact.infoDescription).toContain("Udaipur");
  });
});

describe("resolveContactMapCopy", () => {
  it("derives Visit Us copy and map embed from the admin office address", () => {
    const address =
      "Browser Hotels 109, HQ Workspace The Keys Hotel, E-263, MIA, Transport Nagar, Udaipur, Rajasthan 313003";
    const map = resolveContactMapCopy(
      {
        "settings.contact.address": address,
        "contact.map.heading": "Visit Us In Jaipur",
        "contact.map.description":
          "Stop by our C-Scheme office to discuss your travel plans in person. We recommend calling ahead to schedule a consultation with our team.",
      },
      address,
    );
    expect(map.heading).toBe("Visit Us In Udaipur");
    expect(map.description).toContain("Udaipur");
    expect(map.embedUrl).toContain(encodeURIComponent(address));
  });

  it("keeps a custom map heading when it is not legacy Jaipur copy", () => {
    const map = resolveContactMapCopy(
      {
        "contact.map.heading": "Meet Us At HQ",
        "contact.map.description": "Custom welcome text for walk-ins.",
      },
      "Udaipur, Rajasthan",
    );
    expect(map.heading).toBe("Meet Us At HQ");
    expect(map.description).toBe("Custom welcome text for walk-ins.");
  });
});
