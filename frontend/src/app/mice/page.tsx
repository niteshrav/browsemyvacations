import type { Metadata } from "next";
import Link from "next/link";
import { ContactDetails } from "@/components/contact-details";
import { MiceInquiryForm } from "@/components/mice-inquiry-form";

export const metadata: Metadata = {
  title: "MICE",
  description: "Meetings, incentives, conferences, and events travel across Rajasthan.",
};

const MICE_OFFERINGS = [
  "Corporate offsites and leadership retreats in Jaipur, Udaipur, and Jodhpur",
  "Incentive travel programs with curated stays, dining, and heritage experiences",
  "Conference support — venue shortlists, group transfers, and on-ground coordination",
  "Team-building itineraries combining palaces, desert camps, and cultural evenings",
] as const;

export default function MicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-teal-900">MICE Travel</h1>
      <p className="mt-4 text-stone-600">
        Plan meetings, incentives, conferences, and events across Rajasthan with a dedicated BMV
        corporate travel desk.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-teal-900">Corporate offerings</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          {MICE_OFFERINGS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-teal-900">Talk to our MICE desk</h2>
        <p className="mt-2 text-sm text-stone-600">
          Call us directly or submit the inquiry form — we will respond within 24–48 hours.
        </p>
        <div className="mt-4">
          <ContactDetails />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-teal-900">MICE inquiry form</h2>
        <div className="mt-4">
          <MiceInquiryForm />
        </div>
      </section>

      <Link href="/contact" className="mt-8 inline-block text-teal-700 hover:underline">
        General contact page →
      </Link>
    </div>
  );
}
