"use client";

import { useEffect, useMemo, useState } from "react";
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

export function VacationMeterClient() {
  const [options, setOptions] = useState<MeterOptions | null>(null);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [adults, setAdults] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [pacingSlider, setPacingSlider] = useState(50);
  const [totalNights, setTotalNights] = useState(3);
  const [pickupTime, setPickupTime] = useState("09:00");
  const [dropoffTime, setDropoffTime] = useState("18:00");
  const [travelDate, setTravelDate] = useState(defaultTravelDate);
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
      const tiers = resolveVehicleTiers(data?.vehicleTiers);
      if (tiers[0]?.name) setSelectedVehicle(tiers[0].name);
      if (data?.destinations.some((d) => d.slug === "udaipur")) {
        setSelectedSlugs(["udaipur"]);
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
    options?.destinations.filter((d) => selectedSlugs.includes(d.slug)).map((d) => d.name) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900">Vacation Feasibility Radar</h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Plan your Rajasthan route, see real-time feasibility, and request a custom quote with an
          indicative price estimate.
        </p>
        {options?.disclaimer && <p className="mt-2 text-xs text-stone-500">{options.disclaimer}</p>}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <VacationRadarSidebar
          destinations={options?.destinations ?? []}
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
          onPickupTimeChange={setPickupTime}
          onDropoffTimeChange={setDropoffTime}
          onTravelDateChange={setTravelDate}
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

          {error && <p className="text-sm text-red-600">{error}</p>}

          {estimate && (
            <section className="rounded-2xl border border-teal-200 bg-teal-50 p-6">
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
          )}

          {showQuote && estimate && (
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold text-teal-900">Custom quote request</h3>
              <p className="mt-1 text-sm text-stone-600">
                Share your details and our travel team will refine this itinerary for you.
              </p>
              <div className="mt-4">
                <QuoteForm
                  source="vacation_meter"
                  defaultTravelDate={travelDate}
                  defaultStartCity={selectedCityNames[0]}
                  defaultMessage={`Vacation Radar: ${selectedCityNames.join(" → ")}. Feasibility ${estimate.feasibility.feasibilityScore}% (${estimate.feasibility.descriptor}). Estimate: ${formatMeterEstimate(estimate)}. Vehicle: ${selectedVehicle}.`}
                  meterSnapshot={{
                    destinationSlugs: selectedSlugs,
                    estimate,
                    sessionId: estimate.sessionId,
                  }}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
