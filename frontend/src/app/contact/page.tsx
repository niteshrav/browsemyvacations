"use client";

import { QuoteForm } from "@/components/quote-form";
import { ContactDetails } from "@/components/contact-details";

export default function ContactPageContent() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-teal-900">Contact Us</h1>
      <p className="mt-2 text-stone-600">
        Send us a message and our team will get back to you within 24–48 hours.
      </p>
      <div className="mt-6">
        <ContactDetails showFormHint />
      </div>
      <div className="mt-8">
        <QuoteForm source="contact" />
      </div>
    </div>
  );
}
