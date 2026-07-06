/** Auto-generated from Package Bible 2.pdf — do not edit by hand. */

export const PACKAGE_BIBLE_CATEGORIES = [
  {
    "number": 1,
    "slug": "standalone-single-city",
    "name": "Standalone Single-City Escapes",
    "packageCount": 13
  },
  {
    "number": 2,
    "slug": "dual-city-combinations",
    "name": "Dual-City Short Combinations",
    "packageCount": 30
  },
  {
    "number": 3,
    "slug": "three-city-circuits",
    "name": "Three-City Triangular Circuits",
    "packageCount": 40
  },
  {
    "number": 4,
    "slug": "regional-deep-dives",
    "name": "Complete Regional Deep Dives",
    "packageCount": 18
  }
] as const;

export type PackageBibleCategorySlug = (typeof PACKAGE_BIBLE_CATEGORIES)[number]["slug"];

export type PackageBibleSeedPackage = {
  categoryNumber: number;
  categorySlug: PackageBibleCategorySlug;
  categoryName: string;
  packageNumber: number;
  displayOrder: number;
  title: string;
  slug: string;
  durationDays: number;
  durationNights: number;
  shortDescription: string;
  priceFrom: number;
  images: string[];
  destinations: string[];
  itinerary: Array<{ dayNumber: number; title: string; cities: string[]; summary: string }>;
};

