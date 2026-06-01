import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { formatApiError, getInternalApiBase } from "@/lib/internal-api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const res = await fetch(`${getInternalApiBase()}/auth/register-partner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      typeof data === "object" && data !== null ? data : { message: formatApiError(data) },
      { status: res.status },
    );
  }

  const parsed = data as { accessToken?: string; user?: unknown; partnerProfile?: unknown };
  if (!parsed.accessToken) {
    return NextResponse.json({ message: "Invalid response from server" }, { status: 502 });
  }

  const response = NextResponse.json({
    user: parsed.user,
    partnerProfile: parsed.partnerProfile,
  });
  response.cookies.set(SESSION_COOKIE_NAME, parsed.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
