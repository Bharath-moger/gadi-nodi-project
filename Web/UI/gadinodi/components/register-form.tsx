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

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const fd = new FormData(form);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }

    const payload = {
      email: String(fd.get("email") ?? "").trim(),
      password,
      name: String(fd.get("name") ?? "").trim() || undefined,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(apiErrorMessage(data, "Could not create account"));
        setPending(false);
        return;
      }

      router.push("/vehicles");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setPending(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {error ? <p className="auth-error">{error}</p> : null}

      <div className="field">
        <label htmlFor="register-name">Name (optional)</label>
        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="register-confirm">Confirm password</label>
        <input
          id="register-confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={pending}
        />
      </div>
      <button
  className="button button--primary auth-submit"
  type="submit"
  disabled={pending}
>
  {pending ? "Creating account…" : "Create account"}
</button>

<div className="tw:mt-6 tw:flex tw:flex-col tw:gap-3 tw:text-center tw:text-sm tw:text-slate-600">
  <p>
    Already have a buyer account?{" "}
    <Link
      href="/login"
      className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
    >
      Sign In
    </Link>
  </p>

  <p>
    Want to sell?{" "}
    <Link
      href="/partner/onboarding"
      className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
    >
      Register as Seller
    </Link>
  </p>

  <p>
    Already a partner?{" "}
    <Link
      href="/partner/login"
      className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
    >
      Partner Login
    </Link>
  </p>
</div>
    </form>
  );
}