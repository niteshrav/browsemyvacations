/**
 * Rajasthan destinations ordered by typical guest popularity
 * (home sections, seeds, and city pickers use this sequence).
 */
export const RAJASTHAN_TOURIST_CITIES = [
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Jaisalmer",
  "Kumbhalgarh",
  "Mount Abu",
  "Pushkar",
  "Ajmer",
  "Bikaner",
  "Chittorgarh",
  "Ranakpur",
  "Nathdwara",
  "Alwar",
  "Sawai Madhopur",
  "Bundi",
  "Bharatpur",
  "Kota",
  "Amer",
  "Osian",
  "Barmer",
  "Jhalawar",
] as const;

export type RajasthanTouristCity = (typeof RAJASTHAN_TOURIST_CITIES)[number];

function toCitySlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Lower index = higher popularity. Unknown cities sort after known ones. */
export function rajasthanCityPopularityRank(cityOrSlug: string): number {
  const raw = cityOrSlug.trim().toLowerCase();
  const asSlug = toCitySlug(cityOrSlug);
  const index = RAJASTHAN_TOURIST_CITIES.findIndex((city) => {
    const citySlug = toCitySlug(city);
    return city.toLowerCase() === raw || citySlug === asSlug || citySlug === raw;
  });
  return index === -1 ? RAJASTHAN_TOURIST_CITIES.length + 100 : index;
}
