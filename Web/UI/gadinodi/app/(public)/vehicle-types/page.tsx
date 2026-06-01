import type { Metadata } from "next";
import Link from "next/link";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { SectionHeading } from "@/components/section-heading";
import { VehicleTypeTile } from "@/components/vehicle-type-tile";
import { getVehicleTypes } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Vehicle types",
  description:
    "Browse bicycles, two-wheelers, cars, commercial vehicles, and construction equipment on Gadinodi — each type has its own hub with imagery and listings.",
  alternates: {
    canonical: "/vehicle-types",
  },
};

export default async function VehicleTypesIndexPage() {
  let vehicleTypes: Awaited<ReturnType<typeof getVehicleTypes>> = [];
  let apiAvailable = true;

  try {
    vehicleTypes = await getVehicleTypes();
  } catch {
    apiAvailable = false;
  }

  return (
    <>
      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <section className="page-hero vt-index-hero">
        <div className="container">
          <div className="breadcrumb vt-index-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Vehicle types</span>
          </div>
          <p className="eyebrow">Full catalogue</p>
          <h1>Find listings by vehicle type</h1>
          <p className="page-copy vt-index-lead">
            From bicycles and scooters to tippers, buses, excavators, and forklifts — open a type hub
            for imagery, context, and filtered inventory on {siteConfig.name}.
          </p>
        </div>
      </section>

      <section className="section vt-index-section">
        <div className="container">
          <SectionHeading
            eyebrow="All categories"
            title={
              vehicleTypes.length > 0
                ? `${vehicleTypes.length} vehicle and equipment types`
                : "Vehicle and equipment types"
            }
            description="Counts update from live listings. Types with zero listings still include buying guidance and filters."
          />

          {vehicleTypes.length > 0 ? (
            <div className="home-types-scroll">
              {vehicleTypes.map((vt) => (
                <VehicleTypeTile key={vt.slug} vehicleType={vt} size="strip" />
              ))}
            </div>
          ) : (
            <p className="home-empty">
              We couldn&apos;t load vehicle categories just now. Please refresh the page in a moment—or
              browse all listings from the main menu when they&apos;re back.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
