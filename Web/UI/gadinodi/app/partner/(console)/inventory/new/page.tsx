import type { Metadata } from "next";

import { PartnerVehicleForm } from "@/components/partner-vehicle-form";

export const metadata: Metadata = {
  title: "Add vehicle",
  robots: { index: false, follow: false },
};

export default function PartnerNewVehiclePage() {
  return (
    <div className="partner-admin-page">
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Add vehicle</h2>
          <p className="partner-admin-page__subtitle">
            Required fields match the public catalogue. Optional fields improve buyer confidence.
          </p>
        </div>
      </header>

      <div className="partner-admin-card">
        <PartnerVehicleForm mode="create" />
      </div>
    </div>
  );
}
