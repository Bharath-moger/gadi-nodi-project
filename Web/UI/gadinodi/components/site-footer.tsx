import Link from "next/link";

const footerLinkClass =
  "tw:block tw:mt-2 tw:!text-[var(--muted)] tw:transition-colors tw:duration-200 tw:ease-out tw:hover:!text-[var(--accent)] tw:hover:!underline tw:hover:!decoration-[var(--accent)] tw:hover:decoration-2 tw:underline-offset-2 tw:focus-visible:!text-[var(--accent)] tw:focus-visible:!underline tw:focus-visible:!decoration-[var(--accent)] tw:focus-visible:decoration-2 tw:focus-visible:underline-offset-2 tw:focus-visible:ring-2 tw:focus-visible:ring-[rgba(99,102,241,0.35)] tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-white";

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

          <Link href="/vehicle-types" className={`${footerLinkClass} tw:font-normal`}>
            Vehicle types
          </Link>

          <Link href="/vehicles" className={`${footerLinkClass} tw:font-normal`}>
            All vehicles
          </Link>

          <Link href="/spare-parts" className={`${footerLinkClass} tw:font-normal`}>
            Spare parts
          </Link>

          <Link href="/register" className={`${footerLinkClass} tw:font-normal`}>
            Create account
          </Link>

          <Link href="/login" className={`${footerLinkClass} tw:font-normal`}>
            Sign in
          </Link>
        </div>

        {/* Sell & Partner */}
        <div className="tw:flex tw:flex-col tw:gap-2 tw:md:order-none">
          <p className="footer-title tw:font-semibold">Sell &amp; partner</p>

          <Link href="/partners" className={`${footerLinkClass} tw:font-normal`}>
            Seller types
          </Link>

          <Link href="/partners/garages" className={`${footerLinkClass} tw:font-normal`}>
            Garages
          </Link>

          <Link
            href="/partners/car-showrooms"
            className={`${footerLinkClass} tw:font-normal`}
          >
            Car showrooms
          </Link>

          <Link
            href="/partners/individual-dealers"
            className={`${footerLinkClass} tw:font-normal`}
          >
            Individual dealers
          </Link>
        </div>
      </div>
    </footer>
  );
}