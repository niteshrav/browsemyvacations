"use client";

import { useMemo, useState } from "react";
import type { MeterOptions } from "@/lib/meter-api";
import { pacingFromSlider, pacingLabel, type MeterPacing } from "@bmv/shared";
import { RajasthanCityCombobox } from "@/components/rajasthan-city-combobox";

type Props = {
  destinations: MeterOptions["destinations"];
  selectedSlugs: string[];
  onToggleDestination: (slug: string) => void;
  adults: number;
  childCount: number;
  onAdultsChange: (value: number) => void;
  onChildCountChange: (value: number) => void;
  pacingSlider: number;
  onPacingSliderChange: (value: number) => void;
  totalNights: number;
  onTotalNightsChange: (value: number) => void;
  pickupTime: string;
  dropoffTime: string;
  travelDate: string;
  dropDate: string;
  onPickupTimeChange: (value: string) => void;
  onDropoffTimeChange: (value: string) => void;
  onTravelDateChange: (value: string) => void;
  onDropDateChange: (value: string) => void;
  pickupCity: string;
  dropCity: string;
  onPickupCityChange: (value: string) => void;
  onDropCityChange: (value: string) => void;
  travellerName: string;
  phone: string;
  onTravellerNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  vehicleTierName: string;
  vehicleTiers: Array<{ name: string; multiplier: number }>;
  onVehicleChange: (value: string) => void;
};

const STEPS = ["Destinations", "Trip details", "Traveller"] as const;

const fieldClass =
  "mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

