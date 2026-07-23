"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { feasibilityGaugeColor } from "@/lib/feasibility-display";
import {
  VACATION_RADAR_POPUP_CTA,
  VACATION_RADAR_POPUP_STORAGE_KEY,
  VACATION_RADAR_POPUP_TITLE,
  buildVacationRadarPopupContent,
} from "@/lib/vacation-feasibility-radar-popup";
import { FeasibilityRadarRouteStrip } from "./feasibility-radar-route-strip";

/**
 * Fixed bottom-right Vacation Feasibility Radar — site-wide, not on the hero photo.
 */
export function VacationFeasibilityRadarPopup() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const content = useMemo(() => buildVacationRadarPopupContent(), []);
  const scoreColor = feasibilityGaugeColor(content.feasibilityScore);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(VACATION_RADAR_POPUP_STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(VACATION_RADAR_POPUP_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!ready || pathname.startsWith("/admin") || pathname.startsWith("/vacation-meter") || dismissed) {
    return null;
  }

  return (
    <aside
      className="fixed bottom-24 right-4 z-40 w-[min(100vw-2rem,19.5rem)] origin-bottom-right animate-[hero-image-reveal_0.55s_ease-out] overflow-hidden rounded-2xl border border-stone-200/90 bg-white/95 shadow-[0_18px_50px_rgba(28,25,23,0.16)] backdrop-blur-md sm:bottom-6 sm:right-24"
      aria-label="Vacation Feasibility Radar"
      data-testid="vacation-feasibility-radar-popup"
    >
      <div className="flex items-center justify-between border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white px-4 py-3">
        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-stone-700">
          {VACATION_RADAR_POPUP_TITLE}
        </h2>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-md px-1.5 py-0.5 text-base leading-none text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
          aria-label="Dismiss feasibility radar"
        >
          ×
        </button>
      </div>

      <div className="space-y-3.5 p-4">
        <FeasibilityRadarRouteStrip fromName={content.fromName} toName={content.toName} />

        <p className="text-center text-sm font-semibold tracking-wide text-stone-900">
          FEASIBILITY:{" "}
          <span style={{ color: scoreColor }}>{content.feasibilityScore}%</span>
        </p>

        <p className="text-center text-[11px] leading-relaxed text-stone-500">{content.summary}</p>

        <Link
          href={content.href}
          className="block w-full rounded-lg bg-teal-800 px-3 py-3 text-center text-[11px] font-semibold leading-snug tracking-wide text-white transition hover:bg-teal-900"
        >
          {VACATION_RADAR_POPUP_CTA}
        </Link>
      </div>
    </aside>
  );
}
