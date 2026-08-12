import type { GoogleMapRoute } from "@bmv/shared";
import { buildVacationRouteMapsEmbedUrl } from "@bmv/shared";

type Props = {
  route: GoogleMapRoute;
};

export function VacationRouteMapEmbed({ route }: Props) {
  const embedUrl = buildVacationRouteMapsEmbedUrl(route);

  return (
    <div
      className="h-64 overflow-hidden rounded-xl border border-sky-100 bg-white"
      data-testid="vacation-google-map-embed"
    >
      <iframe
        title="Google Maps route preview"
        src={embedUrl}
        className="aspect-[16/10] h-full w-full border-0 sm:aspect-[21/9]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
