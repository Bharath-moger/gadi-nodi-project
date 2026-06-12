import Link from "next/link";

const footerLinkClass =
  "tw:block tw:mt-2 tw:!text-[var(--muted)] tw:transition-colors tw:duration-200 tw:ease-out tw:hover:!text-[var(--accent)] tw:hover:!underline tw:hover:!decoration-[var(--accent)] tw:hover:decoration-2 tw:underline-offset-2 tw:focus-visible:tw:!text-[var(--accent)] tw:focus-visible:tw:!underline tw:focus-visible:tw:!decoration-[var(--accent)] tw:focus-visible:tw:decoration-2 tw:focus-visible:tw:underline-offset-2 tw:focus-visible:tw:ring-2 tw:focus-visible:tw:ring-[rgba(99,102,241,0.35)] tw:focus-visible:tw:ring-offset-2 tw:focus-visible:tw:ring-offset-white";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">Gadinodi</p>
          <p className="footer-copy">
            A marketplace for new and used vehicles and spare parts in India—helping buyers compare
            listings from garages, showrooms, and trusted independent sellers.
          </p>
        </div>

        <div>
          <p className="footer-title">Shop</p>
          <Link className={footerLinkClass} href="/vehicle-types">
            Vehicle types
          </Link>
          <Link className={footerLinkClass} href="/vehicles">
            All vehicles
          </Link>
          <Link className={footerLinkClass} href="/spare-parts">
            Spare parts
          </Link>
          <Link className={footerLinkClass} href="/register">
            Create account
          </Link>
          <Link className={footerLinkClass} href="/login">
            Sign in
          </Link>
        </div>

        <div>
          <p className="footer-title">Sell &amp; partner</p>
          <Link className={footerLinkClass} href="/partners">
            Seller types
          </Link>
          <Link className={footerLinkClass} href="/partners/garages">
            Garages
          </Link>
          <Link className={footerLinkClass} href="/partners/car-showrooms">
            Car showrooms
          </Link>
          <Link className={footerLinkClass} href="/partners/individual-dealers">
            Individual dealers
          </Link>
        </div>
      </div>
    </footer>
  );
}
