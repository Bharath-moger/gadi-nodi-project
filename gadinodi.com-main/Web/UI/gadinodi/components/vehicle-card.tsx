import Link from "next/link";

import type { VehicleListing } from "@/lib/types";
import { formatCurrency, listingCardHints } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: VehicleListing;
  isSignedIn: boolean;
}

export function VehicleCard({ vehicle, isSignedIn }: VehicleCardProps) {
  const hints = listingCardHints(isSignedIn);

  return (
    <article className="vehicle-card">
      <div className="vehicle-card__media" style={{ background: vehicle.heroTone }}>
        <span className="vehicle-card__badge">{vehicle.condition}</span>
        <span className="vehicle-card__seller">{vehicle.sellerType}</span>
      </div>

      <div className="vehicle-card__content">
        <div className="vehicle-card__heading">
          <h3>{vehicle.title}</h3>
          <p>{vehicle.subtitle}</p>
        </div>

        <div className="vehicle-card__meta">
          <span>{vehicle.year}</span>
          <span>{vehicle.fuel}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.location}</span>
        </div>

        <div className="vehicle-card__pricing">
          <strong>{formatCurrency(vehicle.price)}</strong>
          <span>EMI from {formatCurrency(vehicle.financeEstimate)}/mo</span>
        </div>

        <ul className="vehicle-card__features">
          {vehicle.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="vehicle-card__actions">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="button button--primary"
          >
            {hints.primaryLabel}
          </Link>
          {hints.secondaryHref ? (
            <Link href={hints.secondaryHref} className="subtle-text subtle-text--link">
              {hints.secondaryHint}
            </Link>
          ) : (
            <span className="subtle-text">{hints.secondaryHint}</span>
          )}
        </div>
      </div>
    </article>
  );
}
