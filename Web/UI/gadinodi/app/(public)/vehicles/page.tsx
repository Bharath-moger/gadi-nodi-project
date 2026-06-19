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
    activeMobileGroup?: string;
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
    activeMobileGroup: readParam(searchParams.activeMobileGroup),
  };
  const nextValue = current[key as keyof typeof current] === value ? undefined : value;
  return `/vehicles${buildQueryString({ ...current, [key]: nextValue })}`;
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
    activeMobileGroup: readParam(searchParams.activeMobileGroup),
  };
  return `/vehicles${buildQueryString({ ...current, [clearKey]: undefined })}`;
}

function buildMobileGroupToggleHref(
  searchParams: Record<string, string | string[] | undefined>,
  groupName: string,
) {
  const current = {
    bodyStyle: readParam(searchParams.bodyStyle),
    condition: readParam(searchParams.condition),
    fuel: readParam(searchParams.fuel),
    showAllTypes: readParam(searchParams.showAllTypes),
    showAllFuels: readParam(searchParams.showAllFuels),
    activeMobileGroup: readParam(searchParams.activeMobileGroup),
  };
  return `/vehicles${buildQueryString({
    ...current,
    activeMobileGroup: current.activeMobileGroup === groupName ? undefined : groupName,
  })}`;
}

