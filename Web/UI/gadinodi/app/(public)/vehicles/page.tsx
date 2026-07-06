import type { Metadata } from "next";
import Link from "next/link";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { StructuredData } from "@/components/structured-data";
import { VehicleCard } from "@/components/vehicle-card";
import { MobileFilterBar } from "@/components/mobile-filter-bar";
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
    showTypes?: string;
    showFuel?: string;
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
  const showAllTypes = resolvedSearchParams.showTypes === "true";

  const visibleCategories = showAllTypes
    ? facets.categories
    : facets.categories.slice(0, 2);
  const showAllFuel = resolvedSearchParams.showFuel === "true";

  const visibleFuels = showAllFuel
    ? facets.fuels
    : facets.fuels.slice(0, 2);

  // Serialize searchParams for client component (only plain strings)
  const serializedSearchParams: Record<string, string | undefined> = {
    bodyStyle: readParam(resolvedSearchParams.bodyStyle),
    condition: readParam(resolvedSearchParams.condition),
    fuel: readParam(resolvedSearchParams.fuel),
  };

  return (
    <div className="vehicles-catalog">
      <StructuredData data={schema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <section className="vehicles-catalog__hero tw:!py-3 tw:!mb-0" aria-labelledby="vehicles-catalog-title">
        <div className="vehicles-catalog__hero-bg" aria-hidden />
        <div className="container vehicles-catalog__hero-inner tw:!gap-4">
          <nav className="vehicles-catalog__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>Vehicles</span>
          </nav>

          <div className="vehicles-catalog__hero-row tw:flex tw:flex-col tw:gap-4 tw:md:grid tw:md:grid-cols-[1fr_auto]">
            <div className="vehicles-catalog__intro">
              <p className="eyebrow">Browse inventory</p>
              <h1 id="vehicles-catalog-title">Vehicles from verified sellers</h1>
              <p className="vehicles-catalog__lead">
                Filter by condition, type, and fuel—URLs stay shareable so you can save a shortlist or
                send it to someone else.
              </p>
            </div>
            <div className="vehicles-catalog__hero-stats tw:flex tw:flex-row tw:items-stretch tw:gap-3 tw:md:flex-col">
              <div className="vehicles-catalog__stat-card tw:text-center tw:!py-2 tw:!px-6 tw:!w-auto tw:!shadow-none tw:!flex-none">
                <span className="vehicles-catalog__stat-value">{filteredVehicles.length}</span>
                <span className="vehicles-catalog__stat-label">
                  {hasActiveFilters ? "Matching listings" : "Live listings"}
                </span>
              </div>
              {isSignedIn ? (
                <span className="vehicles-catalog__status-pill vehicles-catalog__status-pill--ok tw:!flex tw:!items-center tw:!justify-center tw:!rounded-3xl tw:!text-sm tw:!px-3 tw:!min-h-0 tw:!h-full tw:!w-24 tw:!py-4 tw:!self-center">
                  Signed in
                </span>
              ) : (
                <Link className="vehicles-catalog__status-pill tw:!flex tw:!items-center tw:!justify-center tw:!rounded-3xl tw:!text-xs tw:!px-3 tw:!min-h-0 tw:!h-full tw:!w-32 tw:!py-4 tw:!self-center tw:!whitespace-nowrap" href="/login" scroll={false}>
                  Sign in to enquire
                </Link>
              )}
            </div>
          </div>

          {/* <div className="vehicles-catalog__notice tw:!mt-4 tw:flex tw:flex-col tw:gap-3 tw:p-4 tw:md:flex-row tw:md:items-center">
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
              <Link className="button button--secondary vehicles-catalog__notice-btn tw:w-full tw:md:w-auto" href="/register">
                Create account
              </Link>
            ) : (
              <Link className="button button--secondary vehicles-catalog__notice-btn tw:w-full tw:md:w-auto" href="/partners">
                Seller types
              </Link>
            )}
          </div> */}
        </div>
      </section>

<section className="vehicles-catalog__main tw:!pt-2 tw:md:!pt-[clamp(40px,6vw,72px)] ">   
     <div className="container catalog-layout vehicles-catalog__layout tw:!gap-5 tw:h-[90vh]">
          <aside className="catalog-sidebar vehicles-catalog__sidebar ">
            <div
              className="
                tw:sticky
                tw:top-0
                tw:z-20
                tw:bg-white/80
                tw:backdrop-blur-md
                tw:rounded-2xl
                tw:p-3
              "
            >
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
            </div>

            {/*
              ─────────────────────────────────────────────────────────────
              CONDITION filter block — hidden on mobile, visible on desktop
              ─────────────────────────────────────────────────────────────
            */}
            <div
              className="vehicles-catalog__filter-block filter-group"
              style={{} /* desktop always visible */}
            >
              {/* Hide on mobile via inline style + a small <style> block below */}
              <p className="vehicles-catalog__filter-label">Condition</p>
              <div className="chip-row vehicles-catalog__chips">
                {facets.conditions.map((value) => (
                  <Link
                    key={value}
                    scroll={false}
                    className={condition === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "condition", value)}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>

            {/*
              ──────────────────────────────────────────────────────────────
              VEHICLE TYPE filter block — hidden on mobile, visible on desktop
              ──────────────────────────────────────────────────────────────
            */}
            <div className="vehicles-catalog__filter-block filter-group">
              <p className="vehicles-catalog__filter-label">Vehicle type</p>
              <div
                className="
                  vehicles-catalog__chips
                  tw:grid
                  tw:grid-cols-2
                  tw:gap-2
                "
              >
                {visibleCategories.map((value) => (
                  <Link
                    key={value}
                    scroll={false}
                    className={
                      bodyStyle === value
                        ? "chip chip--active"
                        : "chip"
                    }
                    href={buildFilterHref(
                      resolvedSearchParams,
                      "bodyStyle",
                      value
                    )}
                  >
                    {value}
                  </Link>
                ))}
              </div>
              {facets.categories.length > 4 && (
                <Link
                  scroll={false}
                  className="
                    vehicles-catalog__show-more
                    tw:inline-flex
                    tw:items-center
                    tw:justify-center
                    tw:rounded-full
                    tw:bg-purple-500/15
                    tw:border
                    tw:border-purple-400/30
                    tw:px-4
                    tw:py-1.5
                    tw:text-[0.75rem]
                    tw:font-bold
                    tw:tracking-[0.04em]
                    tw:uppercase
                    tw:text-purple-700
                    hover:tw:bg-purple-500/25
                    tw:transition
                  "
                  href={
                    showAllTypes
                      ? "/vehicles"
                      : "/vehicles?showTypes=true"
                  }
                >
                  {showAllTypes ? "Show Less ↑" : "Show More ↓"}
                </Link>
              )}
            </div>

            {/*
              ──────────────────────────────────────────────────────────────
              FUEL filter block — hidden on mobile, visible on desktop
              ──────────────────────────────────────────────────────────────
            */}
            <div className="vehicles-catalog__filter-block filter-group">
              <p className="vehicles-catalog__filter-label">Fuel</p>
              <div className="chip-row vehicles-catalog__chips">
                {visibleFuels.map((value) => (
                  <Link
                    key={value}
                    scroll={false}
                    className={fuel === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "fuel", value)}
                  >
                    {value}
                  </Link>
                ))}
              </div>
              {facets.fuels.length > 2 && (
                <Link
                  scroll={false}
                  className="
                    vehicles-catalog__show-more
                    tw:inline-flex
                    tw:items-center
                    tw:justify-center
                    tw:rounded-full
                    tw:bg-purple-500/15
                    tw:border
                    tw:border-purple-400/30
                    tw:px-4
                    tw:py-1.5
                    tw:text-[0.75rem]
                    tw:font-bold
                    tw:tracking-[0.04em]
                    tw:uppercase
                    tw:text-purple-700
                    hover:tw:bg-purple-500/25
                    tw:transition
                  "
                  href={
                    showAllFuel
                      ? "/vehicles"
                      : "/vehicles?showFuel=true"
                  }
                >
                  {showAllFuel ? "Show Less ↑" : "Show More ↓"}
                </Link>
              )}
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

          <div className="catalog-results vehicles-catalog__results tw:h-[100%] tw:overflow-y-scroll">

            {/*
              ════════════════════════════════════════════════════════════════
              TOOLBAR — uses MobileFilterBar client component which renders:
                • On DESKTOP: just the count + active filter pills (same as before)
                • On MOBILE:  count + Condition | Type | Fuel text dropdowns
              ════════════════════════════════════════════════════════════════
            */}
            <MobileFilterBar
              condition={condition}
              bodyStyle={bodyStyle}
              fuel={fuel}
              filteredCount={filteredVehicles.length}
              hasActiveFilters={hasActiveFilters}
              resolvedSearchParams={serializedSearchParams}
              conditionOptions={facets.conditions}
              bodyStyleOptions={facets.categories}
              fuelOptions={facets.fuels}
            />

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

      {/*
        ══════════════════════════════════════════════════════════════════
        MOBILE-ONLY CSS — hides the three sidebar filter cards on mobile
        and makes the mobile dropdown buttons visible only on mobile.
        Desktop (≥ 1101 px where catalog-layout kicks in as 2-col) is
        completely unaffected because the rules are scoped inside a
        max-width media query.
        ══════════════════════════════════════════════════════════════════
      */}
      <style>{`
        /* ── Mobile: hide the three filter blocks in the sidebar ── */
        @media (max-width: 1100px) {
          .vehicles-catalog__sidebar .vehicles-catalog__filter-block {
            display: none !important;
          }
        }

        /* ── Desktop: always hide the mobile dropdown strip ── */
        @media (min-width: 1101px) {
          .vc-mobile-filter-strip {
            display: none !important;
          }
        }

        /* ── Mobile toolbar layout adjustments ── */
        @media (max-width: 1100px) {
          .vehicles-catalog__toolbar {
            background: rgba(255,255,255,0.97);
            border-bottom: 1px solid rgba(30,27,75,0.08);
            border-radius: 0;
            box-shadow: 0 4px 16px rgba(30,27,75,0.07);
          }
        }
      `}</style>
    </div>
  );
}
