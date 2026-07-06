"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-auth";

type MeterConfig = {
  id: string;
  disclaimer: string;
  outputMode: string;
  destinationRates: Array<{
    destinationId: string;
    baseRatePerNight: string;
    destination: { name: string; slug: string };
  }>;
  vehicleTiers: Array<{ id: string; name: string; multiplier: string; displayOrder: number }>;
};

export default function AdminMeterPage() {
  const [config, setConfig] = useState<MeterConfig | null>(null);
  const [disclaimer, setDisclaimer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const load = useCallback(() => {
    adminFetch("/admin/meter-config")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as MeterConfig;
        setConfig(data);
        setDisclaimer(data.disclaimer);
      })
      .catch(() => setError("Failed to load meter config"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveDisclaimer(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    const res = await adminFetch("/admin/meter-config", {
      method: "PATCH",
      body: JSON.stringify({ disclaimer }),
    });
    if (res.ok) {
      setSaved(true);
      load();
    }
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!config) return <p className="text-stone-600">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Vacation Meter config</h1>
      <p className="mt-2 text-sm text-stone-600">
        Rates drive the indicative calculator. Output mode: {config.outputMode}.
      </p>

      <form onSubmit={saveDisclaimer} className="mt-8 space-y-4">
        <div>
          <label htmlFor="disclaimer" className="block text-sm font-medium">
            Disclaimer text
          </label>
          <textarea
            id="disclaimer"
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            rows={3}
            className="mt-1 w-full max-w-2xl rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <button type="submit" className="rounded-lg bg-teal-700 px-4 py-2 text-sm text-white">
          Save disclaimer
        </button>
        {saved && <p className="text-sm text-green-700">Saved.</p>}
      </form>

      <section className="mt-10">
        <h2 className="font-semibold">Destination nightly rates (INR)</h2>
        <ul className="mt-4 divide-y rounded-lg border">
          {config.destinationRates.map((r) => (
            <li key={r.destinationId} className="flex justify-between px-4 py-3 text-sm">
              <span>{r.destination.name}</span>
              <span className="font-medium">₹{Number(r.baseRatePerNight).toLocaleString("en-IN")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-semibold">Vehicle tiers</h2>
        <ul className="mt-4 divide-y rounded-lg border">
          {config.vehicleTiers.map((t) => (
            <li key={t.id} className="flex justify-between px-4 py-3 text-sm">
              <span>{t.name}</span>
              <span>×{Number(t.multiplier).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
