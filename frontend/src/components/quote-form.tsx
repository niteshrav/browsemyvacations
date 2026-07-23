"use client";

import { useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { submitLead, type CreateLeadPayload } from "@/lib/leads-api";
import Link from "next/link";

type Props = {
  source: CreateLeadPayload["source"];
  packageSlug?: string;
  packageTitle?: string;
  defaultTravelDate?: string;
  defaultStartCity?: string;
  defaultEndCity?: string;
  defaultFullName?: string;
  defaultPhone?: string;
  defaultMessage?: string;
  meterSnapshot?: Record<string, unknown>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function QuoteForm({
  source,
  packageSlug,
  packageTitle,
  defaultTravelDate,
  defaultStartCity,
  defaultEndCity,
  defaultFullName,
  defaultPhone,
  defaultMessage,
  meterSnapshot,
  onSuccess,
  onCancel,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneVal = String(form.get("phone") ?? "").trim();
    if (phoneVal.length < 6) {
      setError("Please enter a valid phone number (minimum 6 digits).");
      return;
    }

    setSubmitting(true);
    try {
      const personsRaw = String(form.get("persons") ?? "").trim();
      const roomsRaw = String(form.get("rooms") ?? "").trim();
      const result = await submitLead({
        fullName: String(form.get("fullName") ?? "").trim(),
        email,
        phone: String(form.get("phone") ?? "").trim(),
        travelDate: String(form.get("travelDate") ?? "").trim() || undefined,
        startCity: String(form.get("startCity") ?? "").trim() || undefined,
        endCity: String(form.get("endCity") ?? "").trim() || undefined,
        persons: personsRaw ? Number(personsRaw) : undefined,
        rooms: roomsRaw ? Number(roomsRaw) : undefined,
        vehiclePreference: String(form.get("vehiclePreference") ?? "").trim() || undefined,
        message: String(form.get("message") ?? "").trim() || undefined,
        source,
        packageSlug,
        meterSnapshot,
        marketingConsent: form.get("marketingConsent") === "on",
      });
      trackEvent(ANALYTICS_EVENTS.quote_submit, { source });
      setConfirmation(result.message);
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (done && confirmation) {
    return (
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-6 text-teal-900">
        <p className="font-semibold">Request received</p>
        <p className="mt-2 text-sm">{confirmation}</p>
      </div>
    );
  }

  const isPackageQuote =
    source === "package_card" || source === "package_detail" || source === "vacation_meter";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {packageTitle && (
        <p className="text-sm text-stone-600">
          Package: <span className="font-medium text-stone-800">{packageTitle}</span>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            defaultValue={defaultFullName}
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
            defaultValue={defaultPhone}
            placeholder="+91 98765 43210"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        {isPackageQuote && (
          <>
            <div>
              <label htmlFor="travelDate" className="block text-sm font-medium">
                Date to travel
              </label>
            <input
              id="travelDate"
              name="travelDate"
              type="date"
              defaultValue={defaultTravelDate}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            />
            </div>
            <div>
              <label htmlFor="persons" className="block text-sm font-medium">
                Number of persons
              </label>
              <input
                id="persons"
                name="persons"
                type="number"
                min={1}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="startCity" className="block text-sm font-medium">
                Start city
              </label>
              <input
                id="startCity"
                name="startCity"
                defaultValue={defaultStartCity}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="endCity" className="block text-sm font-medium">
                End city
              </label>
              <input
                id="endCity"
                name="endCity"
                defaultValue={defaultEndCity}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="rooms" className="block text-sm font-medium">
                Rooms needed
              </label>
              <input
                id="rooms"
                name="rooms"
                type="number"
                min={1}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="vehiclePreference" className="block text-sm font-medium">
                Vehicle preference
              </label>
              <input
                id="vehiclePreference"
                name="vehiclePreference"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            defaultValue={defaultMessage}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="marketingConsent"
            className="mt-1 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
          />
          <span>
            I agree to receive occasional updates about packages and offers. See our{" "}
            <Link href="/privacy" className="text-teal-700 underline hover:text-teal-800">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Get Quote"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-6 py-3 text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
        )}
      </div>
      <p className="text-xs text-stone-500">
        Final pricing is confirmed by our travel team after reviewing your request.
      </p>
    </form>
  );
}