export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const bodyStyle = readParam(resolvedSearchParams.bodyStyle) as VehicleBodyStyle | undefined;
  const condition = readParam(resolvedSearchParams.condition) as VehicleCondition | undefined;
  const fuel = readParam(resolvedSearchParams.fuel) as VehicleFuel | undefined;

  const showAllTypes = readParam(resolvedSearchParams.showAllTypes) === "true";
  const showAllFuels = readParam(resolvedSearchParams.showAllFuels) === "true";
  const activeMobileGroup = readParam(resolvedSearchParams.activeMobileGroup) || "";

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

  // Shared UI Classes
  const activeFilterPill =
    "tw:inline-flex tw:items-center tw:gap-2 tw:py-[7px] tw:pl-[14px] tw:pr-3 tw:rounded-full tw:text-[0.8125rem] tw:font-bold tw:bg-indigo-500/10 tw:border tw:border-indigo-400/28 tw:text-indigo-700 hover:tw:bg-indigo-500/16 tw:transition-colors";

  const baseDropdownMenu =
    "tw:absolute tw:top-full tw:left-0 tw:z-[300] tw:mt-2 tw:w-max tw:min-w-[210px] tw:bg-white tw:rounded-2xl tw:shadow-[0_12px_32px_rgba(0,0,0,0.18)] tw:border tw:border-gray-100 tw:p-3 mobile-filter-dropdown-anim";

  return (
    <div className="vehicles-catalog tw:w-full tw:min-w-0">
      <StructuredData data={schema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      {/* ── Hero Section ── */}
      <section
        className="vehicles-catalog__hero tw:relative tw:overflow-hidden tw:py-[clamp(28px,5vw,48px)]"
        aria-labelledby="vehicles-catalog-title"
      >
        <div className="vehicles-catalog__hero-bg tw:absolute tw:inset-0 tw:pointer-events-none" aria-hidden />

        <div className="container vehicles-catalog__hero-inner tw:relative tw:w-[min(1180px,calc(100%-32px))] tw:mx-auto">
          {/* Breadcrumb */}
          <nav
            className="vehicles-catalog__breadcrumb tw:flex tw:flex-wrap tw:items-center tw:gap-x-3 tw:gap-y-2 tw:mb-[22px] tw:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="tw:font-semibold tw:text-indigo-700 hover:tw:underline">Home</Link>
            <span aria-hidden className="tw:text-gray-400">/</span>
            <span className="tw:text-gray-500">Vehicles</span>
          </nav>

          {/* Hero Row */}
          <div className="vehicles-catalog__hero-row tw:grid tw:grid-cols-[minmax(0,1fr)_auto] tw:gap-[clamp(20px,4vw,36px)] tw:items-start max-[720px]:tw:grid-cols-1">
            <div className="vehicles-catalog__intro tw:min-w-0">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-indigo-700">
                Browse inventory
              </p>
              <h1
                id="vehicles-catalog-title"
                className="tw:mt-0 tw:mb-[14px] tw:text-[clamp(1.85rem,4vw,2.65rem)] tw:leading-[1.08] tw:tracking-[-0.035em] tw:font-bold"
              >
                Vehicles from verified sellers
              </h1>
              <p className="vehicles-catalog__lead tw:m-0 tw:max-w-[42rem] tw:text-[1.02rem] tw:leading-[1.58] tw:text-[#565c78]">
                Filter by condition, type, and fuel—URLs stay shareable so you can save a shortlist or send it to someone else.
              </p>
            </div>

            {/* Stats Card */}
            <div className="vehicles-catalog__hero-stats tw:flex tw:flex-col tw:items-stretch tw:gap-3 tw:min-w-[min(200px,100%)]">
              <div className="tw:block tw:text-[clamp(1.85rem,4vw,2.35rem)] tw:font-extrabold tw:tracking-[-0.04em] tw:leading-none tw:text-[#121329]">
                {filteredVehicles.length}
              </div>
              <span className="vehicles-catalog__stat-label tw:block tw:mt-2 tw:text-[0.8125rem] tw:font-semibold tw:text-[#565c78]">
                {hasActiveFilters ? "Matching listings" : "Live listings"}
              </span>
              {isSignedIn ? (
                <span className="vehicles-catalog__status-pill vehicles-catalog__status-pill--ok tw:inline-flex tw:items-center tw:justify-center tw:min-h-[44px] tw:px-[18px] tw:rounded-full tw:text-sm tw:font-bold tw:bg-indigo-50 tw:border tw:border-indigo-200 tw:text-indigo-700">
                  Signed in
                </span>
              ) : (
                <Link
                  className="vehicles-catalog__status-pill tw:inline-flex tw:items-center tw:justify-center tw:min-h-[44px] tw:px-[18px] tw:rounded-full tw:text-sm tw:font-bold tw:bg-white/90 tw:border tw:border-black/10 tw:text-indigo-700 hover:tw:border-indigo-300 tw:transition-all"
                  href="/login"
                >
                  Sign in to enquire
                </Link>
              )}
            </div>
          </div>

          {/* Notice Banner */}
          <div className="vehicles-catalog__notice tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4 tw:mt-[clamp(22px,4vw,30px)] tw:px-[22px] tw:py-[18px] tw:rounded-[20px] tw:bg-gradient-to-br tw:from-indigo-500/8 tw:to-violet-500/6 tw:border tw:border-indigo-300/18">
            <p className="vehicles-catalog__notice-text tw:m-0 tw:max-w-[min(52rem,100%)] tw:text-[0.9375rem] tw:leading-[1.55]">
              {isSignedIn ? (
                <>
                  <strong className="tw:font-bold">Open any listing</strong> for full specs and to reach the marketplace team. Need components?{" "}
                  <Link href="/spare-parts" className="text-link tw:text-indigo-700 tw:font-bold">Browse spare parts</Link>.
                </>
              ) : (
                <>
                  <strong className="tw:font-bold">Browsing is open to everyone.</strong> Create a free account to save picks and send structured enquiries. Also see{" "}
                  <Link href="/spare-parts" className="text-link tw:text-indigo-700 tw:font-bold">spare parts listings</Link>.
                </>
              )}
            </p>
            {!isSignedIn ? (
              <Link
                className="button button--secondary vehicles-catalog__notice-btn tw:flex-shrink-0 tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[48px] tw:px-[18px] tw:rounded-full tw:border tw:border-black/12 tw:bg-white/65 tw:font-bold tw:transition-transform hover:tw:-translate-y-px max-[720px]:tw:w-full"
                href="/register"
              >
                Create account
              </Link>
            ) : (
              <Link
                className="button button--secondary vehicles-catalog__notice-btn tw:flex-shrink-0 tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[48px] tw:px-[18px] tw:rounded-full tw:border tw:border-black/12 tw:bg-white/65 tw:font-bold tw:transition-transform hover:tw:-translate-y-px max-[720px]:tw:w-full"
                href="/partners"
              >
                Seller types
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Catalog Section ── */}
      <section className="vehicles-catalog__main tw:py-[clamp(40px,6vw,72px)] tw:bg-gradient-to-b tw:from-white/45 tw:to-[#edf2fc]/65">

        {/* ============================================================
            MOBILE LAYOUT (≤681px)
            ============================================================ */}
        <div className="mobile-catalog-layout tw:hidden tw:flex-col tw:gap-0 tw:w-full">
          {/* 1. Accent panel */}
          <div className="tw:px-4 tw:pt-0 tw:pb-4">
            <article className="vehicles-catalog__panel vehicles-catalog__panel--accent tw:p-[20px_22px] tw:rounded-[20px] tw:border tw:border-white/12 tw:text-[#e8eef6] tw:shadow-[0_16px_40px_rgba(30,27,75,0.22)]">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-amber-400/92">Browse by type</p>
              <h3 className="tw:m-0 tw:mb-[10px] tw:text-[1.08rem] tw:font-bold tw:tracking-[-0.02em]">Vehicle type hubs</h3>
              <p className="tw:m-0 tw:mb-[14px] tw:text-[0.9rem] tw:leading-[1.5] tw:text-[rgba(226,232,240,0.88)]">
                Imagery, guides, and live counts—from bicycles to heavy equipment.
              </p>
              <Link className="tw:text-[0.9rem] tw:font-bold tw:text-white hover:tw:underline" href="/vehicle-types">
                Explore hubs <span aria-hidden>→</span>
              </Link>
            </article>
          </div>

          {/* 2. Seller network panel */}
          <div className="tw:px-4 tw:pb-4">
            <article className="vehicles-catalog__panel tw:p-[20px_22px] tw:rounded-[20px] tw:bg-white/92 tw:border tw:border-black/9 tw:shadow-[0_8px_28px_rgba(30,27,75,0.07)]">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-indigo-700">Seller network</p>
              <h3 className="tw:m-0 tw:mb-[10px] tw:text-[1.08rem] tw:font-bold tw:tracking-[-0.02em]">Who lists here</h3>
              <p className="tw:m-0 tw:mb-[14px] tw:text-[0.9rem] tw:leading-[1.5] tw:text-[#565c78]">
                Compare garages, showrooms, and independents—same listing format across seller types.
              </p>
              <ul className="tw:m-0 tw:pl-[18px] tw:text-[#565c78]">
                {partnerTypes.slice(0, 4).map((pt) => (
                  <li key={pt.slug}>{pt.name}</li>
                ))}
              </ul>
            </article>
          </div>

{/* 3. Sticky Filter Toolbar Container */}
<div className="mobile-sticky-filter tw:sticky tw:top-[71px] tw:z-[200] tw:px-4">
  <div className="tw:bg-white tw:rounded-2xl tw:shadow-[0_10px_25px_rgba(0,0,0,0.08)] tw:overflow-visible">
    
    {/* Grid container keeping buttons strictly inside their vertical boundaries */}
    <div className="tw:grid tw:grid-cols-3 tw:items-center tw:gap-2.5 tw:p-3.5 tw:bg-gray-50/60 tw:border-b tw:border-gray-100 tw:overflow-visible">
      
      {/* Condition Filter */}
      <div className="tw:relative tw:w-full">
        <Link
          href={buildMobileGroupToggleHref(resolvedSearchParams, "condition")}
          scroll={false}
          className={[
            "tw:block tw:w-full tw:truncate tw:text-center tw:py-2.5 tw:px-2 tw:rounded-full tw:border tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-wider tw:no-underline tw:transition-all tw:duration-200 tw:ease-in-out tw:leading-none tw:shadow-sm",
            activeMobileGroup === "condition"
              ? "tw:border-[#5647b9] tw:bg-[#f0f0fd] tw:text-[#260999] tw:shadow-[#5647b9]/5"
              : "tw:border-gray-200 tw:bg-white tw:text-gray-600 hover:tw:bg-gray-50 tw:active:scale-[0.98]",
          ].join(" ")}
        >
          Condition
        </Link>

        {activeMobileGroup === "condition" && (
          /* High z-index (z-[400]) forces it to layer safely above catalog items below */
          <div className="tw:absolute tw:top-full tw:left-0 tw:z-[400] tw:mt-2 tw:w-full tw:max-h-56 tw:overflow-y-auto tw:bg-white tw:rounded-xl tw:shadow-[0_12px_32px_rgba(0,0,0,0.16)] tw:border tw:border-gray-150 tw:p-2 mobile-filter-dropdown-anim [scrollbar-width:thin] [&::-webkit-scrollbar]:tw:w-1 [&::-webkit-scrollbar-thumb]:tw:bg-gray-200 [&::-webkit-scrollbar-thumb]:tw:rounded-full">
            <div className="tw:flex tw:flex-col tw:gap-1.5">
              {facets.conditions.map((value) => {
                const isActive = condition === value;
                return (
                  <Link 
                    key={value} 
                    scroll={false}
                    href={buildFilterHref(resolvedSearchParams, "condition", value)}
                    className={[
                      "tw:flex tw:items-center tw:justify-between tw:w-full tw:px-3 tw:py-2.5 tw:rounded-lg tw:text-xs tw:font-medium tw:no-underline tw:transition-all tw:duration-150 tw:border",
                      isActive 
                        ? "tw:bg-indigo-50/80 tw:text-indigo-900 tw:font-semibold tw:border-indigo-200 tw:shadow-sm" 
                        : "tw:bg-white tw:text-gray-700 tw:border-gray-100 hover:tw:border-gray-200 hover:tw:bg-gray-50 tw:shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    ].join(" ")}
                  >
                    <span className="tw:truncate">{value}</span>
                    {isActive && (
                      <span className="tw:text-indigo-600 tw:font-bold tw:text-xs">✓</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Body Style / Vehicle Type Filter */}
      <div className="tw:relative tw:w-full">
        <Link
          href={buildMobileGroupToggleHref(resolvedSearchParams, "bodyStyle")}
          scroll={false}
          className={[
            "tw:block tw:w-full tw:truncate tw:text-center tw:py-2.5 tw:px-2 tw:rounded-full tw:border tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-wider tw:no-underline tw:transition-all tw:duration-200 tw:ease-in-out tw:leading-none tw:shadow-sm",
            activeMobileGroup === "bodyStyle"
              ? "tw:border-[#5647b9] tw:bg-[#f0f0fd] tw:text-[#260999] tw:shadow-[#5647b9]/5"
              : "tw:border-gray-200 tw:bg-white tw:text-gray-600 hover:tw:bg-gray-50 tw:active:scale-[0.98]",
          ].join(" ")}
        >
          Type
        </Link>

        {activeMobileGroup === "bodyStyle" && (
          /* High z-index (z-[400]) forces it to layer safely above catalog items below */
          <div className="tw:absolute tw:top-full tw:left-0 tw:z-[400] tw:mt-2 tw:w-full tw:max-h-56 tw:overflow-y-auto tw:bg-white tw:rounded-xl tw:shadow-[0_12px_32px_rgba(0,0,0,0.16)] tw:border tw:border-gray-150 tw:p-2 mobile-filter-dropdown-anim [scrollbar-width:thin] [&::-webkit-scrollbar]:tw:w-1 [&::-webkit-scrollbar-thumb]:tw:bg-gray-200 [&::-webkit-scrollbar-thumb]:tw:rounded-full">
            <div className="tw:flex tw:flex-col tw:gap-1.5">
              {visibleCategories.map((value) => {
                const isActive = bodyStyle === value;
                return (
                  <Link 
                    key={value} 
                    scroll={false}
                    href={buildFilterHref(resolvedSearchParams, "bodyStyle", value)}
                    className={[
                      "tw:flex tw:items-center tw:justify-between tw:w-full tw:px-3 tw:py-2.5 tw:rounded-lg tw:text-xs tw:font-medium tw:no-underline tw:transition-all tw:duration-150 tw:border",
                      isActive 
                        ? "tw:bg-indigo-50/80 tw:text-indigo-900 tw:font-semibold tw:border-indigo-200 tw:shadow-sm" 
                        : "tw:bg-white tw:text-gray-700 tw:border-gray-100 hover:tw:border-gray-200 hover:tw:bg-gray-50 tw:shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    ].join(" ")}
                  >
                    <span className="tw:truncate">{value}</span>
                    {isActive && (
                      <span className="tw:text-indigo-600 tw:font-bold tw:text-xs">✓</span>
                    )}
                  </Link>
                );
              })}
              {facets.categories.length > TYPE_LIMIT && (
                <Link scroll={false} className="tw:flex tw:justify-center tw:items-center tw:gap-1 tw:py-2.5 tw:mt-0.5 tw:text-[11px] tw:font-bold tw:text-indigo-600 hover:tw:text-indigo-800 tw:no-underline tw:border tw:border-dashed tw:border-gray-200 tw:rounded-lg hover:tw:bg-gray-50"
                  href={`/vehicles${buildQueryString({ condition, bodyStyle, fuel, showAllFuels: showAllFuels ? "true" : undefined, showAllTypes: showAllTypes ? undefined : "true", activeMobileGroup: "bodyStyle" })}`}>
                  <span>{showAllTypes ? "Show Less" : "More Options"}</span>
                  <span className="tw:text-[9px]">{showAllTypes ? "▲" : "▼"}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fuel Filter */}
      <div className="tw:relative tw:w-full">
        <Link
          href={buildMobileGroupToggleHref(resolvedSearchParams, "fuel")}
          scroll={false}
          className={[
            "tw:block tw:w-full tw:truncate tw:text-center tw:py-2.5 tw:px-2 tw:rounded-full tw:border tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-wider tw:no-underline tw:transition-all tw:duration-200 tw:ease-in-out tw:leading-none tw:shadow-sm",
            activeMobileGroup === "fuel"
              ? "tw:border-[#5647b9] tw:bg-[#f0f0fd] tw:text-[#260999] tw:shadow-[#5647b9]/5"
              : "tw:border-gray-200 tw:bg-white tw:text-gray-600 hover:tw:bg-gray-50 tw:active:scale-[0.98]",
          ].join(" ")}
        >
          Fuel
        </Link>

        {activeMobileGroup === "fuel" && (
          /* High z-index (z-[400]) forces it to layer safely above catalog items below */
          <div className="tw:absolute tw:top-full tw:left-0 tw:z-[400] tw:mt-2 tw:w-full tw:max-h-56 tw:overflow-y-auto tw:bg-white tw:rounded-xl tw:shadow-[0_12px_32px_rgba(0,0,0,0.16)] tw:border tw:border-gray-150 tw:p-2 mobile-filter-dropdown-anim [scrollbar-width:thin] [&::-webkit-scrollbar]:tw:w-1 [&::-webkit-scrollbar-thumb]:tw:bg-gray-200 [&::-webkit-scrollbar-thumb]:tw:rounded-full">
            <div className="tw:flex tw:flex-col tw:gap-1.5">
              {visibleFuels.map((value) => {
                const isActive = fuel === value;
                return (
                  <Link 
                    key={value} 
                    scroll={false}
                    href={buildFilterHref(resolvedSearchParams, "fuel", value)}
                    className={[
                      "tw:flex tw:items-center tw:justify-between tw:w-full tw:px-3 tw:py-2.5 tw:rounded-lg tw:text-xs tw:font-medium tw:no-underline tw:transition-all tw:duration-150 tw:border",
                      isActive 
                        ? "tw:bg-indigo-50/80 tw:text-indigo-900 tw:font-semibold tw:border-indigo-200 tw:shadow-sm" 
                        : "tw:bg-white tw:text-gray-700 tw:border-gray-100 hover:tw:border-gray-200 hover:tw:bg-gray-50 tw:shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    ].join(" ")}
                  >
                    <span className="tw:truncate">{value}</span>
                    {isActive && (
                      <span className="tw:text-indigo-600 tw:font-bold tw:text-xs">✓</span>
                    )}
                  </Link>
                );
              })}
              {facets.fuels.length > FUEL_LIMIT && (
                <Link scroll={false} className="tw:flex tw:justify-center tw:items-center tw:gap-1 tw:py-2.5 tw:mt-0.5 tw:text-[11px] tw:font-bold tw:text-indigo-600 hover:tw:text-indigo-800 tw:no-underline tw:border tw:border-dashed tw:border-gray-200 tw:rounded-lg hover:tw:bg-gray-50"
                  href={`/vehicles${buildQueryString({ condition, bodyStyle, fuel, showAllTypes: showAllTypes ? "true" : undefined, showAllFuels: showAllFuels ? undefined : "true", activeMobileGroup: "fuel" })}`}>
                  <span>{showAllFuels ? "Show Less" : "More Options"}</span>
                  <span className="tw:text-[9px]">{showAllFuels ? "▲" : "▼"}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Counts & Active Filter Badges */}
    <div className="tw:border-t tw:border-[#f3f4f6] tw:px-4 tw:pt-3 tw:pb-4">
      <div className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-x-2 tw:gap-y-1">
        <strong className="tw:text-[1.35rem] tw:font-extrabold tw:tracking-[-0.03em] tw:text-[#121329]">
          {filteredVehicles.length}
        </strong>
        <span className="tw:text-[0.9375rem] tw:text-[#565c78]">
          {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}
          {hasActiveFilters ? " · filtered" : ""}
        </span>
      </div>

      {hasActiveFilters && (
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:mt-2">
          {condition && (
            <Link href={hrefClearingFilter(resolvedSearchParams, "condition")} scroll={false}
              className={`vehicles-catalog__active-pill ${activeFilterPill}`}>
              <span>{condition}</span>
              <span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75">×</span>
            </Link>
          )}
          {bodyStyle && (
            <Link href={hrefClearingFilter(resolvedSearchParams, "bodyStyle")} scroll={false}
              className={`vehicles-catalog__active-pill ${activeFilterPill}`}>
              <span>{bodyStyle}</span>
              <span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75">×</span>
            </Link>
          )}
          {fuel && (
            <Link href={hrefClearingFilter(resolvedSearchParams, "fuel")} scroll={false}
              className={`vehicles-catalog__active-pill ${activeFilterPill}`}>
              <span>{fuel}</span>
              <span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75">×</span>
            </Link>
          )}
          <Link href="/vehicles" scroll={false}
            className="tw:text-sm tw:font-bold tw:text-indigo-700 tw:underline tw:[text-underline-offset:3px] tw:ml-auto">
            Clear all
          </Link>
        </div>
      )}
    </div>

  </div>
</div>

          {/* 4. Vehicle Grid (Mobile) */}
          <div className="tw:px-4 tw:pt-[16px]">
            {filteredVehicles.length === 0 ? (
              <div className="tw:p-10 tw:rounded-[20px] tw:text-center tw:bg-white/85 tw:border tw:border-dashed tw:border-indigo-400/28">
                <p className="tw:m-0 tw:mb-[10px] tw:text-[1.25rem] tw:font-bold">No listings match these filters</p>
                <p className="tw:m-0 tw:mb-[22px] tw:text-[#565c78] tw:text-[0.98rem]">Try removing a filter or browse all vehicles.</p>
                <Link className="button button--primary tw:inline-flex tw:items-center tw:justify-center tw:min-h-[48px] tw:px-[18px] tw:rounded-full tw:font-bold tw:text-white tw:bg-gradient-to-br tw:from-indigo-500 tw:to-violet-500" href="/vehicles" scroll={false}>
                  Show all vehicles
                </Link>
              </div>
            ) : (
              <div className="tw:grid tw:grid-cols-1 tw:gap-[18px]">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} isSignedIn={isSignedIn} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            DESKTOP LAYOUT (>681px)
            ============================================================ */}
        <div className="container catalog-layout vehicles-catalog__layout tw:w-[min(1180px,calc(100%-32px))] tw:mx-auto tw:grid tw:grid-cols-[minmax(250px,300px)_minmax(0,1fr)] tw:items-start tw:gap-[18px] desktop-catalog-layout">
          {/* Sidebar */}
          <aside className="catalog-sidebar vehicles-catalog__sidebar tw:grid tw:gap-5 tw:sticky tw:top-6 tw:h-[calc(100vh-48px)] tw:overflow-y-auto tw:[scrollbar-width:none] tw:[-ms-overflow-style:none] tw:overscroll-contain">
            <div className="vehicles-catalog__filters-head tw:mb-2">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-indigo-700">Filters</p>
              <h2 className="tw:m-0 tw:mb-2 tw:text-[1.35rem] tw:font-bold tw:tracking-[-0.025em]">Refine results</h2>
              <p className="tw:m-0 tw:text-sm tw:leading-[1.45] tw:text-[#565c78]">Tap to toggle. Combine filters; links stay bookmarkable.</p>
            </div>

            <article className="vehicles-catalog__panel vehicles-catalog__panel--accent tw:p-[20px_22px] tw:rounded-[20px] tw:border tw:border-white/12 tw:text-[#e8eef6] tw:shadow-[0_16px_40px_rgba(30,27,75,0.22)] tw:z-10">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-amber-400/92">Browse by type</p>
              <h3 className="tw:m-0 tw:mb-[10px] tw:text-[1.08rem] tw:font-bold tw:tracking-[-0.02em]">Vehicle type hubs</h3>
              <p className="tw:m-0 tw:mb-[14px] tw:text-[0.9rem] tw:leading-[1.5] tw:text-[rgba(226,232,240,0.88)]">
                Imagery, guides, and live counts—from bicycles to heavy equipment.
              </p>
              <Link className="tw:text-[0.9rem] tw:font-bold tw:text-white hover:tw:underline hover:tw:[text-underline-offset:3px]" href="/vehicle-types">
                Explore hubs <span aria-hidden>→</span>
              </Link>
            </article>

            {/* 1. Condition */}
            <div className="vehicles-catalog__filter-block filter-group tw:p-[18px_20px] tw:rounded-[20px] tw:bg-white/88 tw:border tw:border-black/9">
              <p className="tw:m-0 tw:mb-3 tw:text-[0.8125rem] tw:font-bold tw:tracking-[0.04em] tw:uppercase tw:text-[#565c78]">Condition</p>
              <div className="tw:flex tw:flex-col tw:gap-2">
                {facets.conditions.map((value) => (
                  <Link key={value} className={condition === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "condition", value)} scroll={false}>
                    {value}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Vehicle Type */}
            <div className="vehicles-catalog__filter-block filter-group tw:p-[18px_20px] tw:rounded-[20px] tw:bg-white/88 tw:border tw:border-black/9">
              <p className="tw:m-0 tw:mb-3 tw:text-[0.8125rem] tw:font-bold tw:tracking-[0.04em] tw:uppercase tw:text-[#565c78]">Vehicle type</p>
              <div className="tw:flex tw:flex-col tw:gap-2">
                {visibleCategories.map((value) => (
                  <Link key={value} className={bodyStyle === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "bodyStyle", value)} scroll={false}>
                    {value}
                  </Link>
                ))}
                {facets.categories.length > TYPE_LIMIT && (
                  <Link className="vehicles-catalog__toggle-button"
                    href={`/vehicles${buildQueryString({ condition, bodyStyle, fuel, showAllFuels: showAllFuels ? "true" : undefined, showAllTypes: showAllTypes ? undefined : "true", activeMobileGroup: activeMobileGroup || undefined })}`}
                    scroll={false}>
                    <span>{showAllTypes ? "Show less" : "Show more"}</span>
                    <span className="arrow">{showAllTypes ? "▲" : "▼"}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* 3. Fuel */}
            <div className="vehicles-catalog__filter-block filter-group tw:p-[18px_20px] tw:rounded-[20px] tw:bg-white/88 tw:border tw:border-black/9">
              <p className="tw:m-0 tw:mb-3 tw:text-[0.8125rem] tw:font-bold tw:tracking-[0.04em] tw:uppercase tw:text-[#565c78]">Fuel</p>
              <div className="tw:flex tw:flex-col tw:gap-2">
                {visibleFuels.map((value) => (
                  <Link key={value} className={fuel === value ? "chip chip--active" : "chip"}
                    href={buildFilterHref(resolvedSearchParams, "fuel", value)} scroll={false}>
                    {value}
                  </Link>
                ))}
                {facets.fuels.length > FUEL_LIMIT && (
                  <Link className="vehicles-catalog__toggle-button"
                    href={`/vehicles${buildQueryString({ condition, bodyStyle, fuel, showAllTypes: showAllTypes ? "true" : undefined, showAllFuels: showAllFuels ? undefined : "true", activeMobileGroup: activeMobileGroup || undefined })}`}
                    scroll={false}>
                    <span>{showAllFuels ? "Show less" : "Show more"}</span>
                    <span className="arrow">{showAllFuels ? "▲" : "▼"}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Network Panel */}
            <article className="vehicles-catalog__panel tw:p-[20px_22px] tw:rounded-[20px] tw:bg-white/92 tw:border tw:border-black/9 tw:shadow-[0_8px_28px_rgba(30,27,75,0.07)]">
              <p className="eyebrow tw:m-0 tw:mb-3 tw:text-[0.8rem] tw:tracking-[0.18em] tw:uppercase tw:text-indigo-700">Seller network</p>
              <h3 className="tw:m-0 tw:mb-[10px] tw:text-[1.08rem] tw:font-bold tw:tracking-[-0.02em]">Who lists here</h3>
              <p className="tw:m-0 tw:mb-[14px] tw:text-[0.9rem] tw:leading-[1.5] tw:text-[#565c78]">
                Compare garages, showrooms, and independents—same listing format across seller types.
              </p>
              <ul className="tw:m-0 tw:pl-[18px] tw:text-[#565c78]">
                {partnerTypes.slice(0, 4).map((pt) => (
                  <li key={pt.slug}>{pt.name}</li>
                ))}
              </ul>
            </article>
          </aside>

          {/* ── Results Column ── */}
          <div className="catalog-results vehicles-catalog__results tw:grid tw:gap-5 tw:w-full tw:relative">
            {/* Desktop Sticky Toolbar */}
            <div className="vehicles-catalog__toolbar tw:grid tw:gap-[14px] tw:p-[16px_18px] tw:mb-2 tw:rounded-[9px] tw:bg-white/95 tw:border tw:border-black/9 tw:shadow-[0_8px_28px_rgba(30,27,75,0.07)] tw:sticky tw:top-[71px] tw:z-10">
              <div className="tw:m-0 tw:flex tw:flex-wrap tw:items-baseline tw:gap-x-3 tw:gap-y-2 tw:text-[0.9375rem] tw:text-[#565c78]">
                <strong className="tw:text-[1.35rem] tw:font-extrabold tw:tracking-[-0.03em] tw:text-[#121329]">
                  {filteredVehicles.length}
                </strong>
                <span>
                  {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}
                  {hasActiveFilters ? " · filtered" : ""}
                </span>
              </div>
              {hasActiveFilters && (
                <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-[14px] tw:gap-y-[10px] tw:pt-1 tw:border-t tw:border-black/6">
                  <span className="tw:text-[0.72rem] tw:font-bold tw:tracking-[0.12em] tw:uppercase tw:text-[#565c78]">Active</span>
                  <div className="tw:flex tw:flex-wrap tw:gap-2 tw:flex-1">
                    {condition && (
                      <Link href={hrefClearingFilter(resolvedSearchParams, "condition")} className={`vehicles-catalog__active-pill ${activeFilterPill}`} aria-label={`Remove condition filter: ${condition}`} scroll={false}>
                        <span>{condition}</span><span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75" aria-hidden>×</span>
                      </Link>
                    )}
                    {bodyStyle && (
                      <Link href={hrefClearingFilter(resolvedSearchParams, "bodyStyle")} className={`vehicles-catalog__active-pill ${activeFilterPill}`} aria-label={`Remove vehicle type filter: ${bodyStyle}`} scroll={false}>
                        <span>{bodyStyle}</span><span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75" aria-hidden>×</span>
                      </Link>
                    )}
                    {fuel && (
                      <Link href={hrefClearingFilter(resolvedSearchParams, "fuel")} className={`vehicles-catalog__active-pill ${activeFilterPill}`} aria-label={`Remove fuel filter: ${fuel}`} scroll={false}>
                        <span>{fuel}</span><span className="tw:text-[1.1rem] tw:leading-none tw:opacity-75" aria-hidden>×</span>
                      </Link>
                    )}
                  </div>
                  <Link className="tw:text-sm tw:font-bold tw:text-indigo-700 tw:underline tw:[text-underline-offset:3px]" href="/vehicles" scroll={false}>
                    Clear all
                  </Link>
                </div>
              )}
            </div>

            {/* Results Grid */}
            {filteredVehicles.length === 0 ? (
              <div className="vehicles-catalog__empty tw:p-[clamp(40px,8vw,64px)_24px] tw:rounded-[20px] tw:text-center tw:bg-white/85 tw:border tw:border-dashed tw:border-indigo-400/28">
                <p className="tw:m-0 tw:mb-[10px] tw:text-[1.25rem] tw:font-bold tw:tracking-[-0.02em]">No listings match these filters</p>
                <p className="tw:m-0 tw:mb-[22px] tw:text-[#565c78] tw:text-[0.98rem]">Try removing a filter or browse all vehicles again.</p>
                <Link className="button button--primary tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[48px] tw:px-[18px] tw:rounded-full tw:font-bold tw:text-white tw:bg-gradient-to-br tw:from-indigo-500 tw:to-violet-500 tw:shadow-[0_14px_34px_rgba(79,70,229,0.28)] tw:transition-transform hover:tw:-translate-y-px"
                  href="/vehicles" scroll={false}>
                  Show all vehicles
                </Link>
              </div>
            ) : (
              <div className="vehicle-grid vehicles-catalog__grid tw:grid tw:grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] tw:gap-[22px] min-[1000px]:tw:grid-cols-2">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} isSignedIn={isSignedIn} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Global Context Styles ── */}
      <style>{`
        .catalog-sidebar::-webkit-scrollbar { display: none; width: 0; height: 0; }

        @media (max-width: 681px) {
          .mobile-catalog-layout { display: flex !important; }
          .desktop-catalog-layout { display: none !important; }
        }

        @media (min-width: 682px) {
          .mobile-catalog-layout { display: none !important; }
        }

        @keyframes filterDropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-filter-dropdown-anim {
          animation: filterDropdownIn 0.18s ease-out;
        }
      `}</style>

      <Script id="mobile-filter-toggle" strategy="afterInteractive">
        {`
          (function () {
            function isMobile() { return window.innerWidth <= 680; }
            document.addEventListener("click", function (e) {
              if (!isMobile()) return;
              const pill = e.target.closest(".mobile-pill-btn");
              if (!pill) return;
              pill.classList.toggle("is-active-pill");
            });
          })();
        `}
      </Script>
    </div>
  );
}