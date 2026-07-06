import { cityNameToSlug, findRajasthanCityByName } from "@bmv/shared";

export function resolveMeterCitySlug(
  cityName: string,
  apiDestinations?: Array<{ name: string; slug: string }>,
): string | null {
  const canonical = findRajasthanCityByName(cityName);
  if (!canonical) return null;
  const slug = cityNameToSlug(canonical);
  if (!apiDestinations?.length) return slug;
  const match = apiDestinations.find(
    (d) => d.slug === slug || d.name.toLowerCase() === canonical.toLowerCase(),
  );
  return match?.slug ?? slug;
}
