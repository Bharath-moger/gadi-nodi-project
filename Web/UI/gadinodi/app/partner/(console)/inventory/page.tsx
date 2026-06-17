import type { Metadata } from "next";
import Link from "next/link";

import { fetchPartnerApi } from "@/lib/partner-server";

export const metadata: Metadata = {
  title: "Inventory",
  robots: { index: false, follow: false },
};

type InventoryRow = {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  price: number;
  location: string;
  updatedAt: string;
};

export default async function PartnerInventoryPage() {
  // ORIGINAL FUNCTIONALITY: Safe, authentic async server data requests remain completely untouched
  const { ok, data } = await fetchPartnerApi<InventoryRow[]>("vehicles");

  if (!ok || !data) {
    return (
      <div className="partner-admin-page">
        <header className="partner-admin-page__header">
          <h2 className="partner-admin-page__title">Inventory</h2>
        </header>
        <div className="partner-admin-card">
          <p className="page-copy">Could not load inventory. Try again shortly.</p>
        </div>
      </div>
    );
  }

  return (
    /* Hides global scrollbars using clean Tailwind configurations */
    <div className="partner-admin-page tw:[&_~_.partner-admin_content]:[scrollbar-width:none] tw:[&_~_.partner-admin_content]::-webkit-scrollbar:tw:hidden">
      
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Inventory</h2>
          <p className="partner-admin-page__subtitle">
            {data.length} listing{data.length === 1 ? "" : "s"} in your seller account
          </p>
        </div>
        <div className="partner-admin-page__actions">
          <Link className="button button--primary" href="/partner/inventory/new">
            Add vehicle
          </Link>
        </div>
      </header>

      {data.length === 0 ? (
        <div className="partner-admin-card">
          <p className="page-copy">You have no listings yet.</p>
          <Link className="button button--primary partner-admin-inline-action" href="/partner/inventory/new">
            Create listing
          </Link>
        </div>
      ) : (
        /* Table Container Wrapper Box */
        <div className="partner-admin-card partner-admin-card--table tw:w-full tw:overflow-x-auto md:tw:overflow-x-visible [scrollbar-width:none] tw:[&::-webkit-scrollbar]:tw:hidden">
          <div className="tw:w-full tw:min-w-[700px] md:tw:min-w-full">
            
            <table className="partner-inventory-table tw:w-full">
              <thead>
                <tr>
                  <th>Vehicle Details</th>
                  <th>Year</th>
                  <th>Condition</th>
                  <th>Rental Price</th>
                  <th>Location</th>
                  <th>Updated</th>
                  <th className="tw:text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.slug}>
                    <td>
                      <strong>{row.title}</strong>
                      <div className="partner-inventory-meta">
                        {row.make} {row.model}
                      </div>
                    </td>
                    <td>{row.year}</td>
                    <td>{row.condition}</td>
                    <td>₹{row.price.toLocaleString("en-IN")}</td>
                    <td>{row.location}</td>
                    <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                    
                    {/* ACTIONS HUB */}
                    <td className="tw:text-right">
                      <div className="tw:inline-block tw:text-left tw:relative">
                        <details className="tw:inline-block tw:text-left tw:relative tw:list-none [&::-webkit-details-marker]:tw:hidden">
                          
                          <summary className="tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-lg tw:text-slate-400 tw:hover:text-slate-600 tw:hover:bg-slate-100 tw:cursor-pointer focus:tw:outline-none tw:list-none tw:ml-auto">
                            <svg className="tw:w-5 tw:h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                            </svg>
                          </summary>

                          {/* FIXED DROPDOWN POSITION: Clean top-full dropdown for desktop screens, bottom-full adjustment specifically limited to small viewports via max-md utility boundaries */}
                          <div className="tw:absolute tw:right-0 tw:top-full tw:mt-1 max-md:tw:top-auto max-md:tw:bottom-full max-md:tw:mb-2 tw:w-40 tw:bg-white tw:rounded-xl tw:shadow-2xl tw:ring-1 tw:ring-slate-900/5 tw:divide-y tw:divide-slate-100 tw:z-[500] tw:border tw:border-slate-100">
                            <div className="tw:py-1.5">
                              <Link
                                href={`/vehicles/${row.slug}`}
                                className="tw:block tw:px-4 tw:py-2 tw:text-sm tw:text-slate-700 tw:hover:bg-slate-50 tw:font-medium transition-colors tw:text-left"
                              >
                                View live
                              </Link>
                              <Link
                                href={`/partner/inventory/${row.slug}`}
                                className="tw:block tw:px-4 tw:py-2 tw:text-sm tw:text-slate-700 tw:hover:bg-slate-50 tw:font-medium transition-colors tw:text-left"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>

                        </details>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  );
}