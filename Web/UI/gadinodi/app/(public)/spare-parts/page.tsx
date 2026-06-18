import type { Metadata } from "next";
import Link from "next/link";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { SparePartCard } from "@/components/spare-part-card";
import { StructuredData } from "@/components/structured-data";
import { loadSparePartsCatalog } from "@/lib/api";
import { getSession } from "@/lib/auth/session";
import type { VehicleCondition } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { buildQueryString } from "@/lib/utils";

const description =
  "Browse genuine and aftermarket vehicle spare parts on Gadinodi—filters by category and condition, with seller context on every listing.";

export const metadata: Metadata = {
  title: "Spare parts",
  description,
  alternates: {
    canonical: "/spare-parts",
  },
};

interface SparePartsPageProps {
  searchParams?: Promise<{
    category?: string | string[];
    condition?: string | string[];
  }>;
}

function readParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function buildFilterHref(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
  value: string,
) {
  const current = {
    category: readParam(searchParams.category),
    condition: readParam(searchParams.condition),
  };

  const nextValue =
    current[key as keyof typeof current] === value ? undefined : value;

  return `/spare-parts${buildQueryString({
    ...current,
    [key]: nextValue,
  })}`;
}

function hrefClearingFilter(
  searchParams: Record<string, string | string[] | undefined>,
  clearKey: "category" | "condition",
) {
  const current = {
    category: readParam(searchParams.category),
    condition: readParam(searchParams.condition),
  };
  return `/spare-parts${buildQueryString({
    ...current,
    [clearKey]: undefined,
  })}`;
}

