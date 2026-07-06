"use client";

import type { MeterOptions } from "@/lib/meter-api";
import { pacingFromSlider, pacingLabel, type MeterPacing } from "@bmv/shared";

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
  onPickupTimeChange: (value: string) => void;
  onDropoffTimeChange: (value: string) => void;
  onTravelDateChange: (value: string) => void;
  vehicleTierName: string;
  vehicleTiers: Array<{ name: string; multiplier: number }>;
  onVehicleChange: (value: string) => void;
};

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
  onPickupTimeChange,
  onDropoffTimeChange,
  onTravelDateChange,
  vehicleTierName,
  vehicleTiers,
  onVehicleChange,
}: Props) {
  const pacing: MeterPacing = pacingFromSlider(pacingSlider);

  return (
    <aside className="rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-5 shadow-sm">
      <h2 className="text-xs font-bold tracking-widest text-sky-800">YOUR VACATION RADAR</h2>

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-stone-800">1. Select Destinations</h3>
        <div className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1">
          {destinations.map((dest) => {
            const checked = selectedSlugs.includes(dest.slug);
            return (
              <label
                key={dest.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm hover:border-teal-300"
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
      </section>

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-stone-800">2. Passenger Config</h3>
        <div className="mt-2 grid grid-cols-2 gap-3">
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
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
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
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-stone-800">3. Date / Pacing</h3>
        <label htmlFor="travelDate" className="mt-2 block text-xs text-stone-600">
          Travel date
        </label>
        <input
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(e) => onTravelDateChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
        <div className="mt-4">
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
      </section>

      <section className="mt-5 space-y-3">
        <div>
          <label htmlFor="totalNights" className="block text-xs text-stone-600">
            Total night stay
          </label>
          <input
            id="totalNights"
            type="number"
            min={1}
            max={60}
            value={totalNights}
            onChange={(e) => onTotalNightsChange(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="pickupTime" className="block text-xs text-stone-600">
              Pick-up time
            </label>
            <input
              id="pickupTime"
              type="time"
              value={pickupTime}
              onChange={(e) => onPickupTimeChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="dropoffTime" className="block text-xs text-stone-600">
              Drop-off time
            </label>
            <input
              id="dropoffTime"
              type="time"
              value={dropoffTime}
              onChange={(e) => onDropoffTimeChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="vehicleTierName" className="block text-xs text-stone-600">
            Vehicle preference
          </label>
          <select
            id="vehicleTierName"
            value={vehicleTierName}
            onChange={(e) => onVehicleChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          >
            {vehicleTiers.map((tier) => (
              <option key={tier.name} value={tier.name}>
                {tier.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </aside>
  );
}
