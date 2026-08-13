import { buildUnsplashUrl, CITY_PALACE_UDAIPUR_IMAGE } from "../city-tourism-images";

/** Curated tourism photos for marketing pages (https://unsplash.com/license + local assets). */
export const MARKETING_IMAGES = {
  /** Homepage full-bleed hero background — City Palace / Lake Pichola at golden hour. */
  heroHalfBackground: buildUnsplashUrl("1695956353120-54ce5e91632b"),
  aboutHero: buildUnsplashUrl("1695956353120-54ce5e91632b"),
  retailHolidays: CITY_PALACE_UDAIPUR_IMAGE,
  customJourneys: buildUnsplashUrl("1703092289078-ff03b771237c"),
  corporateMice: buildUnsplashUrl("1600880292203-757bb62b4baf"),
  travelPhilosophy: buildUnsplashUrl("1674229010920-ad8493dc19eb"),
  whyMatters: buildUnsplashUrl("1770665567877-72ee8a7c9051"),
  aboutFooterCta: buildUnsplashUrl("1723529983733-9a30e30d841d"),
  miceHero: buildUnsplashUrl("1600880292203-757bb62b4baf"),
  miceIntro: buildUnsplashUrl("1540575467063-178a50c2df87"),
  miceCtaBanner: buildUnsplashUrl("1506905925346-21bda4d32df4"),
  /** Luxury hotel lobby / travel reception — contact page hero. */
  contactHero: buildUnsplashUrl("1564501049412-61c2a3083791"),
  contactCta: buildUnsplashUrl("1695956353120-54ce5e91632b"),
  destinations: {
    udaipur: CITY_PALACE_UDAIPUR_IMAGE,
    jaipur: buildUnsplashUrl("1705861145407-62f12184e563"),
    jodhpur: buildUnsplashUrl("1602643454724-21d5a40722db"),
    jaisalmer: buildUnsplashUrl("1710347454810-e3d493dcc538"),
    kumbhalgarh: buildUnsplashUrl("1651478881218-b5da97b8dbef"),
    mountAbu: buildUnsplashUrl("1630825828191-6f14ad0b84b8"),
    goa: buildUnsplashUrl("1507525428034-b723cf961d3e"),
    shimla: buildUnsplashUrl("1610178009236-02461f18b272"),
    manali: buildUnsplashUrl("1464822759023-fed622ff2c3b"),
    darjeeling: buildUnsplashUrl("1766485586335-b3ecea463aa6"),
    gangtok: buildUnsplashUrl("1689343075610-aa77066f3df5"),
    srinagar: buildUnsplashUrl("1595815771614-ade9d652a65d"),
    dubai: buildUnsplashUrl("1512453979798-5ea266f8880c"),
    thailand: buildUnsplashUrl("1671625120025-49a3c3476d8c"),
    singapore: buildUnsplashUrl("1525625293386-3f8f99389edd"),
  },
  services: {
    offsites: buildUnsplashUrl("1600880292203-757bb62b4baf"),
    incentive: buildUnsplashUrl("1507525428034-b723cf961d3e"),
    conferences: buildUnsplashUrl("1540575467063-178a50c2df87"),
    dealerMeets: buildUnsplashUrl("1705861145407-62f12184e563"),
    leadership: buildUnsplashUrl("1695956353120-54ce5e91632b"),
    international: buildUnsplashUrl("1512453979798-5ea266f8880c"),
  },
  formats: {
    udaipurLeadership: CITY_PALACE_UDAIPUR_IMAGE,
    jaipurDealer: buildUnsplashUrl("1705861145407-62f12184e563"),
    goaOffsite: buildUnsplashUrl("1507525428034-b723cf961d3e"),
    jaisalmerIncentive: buildUnsplashUrl("1709620220232-12ecd7ca33a8"),
    manaliRetreat: buildUnsplashUrl("1464822759023-fed622ff2c3b"),
    dubaiIncentive: buildUnsplashUrl("1512453979798-5ea266f8880c"),
  },
} as const;
