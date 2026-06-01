import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getInternalApiBase } from "@/lib/internal-api";

async function proxy(request: Request, pathSegments: string[] | undefined) {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const joined = pathSegments?.length ? pathSegments.join("/") : "";
  const url = new URL(request.url);
  const target = `${getInternalApiBase()}/admin/${joined}${url.search}`;

  const method = request.method;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  let body: string | undefined;
  if (method !== "GET" && method !== "HEAD") {
    const ct = request.headers.get("content-type");
    headers["Content-Type"] = ct && ct.length > 0 ? ct : "application/json";
    body = await request.text();
  }

  const upstream = await fetch(target, {
    method,
    headers,
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(30000),
  });

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") ?? "application/json; charset=utf-8";
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": contentType },
  });
}

export async function GET(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(request, path);
}

export async function POST(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(request, path);
}
