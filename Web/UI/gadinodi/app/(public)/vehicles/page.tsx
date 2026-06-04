import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { StructuredData } from "@/components/structured-data";
import { VehicleCard } from "@/components/vehicle-card";
import { loadVehiclesCatalog } from "@/lib/api";
import { getSession } from "@/lib/auth/session";
import type { VehicleBodyStyle, VehicleCondition, VehicleFuel } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { buildQueryString } from "@/lib/utils";

const vehicleListingsDescription =
  "Browse new and used vehicles on Gadinodi—filter by condition, body style, and fuel.";

export const metadata: Metadata = {
  title: "Vehicle Listings",
  description: vehicleListingsDescription,
  alternates: {
    canonical: "/vehicles",
  },
};

interface VehiclesPageProps {
  searchParams?: Promise<{
    bodyStyle?: string | string[];
    condition?: string | string[];
    fuel?: string | string[];
    showAllTypes?: string;
    showAllFuels?: string;
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
    bodyStyle: readParam(searchParams.bodyStyle),
    condition: readParam(searchParams.condition),
    fuel: readParam(searchParams.fuel),
    showAllTypes: readParam(searchParams.showAllTypes),
    showAllFuels: readParam(searchParams.showAllFuels),
  };

  const nextValue =
    current[key as keyof typeof current] === value ? undefined : value;

  return `/vehicles${buildQueryString({
    ...current,
    [key]: nextValue,
  })}`;
}

function hrefClearingFilter(
  searchParams: Record<string, string | string[] | undefined>,
  clearKey: "bodyStyle" | "condition" | "fuel",
) {
  const current = {
    bodyStyle: readParam(searchParams.bodyStyle),
    condition: readParam(searchParams.condition),
    fuel: readParam(searchParams.fuel),
    showAllTypes: readParam(searchParams.showAllTypes),
    showAllFuels: readParam(searchParams.showAllFuels),
  };
  return `/vehicles${buildQueryString({
    ...current,
    [clearKey]: undefined,
  })}`;
}

