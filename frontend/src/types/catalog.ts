export type PackageCard = {
  id: string;
  title: string;
  slug: string;
  category: {
    slug: string;
    name: string;
  };
  displayOrder: number;
  duration: { days: number; nights: number };
  shortDescription: string;
  price: { display: number; isFixed: boolean; currency: string };
  images: string[];
  destinationSlugs: string[];
};

export type PackageDetail = PackageCard & {
  overview: {
    description: string;
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    knowBeforeYouGo: string[];
    featureBadges: string[];
  };
  destinations: Array<{ id: string; name: string; slug: string }>;
  itinerary: Array<{
    dayNumber: number;
    title: string;
    cities: string[];
    summary: string;
  }>;
};

export type Destination = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
};
