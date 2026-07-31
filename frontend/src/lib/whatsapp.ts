import {
  BMV_CONTACT,
  buildPackageWhatsAppMessage,
  buildWhatsAppHref,
  normalizeWhatsAppNumber,
} from "@bmv/shared";
import { getApiBaseUrl } from "./api";
import { getSiteUrl } from "./site-url";

export const GENERAL_WHATSAPP_MESSAGE =
  "Hi Browse My Vacations, I'd like to know more about your packages.";

export type WhatsAppSettings = {
  number: string;
  defaultMessage: string;
};

export function resolveWhatsAppSettings(data?: Record<string, string> | null): WhatsAppSettings {
  const rawNumber = data?.["settings.whatsapp.number"]?.trim() || BMV_CONTACT.whatsappNumber;
  const number = normalizeWhatsAppNumber(rawNumber) ?? BMV_CONTACT.whatsappNumber;
  const defaultMessage =
    data?.["settings.whatsapp.default_message"]?.trim() || GENERAL_WHATSAPP_MESSAGE;
  return { number, defaultMessage };
}

export async function loadWhatsAppSettings(): Promise<WhatsAppSettings> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/content`, { cache: "no-store" });
    if (!res.ok) throw new Error("content unavailable");
    const data = (await res.json()) as Record<string, string>;
    return resolveWhatsAppSettings(data);
  } catch {
    return resolveWhatsAppSettings(null);
  }
}

export function getGeneralWhatsAppHref(
  settings?: Pick<WhatsAppSettings, "number" | "defaultMessage">,
): string {
  const number = settings?.number ?? BMV_CONTACT.whatsappNumber;
  const message = settings?.defaultMessage ?? GENERAL_WHATSAPP_MESSAGE;
  return buildWhatsAppHref(message, number);
}

export function getPackageWhatsAppHref(
  title: string,
  slug: string,
  settings?: Pick<WhatsAppSettings, "number">,
): string {
  const packageUrl = `${getSiteUrl()}/packages/${slug}`;
  const message = buildPackageWhatsAppMessage({ title, packageUrl });
  return buildWhatsAppHref(message, settings?.number ?? BMV_CONTACT.whatsappNumber);
}
