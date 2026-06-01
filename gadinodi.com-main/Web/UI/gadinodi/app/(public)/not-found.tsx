import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <p className="eyebrow">404</p>
        <h1>That page is not available.</h1>
        <p>
          The route may not exist yet or the listing could have been removed
          from the current demo data set.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" href="/">
            Go to storefront
          </Link>
          <Link className="button button--secondary" href="/vehicles">
            Browse vehicles
          </Link>
        </div>
      </div>
    </section>
  );
}
