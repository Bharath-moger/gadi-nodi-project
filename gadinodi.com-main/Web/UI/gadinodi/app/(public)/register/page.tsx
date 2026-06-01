import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Gadinodi buyer account to track vehicles and enquiries.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <section className="auth-page">
      <div className="container">
        <div className="breadcrumb auth-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Create account</span>
        </div>

        <div className="panel auth-panel">
          <p className="eyebrow">Account</p>
          <h1>Create account</h1>
          <p className="page-copy auth-lead">
            Save listings, compare sellers, and move faster when you are ready to buy or book a
            test drive.
          </p>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
