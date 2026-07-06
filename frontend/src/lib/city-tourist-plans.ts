import { findRajasthanCityByName } from "@bmv/shared";
import { getCityPlanImageUrls } from "./city-plan-images";

export type CityTouristPlan = {
  city: string;
  title: string;
  durationLabel: string;
  highlights: string[];
  imageUrl: string;
};

export function findRajasthanCity(query: string): string | null {
  return findRajasthanCityByName(query);
}

export function getCityTouristPlans(query: string): CityTouristPlan[] {
  const city = findRajasthanCity(query);
  if (!city) return [];
  const imageUrls = getCityPlanImageUrls(city);

  return [
    {
      city,
      title: `${city} Heritage Highlights`,
      durationLabel: "2 Nights / 3 Days",
      highlights: ["Local sightseeing", "Old city walk", "Sunset viewpoint"],
      imageUrl: imageUrls[0] ?? "",
    },
    {
      city,
      title: `${city} Culture & Food Trail`,
      durationLabel: "3 Nights / 4 Days",
      highlights: ["Folk performance", "Street food tour", "Handicraft market visit"],
      imageUrl: imageUrls[1] ?? "",
    },
    {
      city,
      title: `${city} Leisure Escape`,
      durationLabel: "4 Nights / 5 Days",
      highlights: ["Comfort stay", "Nearby day trip", "Photography-friendly spots"],
      imageUrl: imageUrls[2] ?? "",
    },
  ];
}
