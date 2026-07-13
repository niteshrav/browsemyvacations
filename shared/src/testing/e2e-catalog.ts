import { PACKAGE_BIBLE_CATALOG } from "../seed/package-bible-catalog";
import { PACKAGE_BIBLE_E2E_SLUG } from "../seed/package-bible";
import { ABOUT_PAGE } from "../launch/about-content";
import { CONTACT_PAGE } from "../launch/contact-content";
import { MICE_PAGE } from "../launch/mice-content";

export type E2ePageRoute = {
  id: string;
  path: string;
  heading: string;
  module: "public" | "admin-auth" | "admin-protected" | "seo";
};

export const PUBLIC_E2E_PAGES: E2ePageRoute[] = [
  { id: "home", path: "/", heading: "Vacations You'll Love", module: "public" },
  { id: "packages", path: "/packages", heading: "Tour Packages", module: "public" },
  { id: "vacation-meter", path: "/vacation-meter", heading: "Vacation Feasibility Radar", module: "public" },
  { id: "about", path: "/about", heading: ABOUT_PAGE.hero.heading, module: "public" },
  { id: "contact", path: "/contact", heading: CONTACT_PAGE.hero.heading, module: "public" },
  { id: "mice", path: "/mice", heading: MICE_PAGE.hero.heading, module: "public" },
  { id: "privacy", path: "/privacy", heading: "Privacy Policy", module: "public" },
];

export const ADMIN_AUTH_E2E_PAGES: E2ePageRoute[] = [
  { id: "admin-login", path: "/admin/login", heading: "Sign in", module: "admin-auth" },
];

export const ADMIN_PROTECTED_E2E_PAGES: E2ePageRoute[] = [
  { id: "admin-destinations", path: "/admin/destinations", heading: "Destinations", module: "admin-protected" },
  { id: "admin-packages", path: "/admin/packages", heading: "Packages", module: "admin-protected" },
  { id: "admin-leads", path: "/admin/leads", heading: "Leads", module: "admin-protected" },
  { id: "admin-meter", path: "/admin/meter", heading: "Vacation Meter", module: "admin-protected" },
];

export const SEO_E2E_ROUTES = [
  { id: "sitemap", path: "/sitemap.xml", contentType: "xml" },
  { id: "robots", path: "/robots.txt", contentType: "text" },
] as const;

export const E2E_SEED_PACKAGE_SLUG = PACKAGE_BIBLE_E2E_SLUG;

const e2eSeedPackage = PACKAGE_BIBLE_CATALOG.find((pkg) => pkg.slug === PACKAGE_BIBLE_E2E_SLUG);
if (!e2eSeedPackage) {
  throw new Error(`E2E seed package not found in Package Bible catalog: ${PACKAGE_BIBLE_E2E_SLUG}`);
}
export const E2E_SEED_PACKAGE_TITLE = e2eSeedPackage.title;
export const E2E_SEARCH_QUERY = "Udaipur";
export const BRAND_LOGO_ALT = "Browse My Vacations";
export const BRAND_LOGO_SRC = "/brand/browsemyvacations-logo.png";

export function getAllPublicE2ePaths(): string[] {
  return PUBLIC_E2E_PAGES.map((page) => page.path);
}

export function getAdminProtectedE2ePaths(): string[] {
  return ADMIN_PROTECTED_E2E_PAGES.map((page) => page.path);
}

export function findPublicE2ePage(path: string): E2ePageRoute | undefined {
  return PUBLIC_E2E_PAGES.find((page) => page.path === path);
}
