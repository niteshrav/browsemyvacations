import {
  BMV_CONTACT,
  buildContactInfoDescription,
  buildGoogleMapsEmbedUrl,
  buildMailtoHref,
  buildOfficeVisitDescription,
  buildOfficeVisitHeading,
  buildTelHref,
  resolveWebsiteLink,
  SITE_CONTENT_DEFAULTS,
  type SiteContentKey,
} from "@bmv/shared";
import { getApiBaseUrl } from "@/lib/api";
import {
  HERO_HEADLINE_ACCENT as DEFAULT_ACCENT,
  HERO_HEADLINE_PRIMARY as DEFAULT_PRIMARY,
  HERO_SUPPORT as DEFAULT_SUPPORT,
} from "@/lib/hero-home-content";

export type HomeHeroCopy = {
  headlinePrimary: string;
  headlineAccent: string;
  support: string;
};

export type EditableContactDetails = {
  address: string;
  phoneDisplay: string;
  telHref: string;
  email: string;
  mailtoHref: string;
  hours: string;
  websiteDisplay: string;
  websiteHref: string;
  infoDescription: string;
};

export type ContactHeroCopy = {
  heading: string;
  description: string;
};

async function fetchPublicContent(): Promise<Partial<Record<SiteContentKey, string>>> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/content`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("content unavailable");
    return (await res.json()) as Partial<Record<SiteContentKey, string>>;
  } catch {
    return {};
  }
}

function contentValue(
  data: Partial<Record<SiteContentKey, string>>,
  key: SiteContentKey,
): string {
  return data[key]?.trim() || SITE_CONTENT_DEFAULTS[key].body;
}

/** Legacy Jaipur map copy — treat as unset so admin address drives the section. */
const LEGACY_MAP_HEADINGS = new Set(["Visit Us In Jaipur", "Visit Our Office"]);
const LEGACY_MAP_DESCRIPTIONS = new Set([
  SITE_CONTENT_DEFAULTS["contact.map.description"].body,
  "Stop by our C-Scheme office to discuss your travel plans in person. We recommend calling ahead to schedule a consultation with our team.",
]);

export async function loadHomeHeroCopy(): Promise<HomeHeroCopy> {
  const data = await fetchPublicContent();
  return {
    headlinePrimary: contentValue(data, "home.hero.headline_primary") || DEFAULT_PRIMARY,
    headlineAccent: contentValue(data, "home.hero.headline_accent") || DEFAULT_ACCENT,
    support: contentValue(data, "home.hero.support") || DEFAULT_SUPPORT,
  };
}

export function resolveContactDetails(
  data: Partial<Record<string, string>> = {},
): EditableContactDetails {
  const address = data["settings.contact.address"]?.trim() || BMV_CONTACT.address;
  const phoneDisplay = data["settings.contact.phone"]?.trim() || BMV_CONTACT.phoneDisplay;
  const email = data["settings.contact.email"]?.trim() || BMV_CONTACT.email;
  const hours = data["settings.contact.hours"]?.trim() || BMV_CONTACT.hours;
  const website = resolveWebsiteLink(
    data["settings.contact.website"]?.trim() || BMV_CONTACT.websiteDisplay,
  );

  return {
    address,
    phoneDisplay,
    telHref: buildTelHref(phoneDisplay),
    email,
    mailtoHref: buildMailtoHref(email),
    hours,
    websiteDisplay: website.display,
    websiteHref: website.href,
    infoDescription: buildContactInfoDescription(address),
  };
}

export async function loadContactDetails(): Promise<EditableContactDetails> {
  const data = await fetchPublicContent();
  return resolveContactDetails(data);
}

export async function loadContactHeroCopy(): Promise<ContactHeroCopy> {
  const data = await fetchPublicContent();
  return {
    heading: contentValue(data, "contact.hero.heading"),
    description: contentValue(data, "contact.hero.description"),
  };
}

export type ContactMapCopy = {
  eyebrow: string;
  heading: string;
  description: string;
  embedUrl: string;
};

export function resolveContactMapCopy(
  data: Partial<Record<string, string>> = {},
  address = resolveContactDetails(data).address,
): ContactMapCopy {
  const storedHeading = data["contact.map.heading"]?.trim() || "";
  const storedDescription = data["contact.map.description"]?.trim() || "";
  const heading =
    storedHeading && !LEGACY_MAP_HEADINGS.has(storedHeading)
      ? storedHeading
      : buildOfficeVisitHeading(address);
  const description =
    storedDescription && !LEGACY_MAP_DESCRIPTIONS.has(storedDescription)
      ? storedDescription
      : buildOfficeVisitDescription(address);

  return {
    eyebrow: data["contact.map.eyebrow"]?.trim() || SITE_CONTENT_DEFAULTS["contact.map.eyebrow"].body,
    heading,
    description,
    embedUrl: buildGoogleMapsEmbedUrl(address),
  };
}

export async function loadContactMapCopy(): Promise<ContactMapCopy> {
  const data = await fetchPublicContent();
  const contact = resolveContactDetails(data);
  return resolveContactMapCopy(data, contact.address);
}
