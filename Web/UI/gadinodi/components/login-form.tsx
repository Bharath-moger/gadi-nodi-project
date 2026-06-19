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

function safeRedirect(raw: string | undefined, fallback: string) {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return fallback;
  }
  return raw;
}

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
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

      router.push(safeRedirect(redirectTo, "/vehicles"));
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
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
        />
      </div>

      <div className="field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
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
        {pending ? "Signing in…" : "Sign in"}
      </button>

     {/* GN-012 Navigation Links */}
     <div className="tw:mt-6 tw:flex tw:flex-col tw:gap-3 tw:text-center tw:text-sm tw:text-slate-600">
       <p className="auth-switch">
         New buyer?{" "}
         <Link
           href="/register"
           className="tw:font-bold! tw:text-slate-600! tw:no-underline! tw:underline-offset-4! tw:hover:text-blue-600! tw:hover:underline!"
         >
           Create Account
         </Link>
       </p>

       <p className="auth-switch">
         Partner?{" "}
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