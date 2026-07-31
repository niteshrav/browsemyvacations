"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminFetch } from "@/lib/admin-auth";
import {
  adminInputClassName,
  adminLabelClassName,
  adminTableClassName,
  adminTableHeadClassName,
  adminTableWrapClassName,
} from "@/lib/admin-ui";

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
  const [destinations, setDestinations] = useState<Array<{ id: string; name: string }>>([]);
  const [disclaimer, setDisclaimer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [newDestinationId, setNewDestinationId] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newTierName, setNewTierName] = useState("");
  const [newTierMultiplier, setNewTierMultiplier] = useState("1.00");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState("");

  const load = useCallback(() => {
    adminFetch("/admin/meter-config")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as MeterConfig;
        setConfig(data);
        setDisclaimer(data.disclaimer);
        setError(null);
      })
      .catch(() => setError("Failed to load meter config"));
  }, []);

  useEffect(() => {
    load();
    adminFetch("/admin/destinations")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as Array<{ id: string; name: string }>;
        setDestinations(data.map((d) => ({ id: d.id, name: d.name })));
      })
      .catch(() => {
        // Keep page usable even if destination list fails
      });
  }, [load]);

  async function saveDestinationRates(
    rates: Array<{ destinationId: string; baseRatePerNight: number }>,
  ) {
    const res = await adminFetch("/admin/meter-config", {
      method: "PATCH",
      body: JSON.stringify({ destinationRates: rates }),
    });
    if (!res.ok) {
      setError("Failed to update destination rates");
      return false;
    }
    setSaved(true);
    setError(null);
    load();
    return true;
  }

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

  async function addDestinationRate(e: React.FormEvent) {
    e.preventDefault();
    if (!config || !newDestinationId || !newRate) return;
    const destinationRates = [
      ...config.destinationRates.map((r) => ({
        destinationId: r.destinationId,
        baseRatePerNight: Number(r.baseRatePerNight),
      })),
      { destinationId: newDestinationId, baseRatePerNight: Number(newRate) },
    ];
    const ok = await saveDestinationRates(destinationRates);
    if (!ok) return;
    setNewDestinationId("");
    setNewRate("");
  }

  async function saveEditedRate(destinationId: string) {
    if (!config || !editRate) return;
    const destinationRates = config.destinationRates.map((r) => ({
      destinationId: r.destinationId,
      baseRatePerNight:
        r.destinationId === destinationId ? Number(editRate) : Number(r.baseRatePerNight),
    }));
    const ok = await saveDestinationRates(destinationRates);
    if (!ok) return;
    setEditingId(null);
    setEditRate("");
  }

  async function deleteRate(destinationId: string) {
    if (!config) return;
    if (!window.confirm("Remove this destination nightly rate?")) return;
    const destinationRates = config.destinationRates
      .filter((r) => r.destinationId !== destinationId)
      .map((r) => ({
        destinationId: r.destinationId,
        baseRatePerNight: Number(r.baseRatePerNight),
      }));
    await saveDestinationRates(destinationRates);
    if (editingId === destinationId) {
      setEditingId(null);
      setEditRate("");
    }
  }

  async function addVehicleTier(e: React.FormEvent) {
    e.preventDefault();
    if (!config || !newTierName || !newTierMultiplier) return;
    const displayOrder = config.vehicleTiers.length;
    const vehicleTiers = [
      ...config.vehicleTiers.map((t) => ({
        id: t.id,
        name: t.name,
        multiplier: Number(t.multiplier),
        displayOrder: t.displayOrder,
      })),
      {
        name: newTierName.trim(),
        multiplier: Number(newTierMultiplier),
        displayOrder,
      },
    ];
    const res = await adminFetch("/admin/meter-config", {
      method: "PATCH",
      body: JSON.stringify({ vehicleTiers }),
    });
    if (!res.ok) {
      setError("Failed to add vehicle tier");
      return;
    }
    setSaved(true);
    setNewTierName("");
    setNewTierMultiplier("1.00");
    load();
  }

  if (error && !config) {
    return <AdminErrorAlert message={error} />;
  }

  if (!config) {
    return <p className="text-sm text-stone-500">Loading meter configuration…</p>;
  }

  const usedDestinationIds = new Set(config.destinationRates.map((r) => r.destinationId));
  const remainingDestinations = destinations.filter((d) => !usedDestinationIds.has(d.id));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Vacation Meter"
        description={`Configure calculator disclaimer and review seeded rates. Output mode: ${config.outputMode}.`}
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {saved ? <AdminSuccessAlert message="Meter settings saved successfully." /> : null}

      <AdminPanel title="Disclaimer text" description="Shown on the vacation meter results screen.">
        <form onSubmit={saveDisclaimer} className="space-y-4">
          <div>
            <label htmlFor="disclaimer" className={adminLabelClassName()}>
              Public disclaimer
            </label>
            <textarea
              id="disclaimer"
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              rows={4}
              className={adminInputClassName()}
            />
          </div>
          <button type="submit" className="btn-primary">
            Save disclaimer
          </button>
        </form>
      </AdminPanel>

      <AdminPanel
        title="Destination nightly rates"
        description="Indicative INR rates per night — card layout for quick edits."
      >
        <form
          onSubmit={addDestinationRate}
          className="mb-5 grid gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 sm:grid-cols-[1fr_12rem_auto]"
        >
          <select
            value={newDestinationId}
            onChange={(e) => setNewDestinationId(e.target.value)}
            className={adminInputClassName()}
            required
          >
            <option value="" disabled>
              Select destination
            </option>
            {remainingDestinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            placeholder="Rate (INR)"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            className={adminInputClassName()}
            required
          />
          <button type="submit" className="btn-secondary">
            Add rate
          </button>
        </form>

        {config.destinationRates.length === 0 ? (
          <p className="text-sm text-stone-500">No destination rates yet. Add one above.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {config.destinationRates.map((r) => {
              const isEditing = editingId === r.destinationId;
              return (
                <li
                  key={r.destinationId}
                  className="flex flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-stone-900">{r.destination.name}</p>
                  {isEditing ? (
                    <div className="mt-3 space-y-3">
                      <label className={adminLabelClassName()}>
                        Nightly rate (INR)
                        <input
                          type="number"
                          min={1}
                          value={editRate}
                          onChange={(e) => setEditRate(e.target.value)}
                          className={adminInputClassName()}
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn-primary text-sm"
                          onClick={() => saveEditedRate(r.destinationId)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn-secondary text-sm"
                          onClick={() => {
                            setEditingId(null);
                            setEditRate("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="mt-2 text-2xl font-bold tracking-tight text-teal-900">
                        ₹{Number(r.baseRatePerNight).toLocaleString("en-IN")}
                        <span className="ml-1 text-sm font-medium text-stone-500">/ night</span>
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn-secondary text-sm"
                          onClick={() => {
                            setEditingId(r.destinationId);
                            setEditRate(String(Number(r.baseRatePerNight)));
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-red-200 transition hover:bg-red-50"
                          onClick={() => deleteRate(r.destinationId)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </AdminPanel>

      <AdminPanel title="Vehicle tiers" description="Multipliers applied to route estimates.">
        <form
          onSubmit={addVehicleTier}
          className="mb-4 grid gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 sm:grid-cols-[1fr_10rem_auto]"
        >
          <input
            placeholder="Tier name"
            value={newTierName}
            onChange={(e) => setNewTierName(e.target.value)}
            className={adminInputClassName()}
            required
          />
          <input
            type="number"
            step="0.01"
            min="0.1"
            max="10"
            placeholder="Multiplier"
            value={newTierMultiplier}
            onChange={(e) => setNewTierMultiplier(e.target.value)}
            className={adminInputClassName()}
            required
          />
          <button type="submit" className="btn-secondary">
            Add tier
          </button>
        </form>
        <div className={adminTableWrapClassName()}>
          <table className={adminTableClassName()}>
            <thead className={adminTableHeadClassName()}>
              <tr>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {config.vehicleTiers.map((t) => (
                <tr key={t.id} className="hover:bg-stone-50/80">
                  <td className="px-4 py-3 text-stone-800">{t.name}</td>
                  <td className="px-4 py-3 font-medium text-stone-900">
                    ×{Number(t.multiplier).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </div>
  );
}