export function VacationRadarSidebar({
  destinations,
  selectedSlugs,
  onToggleDestination,
  adults,
  childCount,
  onAdultsChange,
  onChildCountChange,
  pacingSlider,
  onPacingSliderChange,
  totalNights,
  onTotalNightsChange,
  pickupTime,
  dropoffTime,
  travelDate,
  dropDate,
  onPickupTimeChange,
  onDropoffTimeChange,
  onTravelDateChange,
  onDropDateChange,
  pickupCity,
  dropCity,
  onPickupCityChange,
  onDropCityChange,
  travellerName,
  phone,
  onTravellerNameChange,
  onPhoneChange,
  vehicleTierName,
  vehicleTiers,
  onVehicleChange,
}: Props) {
  const pacing: MeterPacing = pacingFromSlider(pacingSlider);
  const [step, setStep] = useState(0);
  const [destQuery, setDestQuery] = useState("");

  const filteredDestinations = useMemo(() => {
    const q = destQuery.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter((dest) => dest.name.toLowerCase().includes(q));
  }, [destinations, destQuery]);

  const selectedDestinations = destinations.filter((dest) => selectedSlugs.includes(dest.slug));

  return (
    <aside className="rounded-3xl border border-teal-100 bg-gradient-to-b from-teal-50/80 via-white to-white p-5 shadow-[0_16px_40px_rgba(15,118,110,0.08)]">
      <h2 className="text-xs font-bold tracking-widest text-teal-800">YOUR VACATION RADAR</h2>

      <ol className="mt-4 grid grid-cols-3 gap-2">
        {STEPS.map((label, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => setStep(index)}
                className={`w-full rounded-xl border px-2 py-2 text-[11px] font-semibold transition ${
                  active
                    ? "border-teal-700 bg-teal-800 text-white"
                    : done
                      ? "border-teal-200 bg-teal-50 text-teal-800"
                      : "border-stone-200 bg-white text-stone-500"
                }`}
              >
                {index + 1}. {label}
              </button>
            </li>
          );
        })}
      </ol>

      {step === 0 ? (
        <section className="mt-5">
          <h3 className="text-sm font-semibold text-stone-800">1. Select Destinations</h3>
          <label htmlFor="destination-search" className="mt-3 block text-xs text-stone-600">
            Search destinations
          </label>
          <input
            id="destination-search"
            type="search"
            value={destQuery}
            onChange={(event) => setDestQuery(event.target.value)}
            placeholder="Search city or destination"
            className={fieldClass}
          />

          {selectedDestinations.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedDestinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => onToggleDestination(dest.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-900"
                >
                  {dest.name}
                  <span aria-hidden>×</span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
            {filteredDestinations.map((dest) => {
              const checked = selectedSlugs.includes(dest.slug);
              return (
                <label
                  key={dest.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                    checked
                      ? "border-teal-300 bg-teal-50"
                      : "border-stone-200 bg-white hover:border-teal-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleDestination(dest.slug)}
                    className="h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                  />
                  <span>{dest.name}</span>
                </label>
              );
            })}
          </div>

          <button
            type="button"
            className="btn-primary mt-5 w-full"
            onClick={() => setStep(1)}
            disabled={selectedSlugs.length === 0}
          >
            Continue
          </button>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-5 space-y-4">
          <h3 className="text-sm font-semibold text-stone-800">2. Trip details</h3>

          <div>
            <p className="text-xs font-medium text-stone-600">Pickup City</p>
            <RajasthanCityCombobox
              id="pickupCity"
              value={pickupCity}
              onChange={onPickupCityChange}
              placeholder="Pickup city"
              className="mt-1"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-600">Drop City</p>
            <RajasthanCityCombobox
              id="dropCity"
              value={dropCity}
              onChange={onDropCityChange}
              placeholder="Drop city"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="travelDate" className="block text-xs text-stone-600">
                Pickup Date
              </label>
              <input
                id="travelDate"
                type="date"
                value={travelDate}
                onChange={(e) => onTravelDateChange(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="pickupTime" className="block text-xs text-stone-600">
                Pickup Time
              </label>
              <input
                id="pickupTime"
                type="time"
                value={pickupTime}
                onChange={(e) => onPickupTimeChange(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="dropDate" className="block text-xs text-stone-600">
                Drop Date
              </label>
              <input
                id="dropDate"
                type="date"
                value={dropDate}
                onChange={(e) => onDropDateChange(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="dropoffTime" className="block text-xs text-stone-600">
                Drop Time
              </label>
              <input
                id="dropoffTime"
                type="time"
                value={dropoffTime}
                onChange={(e) => onDropoffTimeChange(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="totalNights" className="block text-xs text-stone-600">
              Total Nights Stay
            </label>
            <input
              id="totalNights"
              type="number"
              min={1}
              max={60}
              value={totalNights}
              onChange={(e) => onTotalNightsChange(Number(e.target.value))}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="vehicleTierName" className="block text-xs text-stone-600">
              Vehicle Preference
            </label>
            <select
              id="vehicleTierName"
              value={vehicleTierName}
              onChange={(e) => onVehicleChange(e.target.value)}
              className={fieldClass}
            >
              {vehicleTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="adults" className="block text-xs text-stone-600">
                Adults
              </label>
              <input
                id="adults"
                type="number"
                min={1}
                max={20}
                value={adults}
                onChange={(e) => onAdultsChange(Number(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-xs text-stone-600">
                Children
              </label>
              <input
                id="children"
                type="number"
                min={0}
                max={20}
                value={childCount}
                onChange={(e) => onChildCountChange(Number(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-stone-600">
              <span>RELAXED</span>
              <span>BUSY</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pacingSlider}
              onChange={(e) => onPacingSliderChange(Number(e.target.value))}
              className="mt-2 w-full accent-teal-700"
              aria-label="Trip pacing"
            />
            <p className="mt-1 text-center text-xs text-teal-800">{pacingLabel(pacing)}</p>
          </div>

          <div className="flex gap-2">
            <button type="button" className="btn-secondary flex-1" onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className="btn-primary flex-1" onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-5 space-y-4">
          <h3 className="text-sm font-semibold text-stone-800">3. Traveller</h3>
          <div>
            <label htmlFor="travellerName" className="block text-xs text-stone-600">
              Traveller Name
            </label>
            <input
              id="travellerName"
              type="text"
              value={travellerName}
              onChange={(e) => onTravellerNameChange(e.target.value)}
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label htmlFor="travellerPhone" className="block text-xs text-stone-600">
              Phone Number
            </label>
            <input
              id="travellerPhone"
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className={fieldClass}
              required
            />
          </div>
          <p className="text-xs leading-relaxed text-stone-500">
            Use Submit on the feasibility panel to calculate your route and open the custom quote
            form with these details.
          </p>
          <button type="button" className="btn-secondary w-full" onClick={() => setStep(1)}>
            Back
          </button>
        </section>
      ) : null}
    </aside>
  );
}
