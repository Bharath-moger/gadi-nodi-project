import { CATALOG_FETCH_GENERIC } from "@/lib/catalog-messages";
import type {
  MarketplaceFacets,
  MarketplaceHomeData,
  PartnerType,
  SparePartFacets,
  SparePartFilters,
  SparePartListing,
  VehicleListing,
  VehicleFilters,
  VehicleCondition,
  VehicleFuel,
  VehicleTransmission,
  VehicleTypeDetail,
  VehicleTypeSummary,
} from "@/lib/types";

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000/api";

const FETCH_TIMEOUT_MS = 8000;

type ApiFetchOptions = RequestInit & {
  allowNotFound?: boolean;
};

type NullableApiFetchOptions = RequestInit & {
  allowNotFound: true;
};

function buildApiUrl(
  pathname: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(pathname, API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function fetchFromApi<T>(
  pathname: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: ApiFetchOptions,
): Promise<T>;
function fetchFromApi<T>(
  pathname: string,
  params: Record<string, string | number | boolean | undefined> | undefined,
  options: NullableApiFetchOptions,
): Promise<T | null>;
async function fetchFromApi<T>(
  pathname: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: ApiFetchOptions | NullableApiFetchOptions,
): Promise<T | null> {
  const url = buildApiUrl(pathname, params);

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[gadinodi catalogue]", url, err);
    }
    throw new Error(CATALOG_FETCH_GENERIC, { cause: err });
  }

  if (response.status === 404 && options?.allowNotFound) {
    return null;
  }

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[gadinodi catalogue]", response.status, response.statusText, url);
    }
    throw new Error(CATALOG_FETCH_GENERIC);
  }

  return (await response.json()) as T;
}

export async function getHomePageData() {
  return fetchFromApi<MarketplaceHomeData>("marketplace/home");
}

export async function getMarketplaceFacets() {
  return fetchFromApi<MarketplaceFacets>("marketplace/facets");
}

export async function getVehicles(filters: VehicleFilters = {}) {
  return fetchFromApi<VehicleListing[]>("vehicles", { ...filters });
}

export async function getVehicleBySlug(slug: string) {
  return fetchFromApi<VehicleListing>(`vehicles/${slug}`, undefined, {
    allowNotFound: true,
  });
}

export async function getRelatedVehicles(slug: string, limit = 3) {
  return fetchFromApi<VehicleListing[]>(`vehicles/${slug}/related`, { limit }, {
    allowNotFound: true,
  }).then((response) => response ?? []);
}

export async function getPartnerTypes() {
  return fetchFromApi<PartnerType[]>("partners");
}

export async function getPartnerTypeBySlug(slug: string) {
  return fetchFromApi<PartnerType>(`partners/${slug}`, undefined, {
    allowNotFound: true,
  });
}

export async function getVehicleSlugs() {
  return fetchFromApi<string[]>("vehicles/slugs");
}

export async function getPartnerSlugs() {
  return fetchFromApi<string[]>("partners/slugs");
}

export async function getVehicleTypes() {
  return fetchFromApi<VehicleTypeSummary[]>("vehicle-types");
}

export async function getVehicleTypeSlugs() {
  return fetchFromApi<string[]>("vehicle-types/slugs");
}

export async function getVehicleTypeBySlug(slug: string) {
  return fetchFromApi<VehicleTypeDetail>(`vehicle-types/${slug}`, undefined, {
    allowNotFound: true,
  });
}

export async function getSparePartFacets() {
  return fetchFromApi<SparePartFacets>("spare-parts/facets");
}

export async function getSpareParts(filters: SparePartFilters = {}) {
  return fetchFromApi<SparePartListing[]>("spare-parts", { ...filters });
}

export async function getSparePartBySlug(slug: string) {
  return fetchFromApi<SparePartListing>(`spare-parts/${slug}`, undefined, {
    allowNotFound: true,
  });
}

export async function getSparePartSlugs() {
  return fetchFromApi<string[]>("spare-parts/slugs");
}

const EMPTY_HOME: MarketplaceHomeData = {
  categories: [],
  vehicleTypes: [],
  marketStats: [],
  featuredVehicles: [],
  partnerTypes: [],
};

const EMPTY_FACETS: MarketplaceFacets = {
  categories: [],
  conditions: [] as VehicleCondition[],
  fuels: [] as VehicleFuel[],
  transmissions: [] as VehicleTransmission[],
  sellerTypes: [],
};

const EMPTY_SPARE_FACETS: SparePartFacets = {
  categories: [],
  conditions: [] as VehicleCondition[],
};

/** Loads home catalog data; returns empty shapes when the API is unreachable so pages still render. */
export async function loadHomePageData(): Promise<{
  data: MarketplaceHomeData;
  apiAvailable: boolean;
}> {
  try {
    const data = await getHomePageData();
    return { data, apiAvailable: true };
  } catch {
    return { data: EMPTY_HOME, apiAvailable: false };
  }
}

/** Loads vehicles PLP bundle; returns empty lists when the API is unreachable. */
export async function loadVehiclesCatalog(filters: VehicleFilters): Promise<{
  filteredVehicles: VehicleListing[];
  partnerTypes: PartnerType[];
  facets: MarketplaceFacets;
  apiAvailable: boolean;
}> {
  try {
    const [filteredVehicles, partnerTypes, facets] = await Promise.all([
      getVehicles(filters),
      getPartnerTypes(),
      getMarketplaceFacets(),
    ]);
    return { filteredVehicles, partnerTypes, facets, apiAvailable: true };
  } catch {
    return {
      filteredVehicles: [],
      partnerTypes: [],
      facets: EMPTY_FACETS,
      apiAvailable: false,
    };
  }
}

/** Partner index page data when the API may be offline. */
export async function loadPartnerTypesCatalog(): Promise<{
  partnerTypes: PartnerType[];
  apiAvailable: boolean;
}> {
  try {
    const partnerTypes = await getPartnerTypes();
    return { partnerTypes, apiAvailable: true };
  } catch {
    return { partnerTypes: [], apiAvailable: false };
  }
}

/** Spare parts PLP bundle when the API may be offline. */
export async function loadSparePartsCatalog(filters: SparePartFilters): Promise<{
  parts: SparePartListing[];
  facets: SparePartFacets;
  apiAvailable: boolean;
}> {
  try {
    const [parts, facets] = await Promise.all([getSpareParts(filters), getSparePartFacets()]);
    return { parts, facets, apiAvailable: true };
  } catch {
    return { parts: [], facets: EMPTY_SPARE_FACETS, apiAvailable: false };
  }
}
