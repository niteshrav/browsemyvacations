import { deliverCdnImageUrl, isCloudinaryHostedUrl } from "@bmv/shared";

export const TOURISM_IMAGE_HOST = "images.unsplash.com";

export function isDirectTourismImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === TOURISM_IMAGE_HOST && parsed.pathname.startsWith("/photo-")) {
      return true;
    }
    return (
      isCloudinaryHostedUrl(url) &&
      parsed.pathname.includes("/image/fetch/") &&
      decodeURIComponent(url).includes(`${TOURISM_IMAGE_HOST}/photo-`)
    );
  } catch {
    return false;
  }
}

/** Ensure marketing / tourism `<img>` sources go through Cloudinary when configured. */
export function resolveTourismImageSrc(src: string, width = 1200): string {
  return deliverCdnImageUrl(src, { width, crop: "fill" });
}

export function tourismImageClassName(): string {
  return "h-full w-full object-cover";
}
