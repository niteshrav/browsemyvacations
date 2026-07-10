import { describe, expect, it, vi } from "vitest";
import { getPackageWhatsAppHref } from "./whatsapp";

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
});
