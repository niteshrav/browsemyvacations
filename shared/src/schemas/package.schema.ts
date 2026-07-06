import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const itineraryDaySchema = z.object({
  dayNumber: z.number().int().min(1),
  title: z.string().min(1).max(200),
  cities: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1).max(2000),
});

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
  priceIsFixed: z.boolean().optional().default(false),
  currency: z.string().length(3).optional().default("INR"),
  images: z.array(z.string().url()).optional().default([]),
  highlights: z.array(z.string()).optional().default([]),
  inclusions: z.array(z.string()).optional().default([]),
  exclusions: z.array(z.string()).optional().default([]),
  active: z.boolean().optional().default(true),
  destinationIds: z.array(z.string().uuid()).min(1),
  itineraryDays: z.array(itineraryDaySchema).min(1),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
export type ItineraryDayInput = z.infer<typeof itineraryDaySchema>;
