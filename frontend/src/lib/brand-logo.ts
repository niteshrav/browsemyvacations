import { readFileSync } from "node:fs";
import path from "node:path";

export * from "./brand-logo-ui";

export const BRAND_LOGO_SOURCE_PATH = path.join(
  process.cwd(),
  "public",
  "brand",
  "browsemyvacations-logo.jpeg",
);

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