export default async function SparePartsPage({ searchParams }: SparePartsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const category = readParam(resolvedSearchParams.category);
  const condition = readParam(resolvedSearchParams.condition) as VehicleCondition | undefined;

  const [{ parts, facets, apiAvailable }, session] = await Promise.all([
    loadSparePartsCatalog({ category, condition }),
    getSession(),
  ]);

  const isSignedIn = Boolean(session);
  const hasActiveFilters = Boolean(category || condition);
  /** API up but no rows (e.g. migrations applied, seed not run). */
  const catalogueNotSeeded =
    apiAvailable && parts.length === 0 && !hasActiveFilters && facets.categories.length === 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vehicle spare parts",
    description,
    url: `${siteConfig.url}/spare-parts`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: parts.length,
      itemListElement: parts.map((part, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/spare-parts/${part.slug}`,
        name: part.title,
      })),
    },
  };

  return (
    <div className="vehicles-catalog spare-parts-page">
      <StructuredData data={schema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <section className="vehicles-catalog__hero tw:!py-3 tw:!mb-0" aria-labelledby="spare-parts-catalog-title">
        <div className="vehicles-catalog__hero-bg" aria-hidden />
        <div className="container vehicles-catalog__hero-inner">
          <nav className="vehicles-catalog__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/vehicles">Vehicles</Link>
            <span aria-hidden>/</span>
            <span>Spare parts</span>
          </nav>

          <div className="vehicles-catalog__hero-row">
            <div className="vehicles-catalog__intro">
              <p className="eyebrow">Parts &amp; accessories</p>
              <h1 id="spare-parts-catalog-title">Vehicle spare parts listings</h1>
              <p className="vehicles-catalog__lead">
                Brakes, filters, drivetrain, lighting, and more from garages and parts specialists.
                Check compatibility on each listing before you buy.
              </p>
            </div>
            <div className="vehicles-catalog__hero-stats">
              <div className="vehicles-catalog__stat-card">
                <span className="vehicles-catalog__stat-value">{parts.length}</span>
                <span className="vehicles-catalog__stat-label">
                  {hasActiveFilters ? "Matching parts" : "Live listings"}
                </span>
              </div>
              {isSignedIn ? (
                <span className="vehicles-catalog__status-pill vehicles-catalog__status-pill--ok">
                  Signed in
                </span>
              ) : (
                <Link className="vehicles-catalog__status-pill" href="/login">
                  Sign in to enquire
                </Link>
              )}
            </div>
          </div>

          <div className="vehicles-catalog__notice">
            <p className="vehicles-catalog__notice-text">
              <strong>Fitment matters.</strong> Always confirm part numbers and vehicle variants with the
              seller. Full vehicle inventory stays on{" "}
              <Link href="/vehicles" className="text-link">
                /vehicles
              </Link>
              .
            </p>
            <Link className="button button--secondary vehicles-catalog__notice-btn" href="/vehicles">
              Browse vehicles
            </Link>
          </div>
        </div>
      </section>

      <section className="vehicles-catalog__main">
        <div className="container catalog-layout vehicles-catalog__layout">
          <aside className="catalog-sidebar vehicles-catalog__sidebar">
            <div className="vehicles-catalog__filters-head">
              <p className="eyebrow">Filters</p>
              <h2 className="vehicles-catalog__filters-title">Refine parts</h2>
              <p className="vehicles-catalog__filters-hint">
                Tap a category or condition to toggle. URLs stay shareable.
              </p>
            </div>

            <div className="vehicles-catalog__filter-block filter-group">
              <p className="vehicles-catalog__filter-label">Category</p>
              <div className="chip-row vehicles-catalog__chips">
                {facets.categories.map((value) => (
                  <Link
                    key={value}
                    className={category === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "category", value)}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>

            <div className="vehicles-catalog__filter-block filter-group">
              <p className="vehicles-catalog__filter-label">Condition</p>
              <div className="chip-row vehicles-catalog__chips">
                {facets.conditions.map((value) => (
                  <Link
                    key={value}
                    className={condition === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "condition", value)}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="catalog-results vehicles-catalog__results">
            <div className="vehicles-catalog__toolbar">
              <p className="vehicles-catalog__toolbar-summary">
                <strong>{parts.length}</strong>
                <span>
                  {parts.length === 1 ? "part" : "parts"}
                  {hasActiveFilters ? " · filtered" : ""}
                </span>
              </p>
              {hasActiveFilters ? (
                <div className="vehicles-catalog__active-row">
                  <span className="vehicles-catalog__active-label">Active</span>
                  <div className="vehicles-catalog__active-pills">
                    {category ? (
                      <Link
                        href={hrefClearingFilter(resolvedSearchParams, "category")}
                        className="vehicles-catalog__active-pill"
                        aria-label={`Remove category filter: ${category}`}
                      >
                        <span>{category}</span>
                        <span className="vehicles-catalog__active-pill-x" aria-hidden>
                          ×
                        </span>
                      </Link>
                    ) : null}
                    {condition ? (
                      <Link
                        href={hrefClearingFilter(resolvedSearchParams, "condition")}
                        className="vehicles-catalog__active-pill"
                        aria-label={`Remove condition filter: ${condition}`}
                      >
                        <span>{condition}</span>
                        <span className="vehicles-catalog__active-pill-x" aria-hidden>
                          ×
                        </span>
                      </Link>
                    ) : null}
                  </div>
                  <Link className="vehicles-catalog__clear-all" href="/spare-parts">
                    Clear all
                  </Link>
                </div>
              ) : null}
            </div>

            {parts.length === 0 ? (
              <div className="vehicles-catalog__empty">
                {catalogueNotSeeded ? (
                  <>
                    <p className="vehicles-catalog__empty-title">No spare part listings yet</p>
                    <p className="vehicles-catalog__empty-copy">
                      This area is ready, but nothing has been published to the parts catalogue yet.
                      Please try again later—or continue with vehicle listings.
                    </p>
                    <Link className="button button--primary" href="/vehicles">
                      Browse vehicles
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="vehicles-catalog__empty-title">No parts match these filters</p>
                    <p className="vehicles-catalog__empty-copy">
                      Try another category or reset filters to see everything in stock.
                    </p>
                    <Link className="button button--primary" href="/spare-parts">
                      Show all parts
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="vehicle-grid vehicles-catalog__grid">
                {parts.map((part) => (
                  <SparePartCard key={part.id} part={part} isSignedIn={isSignedIn} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
