import {
  feasibilityGaugeColor,
  feasibilityGaugeRotation,
  formatTravelSummary,
} from "@/lib/feasibility-display";
import type { FeasibilityResult } from "@bmv/shared";
import { VacationRouteMap } from "./vacation-route-map";

type Props = {
  feasibility: FeasibilityResult | null;
  loading?: boolean;
  onSubmit: () => void;
  submitDisabled?: boolean;
};

function FeasibilityGauge({ score }: { score: number }) {
  const rotation = feasibilityGaugeRotation(score);
  const color = feasibilityGaugeColor(score);

  return (
    <div className="relative mx-auto h-36 w-56">
      <svg viewBox="0 0 200 120" className="h-full w-full">
        <defs>
          <linearGradient id="gaugeArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeArc)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <g transform={`rotate(${rotation} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill={color} />
        </g>
      </svg>
    </div>
  );
}

export function FeasibilityEnginePanel({ feasibility, loading, onSubmit, submitDisabled }: Props) {
  const score = feasibility?.feasibilityScore ?? 0;

  return (
    <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          ⚡
        </span>
        <h2 className="text-xs font-bold tracking-widest text-sky-800">REAL-TIME FEASIBILITY ENGINE</h2>
      </div>

      <div className="mt-4">
        <VacationRouteMap feasibility={feasibility} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="text-center">
          <FeasibilityGauge score={score} />
          <p className="text-2xl font-bold text-teal-900">
            FEASIBILITY: {feasibility ? `${feasibility.feasibilityScore}%` : "—"}
          </p>
          <p className="mt-1 text-sm font-medium text-stone-600">
            {feasibility?.descriptor ?? "Select destinations to begin"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-stone-800">Travel statistics</p>
            <p className="mt-1 text-sm text-stone-600">
              {feasibility ? formatTravelSummary(feasibility) : "Route stats appear here"}
            </p>
            <div className="mt-3 space-y-2">
              <div>
                <div className="mb-1 flex justify-between text-xs text-stone-500">
                  <span>Distance</span>
                  <span>{feasibility?.totalDistanceKm ?? 0} km</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100">
                  <div
                    className="h-2 rounded-full bg-sky-500 transition-all"
                    style={{ width: `${feasibility?.distanceBarPercent ?? 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-stone-500">
                  <span>Travel time</span>
                  <span>{feasibility?.totalTravelHours ?? 0} hrs</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100">
                  <div
                    className="h-2 rounded-full bg-teal-600 transition-all"
                    style={{ width: `${feasibility?.travelBarPercent ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-semibold">Pro-Tip</p>
            <p className="mt-1">{feasibility?.proTip ?? "Choose cities and nights to get tailored routing advice."}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled || loading}
        className="mt-6 w-full rounded-xl bg-teal-700 py-3.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {loading ? "Checking feasibility…" : "Submit Custom Request & Check Feasibility"}
      </button>
    </section>
  );
}
