import type {
  MarketStat as MarketStatRecord,
  PartnerType as PartnerTypeRecord,
  Prisma,
  SparePart as SparePartRecord,
  Vehicle as VehicleRecord,
} from "@prisma/client";

import type {
  MarketStat,
  Metric,
  PartnerType,
  SparePartListing,
  VehicleBodyStyle,
  VehicleListing,
  VehicleSpec,
} from "./types";

function parseMetricList(value: Prisma.JsonValue): Metric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is { label: string; value: string } =>
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "value" in item &&
        typeof item.label === "string" &&
        typeof item.value === "string",
    )
    .map((item) => ({
      label: item.label,
      value: item.value,
    }));
}

function parseVehicleSpecList(value: Prisma.JsonValue): VehicleSpec[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is { label: string; value: string } =>
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "value" in item &&
        typeof item.label === "string" &&
        typeof item.value === "string",
    )
    .map((item) => ({
      label: item.label,
      value: item.value,
    }));
}

export function serializeMarketStat(record: MarketStatRecord): MarketStat {
  return {
    label: record.label,
    value: record.value,
  };
}

export function serializePartnerType(record: PartnerTypeRecord): PartnerType {
  return {
    slug: record.slug,
    name: record.name,
    shortLabel: record.shortLabel,
    badge: record.badge,
    description: record.description,
    audience: record.audience,
    highlights: record.highlights,
    metrics: parseMetricList(record.metrics),
    ctaLabel: record.ctaLabel,
  };
}

export function serializeSparePart(record: SparePartRecord): SparePartListing {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    subtitle: record.subtitle,
    category: record.category,
    partNumber: record.partNumber,
    condition: record.condition,
    price: record.price,
    location: record.location,
    sellerName: record.sellerName,
    sellerType: record.sellerType,
    compatibility: record.compatibility,
    description: record.description,
    summary: record.summary,
    warranty: record.warranty,
    features: record.features,
    heroTone: record.heroTone,
  };
}

export function serializeVehicle(record: VehicleRecord): VehicleListing {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    subtitle: record.subtitle,
    make: record.make,
    model: record.model,
    year: record.year,
    condition: record.condition,
    price: record.price,
    mileage: record.mileage,
    fuel: record.fuel,
    bodyStyle: record.bodyStyle as VehicleBodyStyle,
    transmission: record.transmission,
    location: record.location,
    sellerName: record.sellerName,
    sellerType: record.sellerType,
    description: record.description,
    summary: record.summary,
    color: record.color,
    seats: record.seats,
    financeEstimate: record.financeEstimate,
    rating: record.rating,
    heroTone: record.heroTone,
    imageUrls: record.imageUrls,
    features: record.features,
    specs: parseVehicleSpecList(record.specs),
  };
}
