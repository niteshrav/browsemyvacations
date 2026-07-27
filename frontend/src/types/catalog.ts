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
  price: { display: number; discount?: number | null; isFixed: boolean; currency: string };
  images: string[];
  coverImage?: string | null;
  featured?: boolean;
  popular?: boolean;
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
  details?: {
    whyBook: string[];
    hotelDetails: string | null;
    mealPlan: string | null;
    transportDetails: string | null;
    activities: string[];
    cancellationPolicy: string | null;
    termsAndConditions: string | null;
    faq: Array<{ question: string; answer: string }>;
    pickupLocation: string | null;
    dropLocation: string | null;
  };
  seo?: {
    title: string | null;
    description: string | null;
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
