"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

export type PartnerTypeOption = {
  slug: string;
  name: string;
};

type PartnerOnboardingFormProps = {
  partnerTypes: PartnerTypeOption[];
  initialPartnerSlug: string | null;
  mode: "register" | "complete";
  signedInEmail?: string;
  defaultName?: string;
};

export function PartnerOnboardingForm({
  partnerTypes,
  initialPartnerSlug,
  mode,
  signedInEmail,
  defaultName = "",
}: PartnerOnboardingFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [partnerSlug, setPartnerSlug] = useState(
    initialPartnerSlug && partnerTypes.some((p) => p.slug === initialPartnerSlug)
      ? initialPartnerSlug
      : (partnerTypes[0]?.slug ?? ""),
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const fd = new FormData(form);

    const businessName = String(fd.get("businessName") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const city = String(fd.get("city") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();

    try {
      if (mode === "complete") {
        const res = await fetch("/api/auth/complete-partner-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            partnerTypeSlug: partnerSlug,
            businessName,
            phone,
            city,
            ...(name ? { name } : {}),
          }),
        });
        const data: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(apiErrorMessage(data, "Could not save seller profile"));
          setPending(false);
          return;
        }
      } else {
        const password = String(fd.get("password") ?? "");
        const confirm = String(fd.get("confirm") ?? "");
        if (password !== confirm) {
          setError("Passwords do not match");
          setPending(false);
          return;
        }
        const email = String(fd.get("email") ?? "").trim();
        const res = await fetch("/api/auth/register-partner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name,
            partnerTypeSlug: partnerSlug,
            businessName,
            phone,
            city,
          }),
        });
        const data: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(apiErrorMessage(data, "Could not create seller account"));
          setPending(false);
          return;
        }
      }

      router.push("/partner/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setPending(false);
    }
  }

  if (partnerTypes.length === 0) {
    return (
      <p className="auth-error" role="alert">
        Partner categories are unavailable right now. Try again once the catalogue API is online.
      </p>
    );
  }

  return (
    <form className="auth-form" method="post" onSubmit={onSubmit}>
      {error ? <p className="auth-error">{error}</p> : null}

      {mode === "complete" && signedInEmail ? (
        <p className="page-copy" style={{ marginBottom: 16 }}>
          Signed in as <strong>{signedInEmail}</strong>. Add your seller details to open the partner portal.
        </p>
      ) : null}

      <div className="field">
        <label htmlFor="partner-type">Seller category</label>
        <select
          id="partner-type"
          name="partnerTypeSlug"
          value={partnerSlug}
          onChange={(e) => setPartnerSlug(e.target.value)}
          required
          disabled={pending}
        >
          {partnerTypes.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {mode === "register" ? (
        <>
          <div className="field">
            <label htmlFor="partner-email">Email</label>
            <input
              id="partner-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
            />
          </div>
          <div className="field">
            <label htmlFor="partner-password">Password</label>
            <input
              id="partner-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={pending}
            />
          </div>
          <div className="field">
            <label htmlFor="partner-confirm">Confirm password</label>
            <input
              id="partner-confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={pending}
            />
          </div>
        </>
      ) : null}

      <div className="field">
        <label htmlFor="partner-name">Your name</label>
        <input
          id="partner-name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={defaultName}
          required={mode === "register"}
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="partner-business">Business name</label>
        <input
          id="partner-business"
          name="businessName"
          type="text"
          autoComplete="organization"
          required
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="partner-phone">Phone</label>
        <input
          id="partner-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          disabled={pending}
        />
      </div>

      <button className="button button--primary auth-submit" type="submit" disabled={pending}>
  {pending ? "Saving…" : mode === "complete" ? "Finish setup" : "Create seller account"}
</button>

<div className="tw:mt-6 tw:flex tw:flex-col tw:gap-3 tw:text-center tw:text-sm tw:text-slate-600">
  {mode === "register" ? (
    <>
      <p className="tw:text-slate-600">
        Already a seller?{" "}
        <Link
          href="/partner/login"
          className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
        >
          Sign In
        </Link>
      </p>

      <p className="tw:text-slate-600">
        Looking to buy?{" "}
        <Link
          href="/login"
          className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
        >
          Sign In as Buyer
        </Link>
      </p>

      <p className="tw:text-slate-600">
        New buyer?{" "}
        <Link
          href="/register"
          className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
        >
          Create Account
        </Link>
      </p>
    </>
  ) : (
    <p className="tw:text-slate-600">
      Need a different account? Use <strong>Sign out</strong> in the site header first.
    </p>
  )}
</div>

</form>
);
}