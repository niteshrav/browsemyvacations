import { readFileSync } from "node:fs";
import path from "node:path";

export const BRAND_LOGO_SRC = "/brand/browsemyvacations-logo.png";
export const BRAND_LOGO_ALT = "Browse My Vacations";
export const BRAND_LOGO_WIDTH = 1536;
export const BRAND_LOGO_HEIGHT = 1024;
export const BRAND_LOGO_DISPLAY_HEIGHT = 112;

/** Tailwind height tokens for responsive logo sizing. */
export const BRAND_LOGO_HEIGHT_CLASS = "h-20 sm:h-28";
export const BRAND_LOGO_MAX_WIDTH_CLASS = "max-w-[min(100%,520px)]";

/** Logo is served directly (not via the image optimizer) on the page surface. */
export const BRAND_LOGO_USE_OPTIMIZER = false;

export const BRAND_LOGO_SOURCE_PATH = path.join(
  process.cwd(),
  "public",
  "brand",
  "browsemyvacations-logo.jpeg",
);

export function brandLogoIntegratedClassName(): string {
  return `${BRAND_LOGO_HEIGHT_CLASS} w-auto shrink-0 object-contain object-left ${BRAND_LOGO_MAX_WIDTH_CLASS}`;
}

export function siteHeaderClassName(): string {
  return "sticky top-0 z-50 border-b border-stone-200 bg-stone-50";
}

export function getBrandLogoPublicPath(): string {
  return path.join(process.cwd(), "public", "brand", "browsemyvacations-logo.png");
}

export function brandLogoAssetHasAlphaChannel(): boolean {
  const buffer = readFileSync(getBrandLogoPublicPath());
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    return false;
  }

  const colorType = buffer[25];
  return colorType === 6 || colorType === 4;
}
