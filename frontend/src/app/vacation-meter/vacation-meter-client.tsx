"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateVacationFeasibility,
  pacingFromSlider,
  type FeasibilityResult,
} from "@bmv/shared";
import { FeasibilityEnginePanel } from "@/components/feasibility-engine-panel";
import { QuoteForm } from "@/components/quote-form";
import { VacationRadarSidebar } from "@/components/vacation-radar-sidebar";
import { formatMeterEstimate } from "@/lib/format-meter";
import {
  calculateMeter,
  fetchMeterOptions,
  METER_OPTIONS_FALLBACK,
  type MeterEstimate,
  type MeterOptions,
} from "@/lib/meter-api";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { formatInrPrice } from "@/lib/format";
import { DEFAULT_METER_VEHICLE_TIERS, resolveVehicleTiers } from "@/lib/meter-vehicle-tiers";

function defaultTravelDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}

const POPULAR_ROUTES = [
  {
    title: "Jaipur → Udaipur",
    text: "Classic first-timer route with forts and lakes.",
    slugs: ["jaipur", "udaipur"],
  },
  {
    title: "Jodhpur → Jaisalmer",
    text: "Desert forts, dunes, and golden-hour cities.",
    slugs: ["jodhpur", "jaisalmer"],
  },
  {
    title: "Udaipur → Mount Abu",
    text: "Lakeside romance plus a cool hill escape.",
    slugs: ["udaipur", "mount-abu"],
  },
] as const;

