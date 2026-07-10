import { BMV_CONTACT } from "./contact-info";
import { MARKETING_IMAGES } from "./marketing-images";

export const CONTACT_TRAVEL_TYPES = [
  "Holiday",
  "Honeymoon",
  "Family Trip",
  "Corporate",
  "MICE",
  "Custom Tour",
] as const;

export type ContactTravelType = (typeof CONTACT_TRAVEL_TYPES)[number];

export const CONTACT_PAGE = {
  metadata: {
    title: "Contact Us",
    description:
      "Speak with Browse My Vacations travel experts for holidays, honeymoons, family trips, corporate retreats, and MICE events across Rajasthan and beyond.",
  },
  hero: {
    heading: "Let's Plan Your Next Journey",
    description:
      "Whether you're planning a holiday, honeymoon, family vacation, corporate retreat or MICE event, our travel experts are here to help.",
    primaryCta: { label: "Get Quote", href: "#contact-form" },
    secondaryCta: { label: "Call Us", href: BMV_CONTACT.telHref },
    image: MARKETING_IMAGES.contactHero,
    imageAlt: "Amber Fort and Jaipur skyline at golden hour in Rajasthan",
  },
  contactInfo: {
    eyebrow: "Reach Us",
    heading: "We're Here To Help You Travel Better",
    description:
      "Call, email, or visit our Jaipur office — our team responds quickly with tailored recommendations and transparent pricing.",
  },
  form: {
    eyebrow: "Plan With Us",
    heading: "Tell Us About Your Trip",
    description:
      "Share your travel preferences and our experts will craft a personalized itinerary with hotel options, transfers, and experiences.",
    submitLabel: "Send Inquiry",
    privacyLabel: "I agree to the Privacy Policy.",
  },
  whyContact: {
    eyebrow: "The BMV Difference",
    heading: "Why Contact Us",
    description:
      "From quick weekend getaways to multi-city Rajasthan circuits and corporate events, we bring hospitality-grade planning to every journey.",
    items: [
      {
        id: "expert-planning",
        title: "Expert Travel Planning",
        description:
          "Destination specialists with deep knowledge of Rajasthan, Goa, the Himalayas, and international routes — not generic call-center scripts.",
      },
      {
        id: "custom-packages",
        title: "Customized Packages",
        description:
          "Every itinerary is built around your dates, budget, and travel style — with handpicked stays and experiences, not one-size-fits-all templates.",
      },
      {
        id: "fast-response",
        title: "Fast Response",
        description:
          "We aim to respond within 24 hours on business days with a clear proposal, options, and next steps — so you can decide with confidence.",
      },
      {
        id: "assistance",
        title: "24×7 Assistance",
        description:
          "On-trip support when you need it — from transfer coordination to last-minute changes — backed by Browser Hotels' regional network.",
      },
    ],
  },
  map: {
    eyebrow: "Our Office",
    heading: "Visit Us In Jaipur",
    description:
      "Stop by our C-Scheme office to discuss your travel plans in person. We recommend calling ahead to schedule a consultation with our team.",
    embedUrl:
      "https://maps.google.com/maps?q=C-Scheme,+Jaipur,+Rajasthan+302001&t=&z=15&ie=UTF8&iwloc=&output=embed",
    title: "Browse My Vacations office location on Google Maps",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Frequently Asked Questions",
    description: "Quick answers before you reach out — we're happy to clarify anything over phone or WhatsApp.",
    items: [
      {
        id: "booking",
        question: "How do I book?",
        answer:
          "Submit the inquiry form above or call us directly. Our travel expert will share a customized quote with hotel options, transfers, and inclusions. Once you approve the itinerary and pay the agreed deposit, we confirm your booking and share vouchers and contact details for on-ground support.",
      },
      {
        id: "customize",
        question: "Can I customize my package?",
        answer:
          "Absolutely. Every Browse My Vacations itinerary can be tailored — change hotels, add experiences, adjust nights per city, or combine Rajasthan with Goa, the hills, or international destinations. Tell us your preferences and we'll build options around your budget.",
      },
      {
        id: "mice",
        question: "Do you organize MICE events?",
        answer:
          "Yes. We plan corporate offsites, dealer meets, annual conferences, incentive travel, and leadership retreats across Rajasthan, Goa, the Himalayas, and select international destinations. Visit our MICE page or mention Corporate / MICE in the travel type field for a dedicated proposal.",
      },
      {
        id: "payment",
        question: "What payment methods are accepted?",
        answer:
          "We accept bank transfer (NEFT/RTGS/IMPS), UPI, and major debit/credit cards for deposits and balance payments. Payment schedules are shared clearly in your quote — typically a booking deposit to confirm, with the balance due before travel as per the agreed terms.",
      },
      {
        id: "cancel",
        question: "Can I cancel or reschedule?",
        answer:
          "Cancellation and rescheduling depend on hotel, airline, and vendor policies for your specific booking. Our team will explain applicable charges before you confirm. We always recommend travel insurance for added flexibility on unforeseen changes.",
      },
    ],
  },
  cta: {
    heading: "Ready to Explore Rajasthan?",
    image: MARKETING_IMAGES.contactCta,
    imageAlt: "Palace courtyard and heritage architecture in Rajasthan",
    primaryCta: { label: "Explore Packages", href: "/packages" },
    secondaryCta: { label: "WhatsApp Us", href: "whatsapp" as const },
  },
  stickyCta: {
    callLabel: "Call Us",
    quoteLabel: "Get Quote",
    quoteHref: "#contact-form",
  },
} as const;
