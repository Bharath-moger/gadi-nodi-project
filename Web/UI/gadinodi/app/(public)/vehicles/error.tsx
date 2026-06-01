"use client";

import Link from "next/link";
import { useEffect } from "react";

import { CATALOG_FETCH_GENERIC } from "@/lib/catalog-messages";
import { siteConfig } from "@/lib/site-config";

export default function VehiclesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section">
      <div className="container empty-state">
        <p className="eyebrow">Something went wrong</p>
        <h1>We couldn&apos;t load inventory right now</h1>
        <p className="page-copy">{CATALOG_FETCH_GENERIC}</p>
        <p className="page-copy catalog-error-help">
          If this keeps happening, reach us at{" "}
          <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button--primary" onClick={() => reset()}>
            Try again
          </button>
          <Link className="button button--secondary" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
