import Link from "next/link";

import type { SparePartListing } from "@/lib/types";
import { formatCurrency, sparePartCardHints } from "@/lib/utils";

interface SparePartCardProps {
  part: SparePartListing;
  isSignedIn: boolean;
}

export function SparePartCard({ part, isSignedIn }: SparePartCardProps) {
  const hints = sparePartCardHints(isSignedIn);

  return (
    <article className="spare-part-card">
      <div className="spare-part-card__media" style={{ background: part.heroTone }}>
        <span className="spare-part-card__badge">{part.condition}</span>
        <span className="spare-part-card__tag">{part.category}</span>
      </div>

      <div className="spare-part-card__content">
        <div className="spare-part-card__heading">
          <h3>{part.title}</h3>
          <p>{part.subtitle}</p>
        </div>

        <div className="spare-part-card__meta">
          <span>{part.location}</span>
          {part.partNumber ? <span>#{part.partNumber}</span> : <span>Ref on request</span>}
          <span>{part.sellerType}</span>
        </div>

        <p className="spare-part-card__fit">{part.compatibility}</p>

        <div className="spare-part-card__pricing">
          <strong>{formatCurrency(part.price)}</strong>
          <span>{part.sellerName}</span>
        </div>

        <ul className="spare-part-card__features">
          {part.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="spare-part-card__actions">
          <Link href={`/spare-parts/${part.slug}`} className="button button--primary">
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
