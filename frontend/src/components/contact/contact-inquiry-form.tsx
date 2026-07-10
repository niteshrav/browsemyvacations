"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT_PAGE, CONTACT_TRAVEL_TYPES, LEAD_QUOTE_CONFIRMATION_MESSAGE, BMV_CONTACT } from "@bmv/shared";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  buildContactInquiryMessage,
  isValidContactEmail,
  isValidContactPhone,
} from "@/lib/contact-inquiry";
import { submitLead, API_UNREACHABLE_MESSAGE } from "@/lib/leads-api";
import { ContactIcon, FormToast, LoadingSpinner } from "./contact-ui";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-stone-800 shadow-sm backdrop-blur-sm transition placeholder:text-stone-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20";

export function ContactInquiryForm() {
  const { form } = CONTACT_PAGE;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const privacyConsent = formData.get("privacyConsent") === "on";

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidContactEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidContactPhone(phone)) {
      setError("Please enter a valid phone number (at least 6 digits).");
      return;
    }
    if (!privacyConsent) {
      setError("Please agree to the Privacy Policy to continue.");
      return;
    }

    const destination = String(formData.get("destination") ?? "").trim();
    const travelDates = String(formData.get("travelDates") ?? "").trim();
    const personsRaw = String(formData.get("persons") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const travelType = String(formData.get("travelType") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setSubmitting(true);
    try {
      const result = await submitLead({
        fullName,
        email,
        phone,
        persons: personsRaw ? Number(personsRaw) : undefined,
        message: buildContactInquiryMessage({
          destination,
          travelDates,
          budget,
          travelType,
          message,
        }),
        source: "contact",
        marketingConsent: formData.get("marketingConsent") === "on",
      });
      trackEvent(ANALYTICS_EVENTS.quote_submit, { source: "contact" });
      setDone(true);
      setToastMessage(result.message || LEAD_QUOTE_CONFIRMATION_MESSAGE);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact-form" className="scroll-mt-24 bg-gradient-to-b from-teal-50/50 to-white py-16 sm:py-20" aria-labelledby="contact-form-heading">
      <div className="site-container">
        <SectionHeading eyebrow={form.eyebrow} title={form.heading} description={form.description} />

        <div className="mx-auto mt-12 max-w-4xl">
          {done ? (
            <div
              className="rounded-2xl border border-teal-200 bg-teal-50/90 p-8 text-center shadow-sm backdrop-blur-sm"
              data-testid="contact-form-success"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <ContactIcon name="response" className="h-7 w-7" />
              </span>
              <p className="mt-4 text-xl font-semibold text-teal-900">Request received</p>
              <p className="mt-2 text-sm leading-relaxed text-teal-800 sm:text-base">
                {LEAD_QUOTE_CONFIRMATION_MESSAGE}
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="btn-secondary mt-6 px-6 py-3"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/80 bg-white/40 p-6 shadow-xl shadow-teal-900/5 backdrop-blur-md sm:p-8"
              data-testid="contact-inquiry-form"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-stone-700">
                    Full Name *
                  </label>
                  <input id="fullName" name="fullName" required autoComplete="name" className={inputClassName} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-stone-700">
                    Destination Interested In
                  </label>
                  <input
                    id="destination"
                    name="destination"
                    placeholder="Jaipur, Udaipur, Goa…"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="travelDates" className="block text-sm font-medium text-stone-700">
                    Travel Dates
                  </label>
                  <input
                    id="travelDates"
                    name="travelDates"
                    placeholder="Month or date range"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="persons" className="block text-sm font-medium text-stone-700">
                    Number of Travelers
                  </label>
                  <input id="persons" name="persons" type="number" min={1} className={inputClassName} />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-stone-700">
                    Budget
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    placeholder="Approximate budget range"
                    className={inputClassName}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="travelType" className="block text-sm font-medium text-stone-700">
                    Travel Type *
                  </label>
                  <select id="travelType" name="travelType" required className={inputClassName} defaultValue="">
                    <option value="" disabled>
                      Select travel type
                    </option>
                    {CONTACT_TRAVEL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={4} className={inputClassName} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-start gap-2 text-sm text-stone-600">
                  <input type="checkbox" name="privacyConsent" required className="mt-1 rounded border-stone-300 text-teal-700 focus:ring-teal-500" />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="font-medium text-teal-800 underline hover:text-teal-900">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <label className="flex items-start gap-2 text-sm text-stone-600">
                  <input type="checkbox" name="marketingConsent" className="mt-1 rounded border-stone-300 text-teal-700 focus:ring-teal-500" />
                  <span>I agree to receive occasional updates about packages and offers.</span>
                </label>
              </div>

              {error ? (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  <p>{error}</p>
                  {error === API_UNREACHABLE_MESSAGE ? (
                    <p className="mt-2">
                      Call{" "}
                      <a href={BMV_CONTACT.telHref} className="font-semibold underline">
                        {BMV_CONTACT.phoneDisplay}
                      </a>{" "}
                      or use the WhatsApp button below.
                    </p>
                  ) : null}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-6 flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner />
                    Sending…
                  </>
                ) : (
                  form.submitLabel
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {toastMessage ? <FormToast message={toastMessage} onDismiss={() => setToastMessage(null)} /> : null}
    </section>
  );
}
