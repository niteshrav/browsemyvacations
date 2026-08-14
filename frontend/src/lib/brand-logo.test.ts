import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BRAND_LOGO_ALT,
  BRAND_LOGO_DISPLAY_HEIGHT,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_PATH,
  BRAND_LOGO_SRC,
  BRAND_LOGO_SOURCE_PATH,
  BRAND_LOGO_USE_OPTIMIZER,
  BRAND_LOGO_WIDTH,
  brandLogoAssetHasAlphaChannel,
  brandLogoHeaderClassName,
  brandLogoIntegratedClassName,
  getBrandLogoPublicPath,
  resolveBrandLogoSrc,
  siteHeaderClassName,
  siteHeaderInnerClassName,
  siteHeaderMenuButtonClassName,
  siteHeaderMobileNavClassName,
  siteHeaderNavClassName,
} from "./brand-logo";
import { rootBodyClassName } from "./root-layout";

describe("brand logo", () => {
  it("points to a transparent Browse My Vacations logo asset in public", () => {
    expect(BRAND_LOGO_PATH).toBe("/brand/browsemyvacations-logo.png");
    expect(BRAND_LOGO_SRC).toBe("/brand/browsemyvacations-logo.png");
    expect(resolveBrandLogoSrc()).toBe("/brand/browsemyvacations-logo.png");
    expect(getBrandLogoPublicPath()).toBe(
      path.join(process.cwd(), "public", "brand", "browsemyvacations-logo.png"),
    );
    expect(existsSync(getBrandLogoPublicPath())).toBe(true);
    expect(brandLogoAssetHasAlphaChannel()).toBe(true);
  });

  it("keeps the source jpeg for regenerating the transparent asset", () => {
    expect(BRAND_LOGO_SOURCE_PATH).toBe(
      path.join(process.cwd(), "public", "brand", "browsemyvacations-logo.jpeg"),
    );
    expect(existsSync(BRAND_LOGO_SOURCE_PATH)).toBe(true);
  });

  it("uses accessible alt text for the home link", () => {
    expect(BRAND_LOGO_ALT).toBe("Browse My Vacations");
  });

  it("defines intrinsic dimensions for layout sizing", () => {
    expect(BRAND_LOGO_WIDTH).toBe(504);
    expect(BRAND_LOGO_HEIGHT).toBe(336);
    expect(BRAND_LOGO_DISPLAY_HEIGHT).toBe(96);
    expect(brandLogoIntegratedClassName()).toMatch(/h-12/);
    expect(brandLogoIntegratedClassName()).toMatch(/lg:h-\[4\.5rem\]/);
    expect(BRAND_LOGO_WIDTH).toBeGreaterThan(BRAND_LOGO_HEIGHT);
  });

  it("keeps the public PNG small enough for fast header loads", () => {
    const bytes = readFileSync(getBrandLogoPublicPath()).byteLength;
    expect(bytes).toBeLessThan(80_000);
  });

  it("serves the logo directly on the same surface color as the page body", () => {
    expect(BRAND_LOGO_USE_OPTIMIZER).toBe(false);
    expect(brandLogoIntegratedClassName()).not.toContain("mix-blend");
    expect(brandLogoIntegratedClassName()).not.toContain("bg-");
    expect(siteHeaderClassName()).toContain("bg-white/95");
    expect(rootBodyClassName()).toContain("bg-stone-50");
    expect(siteHeaderClassName()).toContain("backdrop-blur");
    expect(siteHeaderClassName()).toContain("sticky");
  });

  it("keeps a responsive header shell with a full-height logo on desktop", () => {
    const inner = siteHeaderInnerClassName();
    expect(inner).toContain("site-header-bar");
    expect(inner).toContain("site-header-shell");
    expect(inner).toContain("flex-row");
    expect(inner).toContain("items-center");
    expect(inner).toContain("justify-between");
    expect(siteHeaderNavClassName()).toContain("site-header-nav");
    expect(siteHeaderNavClassName()).toContain("hidden");
    expect(siteHeaderNavClassName()).toContain("md:flex");
    expect(siteHeaderMenuButtonClassName()).toContain("site-header-menu-btn");
    expect(siteHeaderMenuButtonClassName()).toContain("md:hidden");
    expect(siteHeaderMobileNavClassName()).toContain("site-header-mobile-nav");
    expect(brandLogoHeaderClassName()).toBe("brand-logo-header");
    expect(brandLogoIntegratedClassName()).toMatch(/h-12/);
    expect(brandLogoIntegratedClassName()).toMatch(/lg:h-\[4\.5rem\]/);
  });

  it("stores the transparent logo as a png with an alpha channel", () => {
    const buffer = readFileSync(getBrandLogoPublicPath());
    expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(buffer[25]).toBe(6);
  });
});
