export const TOURISM_IMAGE_HOST = "images.unsplash.com";

export function isDirectTourismImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === TOURISM_IMAGE_HOST && parsed.pathname.startsWith("/photo-");
  } catch {
    return false;
  }
}

export function tourismImageClassName(): string {
  return "h-full w-full object-cover";
}