export const PACKAGE_BIBLE_CATALOG: PackageBibleSeedPackage[] = [
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 1,
    "title": "2D/1N Jaipur: The Quick Pink City Break",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "Perfect for travelers short on time who want to cross off India’s most famous palaces and shop for vibrant textiles in a single weekend.",
    "destinations": [
      "Jaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort, Hawa Mahal, & Johari Bazar -> Traditional Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & Jantar Mantar -> Shopping drop-off -> Drop at Airport/Station."
      }
    ],
    "slug": "standalone-single-city-jaipur-the-quick-pink-city-break",
    "displayOrder": 1,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 2,
    "title": "2D/1N Udaipur: The Romantic Lake Escape",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "An effortless, high-end couples' escape designed around lakeside dining, royal architecture, and sunset boat cruises.",
    "destinations": [
      "Udaipur",
      "Jaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & evening boat ride at Lake Pichola -> Lakeside Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & Jagdish Temple -> Local crafts shopping -> Drop at Airport/Station."
      }
    ],
    "slug": "standalone-single-city-udaipur-the-romantic-lake-escape",
    "displayOrder": 2,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 3,
    "title": "2D/1N Jaisalmer: The Sand Dunes Experience",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "Built for adventure seekers wanting the ultimate desert experience-combining massive fort heritage with a night sleeping under the stars.",
    "destinations": [
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Pickup from Jaisalmer Station -> Check-in at Desert Luxury Camp -> Camel Safari, Sunset over Dunes, & Cultural Rajasthani Folk Dance -> Buffet Dinner at Camp."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Visit Jaisalmer Fort (Sonay ka Kila) & Patwon ki Haveli -> Drop at Station."
      }
    ],
    "slug": "standalone-single-city-jaisalmer-the-sand-dunes-experience",
    "displayOrder": 3,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 4,
    "title": "2D/1N Jodhpur: The Blue City Heritage Tour",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "Ideal for photography lovers and history buffs looking to scale Rajasthan's most imposing fort and explore iconic blue-washed streets.",
    "destinations": [
      "Jodhpur",
      "Jaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Heritage Courtyard Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Walking tour of the Blue City streets & Umaid Bhawan Palace -> Drop at Airport/Station."
      }
    ],
    "slug": "standalone-single-city-jodhpur-the-blue-city-heritage-tour",
    "displayOrder": 4,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 5,
    "title": "2D/1N Pushkar: Sacred Lakes & Cafe Culture",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A unique blend of spiritual tranquility and laid-back global hippie culture, perfect for backpackers and slow travelers.",
    "destinations": [
      "Pushkar",
      "Ajmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Pushkar",
          "Ajmer"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple, Pushkar Lake Ghats, & Savitri Temple Sunset -> Rooftop Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Pushkar",
          "Ajmer"
        ],
        "summary": "Morning Breakfast -> Cafe-hopping in local markets & rose garden tour -> Drop at Ajmer Station/Pushkar point."
      }
    ],
    "slug": "standalone-single-city-pushkar-sacred-lakes-cafe-culture",
    "displayOrder": 5,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 6,
    "title": "2D/1N Mount Abu: The Only Hill Station Escape",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A refreshing climate break from the desert heat, combining stunning lake views, lush green mountain air, and intricate temple carvings.",
    "destinations": [
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Pickup from Abu Road Station -> Check-in -> Visit Dilwara Jain Temples & evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Trek to Guru Shikhar (highest peak) & Toad Rock viewpoint -> Drop at Abu Road Station."
      }
    ],
    "slug": "standalone-single-city-mount-abu-the-only-hill-station-escape",
    "displayOrder": 6,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 7,
    "title": "2D/1N Kumbhalgarh: The Great Wall of India Trek",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "Designed for active travelers who want to skip the massive crowds and walk the second-longest continuous wall in the world.",
    "destinations": [
      "Kumbhalgarh",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur/Kumbhalgarh -> Check-in -> Trek Kumbhalgarh Fort wall & watch evening Light & Sound Show -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Quick jungle drive in Kumbhalgarh Wildlife Sanctuary -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
    "displayOrder": 7,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 8,
    "title": "2D/1N Ranthambore: The Quick Wildlife Safari",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A tightly managed, high-octane wildlife trip optimized entirely around maximizing your chances of a Royal Bengal Tiger sighting.",
    "destinations": [
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Pickup from Sawai Madhopur Station -> Check-in -> Visit the historic Ranthambore Fort -> Buffet Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Return for Breakfast -> Check-out -> Drop at Sawai Madhopur Station."
      }
    ],
    "slug": "standalone-single-city-ranthambore-the-quick-wildlife-safari",
    "displayOrder": 8,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 9,
    "title": "2D/1N Nathdwara: Shrinathji Darshan Spiritual Break",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A seamless, stress-free pilgrimage package designed to handle all logistics for a peaceful family deity darshan.",
    "destinations": [
      "Nathdwara",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur/Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & visit Statue of Belief -> Pure Veg/Jain Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Udaipur"
        ],
        "summary": "Early Morning Temple Darshan -> Morning Breakfast -> Local terracotta market shopping -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "standalone-single-city-nathdwara-shrinathji-darshan-spiritual-break",
    "displayOrder": 9,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 10,
    "title": "2D/1N Chittorgarh: The Rajput Fort Heritage Stop",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A powerful immersion into legendary tales of Rajput bravery, perfect as a historical weekend road trip stop.",
    "destinations": [
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Pickup from Chittorgarh Station -> Check-in -> Explore Chittorgarh Fort (Vijay Stambh, Kirti Stambh, Padmini Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Visit local temples & handloom textile weaving centers -> Drop at Chittorgarh Station."
      }
    ],
    "slug": "standalone-single-city-chittorgarh-the-rajput-fort-heritage-stop",
    "displayOrder": 10,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 11,
    "title": "2D/1N Bikaner: Camels & Heritage Havelis",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "Off the beaten track, this package offers stunning architecture and authentic camel culture without the heavy tourist crowds.",
    "destinations": [
      "Bikaner"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Rampuria Haveli architecture walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit National Research Centre on Camel & Karni Mata Temple -> Drop at Bikaner Station."
      }
    ],
    "slug": "standalone-single-city-bikaner-camels-heritage-havelis",
    "displayOrder": 11,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 12,
    "title": "2D/1N Jawai: The Luxury Leopard Safari",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "A premium, ultra-exclusive glamping experience for travelers looking to spot leopards roaming freely among ancient granite hills.",
    "destinations": [
      "Jawai"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Jawai"
        ],
        "summary": "Pickup from Jawai Bandh Station -> Check-in at Luxury Glamping Resort -> Evening 4x4 Jeep Leopard Safari -> Campfire & Bush Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Visit Jawai Dam for crocodile & bird watching -> Rabari Tribe village walk -> Drop at Jawai Bandh Station."
      }
    ],
    "slug": "standalone-single-city-jawai-the-luxury-leopard-safari",
    "displayOrder": 12,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 1,
    "categorySlug": "standalone-single-city",
    "categoryName": "Standalone Single-City Escapes",
    "packageNumber": 13,
    "title": "2D/1N Alwar: Sariska Wildlife & Fort Staycation",
    "durationDays": 2,
    "durationNights": 1,
    "shortDescription": "The ultimate quick staycation from Delhi/NCR, mixing haunted fort mysteries with a peaceful wilderness escape.",
    "destinations": [
      "Alwar"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1",
        "cities": [
          "Alwar"
        ],
        "summary": "Pickup from Alwar Station -> Check-in -> Visit Siliserh Lake Palace & Bhangarh Fort ruins -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Day 2",
        "cities": [
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Sariska National Park Jungle Safari -> Drop at Alwar Station / Delhi highway point. "
      }
    ],
    "slug": "standalone-single-city-alwar-sariska-wildlife-fort-staycation",
    "displayOrder": 13,
    "priceFrom": 14600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 1,
    "title": "3N/4D Jaipur + Ranthambore: The Culture & Cats Weekend",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "The ultimate balance of royalty and wildlife-perfect for travelers who want to explore majestic palaces and spot wild tigers in a single long weekend.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & shopping at Johari Bazar -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Visit Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Ranthambore Departure",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Return for Breakfast -> Check-out -> Drop at Sawai Madhopur or Jaipur Station."
      }
    ],
    "slug": "dual-city-combinations-jaipur-ranthambore-the-culture-cats-weekend",
    "displayOrder": 14,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 2,
    "title": "3N/4D Jaipur + Pushkar: The Heritage & Spiritual Loop",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A seamless mix of the bustling Pink City and the peaceful, lakeside spiritual vibes of Pushkar, ideal for cultural explorers.",
    "destinations": [
      "Jaipur",
      "Pushkar"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Hawa Mahal, City Palace, & Nahargarh Fort sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Sunset Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar Departure",
        "cities": [
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Quick local cafe-hopping/market walk -> Check-out -> Drop at Ajmer Station or Jaipur Airport."
      }
    ],
    "slug": "dual-city-combinations-jaipur-pushkar-the-heritage-spiritual-loop",
    "displayOrder": 15,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 3,
    "title": "3N/4D Jaipur + Alwar: The Double Fort Escape",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Great for Delhi/NCR travelers wanting a heritage road trip that combines grand Jaipur architecture with the wilderness and mysteries of Alwar.",
    "destinations": [
      "Jaipur",
      "Alwar"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & shopping hubs -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Alwar",
        "cities": [
          "Jaipur",
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Drive to Alwar -> Check-in -> Visit Siliserh Lake Palace & Bhangarh Fort ruins -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Alwar Departure",
        "cities": [
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Sariska Jungle Safari -> Check-out -> Drop at Alwar Station or Delhi NCR highway point."
      }
    ],
    "slug": "dual-city-combinations-jaipur-alwar-the-double-fort-escape",
    "displayOrder": 16,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 4,
    "title": "2N/3D Pushkar + Ranthambore: Spiritual to Wild Track",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A fast-paced, high-contrast weekend trip shifting seamlessly from a calm lakeside pilgrimage to a thrilling wilderness tiger safari.",
    "destinations": [
      "Pushkar",
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple & evening lake ghat darshan -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Pushkar to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Evening Ranthambore Fort trek -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Ranthambore Departure",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Return for Breakfast -> Check-out -> Drop at Sawai Madhopur Station. The Western Desert Duos"
      }
    ],
    "slug": "dual-city-combinations-pushkar-ranthambore-spiritual-to-wild-track",
    "displayOrder": 17,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 5,
    "title": "3N/4D Jodhpur + Jaisalmer: The Core Desert Short Holiday",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "The essential blue-city-to-desert package designed for travelers with limited days who still want the signature camel safari experience.",
    "destinations": [
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 3,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit Jaisalmer Fort & Patwon ki Haveli -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Kuldhara Abandoned Village -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "dual-city-combinations-jodhpur-jaisalmer-the-core-desert-short-holiday",
    "displayOrder": 18,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 6,
    "title": "4N/5D Jodhpur + Jaisalmer: The Most Popular Desert Run",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "Our #1 best-selling desert itinerary, giving you plenty of time to explore Jodhpur's heritage and enjoy a relaxed night under the stars in Jaisalmer.",
    "destinations": [
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Mandore Gardens -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace, Jaswant Thada, & old town walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Dune Bashing, Camel Safari, & Cultural Show -> Dinner at Camp."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit living Jaisalmer Fort, Gadisar Lake, & Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Souvenir shopping in the old city -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "dual-city-combinations-jodhpur-jaisalmer-the-most-popular-desert-run",
    "displayOrder": 19,
    "priceFrom": 28700,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 7,
    "title": "3N/4D Bikaner + Jaisalmer: The Offbeat Dunes Entry",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A unique desert route that skips the usual tourist crowds, taking you through Bikaner's stunning havelis straight into Jaisalmer's massive dunes.",
    "destinations": [
      "Bikaner",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Rampuria Haveli architecture walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit Camel Research Centre -> Drive to Jaisalmer -> Check-in at Desert Camp -> Sunset Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 3,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Jaisalmer Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Free time for local market exploration -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "dual-city-combinations-bikaner-jaisalmer-the-offbeat-dunes-entry",
    "displayOrder": 20,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 8,
    "title": "3N/4D Bikaner + Jodhpur: The Heritage Havelis & Forts Circuit",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Tailor-made for architecture buffs and photographers who want to capture Rajasthan's most detailed carving work and majestic forts.",
    "destinations": [
      "Bikaner",
      "Jodhpur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Karni Mata Temple -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jodhpur",
        "cities": [
          "Jodhpur",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Walk through Rampuria Havelis -> Drive to Jodhpur -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur Departure",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Shopping drop-off at Clock Tower market -> Check-out -> Drop at Jodhpur Airport/Station. The Mewar Lake & Hill Duos"
      }
    ],
    "slug": "dual-city-combinations-bikaner-jodhpur-the-heritage-havelis-forts-circuit",
    "displayOrder": 21,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 9,
    "title": "3N/4D Udaipur + Mount Abu: Lakes & Mountains Combo",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A perfect short getaway combining the romantic lakes of Udaipur with the refreshing mountain air of Rajasthan’s only hill station.",
    "destinations": [
      "Udaipur",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & evening boat ride at Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari, Sajjangarh Monsoon Palace sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Visit Dilwara Temples & evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Guru Shikhar Peak & Toad Rock viewpoint -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-mount-abu-lakes-mountains-combo",
    "displayOrder": 22,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 10,
    "title": "4N/5D Udaipur + Mount Abu: The Gujarati Family Classic Holiday",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A classic family favorite route optimized for a relaxed pace, plenty of sightseeing, and a cooling mountain retreat.",
    "destinations": [
      "Udaipur",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Evening walk around Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Achalgarh Fort, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Panoramic views from Guru Shikhar -> Check-out -> Drop at Abu Road or Ahmedabad Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-mount-abu-the-gujarati-family-classic-holiday",
    "displayOrder": 23,
    "priceFrom": 28700,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 11,
    "title": "2N/3D Udaipur + Kumbhalgarh: The Monsoon Quick Weekend",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A quick weekend run that comes alive during the rains, perfect for seeing Misty hills and the grand Kumbhalgarh Fort.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Jagmandir boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Hike the Great Wall of India & watch Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Kumbhalgarh Wildlife Safari or jungle drive -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-kumbhalgarh-the-monsoon-quick-weekend",
    "displayOrder": 24,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 12,
    "title": "3N/4D Udaipur + Kumbhalgarh: The Premium Misty Hills Stay",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "An upgraded, slower-paced hill vacation that blends the lakeside charm of Udaipur with an overnight stay in a luxury valley resort at Kumbhalgarh.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Monsoon Palace, Fatehsagar Lake, & local handicraft markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Scenic mountain drive to Kumbhalgarh -> Check-in at Premium Resort -> Explore Kumbhalgarh Fort wall -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Leisurely morning at the resort / nature walk -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-kumbhalgarh-the-premium-misty-hills-stay",
    "displayOrder": 25,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 13,
    "title": "2N/3D Udaipur + Nathdwara: Lakes & Shrinathji Darshan",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A neat combination of leisure and pilgrimage, perfect for families who want a quick holiday along with a dedicated Shrinathji temple darshan.",
    "destinations": [
      "Udaipur",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & evening lakeside walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur to Nathdwara",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & visit Statue of Belief -> Pure Veg/Jain Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Temple Darshan -> Return for Breakfast -> Terracotta market shopping -> Check-out -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "dual-city-combinations-udaipur-nathdwara-lakes-shrinathji-darshan",
    "displayOrder": 26,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 14,
    "title": "2N/3D Udaipur + Chittorgarh: The Mewar History Walk",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "Designed for history buffs who want to explore the capital of Mewar (Udaipur) and the largest fort complex in India (Chittorgarh) in one short trip.",
    "destinations": [
      "Udaipur",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Jagdish Temple -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Explore Chittorgarh Fort (Vijay Stambh, Padmini Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Visit local Chittor temples & handloom centers -> Check-out -> Drop at Chittorgarh or Udaipur Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-chittorgarh-the-mewar-history-walk",
    "displayOrder": 27,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 15,
    "title": "3N/4D Udaipur + Chittorgarh: Extended Royal History",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A deeper look into Mewar's history, giving you more time to explore Udaipur’s lake palaces before diving into Chittorgarh's historic fort tales.",
    "destinations": [
      "Udaipur",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Saheliyon-ki-Bari, Monsoon Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Comprehensive tour of Chittorgarh Fort complex -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Morning walk through historical ruins -> Check-out -> Drop at Chittorgarh or Udaipur Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-chittorgarh-extended-royal-history",
    "displayOrder": 28,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 16,
    "title": "3N/4D Udaipur + Nathdwara: Leisure + Spiritual Combo",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "An extended, stress-free family vacation that gives you two full days of sightseeing in Udaipur alongside a peaceful pilgrimage experience in Nathdwara.",
    "destinations": [
      "Udaipur",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Lake Pichola boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Fatehsagar Lake, & vintage car museum -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Nathdwara",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Shrinathji Jhanki Darshan & Statue of Belief visit -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Temple Darshan -> Return for Breakfast -> Local souvenir shopping -> Check-out -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "dual-city-combinations-udaipur-nathdwara-leisure-spiritual-combo",
    "displayOrder": 29,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 17,
    "title": "2N/3D Kumbhalgarh + Nathdwara: The Weekend Fort & Faith Trip",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A popular choice for weekend travelers coming out of Ahmedabad or Udaipur, combining a historic hill trek with a holy temple visit.",
    "destinations": [
      "Kumbhalgarh",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Kumbhalgarh",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Pickup from Udaipur/Kumbhalgarh -> Check-in -> Explore Kumbhalgarh Fort wall & evening Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Kumbhalgarh to Nathdwara",
        "cities": [
          "Kumbhalgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Short visit to local markets -> Check-out -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "dual-city-combinations-kumbhalgarh-nathdwara-the-weekend-fort-faith-trip",
    "displayOrder": 30,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 18,
    "title": "3N/4D Kumbhalgarh + Mount Abu: The Ultimate Rajasthan Hill Station Run",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Skips the hot plains entirely. This refreshing route takes you through the lush Aravalli hills, massive fort structures, and cool mountain lakes.",
    "destinations": [
      "Kumbhalgarh",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Kumbhalgarh",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Pickup from Udaipur/Kumbhalgarh -> Check-in -> Explore Kumbhalgarh Fort wall & historical ruins -> Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Scenic hill drive to Mount Abu -> Check-in -> Evening boat ride on Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Toad Rock, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Panoramic views from Guru Shikhar Peak -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "dual-city-combinations-kumbhalgarh-mount-abu-the-ultimate-rajasthan-hill-station-run",
    "displayOrder": 31,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 19,
    "title": "3N/4D Mount Abu + Nathdwara: Hills and Temple Loop",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "An ideal choice for multi-generational families, offering a cool mountain retreat for the kids and a serene temple pilgrimage for parents and grandparents.",
    "destinations": [
      "Mount Abu",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Pickup from Abu Road Station -> Check-in -> Evening boating at Nakki Lake & sunset view -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples & Guru Shikhar Peak -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Mount Abu to Nathdwara",
        "cities": [
          "Mount Abu",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Darshan -> Return for Breakfast -> Check-out -> Drop at Udaipur or Abu Road Station. The Luxury Wilderness Duos"
      }
    ],
    "slug": "dual-city-combinations-mount-abu-nathdwara-hills-and-temple-loop",
    "displayOrder": 32,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 20,
    "title": "2N/3D Jodhpur + Jawai: Forts & Leopards Weekend",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A premium, action-packed holiday for travelers wanting a quick luxury break that mixes grand heritage with high-end wildlife tracking.",
    "destinations": [
      "Jodhpur",
      "Jawai"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Jeep Leopard Safari -> Bush Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Jawai Departure",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Crocodile & bird watching at Jawai Dam -> Check-out -> Drop at Jawai Bandh or Jodhpur Station."
      }
    ],
    "slug": "dual-city-combinations-jodhpur-jawai-forts-leopards-weekend",
    "displayOrder": 33,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 21,
    "title": "3N/4D Jodhpur + Jawai: Premium Blue City & Wildlife",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "An upgraded luxury escape, giving you extra time to enjoy Jodhpur’s upscale boutique cafes and multiple high-end safari tracks in Jawai.",
    "destinations": [
      "Jodhpur",
      "Jawai"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort -> Heritage Courtyard Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace, old city spice markets, & stepwell cafes -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Campfire & Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai Departure",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Jawai Dam bird watching & Rabari Tribe village walk -> Check-out -> Drop at Jawai Bandh or Jodhpur Airport."
      }
    ],
    "slug": "dual-city-combinations-jodhpur-jawai-premium-blue-city-wildlife",
    "displayOrder": 34,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 22,
    "title": "2N/3D Udaipur + Jawai: Lakes & Luxury Leopard Safari",
    "durationDays": 3,
    "durationNights": 2,
    "shortDescription": "A high-end couple's getaway that pairs the romantic lake scenery of Udaipur with a luxury glamping and leopard safari experience.",
    "destinations": [
      "Udaipur",
      "Jawai"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & private evening boat cruise on Lake Pichola -> Lakeside Dinner."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur to Jawai",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Jawai Departure",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Rabari Tribe village walk & Jawai Dam sunrise view -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-jawai-lakes-luxury-leopard-safari",
    "displayOrder": 35,
    "priceFrom": 20300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 23,
    "title": "3N/4D Udaipur + Jawai: The High-End Luxury Traveler Target",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Tailor-made for luxury travelers looking for a slow-paced holiday focused on premium lakeview hotels and exclusive wilderness tracking.",
    "destinations": [
      "Udaipur",
      "Jawai"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Romantic lakeside walk & fine-dining dinner -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day premium city tour (City Palace, Monsoon Palace, hidden cafes) -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Jawai",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Ultra-Luxury Camp -> Private 4x4 Leopard Safari -> Signature Wilderness Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai Departure",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Jawai Dam crocodile spotting -> Check-out -> Drop at Udaipur Airport or Jawai Bandh Station."
      }
    ],
    "slug": "dual-city-combinations-udaipur-jawai-the-high-end-luxury-traveler-target",
    "displayOrder": 36,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 24,
    "title": "3N/4D Jawai + Kumbhalgarh: Wilderness & Great Wall Combo",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A premium adventure trek that takes you from tracking leopards in granite hills to exploring the second-longest continuous wall in the world.",
    "destinations": [
      "Jawai",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Pickup from Jawai Bandh Station -> Check-in at Luxury Resort -> Evening 4x4 Jeep Leopard Safari -> Campfire Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Second wilderness safari / Rabari village walk -> Relax by the pool -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Jawai to Kumbhalgarh",
        "cities": [
          "Jawai",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Hike Kumbhalgarh Fort wall & watch Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Quick morning walk in Kumbhalgarh Wildlife Sanctuary -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-jawai-kumbhalgarh-wilderness-great-wall-combo",
    "displayOrder": 37,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 25,
    "title": "3N/4D Jawai + Mount Abu: The High-End Nature Trail",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Designed for affluent travelers seeking an exclusive nature experience-combining rugged luxury safaris with a private retreat in a cool hill station.",
    "destinations": [
      "Jawai",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Pickup from Jawai Bandh Station -> Check-in at Luxury Glamping Camp -> Afternoon 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 2,
        "title": "Jawai to Mount Abu",
        "cities": [
          "Jawai",
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Drive up to Mount Abu -> Check-in -> Private boat ride on Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples & panoramic sunset from Guru Shikhar -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Leisurely morning at the property -> Check-out -> Drop at Abu Road Station. Transit & Extension Mixes"
      }
    ],
    "slug": "dual-city-combinations-jawai-mount-abu-the-high-end-nature-trail",
    "displayOrder": 38,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 26,
    "title": "3N/4D Jaipur + Jodhpur: The Two Main Cities Transit",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "The classic entry-level Rajasthan transit tour, taking you efficiently through the two largest cities, iconic forts, and major shopping hubs.",
    "destinations": [
      "Jaipur",
      "Jodhpur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local textile markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Hawa Mahal, City Palace, & Jantar Mantar -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Jodhpur",
        "cities": [
          "Jaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive or take a train to Jodhpur -> Check-in -> See Mehrangarh Fort at sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur Departure",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace & Blue City alleys -> Check-out -> Drop at Jodhpur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-jaipur-jodhpur-the-two-main-cities-transit",
    "displayOrder": 39,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 27,
    "title": "3N/4D Pushkar + Jodhpur: The Sacred to Blue Corridor",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A smooth, culture-rich transit trip connecting the peaceful lakeside temples of Pushkar with the bustling heritage markets of Jodhpur.",
    "destinations": [
      "Pushkar",
      "Jodhpur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple & evening lake ghat prayers -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk around the Clock Tower market -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Full day tour of Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur Departure",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Morning walking tour of the blue-washed streets -> Check-out -> Drop at Jodhpur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-pushkar-jodhpur-the-sacred-to-blue-corridor",
    "displayOrder": 40,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 28,
    "title": "3N/4D Pushkar + Udaipur: The Central Rajasthan Connector",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "Great for travelers looking to experience both worlds: the vibrant spiritual culture of Pushkar and the elegant lake views of Udaipur.",
    "destinations": [
      "Pushkar",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Pushkar to Udaipur",
        "cities": [
          "Udaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Saheliyon-ki-Bari, & Monsoon Palace sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Shopping drop-off for local handicrafts -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "dual-city-combinations-pushkar-udaipur-the-central-rajasthan-connector",
    "displayOrder": 41,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 29,
    "title": "3N/4D Jaipur + Udaipur: The Flight-Hopper Special",
    "durationDays": 4,
    "durationNights": 3,
    "shortDescription": "A fast, high-end itinerary optimized for travelers flying between Rajasthan's two most famous cities to maximize sightseeing time.",
    "destinations": [
      "Jaipur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur to Udaipur",
        "cities": [
          "Udaipur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Quick shopping stop -> Afternoon flight to Udaipur -> Check-in -> Sunset at Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Sajjangarh Fort or local arts market -> Check-out -> Drop at Udaipur Airport."
      }
    ],
    "slug": "dual-city-combinations-jaipur-udaipur-the-flight-hopper-special",
    "displayOrder": 42,
    "priceFrom": 24500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 2,
    "categorySlug": "dual-city-combinations",
    "categoryName": "Dual-City Short Combinations",
    "packageNumber": 30,
    "title": "4N/5D Jaipur + Udaipur: The First-Timer Rajasthan Taster",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "The ultimate introduction to Rajasthan for first-time visitors, offering a balanced, comprehensive look at both the Pink City and the City of Lakes.",
    "destinations": [
      "Jaipur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, Hawa Mahal, & shopping hubs -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Udaipur",
        "cities": [
          "Udaipur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Drive or travel to Udaipur -> Check-in -> Evening lakeside relaxation -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Saheliyon-ki-Bari, boat cruise on Lake Pichola) -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Panoramic views from Monsoon Palace -> Check-out -> Drop at Udaipur Airport/Station. "
      }
    ],
    "slug": "dual-city-combinations-jaipur-udaipur-the-first-timer-rajasthan-taster",
    "displayOrder": 43,
    "priceFrom": 28700,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 1,
    "title": "4N/5D Jaipur + Pushkar + Ranthambore: The Heritage, Spiritual & Wild Mix",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "The ultimate all-in-one long weekend. Cross off the golden trio of Rajasthan travel: majestic forts, sacred lakes, and wild tigers.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & Nahargarh Fort sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Visit Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Ranthambore Departure",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Return for Breakfast -> Check-out -> Drop at Sawai Madhopur or Jaipur Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-pushkar-ranthambore-the-heritage-spiritual-wild-mix",
    "displayOrder": 44,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 2,
    "title": "5N/6D Jaipur + Pushkar + Ranthambore: Deep Jungle Wildlife Focus",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "An upgraded version for serious nature lovers, giving you two full days and multiple safari chances to spot the elusive Royal Bengal Tiger.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Johari Bazar -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & Albert Hall Museum -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & sunset over the ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Evening Ranthambore Fort trek -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Return for Breakfast -> Rest -> Afternoon Jungle Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Ranthambore Departure",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Morning Breakfast -> Optional village walk -> Check-out -> Drop at Sawai Madhopur or Jaipur Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-pushkar-ranthambore-deep-jungle-wildlife-focus",
    "displayOrder": 45,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 3,
    "title": "5N/6D Jaipur + Alwar + Ranthambore: The Double Safari Circuit",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Built for adventure junkies who want a double dose of wilderness-combining the scenic tracks of Sariska with the premium tiger territories of Ranthambore.",
    "destinations": [
      "Jaipur",
      "Alwar",
      "Sawai Madhopur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & shopping hubs -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Alwar",
        "cities": [
          "Jaipur",
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Drive to Alwar -> Check-in -> Visit Bhangarh Fort ruins & Siliserh Lake Palace -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Alwar to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Alwar"
        ],
        "summary": "Morning Sariska Jungle Safari -> Breakfast -> Drive to Ranthambore -> Check-in -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Free time/Resort activities -> Afternoon Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Ranthambore Departure",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Sawai Madhopur Station or Jaipur Airport."
      }
    ],
    "slug": "three-city-circuits-jaipur-alwar-ranthambore-the-double-safari-circuit",
    "displayOrder": 46,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 4,
    "title": "4N/5D Jaipur + Alwar + Pushkar: The Northern Heritage Triangle",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A perfect short road-trip loop from Delhi/NCR that bypasses heavy commercial tourist paths to showcase forts, haunted mysteries, and peaceful lakes.",
    "destinations": [
      "Jaipur",
      "Alwar",
      "Pushkar"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & local bazaars -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Alwar",
        "cities": [
          "Jaipur",
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Drive to Alwar -> Check-in -> Explore ancient stepwells & Alwar City Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Alwar to Pushkar",
        "cities": [
          "Pushkar",
          "Alwar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Pushkar Departure",
        "cities": [
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Cafe-hopping in local markets -> Check-out -> Drop at Ajmer Station or Jaipur Airport. The Complete Desert Triangle"
      }
    ],
    "slug": "three-city-circuits-jaipur-alwar-pushkar-the-northern-heritage-triangle",
    "displayOrder": 47,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 5,
    "title": "4N/5D Jodhpur + Jaisalmer + Bikaner: The Rapid Desert Trail",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "The ultimate quick route for travelers who want to check off all three major desert destinations in a compact, fast-moving itinerary.",
    "destinations": [
      "Jodhpur",
      "Jaisalmer",
      "Bikaner"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Luxury Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 3,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit Jaisalmer Fort, Gadisar Lake, & Patwon ki Haveli -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer to Bikaner",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Bikaner -> Check-in -> Visit Junagarh Fort & Rampuria Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Bikaner Departure",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit Karni Mata Temple -> Check-out -> Drop at Bikaner or Jodhpur Station."
      }
    ],
    "slug": "three-city-circuits-jodhpur-jaisalmer-bikaner-the-rapid-desert-trail",
    "displayOrder": 48,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 6,
    "title": "5N/6D Jodhpur + Jaisalmer + Bikaner: The Standard Desert King Route",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Our benchmark desert loop. Offers a balanced, highly scannable pace that perfectly captures the forts, dunes, and unique haveli architecture of Western Rajasthan.",
    "destinations": [
      "Jodhpur",
      "Jaisalmer",
      "Bikaner"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Mandore Gardens -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace & explore the old Blue City lanes -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Dune Bashing, Camel Safari, & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Full day exploring the living Fort & intricately carved havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer to Bikaner",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Bikaner -> Check-in -> Visit Junagarh Fort & architecture walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Bikaner Departure",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit National Research Centre on Camel -> Check-out -> Drop at Bikaner Station."
      }
    ],
    "slug": "three-city-circuits-jodhpur-jaisalmer-bikaner-the-standard-desert-king-route",
    "displayOrder": 49,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 7,
    "title": "6N/7D Jodhpur + Jaisalmer + Bikaner: The Slow-Paced Desert Explorer",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A deeply immersive, unhurried holiday tailored for photography lovers and senior travelers who want to absorb old-world desert charm at a relaxed pace.",
    "destinations": [
      "Jodhpur",
      "Jaisalmer",
      "Bikaner"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Jaswant Thada, Umaid Bhawan Palace, & ancient stepwells -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Luxury Desert Camp -> Sunset Dunes Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Jaisalmer Fort, Gadisar Lake, & local markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer to Bikaner",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Bikaner -> Check-in -> Evening relaxation at heritage hotel -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Detailed tour of Junagarh Fort, Rampuria Havelis, & local sweet tasting -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Bikaner Departure",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit Karni Mata Temple -> Check-out -> Drop at Bikaner or Jodhpur Station. The Mewar Mountain & Lake Triangles"
      }
    ],
    "slug": "three-city-circuits-jodhpur-jaisalmer-bikaner-the-slow-paced-desert-explorer",
    "displayOrder": 50,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 8,
    "title": "4N/5D Udaipur + Kumbhalgarh + Mount Abu: The Mewar Hill Station Special",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A great escape from the plains. Combines the romantic lakes of Udaipur with grand hill fortress architecture and cool mountain peaks.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Lake Pichola boat cruise -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari, Monsoon Palace sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Explore Kumbhalgarh Fort wall & Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Temples & Guru Shikhar peak -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-kumbhalgarh-mount-abu-the-mewar-hill-station-special",
    "displayOrder": 51,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 9,
    "title": "5N/6D Udaipur + Kumbhalgarh + Mount Abu: The Luxury Misty Escapes Route",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "An upscale mountain retreat that gives you extra time to indulge in premium luxury properties tucked away in the misty hills of the Aravalli range.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Private evening boat ride at Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Fatehsagar Lake, vintage car museum) -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Scenic drive to Kumbhalgarh -> Check-in at Luxury Valley Resort -> Explore the Fort wall -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive up to Mount Abu -> Check-in -> Evening walk and sunset views at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Achalgarh Fort, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Panoramic views from Guru Shikhar Peak -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-kumbhalgarh-mount-abu-the-luxury-misty-escapes-route",
    "displayOrder": 52,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 10,
    "title": "6N/7D Udaipur + Kumbhalgarh + Mount Abu: The Complete Southern Escapes Tour",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A highly comprehensive tour of Southern Rajasthan, giving you an even mix of lakeside leisure, historic trekking, and a laid-back hill station vacation.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening lakeside walking tour -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Detailed visit to City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Sajjangarh Monsoon Palace, Shilpgram crafts village -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Scenic drive to Kumbhalgarh Fort -> Check-in -> Fort exploration & Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu hill station -> Check-in -> Evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Full day tour of Dilwara Jain Temples, Guru Shikhar Peak, & Peace Park -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Free time for local souvenir shopping -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-kumbhalgarh-mount-abu-the-complete-southern-escapes-tour",
    "displayOrder": 53,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 11,
    "title": "4N/5D Udaipur + Nathdwara + Chittorgarh: The Faith & Forts Corridor",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A brilliant mix of royal lake heritage, powerful Mewar fort history, and a seamless family pilgrimage connection.",
    "destinations": [
      "Udaipur",
      "Nathdwara",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Lake Pichola boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & Fatehsagar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Nathdwara",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Nathdwara to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Comprehensive tour of Chittorgarh Fort complex -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Visit local weaving centers -> Check-out -> Drop at Chittorgarh or Udaipur Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-nathdwara-chittorgarh-the-faith-forts-corridor",
    "displayOrder": 54,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 12,
    "title": "5N/6D Udaipur + Nathdwara + Chittorgarh: The Extended Devotional Tour",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Tailor-made for families looking for a more relaxed, spiritually focused trip with an extended two-night stay in the holy town of Nathdwara.",
    "destinations": [
      "Udaipur",
      "Nathdwara",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jagdish Temple, & local handicraft markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Nathdwara",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Nathdwara",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Mangla Darshan -> Breakfast -> Day trip to Eklingji & Shrinathji temples -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Nathdwara to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Explore the massive Chittorgarh Fort ruins -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Chittorgarh or Udaipur Station/Airport."
      }
    ],
    "slug": "three-city-circuits-udaipur-nathdwara-chittorgarh-the-extended-devotional-tour",
    "displayOrder": 55,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 13,
    "title": "4N/5D Udaipur + Kumbhalgarh + Nathdwara: Lakes, Forts, and Shrinathji",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A highly popular, well-rounded holiday loop covering pristine lakes, massive mountain fortress walls, and an effortless temple darshan.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & enjoy a private lake boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & enjoy sunset at Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Explore Kumbhalgarh Fort wall -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh to Nathdwara",
        "cities": [
          "Kumbhalgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Shop for traditional terracotta and pichwai paintings -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-kumbhalgarh-nathdwara-lakes-forts-and-shrinathji",
    "displayOrder": 56,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 14,
    "title": "5N/6D Udaipur + Kumbhalgarh + Chittorgarh: The Historic Mewar Deep Dive",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Built for serious history buffs who want to dive deep into the legendary tales, architecture, and battlegrounds of the grand Mewar Dynasty.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Lake Pichola sunset boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & vintage car museum -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh via Haldighati historical pass -> Check-in -> Fort wall trek -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Kumbhalgarh",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Kumbhalgarh Wildlife Sanctuary jungle drive -> Evening at leisure -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Kumbhalgarh to Chittorgarh",
        "cities": [
          "Kumbhalgarh",
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Explore India's largest fort complex (Vijay Stambh, Padmini Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Chittorgarh or Udaipur Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-kumbhalgarh-chittorgarh-the-historic-mewar-deep-dive",
    "displayOrder": 57,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 15,
    "title": "5N/6D Udaipur + Mount Abu + Nathdwara: The Ultimate Gujarati Family Holiday",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Our #1 recommended package for multigenerational families. Perfectly matches mountain relaxation for the kids with peaceful temple darshans for parents.",
    "destinations": [
      "Udaipur",
      "Mount Abu",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Saheliyon-ki-Bari, & Fatehsagar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive up to Mount Abu -> Check-in -> Evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Full day tour of Dilwara Jain Temples, Guru Shikhar Peak, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu to Nathdwara",
        "cities": [
          "Mount Abu",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive down to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg/Jain Dinner."
      },
      {
        "dayNumber": 6,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Darshan -> Breakfast -> Check-out -> Drop at Udaipur or Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-mount-abu-nathdwara-the-ultimate-gujarati-family-holiday",
    "displayOrder": 58,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 16,
    "title": "4N/5D Udaipur + Mount Abu + Chittorgarh: Hills, Lakes, and History",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "An excellent, high-contrast loop that transitions seamlessly from legendary battlements to romantic lakes and cool mountain viewpoints.",
    "destinations": [
      "Udaipur",
      "Mount Abu",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Visit City Palace & Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & enjoy sunset at Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Evening boat ride on Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Mount Abu to Chittorgarh",
        "cities": [
          "Mount Abu",
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> See Dilwara Temples -> Drive to Chittorgarh -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Explore the massive Chittorgarh Fort complex -> Check-out -> Drop at Chittorgarh or Udaipur Station. The High-Margin Leopard & Wilderness Triangles"
      }
    ],
    "slug": "three-city-circuits-udaipur-mount-abu-chittorgarh-hills-lakes-and-history",
    "displayOrder": 59,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 17,
    "title": "4N/5D Jodhpur + Jawai + Udaipur: The Ultra-Luxury Transit Link",
    "durationDays": 5,
    "durationNights": 4,
    "shortDescription": "A premium, high-end routing that bridges Rajasthan's two primary tourist hubs with an exclusive, luxury glamping stop for leopard tracking.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Jeep Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 3,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Jawai Dam (crocodiles/birds) -> Drive to Udaipur -> Check-in -> Evening at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & private evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jodhpur-jawai-udaipur-the-ultra-luxury-transit-link",
    "displayOrder": 60,
    "priceFrom": 30200,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 18,
    "title": "5N/6D Jodhpur + Jawai + Udaipur: The Premium Heritage & Wildlife Combo",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "An upgraded luxury itinerary giving you extra time to enjoy Jodhpur’s upscale stepwell cafes along with deep wildlife exploration in Jawai.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort -> Heritage Courtyard Dinner."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace & take a guided tour of the Blue City streets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Campfire & Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Rabari Tribe village walk -> Drive to Udaipur -> Check-in -> Evening walk near Fatehsagar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Jagdish Temple, Saheliyon-ki-Bari, Lake Pichola cruise) -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> See the panoramic view from Monsoon Palace -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jodhpur-jawai-udaipur-the-premium-heritage-wildlife-combo",
    "displayOrder": 61,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 19,
    "title": "5N/6D Jodhpur + Jawai + Kumbhalgarh: The Wilderness & Mountain Wall Path",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Tailor-made for active travelers and nature enthusiasts looking to avoid standard crowds and focus entirely on rugged hills, wild leopards, and fort trekking.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Explore local stepwells & spice markets -> Afternoon at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Camp -> Evening 4x4 Leopard Safari -> Wilderness Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Second high-end wildlife tracking safari -> Relax by the resort pool -> Rabari tribe interaction -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Jawai to Kumbhalgarh",
        "cities": [
          "Jawai",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Trek the second-longest continuous wall in the world -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Morning walk in Kumbhalgarh Wildlife Sanctuary -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jodhpur-jawai-kumbhalgarh-the-wilderness-mountain-wall-path",
    "displayOrder": 62,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 20,
    "title": "5N/6D Udaipur + Jawai + Kumbhalgarh: The Nature Enthusiast Elite Route",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A high-end, nature-first itinerary that completely skips commercial cities to focus on tranquil lakes, rugged safaris, and pristine valley retreats.",
    "destinations": [
      "Udaipur",
      "Jawai",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & enjoy sunset at Sajjangarh Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Jawai",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai wilderness -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Morning safari / crocodile spotting at Jawai Dam -> Evening campfire & local tribal walk -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Jawai to Kumbhalgarh",
        "cities": [
          "Jawai",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Explore Kumbhalgarh Fort wall & watch evening Light/Sound show -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Nature trek through the foothills -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-jawai-kumbhalgarh-the-nature-enthusiast-elite-route",
    "displayOrder": 63,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 21,
    "title": "5N/6D Udaipur + Jawai + Mount Abu: Luxury Wildlife & Hill Station Combo",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Combines the elegant romance of Udaipur with the thrilling wildlife of Jawai and the cooling mountain environment of Mount Abu.",
    "destinations": [
      "Udaipur",
      "Jawai",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Lake Pichola private boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur to Jawai",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Camp -> Evening 4x4 Jeep Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai to Mount Abu",
        "cities": [
          "Jawai",
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> See crocodiles at Jawai Dam -> Drive up to Mount Abu -> Check-in -> Evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Full day tour of Dilwara Jain Temples, Guru Shikhar Peak, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-udaipur-jawai-mount-abu-luxury-wildlife-hill-station-combo",
    "displayOrder": 64,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 22,
    "title": "6N/7D Jodhpur + Jawai + Jaisalmer: Desert to Wilderness Luxury Trail",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A high-end, extensive journey across Western Rajasthan designed for travelers looking for premium desert camping, grand forts, and exclusive leopard tracking.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace & explore local antique and fabric markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai to Jaisalmer",
        "cities": [
          "Jawai",
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Drive deep into the desert to Jaisalmer -> Check-in at Luxury Desert Camp -> Sunset Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Full day tour of the living Jaisalmer Fort & Patwon ki Haveli -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Gadisar Lake, Kuldhara ghost village, & Bada Bagh chhatris -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Souvenir shopping in the old town -> Check-out -> Drop at Jaisalmer Station. Cross-Regional Connection Triangles (The Mega-Sellers)"
      }
    ],
    "slug": "three-city-circuits-jodhpur-jawai-jaisalmer-desert-to-wilderness-luxury-trail",
    "displayOrder": 65,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 23,
    "title": "5N/6D Jaipur + Jodhpur + Jaisalmer: The Standard Royal Gateway Route",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Our quintessential Rajasthan circuit. Efficiently connects the state's three most iconic destinations for an unbeatable first-time vacation.",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur to Jodhpur",
        "cities": [
          "Jaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive or train to Jodhpur -> Check-in -> See Mehrangarh Fort at sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Jaswant Thada & Umaid Bhawan Palace -> Afternoon drive to Jaisalmer -> Check-in at Town Hotel -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore the living Fort & carved havelis -> Afternoon transfer to Desert Luxury Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Return to town -> Visit Gadisar Lake & Kuldhara Abandoned Village -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-jodhpur-jaisalmer-the-standard-royal-gateway-route",
    "displayOrder": 66,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 24,
    "title": "6N/7D Jaipur + Jodhpur + Jaisalmer: The Classic Multi-City Route",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "An upgraded, highly comfortable version of our classic mega-seller. Adds an extra night in Jaipur to ensure you never feel rushed while sightseeing.",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, Jantar Mantar, & Johari Bazar -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Jodhpur",
        "cities": [
          "Jaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk around the Clock Tower market -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort & Jaswant Thada -> Drive to Jaisalmer -> Check-in at Town Hotel -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore Jaisalmer Fort -> Afternoon transfer to Desert Camp -> Camel Safari, Dunes Sunset, & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Return to town -> Visit Patwon ki Haveli, Gadisar Lake, & Bada Bagh -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-jodhpur-jaisalmer-the-classic-multi-city-route",
    "displayOrder": 67,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 25,
    "title": "7N/8D Jaipur + Jodhpur + Jaisalmer: The Deep Desert Explorer Route",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "The ultimate comprehensive tour across the royal heartland. Offers an easygoing pace with multiple nights in each major hub for deep exploration.",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local textile markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Hawa Mahal, Jantar Mantar, Nahargarh sunset) -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Jodhpur",
        "cities": [
          "Jaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer desert -> Check-in at Luxury Desert Camp -> Dune Bashing & Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Comprehensive tour of the living Jaisalmer Fort & ancient havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Gadisar Lake, Kuldhara Ghost Village, & Tanot Mata Temple border run -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-jodhpur-jaisalmer-the-deep-desert-explorer-route",
    "displayOrder": 68,
    "priceFrom": 42800,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 26,
    "title": "5N/6D Jaipur + Pushkar + Jodhpur: The Central Heritage Spine Link",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Connects Rajasthan's historic capitals with a peaceful overnight stop at the holy lake of Pushkar, creating a well-balanced spiritual and cultural journey.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & shopping hubs -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & evening lake ghat prayers -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk through the iconic blue streets -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur Departure",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jodhpur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-pushkar-jodhpur-the-central-heritage-spine-link",
    "displayOrder": 69,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 27,
    "title": "5N/6D Jaipur + Pushkar + Udaipur: The Culture & Romantic Lake Route",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "Seamlessly blends the grand architecture of the Pink City, the spiritual atmosphere of Pushkar, and the lakeside romance of Udaipur.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & Johari Bazar -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & enjoy sunset by the holy lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Udaipur",
        "cities": [
          "Udaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Scenic drive to Udaipur -> Check-in -> Evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day tour of City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Enjoy views from Sajjangarh Monsoon Palace -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-pushkar-udaipur-the-culture-romantic-lake-route",
    "displayOrder": 70,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 28,
    "title": "6N/7D Jaipur + Ranthambore + Udaipur: The Palaces & Tigers Signature Run",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "Our premier premium multi-city itinerary. Perfectly hits the top three holiday highlights: grand palaces, incredible tiger tracking, and beautiful lakeside luxury.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & local handicraft markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Evening tour of Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Rest at resort -> Afternoon Jungle Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Ranthambore to Udaipur",
        "cities": [
          "Sawai Madhopur",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive or travel to Udaipur -> Check-in -> Evening lakeside relaxation -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & enjoy an evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-ranthambore-udaipur-the-palaces-tigers-signature-run",
    "displayOrder": 71,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 29,
    "title": "5N/6D Jaipur + Jodhpur + Udaipur: The Three Capitals Run",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A highly efficient routing that hits the absolute essentials of Rajasthan travel: the Pink City, the Blue City, and the City of Lakes.",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & take an afternoon drive to Jodhpur -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort & Jaswant Thada -> Evening walk in the old city -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur to Udaipur",
        "cities": [
          "Udaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur via Ranakpur Jain Temples -> Check-in -> Evening boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day tour of City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-jodhpur-udaipur-the-three-capitals-run",
    "displayOrder": 72,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 30,
    "title": "6N/7D Jaipur + Jodhpur + Udaipur: The Comprehensive City Trio",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "An expanded, highly comfortable version of the Three Capitals tour. Adds extra nights to ensure an easygoing pace for families and group vacations.",
    "destinations": [
      "Jaipur",
      "Jodhpur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, Jantar Mantar, & shopping markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Jodhpur",
        "cities": [
          "Jaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk at Clock Tower bazaar -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur to Udaipur",
        "cities": [
          "Udaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Evening lake cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day tour of City Palace, Saheliyon-ki-Bari, & Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Free time for local souvenir shopping -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-jaipur-jodhpur-udaipur-the-comprehensive-city-trio",
    "displayOrder": 73,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 31,
    "title": "5N/6D Pushkar + Jodhpur + Jaisalmer: The Holy Dunes Express",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A superb cross-regional tour shifting smoothly from the serene ghats of Pushkar straight into the imposing forts and massive dunes of the Western desert.",
    "destinations": [
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk in the heritage blue-washed streets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> See Mehrangarh Fort -> Drive to Jaisalmer town -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore Jaisalmer Fort & carved havelis -> Afternoon transfer to Desert Luxury Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Return to town -> Visit Gadisar Lake & Kuldhara Abandoned Village -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-pushkar-jodhpur-jaisalmer-the-holy-dunes-express",
    "displayOrder": 74,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 32,
    "title": "6N/7D Pushkar + Jodhpur + Udaipur: The Central Heritage to Southern Lakes Path",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A beautifully orchestrated journey connecting holy lake shrines, rugged fort architecture, and sophisticated lakeside palaces.",
    "destinations": [
      "Pushkar",
      "Jodhpur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Pickup from Ajmer Station/Pushkar -> Check-in -> Visit Brahma Temple & local ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk at local spice markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Full day tour of Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur to Udaipur",
        "cities": [
          "Udaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur via Ranakpur Temples -> Check-in -> Evening at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Detailed visit to City Palace & private evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari, Fatehsagar Lake, & Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-pushkar-jodhpur-udaipur-the-central-heritage-to-southern-lakes-path",
    "displayOrder": 75,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 33,
    "title": "5N/6D Bikaner + Jodhpur + Jaisalmer: The Pure Desert Triangle",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A focused desert route that skips the commercial cities to showcase majestic sand dunes, beautiful havelis, and historic fortresses.",
    "destinations": [
      "Bikaner",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Rampuria Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jodhpur",
        "cities": [
          "Jodhpur",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk near Clock Tower -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> See Mehrangarh Fort -> Drive to Jaisalmer town -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore the living Fort -> Afternoon transfer to Desert Camp -> Camel Safari & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Return to town -> Visit Patwon ki Haveli & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-bikaner-jodhpur-jaisalmer-the-pure-desert-triangle",
    "displayOrder": 76,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 34,
    "title": "6N/7D Bikaner + Jaisalmer + Udaipur: The Great Desert to Oases Transit",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A brilliant cross-state transit itinerary that highlights the huge contrast between the hot, arid sand dunes and the lush, romantic lake oases of Udaipur.",
    "destinations": [
      "Bikaner",
      "Jaisalmer",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Camel Research Centre -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Walk past Rampuria Havelis -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 3,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Full day exploring the massive living Jaisalmer Fort & carved havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer to Udaipur",
        "cities": [
          "Jaisalmer",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Long transit drive down to Udaipur -> Check-in -> Evening at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & enjoy a private evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & enjoy sunset views from Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-bikaner-jaisalmer-udaipur-the-great-desert-to-oases-transit",
    "displayOrder": 77,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 35,
    "title": "5N/6D Ranthambore + Pushkar + Jodhpur: Wilderness to Blue City Corridor",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A neatly designed, high-contrast holiday that effortlessly shifts from tiger safaris to serene lake shrines and towering fort battlements.",
    "destinations": [
      "Sawai Madhopur",
      "Pushkar",
      "Jodhpur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Pickup from Sawai Madhopur Station -> Check-in -> Visit Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Free time at resort -> Afternoon Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Ranthambore to Pushkar",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & evening lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk in the old city -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Explore Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur Departure",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jodhpur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-ranthambore-pushkar-jodhpur-wilderness-to-blue-city-corridor",
    "displayOrder": 78,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 36,
    "title": "6N/7D Ranthambore + Jaipur + Jaisalmer: Jungle to Sand Dunes Adventure",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "The ultimate package for adventure seekers, taking you across the state from dense tiger jungles to desert dunes and majestic palaces.",
    "destinations": [
      "Sawai Madhopur",
      "Jaipur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Pickup from Sawai Madhopur Station -> Check-in -> Visit Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 2,
        "title": "Ranthambore to Jaipur",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Drive to Jaipur -> Check-in -> Evening at leisure -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Amber Fort, Hawa Mahal, City Palace, & local handicraft markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaipur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Travel to Jaisalmer -> Check-in at Town Hotel -> Evening visit to Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore the living Fort -> Afternoon transfer to Desert Camp -> Camel Safari & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Return to town -> Visit Patwon ki Haveli & Kuldhara Ghost Village -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "three-city-circuits-ranthambore-jaipur-jaisalmer-jungle-to-sand-dunes-adventure",
    "displayOrder": 79,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 37,
    "title": "5N/6D Chittorgarh + Udaipur + Kumbhalgarh: The Mewar Dynasty Trail",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A dedicated immersion into the rich history of the Mewar rulers, visiting grand hill battlements, lakeside palaces, and massive fortified walls.",
    "destinations": [
      "Chittorgarh",
      "Udaipur",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Chittorgarh",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Pickup from Chittorgarh Station -> Check-in -> Explore Chittorgarh Fort complex (Vijay Stambh, Padmini Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Chittorgarh to Udaipur",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Evening lake cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Jagdish Temple, Saheliyon-ki-Bari) -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh via Haldighati pass -> Check-in -> Fort wall trek -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Kumbhalgarh",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Kumbhalgarh Wildlife Sanctuary jungle drive -> Evening Light/Sound show -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "three-city-circuits-chittorgarh-udaipur-kumbhalgarh-the-mewar-dynasty-trail",
    "displayOrder": 80,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 38,
    "title": "5N/6D Nathdwara + Udaipur + Mount Abu: Spiritual Hills Vacation",
    "durationDays": 6,
    "durationNights": 5,
    "shortDescription": "A classic family choice that connects a peaceful deity darshan at Nathdwara with beautiful lake scenery and a refreshing mountain stay.",
    "destinations": [
      "Nathdwara",
      "Udaipur",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Nathdwara",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Pickup from Udaipur/Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Nathdwara to Udaipur",
        "cities": [
          "Nathdwara",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive up to Mount Abu -> Check-in -> Evening boat cruise on Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples & enjoy panoramic views from Guru Shikhar Peak -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "three-city-circuits-nathdwara-udaipur-mount-abu-spiritual-hills-vacation",
    "displayOrder": 81,
    "priceFrom": 34400,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 39,
    "title": "6N/7D Alwar + Jaipur + Pushkar: The North-Central Exploration Circuit",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "Great for travelers coming from Northern India who want a balanced road trip covering jungle safaris, haunted mysteries, historic forts, and spiritual lakes.",
    "destinations": [
      "Alwar",
      "Jaipur",
      "Pushkar"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Alwar",
        "cities": [
          "Alwar"
        ],
        "summary": "Pickup from Alwar Station -> Check-in -> Visit Siliserh Lake Palace & historic Alwar stepwells -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Alwar to Jaipur",
        "cities": [
          "Jaipur",
          "Alwar"
        ],
        "summary": "Morning Sariska Jungle Safari -> Breakfast -> Drive to Jaipur -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Amber Fort, Hawa Mahal, & shopping at Johari Bazar -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & sunset view from Nahargarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & evening lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Pushkar",
        "cities": [
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Full day exploring local desert markets, rose gardens, & cafe culture -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Pushkar Departure",
        "cities": [
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Ajmer Station or Jaipur Airport."
      }
    ],
    "slug": "three-city-circuits-alwar-jaipur-pushkar-the-north-central-exploration-circuit",
    "displayOrder": 82,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 3,
    "categorySlug": "three-city-circuits",
    "categoryName": "Three-City Triangular Circuits",
    "packageNumber": 40,
    "title": "6N/7D Jawai + Udaipur + Chittorgarh: Luxury Wildlife & History Link",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A premium tour that blends upscale, high-margin wilderness glamping and leopard tracking with lakeside royalty and incredible fort history.",
    "destinations": [
      "Jawai",
      "Udaipur",
      "Chittorgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Pickup from Jawai Bandh Station -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 2,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Second safari track exploration / Jawai Dam crocodile spotting -> Tribal walk -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive down to Udaipur -> Check-in -> Private evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Jagdish Temple, Saheliyon-ki-Bari) -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Sajjangarh Monsoon Palace & enjoy free time for local arts shopping -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Comprehensive tour of Chittorgarh Fort ruins -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Chittorgarh Departure",
        "cities": [
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Chittorgarh or Udaipur Station. "
      }
    ],
    "slug": "three-city-circuits-jawai-udaipur-chittorgarh-luxury-wildlife-history-link",
    "displayOrder": 83,
    "priceFrom": 38600,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 1,
    "title": "6N/7D Jaipur + Pushkar + Jodhpur + Jaisalmer: The Heritage Core Corridor",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A fast-paced, high-conversion circuit covering the definitive \"big four\" track for travelers wanting maximum major-city highlights in exactly a week.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & Jantar Mantar -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Explore Mehrangarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit Living Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Quick visit to Kuldhara ghost village -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-jaisalmer-the-heritage-core-corridor",
    "displayOrder": 84,
    "priceFrom": 40100,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 2,
    "title": "7N/8D Jaipur + Pushkar + Jodhpur + Jaisalmer: The Ultimate Holiday Circuit",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "Our absolute best-selling standard tour. Adds a critical second night in Jodhpur to ensure a smooth, unhurried balance between cultural hubs and the far desert.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & Nahargarh Fort sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & evening lake prayers -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk near Clock Tower market -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Dune Bashing & Sunset Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Jaisalmer Living Fort & carved havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Souvenir market shopping drop -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-jaisalmer-the-ultimate-holiday-circuit",
    "displayOrder": 85,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 3,
    "title": "8N/9D Jaipur + Pushkar + Jodhpur + Jaisalmer: The Deep Desert Explorer Loop",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "Tailor-made for photography enthusiasts and slow-travelers who want to deeply explore the golden architectures of Jaisalmer and the far dunes.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local textile hubs -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & lakeside walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening blue city walking tour -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Explore Mehrangarh Fort, Jaswant Thada, & Mandore Gardens -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Town Hotel -> Evening at Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Detailed exploration of Jaisalmer Fort & Patwon ki Haveli -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer Desert",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Luxury Desert Camp -> Afternoon Dune Bashing, Camel Ride, & Cultural Gala -> Dinner at Camp."
      },
      {
        "dayNumber": 9,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Kuldhara village & Bada Bagh chhatris -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-jaisalmer-the-deep-desert-explorer-loop",
    "displayOrder": 86,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 4,
    "title": "6N/7D Jaipur + Ranthambore + Jodhpur + Jaisalmer: The Wildlife & Desert Blend",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "A high-contrast adventure layout that shifts dynamically from scanning thick tiger jungles to traversing vast sand dunes in under a week.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace -> Drive to Ranthambore -> Check-in -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Ranthambore to Jodhpur",
        "cities": [
          "Sawai Madhopur",
          "Jodhpur"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Drive/Transit to Jodhpur -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort -> Drive to Jaisalmer town -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Explore living Fort -> Move to Desert Camp -> Camel Safari & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit Patwon ki Haveli, Gadisar Lake, & local bazaars -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-ranthambore-jodhpur-jaisalmer-the-wildlife-desert-blend",
    "displayOrder": 87,
    "priceFrom": 40100,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 5,
    "title": "7N/8D Jaipur + Ranthambore + Jodhpur + Jaisalmer: Extended Wilderness Drive",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "A highly optimized premium choice that secures two full nights in Ranthambore to maximize wild tiger sighting opportunities before starting the desert run.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & local markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> See City Palace -> Drive to Ranthambore -> Check-in -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Jungle Safari -> Return for Breakfast -> Rest -> Afternoon Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Ranthambore to Jodhpur",
        "cities": [
          "Sawai Madhopur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Transit drive to Jodhpur -> Check-in -> Evening stepwell stroll -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 6,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Living Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Kuldhara Ghost Village & Tanot Mata border post trip -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-ranthambore-jodhpur-jaisalmer-extended-wilderness-drive",
    "displayOrder": 88,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 6,
    "title": "7N/8D Jaipur + Pushkar + Jodhpur + Udaipur: The Four Corner Heritage Run",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "Connects Rajasthan's major urban gems-The Pink, Blue, and White cities-completely avoiding arid sand dunes to focus on palaces and lakes.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & lakeside ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening heritage market tour -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Udaipur",
        "cities": [
          "Udaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur via Ranakpur Jain Temples -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Saheliyon-ki-Bari, & Lake Pichola evening boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore Monsoon Palace panoramic views -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-udaipur-the-four-corner-heritage-run",
    "displayOrder": 89,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 7,
    "title": "8N/9D Jaipur + Pushkar + Jodhpur + Udaipur: The Absolute Grand Rajasthan Classic",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "An elite, deeply immersive package providing extra days in Udaipur for secondary mountain fortresses and long lake cruises.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Albert Hall, & Nahargarh sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening blue city walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Udaipur",
        "cities": [
          "Udaipur",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur via Ranakpur -> Check-in -> Evening lake walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Day trip to Kumbhalgarh Fort or Monsoon Palace tour -> Boat ride at Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Handicrafts shopping drop -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-udaipur-the-absolute-grand-rajasthan-classic",
    "displayOrder": 90,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 8,
    "title": "6N/7D Bikaner + Jodhpur + Jaisalmer + Jaipur: The Desert Entry Heritage Return",
    "durationDays": 7,
    "durationNights": 6,
    "shortDescription": "An exceptional, cross-regional circuit designed for desert purists who want to explore red-stone castles and living sand forts.",
    "destinations": [
      "Bikaner",
      "Jodhpur",
      "Jaisalmer",
      "Jaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Rampuria Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jodhpur",
        "cities": [
          "Jodhpur",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Living Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jaisalmer to Jaipur",
        "cities": [
          "Jaisalmer",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Long transit drive or overnight train connection to Jaipur -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit Amber Fort, City Palace, Hawa Mahal, & local bazaars -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Jaipur Departure",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-bikaner-jodhpur-jaisalmer-jaipur-the-desert-entry-heritage-return",
    "displayOrder": 91,
    "priceFrom": 40100,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 9,
    "title": "7N/8D Udaipur + Kumbhalgarh + Mount Abu + Nathdwara: The Complete Southern",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "Completely avoids the hot plains, taking travelers through mist-laden Aravalli peaks, hill fortresses, cool mountain lakes, and sacred spaces.",
    "destinations": [
      "Udaipur",
      "Kumbhalgarh",
      "Mount Abu",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Monsoon Palace & explore Sajjangarh wildlife park -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Explore Fort wall & Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Evening boating at Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Toad Rock, & sunset point -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Mount Abu to Nathdwara",
        "cities": [
          "Mount Abu",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Evening Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner."
      },
      {
        "dayNumber": 8,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Early Morning Darshan -> Breakfast -> Check-out -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "regional-deep-dives-udaipur-kumbhalgarh-mount-abu-nathdwara-the-complete-southern",
    "displayOrder": 92,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 10,
    "title": "7N/8D Udaipur + Chittorgarh + Kumbhalgarh + Nathdwara: The Deep Mewar History",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "A dedicated historical dive mapping out the epic tales of Rajput chivalry across the four major bastions of the Mewar Dynasty.",
    "destinations": [
      "Udaipur",
      "Chittorgarh",
      "Kumbhalgarh",
      "Nathdwara"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Lake Pichola evening walk -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Monsoon Palace & local arts handicraft centers -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh -> Check-in -> Tour Chittorgarh Fort (Vijay Stambh, Padmini Palace) -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Chittorgarh to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Chittorgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh via Haldighati pass -> Check-in -> Evening Fort Wall hike -> Dinner at Resort."
      },
      {
        "dayNumber": 6,
        "title": "Kumbhalgarh",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Explore Kumbhalgarh Wildlife Sanctuary jungle tracks -> Evening at leisure -> Dinner at Resort."
      },
      {
        "dayNumber": 7,
        "title": "Kumbhalgarh to Nathdwara",
        "cities": [
          "Kumbhalgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Shrinathji Darshan & Statue of Belief visit -> Pure Veg Dinner."
      },
      {
        "dayNumber": 8,
        "title": "Nathdwara Departure",
        "cities": [
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Terracotta market walk -> Check-out -> Drop at Udaipur Station/Airport."
      }
    ],
    "slug": "regional-deep-dives-udaipur-chittorgarh-kumbhalgarh-nathdwara-the-deep-mewar-history",
    "displayOrder": 93,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 11,
    "title": "7N/8D Jodhpur + Jawai + Udaipur + Kumbhalgarh: The Ultra-Luxury Heritage &",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "High-margin operational route combining boutique heritage city stays, private 4x4 leopard tracking, and exclusive glamping.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Udaipur",
      "Kumbhalgarh"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Umaid Bhawan Palace & explore stepwell boutique cafes -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 4,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Second safari track exploration / Jawai Dam crocodile spotting -> Tribal walk -> Dinner at Resort."
      },
      {
        "dayNumber": 5,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Private evening boat cruise on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Full day city tour (City Palace, Jagdish Temple, Saheliyon-ki-Bari) -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh Fort -> Check-in -> Fort wall trek & Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 8,
        "title": "Kumbhalgarh Departure",
        "cities": [
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Nature walk -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-jodhpur-jawai-udaipur-kumbhalgarh-the-ultra-luxury-heritage",
    "displayOrder": 94,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 12,
    "title": "8N/9D Jodhpur + Jawai + Udaipur + Mount Abu: The Ultimate Nature, Wildlife & Palace",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "The premier southern vacation loop matching heritage palaces and mountain vistas with raw wilderness tracking.",
    "destinations": [
      "Jodhpur",
      "Jawai",
      "Udaipur",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Pickup from Jodhpur Airport/Station -> Check-in -> Visit Mehrangarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 3,
        "title": "Jawai",
        "cities": [
          "Jawai"
        ],
        "summary": "Morning Breakfast -> Second wildlife safari track / Jawai Dam bird watching -> Rabari tribe interaction -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Udaipur -> Check-in -> Evening walk by Fatehsagar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Saheliyon-ki-Bari, & private lake boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Udaipur to Mount Abu",
        "cities": [
          "Mount Abu",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu -> Check-in -> Evening boat ride on Nakki Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 7,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Achalgarh Fort, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Panoramic views from Guru Shikhar Peak -> Rest day at property -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Abu Road Station. The 5-City Elite Mega-Circuits"
      }
    ],
    "slug": "regional-deep-dives-jodhpur-jawai-udaipur-mount-abu-the-ultimate-nature-wildlife-palace",
    "displayOrder": 95,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 13,
    "title": "7N/8D Jaipur + Ranthambore + Pushkar + Jodhpur + Jaisalmer: The Master Explorer",
    "durationDays": 8,
    "durationNights": 7,
    "shortDescription": "A fast, highly comprehensive cross-regional layout packing forts, lake shrines, tigers, and sand dunes into a single multi-city package.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace & local handicraft markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Ranthambore -> Check-in -> Visit Ranthambore Fort -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Ranthambore to Pushkar",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Early Morning Tiger Safari -> Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Holy lake ghat prayers -> Drive to Jodhpur -> Check-in -> See Mehrangarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari & Folk Show -> Dinner at Camp."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Living Fort & Patwon ki Haveli -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-ranthambore-pushkar-jodhpur-jaisalmer-the-master-explorer",
    "displayOrder": 96,
    "priceFrom": 44300,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 14,
    "title": "8N/9D Jaipur + Ranthambore + Pushkar + Jodhpur + Jaisalmer: The Ultimate Wildlife",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "An upgraded luxury overland marathon providing multi-night breathing room at both the tiger reserves and deep desert dunes.",
    "destinations": [
      "Jaipur",
      "Sawai Madhopur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur to Ranthambore",
        "cities": [
          "Sawai Madhopur",
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> See City Palace -> Drive to Ranthambore -> Check-in -> Dinner at Resort."
      },
      {
        "dayNumber": 3,
        "title": "Ranthambore",
        "cities": [
          "Sawai Madhopur"
        ],
        "summary": "Early Morning Jungle Safari -> Breakfast -> Rest -> Afternoon Tiger Safari -> Dinner at Resort."
      },
      {
        "dayNumber": 4,
        "title": "Ranthambore to Pushkar",
        "cities": [
          "Sawai Madhopur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Visit Mehrangarh Fort & Jaswant Thada -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Sunset Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Full day exploring Living Fort & carved havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Visit Gadisar Lake, Kuldhara village, & Bada Bagh chhatris -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Jaisalmer Departure",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Jaisalmer Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-ranthambore-pushkar-jodhpur-jaisalmer-the-ultimate-wildlife",
    "displayOrder": 97,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 15,
    "title": "8N/9D Jaipur + Pushkar + Jodhpur + Jaisalmer + Bikaner: The Grand All-Desert",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "The definitive architectural loop for desert purists, charting the entire historic trade highway across all major sand capitals.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Jaisalmer",
      "Bikaner"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Hawa Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jantar Mantar, & Nahargarh sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & lake ghats -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Explore Mehrangarh Fort -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Jaswant Thada, Umaid Bhawan Palace, & old town markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer -> Check-in at Desert Camp -> Camel Safari & Folk Dance -> Dinner at Camp."
      },
      {
        "dayNumber": 7,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Visit Living Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Jaisalmer to Bikaner",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Bikaner -> Check-in -> Visit Junagarh Fort & Rampuria Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Bikaner Departure",
        "cities": [
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Visit Karni Mata Temple -> Check-out -> Drop at Bikaner Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-jaisalmer-bikaner-the-grand-all-desert",
    "displayOrder": 98,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 16,
    "title": "8N/9D Jaipur + Pushkar + Jodhpur + Jawai + Udaipur: The Royal Capitals & Leopard",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "A highly curated premium itinerary mapping out iconic city history alongside raw granite-hill leopard tracking.",
    "destinations": [
      "Jaipur",
      "Pushkar",
      "Jodhpur",
      "Jawai",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort & Jal Mahal -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Jaipur",
        "cities": [
          "Jaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Hawa Mahal, & local bazaars -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Jaipur to Pushkar",
        "cities": [
          "Jaipur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Pushkar -> Check-in -> Visit Brahma Temple & holy lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Pushkar to Jodhpur",
        "cities": [
          "Jodhpur",
          "Pushkar"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> See Mehrangarh Fort at sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 6,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Jawai Dam crocodile spotting -> Drive to Udaipur -> Check-in -> Lakeside Dinner."
      },
      {
        "dayNumber": 7,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Jagdish Temple, & private lake cruise -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Saheliyon-ki-Bari & panoramic views from Monsoon Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-jaipur-pushkar-jodhpur-jawai-udaipur-the-royal-capitals-leopard",
    "displayOrder": 99,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 17,
    "title": "8N/9D Udaipur + Chittorgarh + Nathdwara + Kumbhalgarh + Mount Abu: The Complete",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "A masterfully woven family-centric mega-circuit covering the best of faith, fortress architecture, and cool hill stations in the south.",
    "destinations": [
      "Udaipur",
      "Chittorgarh",
      "Nathdwara",
      "Kumbhalgarh",
      "Mount Abu"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Pickup from Udaipur Airport/Station -> Check-in -> Evening boat ride on Lake Pichola -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Explore City Palace, Jagdish Temple, & Saheliyon-ki-Bari -> Dinner at Hotel."
      },
      {
        "dayNumber": 3,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit Monsoon Palace & explore local arts markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Udaipur to Chittorgarh",
        "cities": [
          "Chittorgarh",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Drive to Chittorgarh Fort -> Full day tour of ruins -> Check-in -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Chittorgarh to Nathdwara",
        "cities": [
          "Chittorgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Nathdwara -> Check-in -> Shrinathji Temple Darshan & Statue of Belief -> Pure Veg Dinner."
      },
      {
        "dayNumber": 6,
        "title": "Nathdwara to Kumbhalgarh",
        "cities": [
          "Kumbhalgarh",
          "Nathdwara"
        ],
        "summary": "Morning Breakfast -> Drive to Kumbhalgarh -> Check-in -> Explore Fort wall & Light/Sound Show -> Dinner at Resort."
      },
      {
        "dayNumber": 7,
        "title": "Kumbhalgarh to Mount Abu",
        "cities": [
          "Mount Abu",
          "Kumbhalgarh"
        ],
        "summary": "Morning Breakfast -> Drive to Mount Abu hill station -> Check-in -> Evening Nakki Lake boat ride -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Mount Abu",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Visit Dilwara Jain Temples, Guru Shikhar Peak, & Sunset Point -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Mount Abu Departure",
        "cities": [
          "Mount Abu"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Abu Road Station."
      }
    ],
    "slug": "regional-deep-dives-udaipur-chittorgarh-nathdwara-kumbhalgarh-mount-abu-the-complete",
    "displayOrder": 100,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    "categoryNumber": 4,
    "categorySlug": "regional-deep-dives",
    "categoryName": "Complete Regional Deep Dives",
    "packageNumber": 18,
    "title": "8N/9D Bikaner + Jaisalmer + Jodhpur + Jawai + Udaipur: The Ultimate",
    "durationDays": 9,
    "durationNights": 8,
    "shortDescription": "The ultimate cross-state luxury overland path tracking directly from northern havelis, through dunes and safaris, down to southern lakes.",
    "destinations": [
      "Bikaner",
      "Jaisalmer",
      "Jodhpur",
      "Jawai",
      "Udaipur"
    ],
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Bikaner",
        "cities": [
          "Bikaner"
        ],
        "summary": "Pickup from Bikaner Station -> Check-in -> Visit Junagarh Fort & Rampuria Havelis -> Dinner at Hotel."
      },
      {
        "dayNumber": 2,
        "title": "Bikaner to Jaisalmer",
        "cities": [
          "Jaisalmer",
          "Bikaner"
        ],
        "summary": "Morning Breakfast -> Drive to Jaisalmer desert -> Check-in at Luxury Camp -> Sunset Camel Safari -> Dinner at Camp."
      },
      {
        "dayNumber": 3,
        "title": "Jaisalmer",
        "cities": [
          "Jaisalmer"
        ],
        "summary": "Morning Breakfast -> Move to Town Hotel -> Explore Living Fort, Patwon ki Haveli, & Gadisar Lake -> Dinner at Hotel."
      },
      {
        "dayNumber": 4,
        "title": "Jaisalmer to Jodhpur",
        "cities": [
          "Jaisalmer",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jodhpur -> Check-in -> Evening walk around spice markets -> Dinner at Hotel."
      },
      {
        "dayNumber": 5,
        "title": "Jodhpur",
        "cities": [
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Visit Mehrangarh Fort, Jaswant Thada, & Umaid Bhawan Palace -> Dinner at Hotel."
      },
      {
        "dayNumber": 6,
        "title": "Jodhpur to Jawai",
        "cities": [
          "Jawai",
          "Jodhpur"
        ],
        "summary": "Morning Breakfast -> Drive to Jawai -> Check-in at Luxury Glamping Resort -> Evening 4x4 Leopard Safari -> Bush Dinner."
      },
      {
        "dayNumber": 7,
        "title": "Jawai to Udaipur",
        "cities": [
          "Jawai",
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Jawai Dam crocodile tracking -> Drive to Udaipur -> Check-in -> Lake cruise -> Dinner at Hotel."
      },
      {
        "dayNumber": 8,
        "title": "Udaipur",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Visit City Palace, Saheliyon-ki-Bari, & Monsoon Palace sunset -> Dinner at Hotel."
      },
      {
        "dayNumber": 9,
        "title": "Udaipur Departure",
        "cities": [
          "Udaipur"
        ],
        "summary": "Morning Breakfast -> Check-out -> Drop at Udaipur Airport/Station."
      }
    ],
    "slug": "regional-deep-dives-bikaner-jaisalmer-jodhpur-jawai-udaipur-the-ultimate",
    "displayOrder": 101,
    "priceFrom": 48500,
    "images": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];
