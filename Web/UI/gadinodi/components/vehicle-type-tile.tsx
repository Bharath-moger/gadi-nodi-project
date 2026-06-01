import Image from "next/image";
import Link from "next/link";

import type { VehicleTypeSummary } from "@/lib/types";

interface VehicleTypeTileProps {
  vehicleType: VehicleTypeSummary;
  /** Larger imagery and typography for homepage showcase. */
  size?: "compact" | "hero" | "strip";
}

export function VehicleTypeTile({ vehicleType: vt, size = "compact" }: VehicleTypeTileProps) {
  const rootClass =
    size === "hero"
      ? "vt-tile vt-tile--hero"
      : size === "strip"
        ? "vt-tile vt-tile--strip"
        : "vt-tile vt-tile--compact";

  const imgSizes =
    size === "hero"
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      : size === "strip"
        ? "(max-width: 480px) 42vw, 228px"
        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";

  return (
    <Link href={`/vehicle-types/${vt.slug}`} className={rootClass}>
      <div className="vt-tile__media">
        <Image
          src={vt.imageUrl}
          alt={`${vt.displayName} — vehicle type on Gadinodi`}
          fill
          sizes={imgSizes}
          className="vt-tile__img"
        />
        <span className="vt-tile__overlay" aria-hidden />
      </div>
      <div className="vt-tile__body">
        <span className="vt-tile__badge">
          {vt.listingCount}{" "}
          {vt.listingCount === 1 ? "listing" : "listings"}
        </span>
        <h3 className="vt-tile__title">{vt.displayName}</h3>
        <p className="vt-tile__desc">{vt.description}</p>
        <span className="vt-tile__cta">
          Explore type <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
