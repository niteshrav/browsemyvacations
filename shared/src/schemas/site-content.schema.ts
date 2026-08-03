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
  "settings.contact.address",
  "settings.contact.phone",
  "settings.contact.email",
  "settings.contact.hours",
  "settings.contact.website",
  "contact.map.eyebrow",
  "contact.map.heading",
  "contact.map.description",
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
  "settings.contact.address": {
    title: "Contact — office address",
    body: BMV_CONTACT.address,
  },
  "settings.contact.phone": {
    title: "Contact — phone number",
    body: BMV_CONTACT.phoneDisplay,
  },
  "settings.contact.email": {
    title: "Contact — email address",
    body: BMV_CONTACT.email,
  },
  "settings.contact.hours": {
    title: "Contact — working hours",
    body: BMV_CONTACT.hours,
  },
  "settings.contact.website": {
    title: "Contact — website display",
    body: BMV_CONTACT.websiteDisplay,
  },
  "contact.map.eyebrow": {
    title: "Contact — office section eyebrow",
    body: "Our Office",
  },
  "contact.map.heading": {
    title: "Contact — office section heading",
    body: "Visit Us In Jaipur",
  },
  "contact.map.description": {
    title: "Contact — office section description",
    body: "Stop by our C-Scheme office to discuss your travel plans in person. We recommend calling ahead to schedule a consultation with our team.",
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