export function VacationMeterClient() {
  const [options, setOptions] = useState<MeterOptions>(METER_OPTIONS_FALLBACK);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["jaipur", "udaipur"]);
  const [adults, setAdults] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [pacingSlider, setPacingSlider] = useState(50);
  const [totalNights, setTotalNights] = useState(4);
  const [pickupTime, setPickupTime] = useState("09:00");
  const [dropoffTime, setDropoffTime] = useState("18:00");
  const [travelDate, setTravelDate] = useState(defaultTravelDate);
  const [dropDate, setDropDate] = useState(defaultTravelDate);
  const [pickupCity, setPickupCity] = useState("Jaipur");
  const [dropCity, setDropCity] = useState("Udaipur");
  const [travellerName, setTravellerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(DEFAULT_METER_VEHICLE_TIERS[0]!.name);
  const [estimate, setEstimate] = useState<MeterEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const vehicleTiers = resolveVehicleTiers(options?.vehicleTiers);
  const pacing = pacingFromSlider(pacingSlider);

  useEffect(() => {
    fetchMeterOptions().then((data) => {
      setOptions(data);
      const tiers = resolveVehicleTiers(data.vehicleTiers);
      if (tiers[0]?.name) setSelectedVehicle(tiers[0].name);
      const hasJaipur = data.destinations.some((d) => d.slug === "jaipur");
      const hasUdaipur = data.destinations.some((d) => d.slug === "udaipur");
      if (hasJaipur && hasUdaipur) {
        setSelectedSlugs(["jaipur", "udaipur"]);
      } else if (hasUdaipur) {
        setSelectedSlugs(["udaipur"]);
      } else if (data.destinations[0]?.slug) {
        setSelectedSlugs([data.destinations[0].slug]);
      }
    });
  }, []);

  const liveFeasibility: FeasibilityResult | null = useMemo(() => {
    if (selectedSlugs.length === 0) return null;
    return calculateVacationFeasibility({
      destinationSlugs: selectedSlugs,
      totalNights,
      pickupTime,
      dropoffTime,
      pacing,
      adults,
      children: childCount,
    });
  }, [selectedSlugs, totalNights, pickupTime, dropoffTime, pacing, adults, childCount]);

  function toggleDestination(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((s) => s !== slug);
      return [...current, slug];
    });
    setEstimate(null);
    setShowQuote(false);
  }

  function applyPopularRoute(slugs: readonly string[]) {
    setSelectedSlugs([...slugs]);
    setEstimate(null);
    setShowQuote(false);
  }

  async function handleSubmit() {
    setError(null);
    setEstimate(null);
    setShowQuote(false);

    if (selectedSlugs.length === 0) {
      setError("Select at least one destination.");
      return;
    }

    setLoading(true);
    try {
      const result = await calculateMeter({
        destinationSlugs: selectedSlugs,
        totalNights,
        pickupTime,
        dropoffTime,
        travelDate,
        vehicleTierName: selectedVehicle,
        adults,
        children: childCount,
        pacing,
      });
      setEstimate(result);
      setShowQuote(true);
      trackEvent(ANALYTICS_EVENTS.meter_complete, {
        destinations: selectedSlugs.join(","),
        feasibility: result.feasibility.feasibilityScore,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed");
    } finally {
      setLoading(false);
    }
  }

  const selectedCityNames =
    options.destinations.filter((d) => selectedSlugs.includes(d.slug)).map((d) => d.name);

  return (
    <div className="bg-gradient-to-b from-teal-50/60 via-stone-50 to-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Vacation Meter
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
            Vacation Feasibility Radar
          </h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            Plan your Rajasthan route, see real-time feasibility, and request a custom quote with an
            indicative price estimate.
          </p>
          {options.disclaimer ? (
            <p className="mt-2 text-xs text-stone-500">{options.disclaimer}</p>
          ) : null}
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start">
          <VacationRadarSidebar
            destinations={options.destinations}
            selectedSlugs={selectedSlugs}
            onToggleDestination={toggleDestination}
            adults={adults}
            childCount={childCount}
            onAdultsChange={setAdults}
            onChildCountChange={setChildCount}
            pacingSlider={pacingSlider}
            onPacingSliderChange={setPacingSlider}
            totalNights={totalNights}
            onTotalNightsChange={setTotalNights}
            pickupTime={pickupTime}
            dropoffTime={dropoffTime}
            travelDate={travelDate}
            dropDate={dropDate}
            onPickupTimeChange={setPickupTime}
            onDropoffTimeChange={setDropoffTime}
            onTravelDateChange={setTravelDate}
            onDropDateChange={setDropDate}
            pickupCity={pickupCity}
            dropCity={dropCity}
            onPickupCityChange={setPickupCity}
            onDropCityChange={setDropCity}
            travellerName={travellerName}
            phone={phone}
            onTravellerNameChange={setTravellerName}
            onPhoneChange={setPhone}
            vehicleTierName={selectedVehicle}
            vehicleTiers={vehicleTiers}
            onVehicleChange={setSelectedVehicle}
          />

          <div className="space-y-6">
            <FeasibilityEnginePanel
              feasibility={liveFeasibility}
              loading={loading}
              onSubmit={handleSubmit}
              submitDisabled={selectedSlugs.length === 0 || !selectedVehicle}
            />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            {estimate ? (
              <section className="animate-[hero-image-reveal_0.55s_ease-out] rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-[0_12px_30px_rgba(15,118,110,0.12)]">
                <h2 className="text-lg font-semibold text-teal-900">Your indicative estimate</h2>
                <p className="mt-2 text-2xl font-bold text-teal-800">{formatMeterEstimate(estimate)}</p>
                <ul className="mt-4 space-y-1 text-sm text-stone-700">
                  {estimate.breakdown.map((line) => (
                    <li key={line.label} className="flex justify-between gap-4">
                      <span>{line.label}</span>
                      <span>{formatInrPrice(line.amount, true)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-stone-600">{estimate.disclaimer}</p>
              </section>
            ) : null}

            {showQuote && estimate ? (
              <section className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="font-semibold text-teal-900">Custom quote request</h3>
                <p className="mt-1 text-sm text-stone-600">
                  Share your details and our travel team will refine this itinerary for you.
                </p>
                <div className="mt-4">
                  <QuoteForm
                    source="vacation_meter"
                    defaultTravelDate={travelDate}
                    defaultStartCity={pickupCity || selectedCityNames[0]}
                    defaultEndCity={dropCity || selectedCityNames.at(-1)}
                    defaultFullName={travellerName}
                    defaultPhone={phone}
                    defaultMessage={`Vacation Radar: ${selectedCityNames.join(" → ")}. Feasibility ${estimate.feasibility.feasibilityScore}% (${estimate.feasibility.descriptor}). Estimate: ${formatMeterEstimate(estimate)}. Vehicle: ${selectedVehicle}. Pickup ${pickupCity || "—"} → Drop ${dropCity || "—"}.`}
                    meterSnapshot={{
                      destinationSlugs: selectedSlugs,
                      estimate,
                      sessionId: estimate.sessionId,
                      pickupCity,
                      dropCity,
                      dropDate,
                    }}
                  />
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8" aria-label="Popular routes">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                Start faster
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-teal-950">Popular routes</h2>
            </div>
            <Link href="/packages" className="text-sm font-semibold text-teal-800 hover:underline">
              Browse all packages →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {POPULAR_ROUTES.map((route) => (
              <button
                key={route.title}
                type="button"
                onClick={() => applyPopularRoute(route.slugs)}
                className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 text-left transition hover:border-teal-300 hover:bg-teal-50/60"
              >
                <p className="font-serif text-base font-semibold text-teal-950">{route.title}</p>
                <p className="mt-1 text-sm text-stone-600">{route.text}</p>
                <p className="mt-3 text-xs font-semibold text-teal-800">Use this route</p>
              </button>
            ))}
          </div>
        </section>

        <section
          className="mt-6 grid gap-4 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-amber-50/40 p-6 sm:grid-cols-3 sm:gap-6 sm:p-8"
          aria-label="How Vacation Meter works"
        >
          {[
            {
              step: "01",
              title: "Pick destinations",
              text: "Choose cities, nights, and pacing that match your trip style.",
            },
            {
              step: "02",
              title: "Check feasibility",
              text: "See real-time route fit, distance, and travel time before you book.",
            },
            {
              step: "03",
              title: "Request a custom quote",
              text: "Submit once — our team refines hotels, transfers, and the final plan.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-xs font-semibold tracking-[0.2em] text-teal-700">{item.step}</p>
              <h2 className="mt-2 font-serif text-lg font-semibold text-teal-950">{item.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
