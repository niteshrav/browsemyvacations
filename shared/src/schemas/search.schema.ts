import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1, "Search query is required").max(100),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
