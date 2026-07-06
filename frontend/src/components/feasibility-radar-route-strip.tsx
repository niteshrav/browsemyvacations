type Props = {
  fromName: string;
  toName: string;
};

export function FeasibilityRadarRouteStrip({ fromName, toName }: Props) {
  return (
    <div className="flex items-center gap-2 px-1" data-testid="feasibility-radar-route-strip">
      <div className="flex w-20 shrink-0 flex-col items-center">
        <div
          className="h-9 w-9 rounded-full border-2 border-stone-400 bg-white"
          aria-hidden
        />
        <p className="mt-1.5 text-center text-sm font-semibold text-stone-900">{fromName}</p>
      </div>

      <div className="relative flex min-w-0 flex-1 items-center">
        <div className="h-0.5 w-full bg-teal-800" aria-hidden />
        <div
          className="absolute right-0 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-teal-800"
          aria-hidden
        />
      </div>

      <div className="flex w-20 shrink-0 flex-col items-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 text-sm text-white shadow-sm"
          aria-hidden
        >
          ⚡
        </div>
        <p className="mt-1.5 text-center text-sm font-semibold text-stone-900">{toName}</p>
      </div>
    </div>
  );
}
