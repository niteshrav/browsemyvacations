import {
  BMV_CONTACT,
  buildMailtoHref,
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
};

export async function loadContactMapCopy(): Promise<ContactMapCopy> {
  const data = await fetchPublicContent();
  return {
    eyebrow: contentValue(data, "contact.map.eyebrow"),
    heading: contentValue(data, "contact.map.heading"),
    description: contentValue(data, "contact.map.description"),
  };
}
