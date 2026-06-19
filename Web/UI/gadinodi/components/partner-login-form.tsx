"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

function apiErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") {
    return fallback;
  }
  const message = (data as { message?: unknown }).message;
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return message.map(String).join(", ");
  }
  return fallback;
}

function safeRedirect(raw: string | null, fallback: string) {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return fallback;
  }
  return raw;
}

export function PartnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const payload = {
      email: String(new FormData(form).get("email") ?? "").trim(),
      password: String(new FormData(form).get("password") ?? ""),
    };

    const redirectParam = searchParams.get("redirect");
    const fallback = "/partner/dashboard";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(apiErrorMessage(data, "Could not sign in"));
        setPending(false);
        return;
      }

      const parsed = data as { partnerProfile?: unknown };
      const target = safeRedirect(redirectParam, fallback);
      if (!parsed.partnerProfile) {
        router.push("/partner/onboarding");
      } else {
        router.push(target);
      }
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setPending(false);
    }
  }

 return (
  <form className="auth-form" method="post" onSubmit={onSubmit}>
    {error ? <p className="auth-error">{error}</p> : null}

    <div className="field">
      <label htmlFor="partner-login-email">Email</label>
      <input
        id="partner-login-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        disabled={pending}
      />
    </div>

    <div className="field">
      <label htmlFor="partner-login-password">Password</label>
      <input
        id="partner-login-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        disabled={pending}
      />
    </div>

    <button
      className="button button--primary auth-submit"
      type="submit"
      disabled={pending}
    >
      {pending ? "Signing in…" : "Sign in to seller portal"}
    </button>

    <div className="tw:mt-6 tw:flex tw:flex-col tw:gap-3 tw:text-center tw:text-sm tw:text-slate-600">
      <p>
        New to selling?{" "}
        <Link
          href="/partner/onboarding"
          className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
        >
          Create Seller Account
        </Link>
      </p>

      <p>
        Buyer?{" "}
        <Link
          href="/login"
          className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
        >
          Sign In as Buyer
        </Link>
      </p>
    </div>
  </form>
);
}