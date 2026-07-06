"use client";

import { useState } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leads-api";
import { LEAD_QUOTE_CONFIRMATION_MESSAGE } from "@bmv/shared";

import { buildMiceInquiryMessage } from "@/lib/mice-inquiry";

export function MiceInquiryForm() {
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
          eventType: String(form.get("eventType") ?? "").trim(),
          groupSize: String(form.get("groupSize") ?? "").trim(),
          preferredDates: String(form.get("preferredDates") ?? "").trim(),
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
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-6 text-teal-900">
        <p className="font-semibold">MICE inquiry received</p>
        <p className="mt-2 text-sm">{LEAD_QUOTE_CONFIRMATION_MESSAGE}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="mice-inquiry-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm font-medium">
            Company name *
          </label>
          <input
            id="company"
            name="company"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Contact person *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium">
            Event type *
          </label>
          <input
            id="eventType"
            name="eventType"
            required
            placeholder="Conference, incentive trip, offsite…"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="groupSize" className="block text-sm font-medium">
            Estimated group size *
          </label>
          <input
            id="groupSize"
            name="groupSize"
            type="number"
            min={1}
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="preferredDates" className="block text-sm font-medium">
            Preferred dates
          </label>
          <input
            id="preferredDates"
            name="preferredDates"
            placeholder="Month or date range"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Additional details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
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

      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? "Sending…" : "Submit MICE inquiry"}
      </button>
    </form>
  );
}
