import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
<div className="container footer-grid tw:!grid tw:!grid-cols-2 tw:md:!grid-cols-3 tw:gap-6 tw:items-start tw:w-full tw:px-4">
<div className="tw:col-span-2 tw:md:col-span-1">
              <p className="eyebrow">Gadinodi</p>
          <p className="footer-copy">
            A marketplace for new and used vehicles and spare parts in India—
            helping buyers compare listings from garages, showrooms, and trusted
            independent sellers.
          </p>
        </div>

        {/* Shop */}
        <div className="tw:flex tw:flex-col tw:gap-2 tw:md:order-none">
          <p className="footer-title tw:font-semibold">Shop</p>

          <Link href="/vehicle-types" className="tw:font-normal">
            Vehicle types
          </Link>

          <Link href="/vehicles" className="tw:font-normal">
            All vehicles
          </Link>

          <Link href="/spare-parts" className="tw:font-normal">
            Spare parts
          </Link>

          <Link href="/register" className="tw:font-normal">
            Create account
          </Link>

          <Link href="/login" className="tw:font-normal">
            Sign in
          </Link>
        </div>

        {/* Sell & Partner */}
        <div className="tw:flex tw:flex-col tw:gap-2 tw:md:order-none">
          <p className="footer-title tw:font-semibold">Sell &amp; partner</p>

          <Link href="/partners" className="tw:font-normal">
            Seller types
          </Link>

          <Link href="/partners/garages" className="tw:font-normal">
            Garages
          </Link>

          <Link href="/partners/car-showrooms" className="tw:font-normal">
            Car showrooms
          </Link>

          <Link href="/partners/individual-dealers" className="tw:font-normal">
            Individual dealers
          </Link>
        </div>

      </div>
    </footer>
  );
}