export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  
  const bodyStyle = readParam(resolvedSearchParams.bodyStyle) as
    | VehicleBodyStyle
    | undefined;
  const condition = readParam(resolvedSearchParams.condition) as
    | VehicleCondition
    | undefined;
  const fuel = readParam(resolvedSearchParams.fuel) as VehicleFuel | undefined;

  const showAllTypes = readParam(resolvedSearchParams.showAllTypes) === "true";
  const showAllFuels = readParam(resolvedSearchParams.showAllFuels) === "true";

  const [{ filteredVehicles, partnerTypes, facets, apiAvailable }, session] =
    await Promise.all([
      loadVehiclesCatalog({ bodyStyle, condition, fuel }),
      getSession(),
    ]);

  const isSignedIn = Boolean(session);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vehicle listings",
    description: vehicleListingsDescription,
    url: `${siteConfig.url}/vehicles`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredVehicles.length,
      itemListElement: filteredVehicles.map((vehicle, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
        name: vehicle.title,
      })),
    },
  };

  const hasActiveFilters = Boolean(condition || bodyStyle || fuel);

  const TYPE_LIMIT = 4;
  const FUEL_LIMIT = 3;

  const activeTypeIndex = bodyStyle ? facets.categories.indexOf(bodyStyle) : -1;
  const visibleCategories = showAllTypes 
    ? facets.categories 
    : facets.categories.slice(0, Math.max(TYPE_LIMIT, activeTypeIndex + 1));

  const activeFuelIndex = fuel ? facets.fuels.indexOf(fuel) : -1;
  const visibleFuels = showAllFuels 
    ? facets.fuels 
    : facets.fuels.slice(0, Math.max(FUEL_LIMIT, activeFuelIndex + 1));

  return (
    <div className="vehicles-catalog">
      <StructuredData data={schema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <section className="vehicles-catalog__hero" aria-labelledby="vehicles-catalog-title">
        <div className="vehicles-catalog__hero-bg" aria-hidden />
        <div className="container vehicles-catalog__hero-inner">
          <nav className="vehicles-catalog__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Vehicles</span>
          </nav>

          <div className="vehicles-catalog__hero-row">
            <div className="vehicles-catalog__intro">
              <p className="eyebrow">Browse inventory</p>
              <h1 id="vehicles-catalog-title">Vehicles from verified sellers</h1>
              <p className="vehicles-catalog__lead">
                Filter by condition, type, and fuel—URLs stay shareable so you can save a shortlist or
                send it to someone else.
              </p>
            </div>
            <div className="vehicles-catalog__hero-stats">
              <div className="vehicles-catalog__stat-card">
                <span className="vehicles-catalog__stat-value">{filteredVehicles.length}</span>
                <span className="vehicles-catalog__stat-label">
                  {hasActiveFilters ? "Matching listings" : "Live listings"}
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
              {isSignedIn ? (
                <>
                  <strong>Open any listing</strong> for full specs and to reach the marketplace team. Need
                  components?{" "}
                  <Link href="/spare-parts" className="text-link">
                    Browse spare parts
                  </Link>
                  .
                </>
              ) : (
                <>
                  <strong>Browsing is open to everyone.</strong> Create a free account to save picks and
                  send structured enquiries. Also see{" "}
                  <Link href="/spare-parts" className="text-link">
                    spare parts listings
                  </Link>
                  .
                </>
              )}
            </p>
            {!isSignedIn ? (
              <Link className="button button--secondary vehicles-catalog__notice-btn" href="/register">
                Create account
              </Link>
            ) : (
              <Link className="button button--secondary vehicles-catalog__notice-btn" href="/partners">
                Seller types
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="vehicles-catalog__main">
        <div className="container catalog-layout vehicles-catalog__layout">
          <aside className="catalog-sidebar vehicles-catalog__sidebar">
            <div className="vehicles-catalog__filters-head">
              <p className="eyebrow">Filters</p>
              <h2 className="vehicles-catalog__filters-title">Refine results</h2>
              <p className="vehicles-catalog__filters-hint">
                Tap to toggle. Combine filters; links stay bookmarkable.
              </p>
            </div>

            <article className="vehicles-catalog__panel vehicles-catalog__panel--accent">
              <p className="eyebrow">Browse by type</p>
              <h3 className="vehicles-catalog__panel-title">Vehicle type hubs</h3>
              <p className="vehicles-catalog__panel-copy">
                Imagery, guides, and live counts—from bicycles to heavy equipment.
              </p>
              <Link className="vehicles-catalog__panel-link" href="/vehicle-types">
                Explore hubs <span aria-hidden>→</span>
              </Link>
            </article>

            {/* 1. Condition Filter Section */}
            <div className={`vehicles-catalog__filter-block filter-group${condition ? " js-mobile-expanded" : ""}`}>
              <p className="vehicles-catalog__filter-label">Condition</p>
              <div className="chip-row vehicles-catalog__chips">
                {facets.conditions.map((value) => (
                  <Link
                    key={value}
                    className={condition === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "condition", value)}
                    scroll={false}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Vehicle Type Filter Section */}
            <div className={`vehicles-catalog__filter-block filter-group${bodyStyle ? " js-mobile-expanded" : ""}`}>
              <p className="vehicles-catalog__filter-label">Vehicle type</p>
              <div className="chip-row vehicles-catalog__chips">
                {visibleCategories.map((value) => (
                  <Link
                    key={value}
                    className={bodyStyle === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "bodyStyle", value)}
                    scroll={false}
                  >
                    {value}
                  </Link>
                ))}

                {facets.categories.length > TYPE_LIMIT && (
                  <Link
                    className="vehicles-catalog__toggle-button"
                    href={`/vehicles${buildQueryString({
                      condition: condition,
                      bodyStyle: bodyStyle,
                      fuel: fuel,
                      showAllFuels: showAllFuels ? "true" : undefined,
                      showAllTypes: showAllTypes ? undefined : "true",
                    })}`}
                    scroll={false}
                  >
                    <span>{showAllTypes ? "Show less" : "Show more"}</span>
                    <span className="arrow">{showAllTypes ? "▲" : "▼"}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* 3. Fuel Filter Section */}
            <div className={`vehicles-catalog__filter-block filter-group${fuel ? " js-mobile-expanded" : ""}`}>
              <p className="vehicles-catalog__filter-label">Fuel</p>
              <div className="chip-row vehicles-catalog__chips">
                {visibleFuels.map((value) => (
                  <Link
                    key={value}
                    className={fuel === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "fuel", value)}
                    scroll={false}
                  >
                    {value}
                  </Link>
                ))}

                {facets.fuels.length > FUEL_LIMIT && (
                  <Link
                    className="vehicles-catalog__toggle-button"
                    href={`/vehicles${buildQueryString({
                      condition: condition,
                      bodyStyle: bodyStyle,
                      fuel: fuel,
                      showAllTypes: showAllTypes ? "true" : undefined,
                      showAllFuels: showAllFuels ? undefined : "true",
                    })}`}
                    scroll={false}
                  >
                    <span>{showAllFuels ? "Show less" : "Show more"}</span>
                    <span className="arrow">{showAllFuels ? "▲" : "▼"}</span>
                  </Link>
                )}
              </div>
            </div>

            <article className="vehicles-catalog__panel">
              <p className="eyebrow">Seller network</p>
              <h3 className="vehicles-catalog__panel-title">Who lists here</h3>
              <p className="vehicles-catalog__panel-copy">
                Compare garages, showrooms, and independents—same listing format across seller types.
              </p>
              <ul className="vehicles-catalog__seller-list compact-list">
                {partnerTypes.slice(0, 4).map((partnerType) => (
                  <li key={partnerType.slug}>{partnerType.name}</li>
                ))}
              </ul>
            </article>
          </aside>

          <div className="catalog-results vehicles-catalog__results">
            <div className="vehicles-catalog__toolbar">
              <p className="vehicles-catalog__toolbar-summary">
                <strong>{filteredVehicles.length}</strong>
                <span>
                  {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}
                  {hasActiveFilters ? " · filtered" : ""}
                </span>
              </p>
              {hasActiveFilters ? (
                <div className="vehicles-catalog__active-row">
                  <span className="vehicles-catalog__active-label">Active</span>
                  <div className="vehicles-catalog__active-pills">
                    {condition ? (
                      <Link
                        href={hrefClearingFilter(resolvedSearchParams, "condition")}
                        className="vehicles-catalog__active-pill"
                        aria-label={`Remove condition filter: ${condition}`}
                        scroll={false}
                      >
                        <span>{condition}</span>
                        <span className="vehicles-catalog__active-pill-x" aria-hidden>
                          ×
                        </span>
                      </Link>
                    ) : null}
                    {bodyStyle ? (
                      <Link
                        href={hrefClearingFilter(resolvedSearchParams, "bodyStyle")}
                        className="vehicles-catalog__active-pill"
                        aria-label={`Remove vehicle type filter: ${bodyStyle}`}
                        scroll={false}
                      >
                        <span>{bodyStyle}</span>
                        <span className="vehicles-catalog__active-pill-x" aria-hidden>
                          ×
                        </span>
                      </Link>
                    ) : null}
                    {fuel ? (
                      <Link
                        href={hrefClearingFilter(resolvedSearchParams, "fuel")}
                        className="vehicles-catalog__active-pill"
                        aria-label={`Remove fuel filter: ${fuel}`}
                        scroll={false}
                      >
                        <span>{fuel}</span>
                        <span className="vehicles-catalog__active-pill-x" aria-hidden>
                          ×
                        </span>
                      </Link>
                    ) : null}
                  </div>
                  <Link className="vehicles-catalog__clear-all" href="/vehicles" scroll={false}>
                    Clear all
                  </Link>
                </div>
              ) : null}
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="vehicles-catalog__empty">
                <p className="vehicles-catalog__empty-title">No listings match these filters</p>
                <p className="vehicles-catalog__empty-copy">
                  Try removing a filter or browse all vehicles again.
                </p>
                <Link className="button button--primary" href="/vehicles" scroll={false}>
                  Show all vehicles
                </Link>
              </div>
            ) : (
              <div className="vehicle-grid vehicles-catalog__grid">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSignedIn={isSignedIn}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightweight client-side engine executing toggles on mobile screens */}
    <Script id="mobile-filter-toggle" strategy="afterInteractive">
  {`
    (function () {
      document.addEventListener("click", function (e) {
        if (window.innerWidth > 780) return;

        var label = e.target.closest(".vehicles-catalog__filter-label");
        if (!label) return;

        var block = label.closest(".vehicles-catalog__filter-block");

        if (block) {
          block.classList.toggle("js-mobile-expanded");
        }
      });
    })();
  `}
</Script>
    </div>
  );
}