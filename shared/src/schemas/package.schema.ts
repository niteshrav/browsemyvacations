import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const packageStatusSchema = z.enum(["draft", "published"]);

export const faqItemSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(4000),
});

export const itineraryDaySchema = z.object({
  dayNumber: z.number().int().min(1),
  title: z.string().min(1).max(200),
  cities: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1).max(2000),
});

const stringList = z.array(z.string().min(1).max(500)).optional().default([]);

export const createPackageSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(slugRegex),
  categorySlug: z.string().min(1).max(80).optional().default("custom"),
  categoryName: z.string().min(1).max(120).optional().default("Custom Packages"),
  displayOrder: z.number().int().min(0).optional().default(0),
  durationDays: z.number().int().min(1),
  durationNights: z.number().int().min(0),
  shortDescription: z.string().min(1).max(2000),
  priceFrom: z.number().positive(),
  discountPrice: z.number().positive().nullable().optional(),
  priceIsFixed: z.boolean().optional().default(false),
  currency: z.string().length(3).optional().default("INR"),
  images: z.array(z.string().url()).optional().default([]),
  coverImage: z.string().url().nullable().optional(),
  highlights: stringList,
  inclusions: stringList,
  exclusions: stringList,
  whyBook: stringList,
  hotelDetails: z.string().max(5000).nullable().optional(),
  mealPlan: z.string().max(500).nullable().optional(),
  transportDetails: z.string().max(5000).nullable().optional(),
  activities: stringList,
  cancellationPolicy: z.string().max(8000).nullable().optional(),
  termsAndConditions: z.string().max(8000).nullable().optional(),
  faq: z.array(faqItemSchema).optional().default([]),
  pickupLocation: z.string().max(300).nullable().optional(),
  dropLocation: z.string().max(300).nullable().optional(),
  seoTitle: z.string().max(200).nullable().optional(),
  seoDescription: z.string().max(500).nullable().optional(),
  status: packageStatusSchema.optional().default("draft"),
  featured: z.boolean().optional().default(false),
  popular: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  destinationIds: z.array(z.string().uuid()).min(1),
  itineraryDays: z.array(itineraryDaySchema).min(1),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
export type ItineraryDayInput = z.infer<typeof itineraryDaySchema>;
export type FaqItemInput = z.infer<typeof faqItemSchema>;
export type PackageStatus = z.infer<typeof packageStatusSchema>;

/** Auto-generate a URL slug from a package title. */
export function slugifyPackageTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
