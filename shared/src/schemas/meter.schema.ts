import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const calculateMeterSchema = z.object({
  destinationSlugs: z.array(z.string().trim().min(1)).min(1),
  totalNights: z.coerce.number().int().min(1).max(60),
  pickupTime: z.string().regex(timeRegex, "Use HH:mm format"),
  dropoffTime: z.string().regex(timeRegex, "Use HH:mm format"),
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  vehicleTierName: z.string().trim().min(1).max(80),
  adults: z.coerce.number().int().min(1).max(20).optional().default(2),
  children: z.coerce.number().int().min(0).max(20).optional().default(0),
  pacing: z.enum(["relaxed", "moderate", "busy"]).optional().default("moderate"),
});

export const updateMeterConfigSchema = z.object({
  disclaimer: z.string().trim().min(1).max(500).optional(),
  outputMode: z.enum(["range", "fixed"]).optional(),
  rangeSpreadPercent: z.coerce.number().min(0).max(50).optional(),
  destinationRates: z
    .array(
      z.object({
        destinationId: z.string().uuid(),
        baseRatePerNight: z.coerce.number().positive(),
      }),
    )
    .optional(),
  vehicleTiers: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1).max(80),
        multiplier: z.coerce.number().positive().max(10),
        displayOrder: z.coerce.number().int().min(0).optional(),
      }),
    )
    .optional(),
});

export type CalculateMeterInput = z.infer<typeof calculateMeterSchema>;
export type UpdateMeterConfigInput = z.infer<typeof updateMeterConfigSchema>;
