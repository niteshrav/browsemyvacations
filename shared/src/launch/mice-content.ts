import { MARKETING_IMAGES } from "./marketing-images";

export const MICE_PAGE = {
  metadata: {
    title: "MICE",
    description:
      "Corporate retreats, MICE, and incentive travel across Rajasthan, Goa, the Himalayas, and beyond — planned end to end by Browse My Vacations.",
  },
  hero: {
    heading:
      "Corporate Retreats, MICE & Incentive Travel Across Rajasthan, Goa, The Himalayas & Beyond",
    description:
      "Plan corporate offsites, dealer meets, annual conferences, and incentive travel programs with a dedicated MICE desk. We combine destination expertise with hospitality-grade execution — so your team can focus on the agenda while we handle the journey.",
    primaryCta: { label: "Request A MICE Proposal", href: "#mice-inquiry" },
    secondaryCta: { label: "Plan Your Corporate Retreat", href: "#mice-inquiry" },
    image: MARKETING_IMAGES.miceHero,
    imageAlt: "Premium corporate retreat venue with team gathering space",
  },
  introduction: {
    heading: "MICE Planning That Goes Beyond Hotel Bookings",
    body:
      "Corporate travel is more than room blocks and banquet halls. It is about choosing a destination that inspires conversation, designing experiences that strengthen teams, and coordinating every detail so your event runs seamlessly. At Browse My Vacations, we approach MICE planning holistically — from venue shortlists and activity calendars to transfers, gala dinners, and on-ground support. Backed by Browser Hotels' regional network, we bring the same standards of service to corporate groups that discerning leisure travelers expect.",
    image: MARKETING_IMAGES.miceIntro,
    imageAlt: "Conference and event planning at a heritage Rajasthan venue",
  },
  services: {
    heading: "Our MICE Services",
    items: [
      {
        id: "offsites",
        title: "Corporate Offsites & Team Retreats",
        description:
          "Purpose-built offsites in Jaipur, Udaipur, Goa, and the hills — with venues, team activities, and downtime built into the flow of your agenda.",
        image: MARKETING_IMAGES.services.offsites,
      },
      {
        id: "incentive",
        title: "Incentive Travel",
        description:
          "Reward top performers with curated incentive programs — heritage stays, desert experiences, beach escapes, and international destinations.",
        image: MARKETING_IMAGES.services.incentive,
      },
      {
        id: "conferences",
        title: "Conferences & Annual Meets",
        description:
          "Venue shortlists, AV coordination, delegate logistics, and hospitality that keeps your annual meet professional and memorable.",
        image: MARKETING_IMAGES.services.conferences,
      },
      {
        id: "dealer",
        title: "Dealer Meets & Partner Events",
        description:
          "Dealer meets and partner summits with branded experiences, gala evenings, and seamless coordination for large groups.",
        image: MARKETING_IMAGES.services.dealerMeets,
      },
      {
        id: "leadership",
        title: "Leadership Retreats",
        description:
          "Intimate leadership retreats in palace hotels and boutique properties — designed for reflection, strategy, and meaningful connection.",
        image: MARKETING_IMAGES.services.leadership,
      },
      {
        id: "international",
        title: "International Corporate Travel",
        description:
          "Dubai, Thailand, Singapore, and beyond — incentive trips and international offsites with end-to-end planning and on-ground partners.",
        image: MARKETING_IMAGES.services.international,
      },
    ],
  },
  whyBmv: {
    heading: "Why BrowseMyVacations",
    items: [
      {
        id: "destination",
        title: "Destination First Planning",
        description:
          "We start with the right destination for your objectives — not a generic hotel list. Rajasthan heritage, Goa beaches, Himalayan retreats, or international hubs.",
      },
      {
        id: "itineraries",
        title: "Custom Itineraries",
        description:
          "Every proposal is tailored to your group size, budget, and agenda — with flexible formats for offsites, meets, and incentive programs.",
      },
      {
        id: "coordination",
        title: "End-To-End Coordination",
        description:
          "Venues, room blocks, transport, meals, activities, and on-ground support — managed by one dedicated team from proposal to departure.",
      },
      {
        id: "rajasthan",
        title: "Rajasthan Expertise",
        description:
          "Deep knowledge of Jaipur, Udaipur, Jodhpur, Jaisalmer, and beyond — routes, seasons, palace hotels, and experiences that work for corporate groups.",
      },
      {
        id: "hospitality",
        title: "Hospitality Experience",
        description:
          "Backed by Browser Hotels' regional hospitality network — the same care and standards we bring to guest stays, applied to corporate travel.",
      },
    ],
  },
  destinations: {
    heading: "Corporate Destinations",
    items: [
      { slug: "udaipur", title: "Udaipur", description: "Palace hotels, lake venues, and leadership retreats", image: MARKETING_IMAGES.destinations.udaipur },
      { slug: "jaipur", title: "Jaipur", description: "Heritage properties, dealer meets, and annual conferences", image: MARKETING_IMAGES.destinations.jaipur },
      { slug: "jodhpur", title: "Jodhpur", description: "Blue-city charm with fort views and boutique venues", image: MARKETING_IMAGES.destinations.jodhpur },
      { slug: "jaisalmer", title: "Jaisalmer", description: "Desert camps, incentive experiences, and golden sunsets", image: MARKETING_IMAGES.destinations.jaisalmer },
      { slug: "kumbhalgarh", title: "Kumbhalgarh", description: "Fortress settings and intimate offsite formats", image: MARKETING_IMAGES.destinations.kumbhalgarh },
      { slug: "mount-abu", title: "Mount Abu", description: "Hill-station retreats with cooler climates", image: MARKETING_IMAGES.destinations.mountAbu },
      { slug: "goa", title: "Goa", description: "Beach resorts, team offsites, and incentive getaways", image: MARKETING_IMAGES.destinations.goa },
      { slug: "shimla", title: "Shimla", description: "Colonial charm and mountain conference venues", image: MARKETING_IMAGES.destinations.shimla },
      { slug: "manali", title: "Manali", description: "Alpine retreats and adventure-backed team building", image: MARKETING_IMAGES.destinations.manali },
      { slug: "darjeeling", title: "Darjeeling", description: "Tea-country scenery and boutique hill retreats", image: MARKETING_IMAGES.destinations.darjeeling },
      { slug: "gangtok", title: "Gangtok", description: "Eastern Himalaya vistas and curated group stays", image: MARKETING_IMAGES.destinations.gangtok },
      { slug: "srinagar", title: "Srinagar", description: "Houseboats, valleys, and distinctive incentive formats", image: MARKETING_IMAGES.destinations.srinagar },
      { slug: "dubai", title: "Dubai", description: "International incentive travel and luxury corporate events", image: MARKETING_IMAGES.destinations.dubai },
      { slug: "thailand", title: "Thailand", description: "Beach and city combinations for reward programs", image: MARKETING_IMAGES.destinations.thailand },
      { slug: "singapore", title: "Singapore", description: "Efficient hub for APAC dealer meets and conferences", image: MARKETING_IMAGES.destinations.singapore },
    ],
  },
  handles: {
    heading: "What We Handle",
    items: [
      { id: "accommodation", title: "Accommodation", description: "Room blocks, upgrades, and group-friendly stays" },
      { id: "venue", title: "Venue", description: "Banquet halls, breakout rooms, and outdoor settings" },
      { id: "room-blocks", title: "Room Blocks", description: "Negotiated rates and allocation management" },
      { id: "transport", title: "Transport", description: "Airport transfers, inter-city coaches, and local fleet" },
      { id: "meetings", title: "Meetings", description: "Agenda support, AV, and session logistics" },
      { id: "meals", title: "Meals", description: "Welcome dinners, gala evenings, and dietary planning" },
      { id: "activities", title: "Activities", description: "Team building, heritage tours, and curated experiences" },
      { id: "support", title: "On Ground Support", description: "Dedicated coordinators before and during your event" },
      { id: "itinerary", title: "Custom Itinerary", description: "Day-wise plans aligned to your objectives and budget" },
    ],
  },
  clients: {
    heading: "Who We Work With",
    items: [
      { id: "startups", title: "Startups", description: "Agile offsites and founder retreats" },
      { id: "corporates", title: "Corporates", description: "Annual meets and large-scale events" },
      { id: "hr", title: "HR Teams", description: "Employee engagement and team-building programs" },
      { id: "sales", title: "Sales Teams", description: "Kick-offs, reward trips, and motivation travel" },
      { id: "founders", title: "Founders", description: "Leadership strategy retreats" },
      { id: "agencies", title: "Agencies", description: "White-label MICE support for agency partners" },
      { id: "brands", title: "Brands", description: "Product launches and partner summits" },
      { id: "dealers", title: "Dealer Networks", description: "Dealer meets and channel partner events" },
    ],
  },
  formats: {
    heading: "Popular Corporate Formats",
    items: [
      { id: "udaipur", title: "Udaipur Leadership Retreat", description: "3–4 day palace-hotel retreat with strategy sessions and cultural evenings", image: MARKETING_IMAGES.formats.udaipurLeadership },
      { id: "jaipur", title: "Jaipur Dealer Meet", description: "Large-format dealer summit with gala dinner and heritage experiences", image: MARKETING_IMAGES.formats.jaipurDealer },
      { id: "goa", title: "Goa Team Offsite", description: "Beach-resort offsite with team activities and relaxed downtime", image: MARKETING_IMAGES.formats.goaOffsite },
      { id: "jaisalmer", title: "Jaisalmer Incentive", description: "Desert camp incentive with dune dinners and camel safaris", image: MARKETING_IMAGES.formats.jaisalmerIncentive },
      { id: "manali", title: "Manali Retreat", description: "Himalayan retreat with adventure options and mountain stays", image: MARKETING_IMAGES.formats.manaliRetreat },
      { id: "dubai", title: "Dubai Incentive", description: "International reward trip with luxury stays and curated experiences", image: MARKETING_IMAGES.formats.dubaiIncentive },
    ],
  },
  process: {
    heading: "Our Process",
    steps: [
      { step: 1, title: "Understand Requirement", description: "We learn your objectives, group profile, budget, and preferred dates." },
      { step: 2, title: "Recommend Destination", description: "Shortlisted destinations and venues matched to your agenda." },
      { step: 3, title: "Build Proposal", description: "Detailed itinerary, inclusions, and transparent costing for approval." },
      { step: 4, title: "Coordinate Journey", description: "Room blocks, transport, meals, activities, and on-ground logistics." },
      { step: 5, title: "Deliver Experience", description: "Dedicated support during your event — so your team can focus on outcomes." },
    ],
  },
  ctaBanner: {
    heading: "Planning A Corporate Retreat?",
    primaryCta: { label: "Request Proposal", href: "#mice-inquiry" },
    secondaryCta: { label: "Talk To Our Team", href: "/contact" },
    image: MARKETING_IMAGES.miceCtaBanner,
    imageAlt: "Mountain landscape for corporate retreat inspiration",
  },
  form: {
    heading: "Request A MICE Proposal",
    description: "Share your requirements and our corporate travel desk will respond within 24–48 hours.",
    submitLabel: "Submit Proposal Request",
    requirementTypes: [
      "Corporate Offsite",
      "Incentive Travel",
      "Conference / Annual Meet",
      "Dealer Meet",
      "Leadership Retreat",
      "International Corporate Travel",
      "Other",
    ],
  },
  seo: {
    heading: "Corporate Travel & MICE Across India",
    paragraphs: [
      "Browse My Vacations is a trusted partner for corporate retreats, MICE programs, and incentive travel across Rajasthan, Goa, the Himalayas, and select international destinations. Whether you are planning a leadership offsite in Udaipur, a dealer meet in Jaipur, a beach offsite in Goa, or an international incentive trip to Dubai, our team designs experiences that align with your business objectives and group dynamics.",
      "Our MICE desk handles accommodation, venue selection, room blocks, transport, meetings, meals, activities, and on-ground coordination — so HR teams, sales leaders, and event planners can focus on content and outcomes. With deep Rajasthan expertise and hospitality experience through Browser Hotels, we bring destination-first planning and end-to-end execution to every corporate journey.",
      "From startups and growing brands to established corporates and dealer networks, we work with teams of all sizes. Submit a proposal request above or contact our team to start planning your next corporate retreat, conference, or incentive program.",
    ],
  },
} as const;
