import { MARKETING_IMAGES } from "./marketing-images";

export const ABOUT_PAGE = {
  metadata: {
    title: "About Us",
    description:
      "Browse My Vacations curates thoughtful travel across Rajasthan and beyond — retail holidays, custom journeys, and corporate retreats backed by Browser Hotels hospitality.",
  },
  hero: {
    heading: "Travel, Curated More Thoughtfully",
    intro:
      "Browse My Vacations is built on a simple belief: great travel should feel personal from the first search to the final farewell. Born from Browser Hotels' decades of hospitality across Rajasthan, we curate holidays, custom journeys, and corporate retreats with transparent starting prices, thoughtful itineraries, and travel experts who know the routes, seasons, and stories behind every destination.",
    cta: { label: "Explore Packages", href: "/packages" },
    image: MARKETING_IMAGES.aboutHero,
    imageAlt: "Lake Palace and heritage architecture in Udaipur, Rajasthan",
  },
  curate: {
    heading: "What We Curate",
    cards: [
      {
        id: "retail",
        title: "Retail Holidays & Curated Packages",
        description:
          "Browse 100+ Rajasthan itineraries with clear durations and starting prices. Compare routes, explore highlights, and request a personalized quote when you are ready — no juggling dates or passenger counts upfront.",
        image: MARKETING_IMAGES.retailHolidays,
        imageAlt: "Amber Fort and heritage architecture in Jaipur",
      },
      {
        id: "custom",
        title: "Custom Journeys",
        description:
          "Whether it is a family celebration, honeymoon, or multi-city adventure, we design itineraries around your pace, preferences, and budget — not a one-size-fits-all template.",
        image: MARKETING_IMAGES.customJourneys,
        imageAlt: "Scenic lake and palace views in Udaipur",
      },
      {
        id: "mice",
        title: "Corporate Retreats & MICE",
        description:
          "From leadership offsites in Udaipur to incentive trips across Goa and the Himalayas, our corporate travel desk handles venues, logistics, and on-ground coordination end to end.",
        image: MARKETING_IMAGES.corporateMice,
        imageAlt: "Corporate team gathering at a premium resort venue",
      },
    ],
  },
  philosophy: {
    heading: "How We Think About Travel",
    body:
      "Travel is not a checklist of monuments and hotel stars. It is the rhythm of a desert sunrise, the warmth of a palace courtyard at dusk, the conversations that happen between destinations. We plan with that rhythm in mind — balancing iconic experiences with quiet moments, reliable logistics with room to wander, and budgets that are honest from the start. Every itinerary we share is something we would be proud to recommend to our own families.",
    image: MARKETING_IMAGES.travelPhilosophy,
    imageAlt: "Sunset over a Rajasthan lake and heritage skyline",
  },
  whyMatters: {
    heading: "Why It Matters",
    body:
      "When travel is curated with intention, it stops feeling overwhelming. You get clarity instead of endless tabs, expertise instead of guesswork, and a team that stays with you from inquiry to homecoming. That is the experience we commit to — for every holiday, every custom journey, and every corporate group we serve.",
    cta: { label: "Plan Your Journey", href: "/contact" },
    image: MARKETING_IMAGES.whyMatters,
    imageAlt: "Travelers exploring a scenic Rajasthan destination",
  },
  footerCta: {
    heading: "Ready to Plan Your Next Journey?",
    primaryCta: { label: "Explore Packages", href: "/packages" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: MARKETING_IMAGES.aboutFooterCta,
    imageAlt: "Panoramic view of Rajasthan heritage and landscapes",
  },
} as const;
