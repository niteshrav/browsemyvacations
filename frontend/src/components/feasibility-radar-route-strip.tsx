type Props = {
  fromName: string;
  toName: string;
};

export function FeasibilityRadarRouteStrip({ fromName, toName }: Props) {
  return (
    <div className="flex items-center gap-2.5" data-testid="feasibility-radar-route-strip">
      <div className="flex min-w-0 flex-1 flex-col items-center">
        <div
          className="h-8 w-8 rounded-full border border-stone-300 bg-stone-50 shadow-inner"
          aria-hidden
        />
        <p className="mt-1.5 truncate text-center text-xs font-semibold tracking-wide text-stone-800">
          {fromName}
        </p>
      </div>

      <div className="relative flex w-14 shrink-0 items-center" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-stone-300 via-teal-700 to-teal-800" />
        <div className="absolute right-0 h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-teal-800" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-center">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-800 text-white shadow-sm"
          aria-hidden
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M9.2 1.2 3.5 9.1h3.2L6.6 14.8l6.1-8.4H9.4L9.2 1.2Z" />
          </svg>
        </div>
        <p className="mt-1.5 truncate text-center text-xs font-semibold tracking-wide text-stone-800">
          {toName}
        </p>
      </div>
    </div>
  );
}
