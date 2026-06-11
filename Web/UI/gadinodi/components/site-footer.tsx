import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
<div className="container footer-grid !grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 gap-6 items-start">
        {/* Gadinodi section */}
       <div className="sm:col-span-2 md:col-span-1">
          <p className="eyebrow">Gadinodi</p>
          <p className="footer-copy">
            A marketplace for new and used vehicles and spare parts in India—
            helping buyers compare listings from garages, showrooms, and trusted
            independent sellers.
          </p>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-2 md:order-none">
          <p className="footer-title font-semibold">Shop</p>

          <Link href="/vehicle-types" className="font-normal">
            Vehicle types
          </Link>

          <Link href="/vehicles" className="font-normal">
            All vehicles
          </Link>

          <Link href="/spare-parts" className="font-normal">
            Spare parts
          </Link>

          <Link href="/register" className="font-normal">
            Create account
          </Link>

          <Link href="/login" className="font-normal">
            Sign in
          </Link>
        </div>

        {/* Sell & Partner */}
        <div className="flex flex-col gap-2 md:order-none">
          <p className="footer-title font-semibold">Sell &amp; partner</p>

          <Link href="/partners" className="font-normal">
            Seller types
          </Link>

          <Link href="/partners/garages" className="font-normal">
            Garages
          </Link>

          <Link href="/partners/car-showrooms" className="font-normal">
            Car showrooms
          </Link>

          <Link href="/partners/individual-dealers" className="font-normal">
            Individual dealers
          </Link>
        </div>

      </div>
    </footer>
  );
}