import Link from "next/link";

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
          <Link href="/vehicle-types">Vehicle types</Link>
          <Link href="/vehicles">All vehicles</Link>
          <Link href="/spare-parts">Spare parts</Link>
          <Link href="/register">Create account</Link>
          <Link href="/login">Sign in</Link>
        </div>

        <div>
          <p className="footer-title">Sell &amp; partner</p>
          <Link href="/partners">Seller types</Link>
          <Link href="/partners/garages">Garages</Link>
          <Link href="/partners/car-showrooms">Car showrooms</Link>
          <Link href="/partners/individual-dealers">Individual dealers</Link>
        </div>
      </div>
    </footer>
  );
}
