import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { PartnerLoginForm } from "@/components/partner-login-form";

export const metadata: Metadata = {
  title: "Seller sign in",
  robots: { index: false, follow: false },
};

export default function PartnerLoginPage() {
  return (
    <section className="auth-page">
      <div className="container">
        <div className="breadcrumb auth-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/partners">For sellers</Link>
          <span>/</span>
          <span>Seller sign in</span>
        </div>

        <div className="panel auth-panel">
          <p className="eyebrow">Seller portal</p>
          <h1>Seller sign in</h1> 
          <p className="page-copy auth-lead">
            Use the email and password for your seller account. If you still need a seller profile, complete
            onboarding first.
          </p>
          <Suspense fallback={<p className="page-copy">Loading…</p>}>
            <PartnerLoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
