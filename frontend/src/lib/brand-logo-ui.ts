import { deliverBrandAssetUrl } from "@bmv/shared";

export const BRAND_LOGO_PATH = "/brand/browsemyvacations-logo.png";
/** Local public path; resolved to Cloudinary when CDN env is configured. */
export const BRAND_LOGO_SRC = deliverBrandAssetUrl(BRAND_LOGO_PATH);
export const BRAND_LOGO_ALT = "Browse My Vacations";
/** Intrinsic pixel size of the public PNG (3× of ~168×112 display). */
export const BRAND_LOGO_WIDTH = 504;
export const BRAND_LOGO_HEIGHT = 336;
/** Logo display height at lg breakpoint: full 6rem header bar. */
export const BRAND_LOGO_DISPLAY_HEIGHT = 96;
export const SITE_HEADER_HEIGHT_REM = 6;
export const SITE_HEADER_LOGO_HEIGHT_RATIO = 1;

/** Default integrated logo sizing (footer and other surfaces). */
export const BRAND_LOGO_HEIGHT_CLASS = "h-12 sm:h-14 md:h-16 lg:h-[4.5rem]";
export const BRAND_LOGO_MAX_WIDTH_CLASS =
  "max-w-[4.5rem] sm:max-w-[5.25rem] md:max-w-[6rem] lg:max-w-[6.75rem]";
export const BRAND_LOGO_HEADER_CLASS = "brand-logo-header";

/** Logo is served directly (not via the image optimizer) on the page surface. */
export const BRAND_LOGO_USE_OPTIMIZER = false;

export function brandLogoIntegratedClassName(): string {
  return `${BRAND_LOGO_HEIGHT_CLASS} w-auto shrink-0 object-contain object-left ${BRAND_LOGO_MAX_WIDTH_CLASS}`;
}

/** Header logo fills the full header bar from top border to bottom border. */
export function brandLogoHeaderClassName(): string {
  return BRAND_LOGO_HEADER_CLASS;
}

export function brandLogoHeaderLinkClassName(): string {
  return "brand-logo-header-link";
}

export function siteHeaderClassName(): string {
  return "sticky top-0 z-50 border-b border-stone-200/90 bg-white/95 shadow-[0_1px_0_rgba(28,25,23,0.04)] backdrop-blur-sm";
}

/** Logo left, menu right on mobile; inline nav from md up. */
export function siteHeaderInnerClassName(): string {
  return "site-header-shell site-header-bar flex flex-row items-center justify-between gap-2 md:gap-3";
}

export function siteHeaderNavClassName(): string {
  return "site-header-nav hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 md:flex md:flex-wrap md:gap-1.5";
}

export function siteHeaderMenuButtonClassName(): string {
  return "site-header-menu-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 md:hidden";
}

export function siteHeaderMobileNavClassName(): string {
  return "site-header-mobile-nav fixed inset-x-0 top-14 z-50 flex max-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto border-t border-stone-200 bg-white/98 p-3 shadow-lg backdrop-blur-md md:hidden";
}

export function siteHeaderMobileNavLinkClassName(): string {
  return "nav-link block w-full rounded-lg px-4 py-3 text-base font-medium text-stone-700";
}

export function resolveBrandLogoSrc(): string {
  return deliverBrandAssetUrl(BRAND_LOGO_PATH, {
    transforms: { width: BRAND_LOGO_WIDTH, crop: "limit", quality: "auto:best" },
  });
}
