"use client";

import { useState } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leads-api";
import { LEAD_QUOTE_CONFIRMATION_MESSAGE } from "@bmv/shared";

import { buildMiceInquiryMessage } from "@/lib/mice-inquiry";

type Props = {
  submitLabel?: string;
  requirementTypes?: string[];
};

const inputClassName =
  "mt-1 w-full rounded-xl border border-stone-200 bg-white/80 px-4 py-2.5 text-stone-800 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

export function MiceInquiryForm({
  submitLabel = "Submit Proposal Request",
  requirementTypes = [
    "Corporate Offsite",
    "Incentive Travel",
    "Conference / Annual Meet",
    "Dealer Meet",
    "Leadership Retreat",
    "International Corporate Travel",
    "Other",
  ],
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await submitLead({
        fullName: String(form.get("fullName") ?? "").trim(),
        email,
        phone: String(form.get("phone") ?? "").trim(),
        persons: Number(String(form.get("groupSize") ?? "").trim()) || undefined,
        message: buildMiceInquiryMessage({
          company: String(form.get("company") ?? "").trim(),
          contactPerson: String(form.get("fullName") ?? "").trim(),
          destination: String(form.get("destination") ?? "").trim(),
          groupSize: String(form.get("groupSize") ?? "").trim(),
          travelDates: String(form.get("travelDates") ?? "").trim(),
          budget: String(form.get("budget") ?? "").trim(),
          requirementType: String(form.get("requirementType") ?? "").trim(),
          message: String(form.get("message") ?? "").trim(),
        }),
        source: "mice",
        marketingConsent: form.get("marketingConsent") === "on",
      });
      trackEvent(ANALYTICS_EVENTS.quote_submit, { source: "mice" });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-6 text-teal-900 backdrop-blur-sm">
        <p className="font-semibold">MICE proposal request received</p>
        <p className="mt-2 text-sm">{LEAD_QUOTE_CONFIRMATION_MESSAGE}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="mice-inquiry-form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm font-medium text-stone-700">
            Company Name *
          </label>
          <input id="company" name="company" required className={inputClassName} />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-stone-700">
            Contact Person *
          </label>
          <input id="fullName" name="fullName" required className={inputClassName} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
            Phone *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClassName} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClassName} />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-stone-700">
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            placeholder="Udaipur, Goa, Dubai…"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="groupSize" className="block text-sm font-medium text-stone-700">
            Group Size *
          </label>
          <input id="groupSize" name="groupSize" type="number" min={1} required className={inputClassName} />
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
          <label htmlFor="budget" className="block text-sm font-medium text-stone-700">
            Budget
          </label>
          <input id="budget" name="budget" placeholder="Approximate budget range" className={inputClassName} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirementType" className="block text-sm font-medium text-stone-700">
            Requirement Type *
          </label>
          <select id="requirementType" name="requirementType" required className={inputClassName} defaultValue="">
            <option value="" disabled>
              Select requirement type
            </option>
            {requirementTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-stone-700">
            Additional Notes
          </label>
          <textarea id="message" name="message" rows={4} className={inputClassName} />
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-stone-600">
        <input type="checkbox" name="marketingConsent" className="mt-1" />
        <span>
          I agree to receive occasional updates about packages and offers. See our{" "}
          <Link href="/privacy" className="text-teal-800 hover:underline">
            privacy policy
          </Link>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full px-6 py-3.5 text-base sm:w-auto">
        {submitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
