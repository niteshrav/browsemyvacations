import { cityNameToSlug } from "../city-slug";
import { RAJASTHAN_TOURIST_CITIES } from "../rajasthan-cities";

export const QUICK_PICK_THUMB_PARAMS = "?auto=format&fit=crop&w=80&h=80&q=80";

export function buildQuickPickThumbUrl(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}${QUICK_PICK_THUMB_PARAMS}`;
}

export const HOME_QUICK_PICKS = [
  {
    city: "Udaipur",
    landmark: "Lake Pichola",
    photoId: "1703092289078-ff03b771237c",
  },
  {
    city: "Jaipur",
    landmark: "Hawa Mahal",
    photoId: "1705861145407-62f12184e563",
  },
  {
    city: "Jodhpur",
    landmark: "Blue City",
    photoId: "1602643454724-21d5a40722db",
  },
  {
    city: "Jaisalmer",
    landmark: "Desert Safari",
    photoId: "1764243213897-45e6def5ad3e",
  },
  {
    city: "Mount Abu",
    landmark: "Gurushikhar",
    photoId: "1674229010920-ad8493dc19eb",
  },
  {
    city: "Bikaner",
    landmark: "Karni Mata Temple",
    photoId: "1551717256-ad2ac9ab0261",
  },
  {
    city: "Kota",
    landmark: "Chambal Riverfront",
    photoId: "1770665567877-72ee8a7c9051",
  },
  {
    city: "Ajmer",
    landmark: "Khwaja Dargah",
    photoId: "1723529983733-9a30e30d841d",
  },
  {
    city: "Pushkar",
    landmark: "Brahma Temple",
    photoId: "1477587458883-47145ed94245",
  },
] as const;

export type HomeQuickPick = {
  city: string;
  landmark: string;
  imageUrl: string;
  slug: string;
};

export const HOME_QUICK_PICK_CITIES = HOME_QUICK_PICKS.map((pick) => pick.city);

export type HomeQuickPickCity = (typeof HOME_QUICK_PICKS)[number]["city"];

export function getHomeQuickPicks(): HomeQuickPick[] {
  return HOME_QUICK_PICKS.map((pick) => ({
    city: pick.city,
    landmark: pick.landmark,
    imageUrl: buildQuickPickThumbUrl(pick.photoId),
    slug: cityNameToSlug(pick.city),
  }));
}

export function findHomeQuickPickBySlug(slug: string): HomeQuickPick | undefined {
  const normalized = slug.trim().toLowerCase();
  return getHomeQuickPicks().find((pick) => pick.slug === normalized);
}

export function findHomeQuickPickByCity(city: string): HomeQuickPick | undefined {
  const normalized = city.trim().toLowerCase();
  return getHomeQuickPicks().find((pick) => pick.city.toLowerCase() === normalized);
}

export function validateHomeQuickPickCities(): void {
  const known = new Set<string>(RAJASTHAN_TOURIST_CITIES);
  for (const pick of HOME_QUICK_PICKS) {
    if (!known.has(pick.city)) {
      throw new Error(`Quick pick city is not a Rajasthan tourist city: ${pick.city}`);
    }
    if (!pick.landmark.trim() || !pick.photoId.trim()) {
      throw new Error(`Quick pick metadata is incomplete for ${pick.city}`);
    }
  }
}
