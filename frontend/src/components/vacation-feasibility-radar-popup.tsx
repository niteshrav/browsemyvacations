"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { feasibilityGaugeColor } from "@/lib/feasibility-display";
import {
  VACATION_RADAR_POPUP_CTA,
  VACATION_RADAR_POPUP_STORAGE_KEY,
  VACATION_RADAR_POPUP_TITLE,
  buildVacationRadarPopupContent,
} from "@/lib/vacation-feasibility-radar-popup";
import { FeasibilityRadarRouteStrip } from "./feasibility-radar-route-strip";

export function VacationFeasibilityRadarPopup() {
  const [visible, setVisible] = useState(false);
  const content = useMemo(() => buildVacationRadarPopupContent(), []);
  const scoreColor = feasibilityGaugeColor(content.feasibilityScore);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(VACATION_RADAR_POPUP_STORAGE_KEY) === "1") return;
    setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem(VACATION_RADAR_POPUP_STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 z-40 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl"
      aria-label="Vacation Feasibility Radar"
      data-testid="vacation-feasibility-radar-popup"
    >
      <div className="flex items-center justify-between bg-stone-100 px-4 py-2.5">
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-stone-800">
          {VACATION_RADAR_POPUP_TITLE}
        </h2>
        <button
          type="button"
          onClick={dismiss}
          className="text-stone-400 hover:text-stone-700"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 p-4">
        <FeasibilityRadarRouteStrip fromName={content.fromName} toName={content.toName} />

        <p className="text-sm font-bold text-stone-900">
          <span aria-hidden className="mr-1">
            ⚡
          </span>
          FEASIBILITY:{" "}
          <span style={{ color: scoreColor }}>{content.feasibilityScore}%</span>
        </p>

        <p className="text-xs leading-relaxed text-stone-600">{content.summary}</p>

        <Link
          href={content.href}
          className="block w-full rounded-md bg-teal-800 px-3 py-3 text-center text-xs font-semibold leading-snug text-white hover:bg-teal-900"
        >
          {VACATION_RADAR_POPUP_CTA}
        </Link>
      </div>
    </aside>
  );
}
