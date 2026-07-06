import { BMV_DEV_API_PORT, BMV_DEV_SITE_URL } from "@bmv/shared";

export type CatalogEmptyStateInput = {
  catalogAvailable: boolean;
  packageCount: number;
  destinationFilter?: string;
};

const API_UNAVAILABLE_MESSAGE = `Catalog API is unavailable. From the repo root run pnpm dev to start Docker, the database, and the API on port ${BMV_DEV_API_PORT} (web on ${BMV_DEV_SITE_URL}).`;

export function resolveCatalogEmptyMessage(input: CatalogEmptyStateInput): string | null {
  if (input.packageCount > 0) {
    return null;
  }

  if (!input.catalogAvailable) {
    return API_UNAVAILABLE_MESSAGE;
  }

  if (input.destinationFilter) {
    return "No packages found. Try another destination.";
  }

  return "No packages published yet. Sign in to admin to add destinations and packages.";
}
