import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createDestinationSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens"),
  imageUrl: z.string().url().optional().nullable(),
  displayOrder: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;
