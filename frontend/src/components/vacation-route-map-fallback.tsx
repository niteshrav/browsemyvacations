import type { FeasibilityResult } from "@bmv/shared";

type Props = {
  feasibility: FeasibilityResult;
};

export function VacationRouteMapFallback({ feasibility }: Props) {
  const points = feasibility.mapPoints;
  const segments = feasibility.routeSegments;

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-64 w-full rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-teal-50"
      data-testid="vacation-route-map-fallback"
      role="img"
      aria-label="Route map preview"
    >
      <defs>
        <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {segments.map((seg) => {
        const from = points.find((p) => p.slug === seg.fromSlug);
        const to = points.find((p) => p.slug === seg.toSlug);
        if (!from || !to) return null;
        return (
          <line
            key={`${seg.fromSlug}-${seg.toSlug}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#routeLine)"
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />
        );
      })}

      {points.map((point) => (
        <g key={point.slug}>
          <circle cx={point.x} cy={point.y} r="3.5" fill="#0f766e" stroke="#fff" strokeWidth="1" />
          <text x={point.x} y={point.y - 5} textAnchor="middle" fontSize="4" fill="#134e4a">
            {point.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
