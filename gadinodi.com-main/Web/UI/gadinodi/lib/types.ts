import type { VehicleBodyStyle } from "./vehicle-types";

export type { VehicleBodyStyle } from "./vehicle-types";

export type VehicleCondition = "New" | "Used";
export type VehicleFuel = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG" | "Other";
export type VehicleTransmission = "Automatic" | "Manual";

export interface Metric {
  label: string;
  value: string;
}

export interface MarketStat {
  label: string;
  value: string;
}

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface VehicleListing {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  make: string;
  model: string;
  year: number;
  condition: VehicleCondition;
  price: number;
  mileage: string;
  fuel: VehicleFuel;
  bodyStyle: VehicleBodyStyle;
  transmission: VehicleTransmission;
  location: string;
  sellerName: string;
  sellerType: string;
  description: string;
  summary: string;
  color: string;
  seats: number;
  financeEstimate: number;
  rating: number;
  heroTone: string;
  features: string[];
  specs: VehicleSpec[];
}

export interface PartnerType {
  slug: string;
  name: string;
  shortLabel: string;
  badge: string;
  description: string;
  audience: string;
  highlights: string[];
  metrics: Metric[];
  ctaLabel: string;
}

export interface VehicleTypeSummary {
  slug: string;
  code: string;
  displayName: string;
  description: string;
  imageUrl: string;
  listingCount: number;
}

export interface VehicleTypeDetail extends VehicleTypeSummary {
  sampleListings: VehicleListing[];
}

export interface MarketplaceHomeData {
  categories: string[];
  vehicleTypes: VehicleTypeSummary[];
  marketStats: MarketStat[];
  featuredVehicles: VehicleListing[];
  partnerTypes: PartnerType[];
}

export interface MarketplaceFacets {
  categories: string[];
  conditions: VehicleCondition[];
  fuels: VehicleFuel[];
  transmissions: VehicleTransmission[];
  sellerTypes: string[];
}

export interface VehicleFilters {
  bodyStyle?: VehicleBodyStyle;
  condition?: VehicleCondition;
  fuel?: VehicleFuel;
  sellerType?: string;
  featured?: boolean;
  limit?: number;
}

export interface SparePartListing {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  partNumber: string | null;
  condition: VehicleCondition;
  price: number;
  location: string;
  sellerName: string;
  sellerType: string;
  compatibility: string;
  description: string;
  summary: string;
  warranty: string | null;
  features: string[];
  heroTone: string;
}

export interface SparePartFacets {
  categories: string[];
  conditions: VehicleCondition[];
}

export interface SparePartFilters {
  category?: string;
  condition?: VehicleCondition;
  limit?: number;
}
