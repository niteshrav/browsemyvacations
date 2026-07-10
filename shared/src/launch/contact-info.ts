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
} as const;

export function buildWhatsAppHref(message: string, phone = BMV_CONTACT.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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
