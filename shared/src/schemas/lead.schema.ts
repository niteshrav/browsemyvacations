import { z } from "zod";

export const leadSourceSchema = z.enum([
  "package_card",
  "package_detail",
  "vacation_meter",
  "contact",
  "mice",
]);

export const leadStatusSchema = z.enum(["new", "contacted", "quoted", "won", "lost"]);

export const createLeadSchema = z
  .object({
    fullName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().min(6).max(20),
    travelDate: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD").optional(),
    ),
    startCity: z.string().trim().max(100).optional(),
    endCity: z.string().trim().max(100).optional(),
    persons: z.coerce.number().int().min(1).max(99).optional(),
    rooms: z.coerce.number().int().min(1).max(50).optional(),
    vehiclePreference: z.string().trim().max(100).optional(),
    message: z.string().trim().max(5000).optional(),
    marketingConsent: z.coerce.boolean().optional(),
    source: leadSourceSchema,
    packageSlug: z.string().trim().min(1).max(200).optional(),
    meterSnapshot: z.record(z.unknown()).optional(),
  })
  .superRefine((data, ctx) => {
    const needsPackage =
      data.source === "package_card" || data.source === "package_detail";
    if (needsPackage && !data.packageSlug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "packageSlug is required for package quote requests",
        path: ["packageSlug"],
      });
    }
  });

export const updateLeadStatusSchema = z.object({
  status: leadStatusSchema,
});

export const createLeadNoteSchema = z.object({
  author: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1).max(5000),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;
export type CreateLeadNoteInput = z.infer<typeof createLeadNoteSchema>;
