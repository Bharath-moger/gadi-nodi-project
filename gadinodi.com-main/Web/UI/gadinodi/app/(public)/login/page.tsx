import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Gadinodi account to save listings and manage enquiries.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect: redirectParam } = await searchParams;

  return (
    <section className="auth-page">
      <div className="container">
        <div className="breadcrumb auth-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Sign in</span>
        </div>

        <div className="panel auth-panel">
          <p className="eyebrow">Account</p>
          <h1>Sign in</h1>
          <p className="page-copy auth-lead">
            Use the email and password you registered with. New here? Create an account—it
            takes under a minute.
          </p>
          <LoginForm redirectTo={typeof redirectParam === "string" ? redirectParam : undefined} />
        </div>
      </div>
    </section>
  );
}
