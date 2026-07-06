import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BRAND_LOGO_ALT,
  BRAND_LOGO_DISPLAY_HEIGHT,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_SRC,
  BRAND_LOGO_SOURCE_PATH,
  BRAND_LOGO_USE_OPTIMIZER,
  BRAND_LOGO_WIDTH,
  brandLogoAssetHasAlphaChannel,
  brandLogoIntegratedClassName,
  getBrandLogoPublicPath,
  siteHeaderClassName,
} from "./brand-logo";
import { rootBodyClassName } from "./root-layout";

describe("brand logo", () => {
  it("points to a transparent Browse My Vacations logo asset in public", () => {
    expect(BRAND_LOGO_SRC).toBe("/brand/browsemyvacations-logo.png");
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
    expect(BRAND_LOGO_WIDTH).toBe(1536);
    expect(BRAND_LOGO_HEIGHT).toBe(1024);
    expect(BRAND_LOGO_DISPLAY_HEIGHT).toBeGreaterThan(0);
    expect(BRAND_LOGO_WIDTH).toBeGreaterThan(BRAND_LOGO_HEIGHT);
  });

  it("serves the logo directly on the same surface color as the page body", () => {
    expect(BRAND_LOGO_USE_OPTIMIZER).toBe(false);
    expect(brandLogoIntegratedClassName()).not.toContain("mix-blend");
    expect(brandLogoIntegratedClassName()).not.toContain("bg-");
    expect(siteHeaderClassName()).toContain("bg-stone-50");
    expect(rootBodyClassName()).toContain("bg-stone-50");
    expect(siteHeaderClassName()).not.toContain("backdrop-blur");
  });

  it("stores the transparent logo as a png with an alpha channel", () => {
    const buffer = readFileSync(getBrandLogoPublicPath());
    expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(buffer[25]).toBe(6);
  });
});
