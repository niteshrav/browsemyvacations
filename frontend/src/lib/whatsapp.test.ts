import { describe, expect, it, vi } from "vitest";
import {
  getPackageWhatsAppHref,
  resolveWhatsAppSettings,
} from "./whatsapp";

describe("whatsapp", () => {
  it("builds a WhatsApp deep link with package title and url", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.browsemyvacations.com");
    const href = getPackageWhatsAppHref(
      "2D/1N Jaipur: The Quick Pink City Break",
      "standalone-single-city-jaipur-the-quick-pink-city-break",
    );
    expect(href).toContain("https://wa.me/");
    expect(href).toContain(encodeURIComponent("2D/1N Jaipur"));
    expect(href).toContain(encodeURIComponent("standalone-single-city-jaipur-the-quick-pink-city-break"));
    vi.unstubAllEnvs();
  });

  it("uses admin-saved WhatsApp number when resolving settings", () => {
    const settings = resolveWhatsAppSettings({
      "settings.whatsapp.number": "+91 90000 11111",
      "settings.whatsapp.default_message": "Hello from admin",
    });
    expect(settings.number).toBe("919000011111");
    expect(settings.defaultMessage).toBe("Hello from admin");
  });

  it("falls back to built-in defaults when content is missing", () => {
    const settings = resolveWhatsAppSettings(null);
    expect(settings.number).toMatch(/^\d+$/);
    expect(settings.defaultMessage.length).toBeGreaterThan(10);
  });
});
