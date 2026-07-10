import { buildPackageWhatsAppMessage, buildWhatsAppHref } from "@bmv/shared";
import { getSiteUrl } from "./site-url";

export const GENERAL_WHATSAPP_MESSAGE =
  "Hi Browse My Vacations, I'd like to know more about your packages.";

export function getGeneralWhatsAppHref(): string {
  return buildWhatsAppHref(GENERAL_WHATSAPP_MESSAGE);
}

export function getPackageWhatsAppHref(title: string, slug: string): string {
  const packageUrl = `${getSiteUrl()}/packages/${slug}`;
  const message = buildPackageWhatsAppMessage({ title, packageUrl });
  return buildWhatsAppHref(message);
}
