import { z } from "zod";

const suggestionBaseSchema = z.object({
  label: z.string().min(1).max(80),
  type: z.enum(["destination", "package"]),
  action: z.enum(["filter", "scroll"]).optional().default("filter"),
  destinationId: z.string().uuid().optional(),
  packageId: z.string().uuid().optional(),
  displayOrder: z.number().int().min(0).optional().default(0),
  active: z.boolean().optional().default(true),
});

function refineSuggestion(
  data: z.infer<typeof suggestionBaseSchema>,
  ctx: z.RefinementCtx,
) {
  if (data.type === "destination" && !data.destinationId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "destinationId is required for destination suggestions",
      path: ["destinationId"],
    });
  }
  if (data.type === "package" && !data.packageId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "packageId is required for package suggestions",
      path: ["packageId"],
    });
  }
}

export const createSuggestionSchema = suggestionBaseSchema.superRefine(refineSuggestion);

export const updateSuggestionSchema = suggestionBaseSchema.partial();

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>;
export type UpdateSuggestionInput = z.infer<typeof updateSuggestionSchema>;
