import Image from "next/image";
import Link from "next/link";

import type { VehicleListing } from "@/lib/types";
import { formatCurrency, listingCardHints } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: VehicleListing;
  isSignedIn: boolean;
  showMeta?: boolean;
  showFinanceEstimate?: boolean;
  showFeatures?: boolean;
  showSubtitle?: boolean;
  showSecondaryAction?: boolean;
  preferImageMediaBackground?: boolean;
}

export function VehicleCard({
  vehicle,
  isSignedIn,
  showMeta = true,
  showFinanceEstimate = true,
  showFeatures = true,
  showSubtitle = true,
  showSecondaryAction = true,
  preferImageMediaBackground = false,
}: VehicleCardProps) {
  const hints = listingCardHints(isSignedIn);
  const mediaBackground =
    preferImageMediaBackground && vehicle.imageUrls[0] ? "#ffffff" : vehicle.heroTone;

  return (
    <article className="vehicle-card">
      <div className="vehicle-card__media" style={{ background: mediaBackground }}>
        {vehicle.imageUrls[0] ? (
          <Image
            src={vehicle.imageUrls[0]}
            alt={vehicle.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="vehicle-card__media-image"
          />
        ) : null}
        <span className="vehicle-card__badge">{vehicle.condition}</span>
        <span className="vehicle-card__seller">{vehicle.sellerType}</span>
      </div>

      <div className="vehicle-card__content">
        <div className="vehicle-card__heading">
          <h3>{vehicle.title}</h3>
          {showSubtitle ? <p>{vehicle.subtitle}</p> : null}
        </div>

        {showMeta ? (
          <div className="vehicle-card__meta">
            <span>{vehicle.year}</span>
            <span>{vehicle.fuel}</span>
            <span>{vehicle.transmission}</span>
            <span>{vehicle.location}</span>
          </div>
        ) : null}

        <div className="vehicle-card__pricing">
          <strong>{formatCurrency(vehicle.price)}</strong>
          {showFinanceEstimate ? (
            <span>EMI from {formatCurrency(vehicle.financeEstimate)}/mo</span>
          ) : null}
        </div>

        {showFeatures ? (
          <ul className="vehicle-card__features">
            {vehicle.features.slice(0, 3).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : null}

        <div className="vehicle-card__actions">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="button button--primary"
          >
            {hints.primaryLabel}
          </Link>
          {showSecondaryAction ? (
            hints.secondaryHref ? (
              <Link href={hints.secondaryHref} className="subtle-text subtle-text--link">
                {hints.secondaryHint}
              </Link>
            ) : (
              <span className="subtle-text">{hints.secondaryHint}</span>
            )
          ) : null}
        </div>
      </div>
    </article>
  );
}
