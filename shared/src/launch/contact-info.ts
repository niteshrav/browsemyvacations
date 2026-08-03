export const BMV_CONTACT = {
  phoneDisplay: "+91 141 400 1234",
  telHref: "tel:+911414001234",
  whatsappDisplay: "+91 141 400 1234",
  /** Digits only — used for https://wa.me/{number} */
  whatsappNumber: "911414001234",
  email: "hello@browsemyvacations.com",
  mailtoHref: "mailto:hello@browsemyvacations.com",
  address: "C-Scheme, Jaipur, Rajasthan 302001, India",
  hours: "Monday – Saturday, 10:00 AM – 7:00 PM IST",
  brandLine: "Browse My Vacations — curated by Browser Hotels",
  websiteDisplay: "browsemyvacations.com",
} as const;

const OFFICE_CITY_HINTS = [
  "Mount Abu",
  "Sawai Madhopur",
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Jaisalmer",
  "Bikaner",
  "Pushkar",
  "Ajmer",
  "Kota",
  "Alwar",
  "Bundi",
] as const;

/** Infer a display city from a free-text office address. */
export function inferOfficeCity(address: string): string | null {
  const trimmed = address.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  for (const city of OFFICE_CITY_HINTS) {
    if (lower.includes(city.toLowerCase())) return city;
  }
  const beforeState = trimmed.match(/,\s*([^,]+),\s*Rajasthan\b/i);
  const city = beforeState?.[1]?.trim();
  return city && city.length > 1 ? city : null;
}

export function buildGoogleMapsEmbedUrl(address: string): string {
  const query = encodeURIComponent(address.trim() || BMV_CONTACT.address);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function buildOfficeVisitHeading(address: string): string {
  const city = inferOfficeCity(address);
  return city ? `Visit Us In ${city}` : "Visit Our Office";
}

export function buildOfficeVisitDescription(address: string): string {
  const trimmed = address.trim() || BMV_CONTACT.address;
  return `Stop by our office at ${trimmed} to discuss your travel plans in person. We recommend calling ahead to schedule a consultation with our team.`;
}

export function buildContactInfoDescription(address: string): string {
  const city = inferOfficeCity(address);
  const place = city ? `our ${city} office` : "our office";
  return `Call, email, or visit ${place} — our team responds quickly with tailored recommendations and transparent pricing.`;
}

/** Build a tel: href from a display phone string. */
export function buildTelHref(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  if (digits.length === 10) digits = `91${digits}`;
  return digits ? `tel:+${digits}` : BMV_CONTACT.telHref;
}

export function buildMailtoHref(email: string): string {
  const trimmed = email.trim();
  return trimmed ? `mailto:${trimmed}` : BMV_CONTACT.mailtoHref;
}

/** Normalize website display + absolute href for contact cards. */
export function resolveWebsiteLink(
  input: string | undefined | null,
  fallbackDisplay = BMV_CONTACT.websiteDisplay,
): { display: string; href: string } {
  const trimmed = (input ?? "").trim();
  if (!trimmed) {
    return { display: fallbackDisplay, href: `https://${fallbackDisplay}` };
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      display: trimmed.replace(/^https?:\/\//i, "").replace(/\/$/, ""),
      href: trimmed,
    };
  }
  return { display: trimmed.replace(/\/$/, ""), href: `https://${trimmed}` };
}

/**
 * Normalize a WhatsApp number to digits-only form for wa.me.
 * Accepts +91…, 0-prefixed local, or bare 10-digit Indian mobiles.
 * Returns null when invalid.
 */
export function normalizeWhatsAppNumber(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  if (digits.length < 11 || digits.length > 15) return null;
  return digits;
}

export function buildWhatsAppHref(message: string, phone: string = BMV_CONTACT.whatsappNumber): string {
  const normalized = normalizeWhatsAppNumber(phone) ?? BMV_CONTACT.whatsappNumber;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildPackageWhatsAppMessage(input: {
  title: string;
  packageUrl: string;
}): string {
  return [
    "Hi Browse My Vacations,",
    `I'm interested in the package "${input.title}".`,
    "Please share details and a custom quote.",
    "",
    input.packageUrl,
  ].join("\n");
}
