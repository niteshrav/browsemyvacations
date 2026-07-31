import { z } from "zod";
import { BMV_CONTACT } from "../launch/contact-info";

export const SITE_CONTENT_KEYS = [
  "home.hero.headline_primary",
  "home.hero.headline_accent",
  "home.hero.support",
  "about.hero.heading",
  "about.hero.description",
  "contact.hero.heading",
  "contact.hero.description",
  "mice.hero.heading",
  "mice.hero.description",
  "settings.whatsapp.number",
  "settings.whatsapp.default_message",
] as const;

export type SiteContentKey = (typeof SITE_CONTENT_KEYS)[number];

export const SITE_CONTENT_DEFAULTS: Record<SiteContentKey, { title: string; body: string }> = {
  "home.hero.headline_primary": { title: "Home hero — primary line", body: "Vacations You'll Love." },
  "home.hero.headline_accent": { title: "Home hero — accent line", body: "Memories You'll Keep." },
  "home.hero.support": {
    title: "Home hero — support text",
    body: "Explore curated packages — search by city, no dates required.",
  },
  "about.hero.heading": { title: "About — hero heading", body: "Travel, Curated More Thoughtfully" },
  "about.hero.description": {
    title: "About — hero description",
    body: "Browse My Vacations designs journeys with hospitality-grade care — from Rajasthan weekends to corporate retreats.",
  },
  "contact.hero.heading": { title: "Contact — hero heading", body: "Let's Plan Your Next Journey" },
  "contact.hero.description": {
    title: "Contact — hero description",
    body: "Whether you're planning a holiday, honeymoon, family vacation, corporate retreat or MICE event, our travel experts are here to help.",
  },
  "mice.hero.heading": { title: "MICE — hero heading", body: "Corporate Retreats & MICE, Done Right" },
  "mice.hero.description": {
    title: "MICE — hero description",
    body: "Offsites, incentives, conferences, and dealer meets across Rajasthan and beyond — planned with hotel-grade precision.",
  },
  "settings.whatsapp.number": {
    title: "WhatsApp number (digits / +91…)",
    body: BMV_CONTACT.whatsappNumber,
  },
  "settings.whatsapp.default_message": {
    title: "WhatsApp default message",
    body: "Hi Browse My Vacations, I'd like to know more about your packages.",
  },
};

export const upsertSiteContentSchema = z.object({
  key: z.enum(SITE_CONTENT_KEYS),
  title: z.string().min(1).max(200).optional().nullable(),
  body: z.string().min(1).max(8000),
});

export const updateSiteContentSchema = z.object({
  title: z.string().min(1).max(200).optional().nullable(),
  body: z.string().min(1).max(8000).optional(),
});

export type UpsertSiteContentInput = z.infer<typeof upsertSiteContentSchema>;
export type UpdateSiteContentInput = z.infer<typeof updateSiteContentSchema>;
