import type { Metadata } from "next";
import { BRAND_LOGO_PATH } from "@/lib/brand-logo";
import { getSiteUrl } from "@/lib/site-url";

/** Default social / OG image (absolute via metadataBase). */
export const DEFAULT_OG_IMAGE_PATH = "/hero/udaipur-lake-palace.jpg";

export const SITE_NAME = "Browse My Vacations";

export const DEFAULT_SITE_DESCRIPTION =
  "Curated Rajasthan vacation packages, custom journeys, and MICE travel — transparent starting prices and expert planning from Browse My Vacations.";

export const DEFAULT_SITE_KEYWORDS = [
  "Browse My Vacations",
  "Rajasthan tour packages",
  "India holiday packages",
  "Udaipur packages",
  "Jaipur packages",
  "Vacation Meter",
  "MICE Rajasthan",
  "custom India tours",
] as const;

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[] | string[];
  image?: string;
  /** When false, page is excluded from indexing (admin, empty search, etc.). */
  index?: boolean;
  follow?: boolean;
  /** Absolute or site-relative OG type override. Default: website */
  ogType?: "website" | "article";
};

/** Absolute URL for a site path (leading slash optional). */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Builds consistent title, description, keywords, canonical, Open Graph,
 * and Twitter metadata for a public page.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_SITE_KEYWORDS,
  image = DEFAULT_OG_IMAGE_PATH,
  index = true,
  follow = true,
  ogType = "website",
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const keywordList = [...keywords];
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords: keywordList,
    alternates: { canonical: url },
    robots: {
      index,
      follow,
      googleBot: { index, follow },
    },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Root layout defaults shared by every page unless overridden. */
export function buildRootMetadata(): Metadata {
  const home = absoluteUrl("/");
  const ogImage = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${SITE_NAME} | Curated Rajasthan Vacations`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_SITE_DESCRIPTION,
    keywords: [...DEFAULT_SITE_KEYWORDS],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: BRAND_LOGO_PATH, type: "image/png" }],
      shortcut: BRAND_LOGO_PATH,
      apple: [{ url: BRAND_LOGO_PATH, type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Curated Rajasthan Vacations`,
      description: DEFAULT_SITE_DESCRIPTION,
      url: home,
      images: [
        {
          url: ogImage,
          alt: "Lake Palace and Udaipur waterfront — Browse My Vacations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | Curated Rajasthan Vacations`,
      description: DEFAULT_SITE_DESCRIPTION,
      images: [ogImage],
    },
  };
}

export const PUBLIC_PAGE_SEO = {
  home: {
    title: "Curated Rajasthan Vacations",
    description: DEFAULT_SITE_DESCRIPTION,
    path: "/",
    keywords: DEFAULT_SITE_KEYWORDS,
  },
  packages: {
    title: "Tour Packages",
    description:
      "Browse curated Rajasthan and India vacation packages — city escapes, multi-city circuits, honeymoons, and family holidays with transparent starting prices.",
    path: "/packages",
    keywords: [
      "Rajasthan tour packages",
      "India holiday packages",
      "Udaipur packages",
      "Jaipur packages",
      "honeymoon packages India",
      "Browse My Vacations packages",
    ],
  },
  search: {
    title: "Search Packages",
    description:
      "Search Browse My Vacations packages by city or keyword across Rajasthan and beyond.",
    path: "/search",
    keywords: ["search vacation packages", "Rajasthan package search", "Browse My Vacations"],
  },
  vacationMeter: {
    title: "Vacation Feasibility Radar",
    description:
      "Plan your Rajasthan route, check trip feasibility and indicative pricing, then request a custom quote from Browse My Vacations.",
    path: "/vacation-meter",
    keywords: [
      "Vacation Meter",
      "trip cost estimator India",
      "Rajasthan route planner",
      "custom India tour quote",
    ],
  },
  about: {
    title: "About Us",
    description:
      "Browse My Vacations curates thoughtful travel across Rajasthan and beyond — retail holidays, custom journeys, and corporate retreats backed by Browser Hotels hospitality.",
    path: "/about",
    keywords: [
      "about Browse My Vacations",
      "Browser Hotels",
      "Rajasthan travel experts",
      "curated India holidays",
    ],
  },
  contact: {
    title: "Contact Us",
    description:
      "Speak with Browse My Vacations travel experts for holidays, honeymoons, family trips, corporate retreats, and MICE events across Rajasthan and beyond.",
    path: "/contact",
    keywords: [
      "contact Browse My Vacations",
      "travel quote India",
      "Rajasthan holiday inquiry",
      "MICE inquiry",
    ],
  },
  mice: {
    title: "MICE & Corporate Travel",
    description:
      "Corporate retreats, MICE, and incentive travel across Rajasthan, Goa, the Himalayas, and beyond — planned end to end by Browse My Vacations.",
    path: "/mice",
    keywords: [
      "MICE Rajasthan",
      "corporate retreat India",
      "incentive travel",
      "conference travel Rajasthan",
      "Browse My Vacations MICE",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Browse My Vacations collects, uses, and protects your personal information when you request quotes or use Vacation Meter.",
    path: "/privacy",
    keywords: ["privacy policy", "Browse My Vacations privacy", "data protection"],
  },
} as const;
