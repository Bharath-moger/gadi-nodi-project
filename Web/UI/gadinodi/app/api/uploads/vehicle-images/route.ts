import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

const MAX_FILES = 8;
const MAX_BYTES = 8 * 1024 * 1024;

type ImgBbResponse = {
  success?: boolean;
  data?: {
    url?: string;
    display_url?: string;
  };
  error?: {
    message?: string;
  };
};

async function uploadFileToImgBb(file: File, apiKey: string) {
  const body = new FormData();
  body.append("image", file);
  body.append("name", file.name);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(30000),
  });

  const data = (await response.json().catch(() => null)) as ImgBbResponse | null;
  const url = data?.data?.url ?? data?.data?.display_url ?? null;

  if (!response.ok || !data?.success || !url) {
    throw new Error(data?.error?.message || "Could not upload image to ImgBB");
  }

  return url;
}

export async function POST(request: Request) {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "IMGBB_API_KEY is missing in Web/UI/gadinodi/.env" },
      { status: 500 },
    );
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid upload payload" }, { status: 400 });
  }

  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ message: "Select at least one image" }, { status: 400 });
  }

  if (files.length > MAX_FILES) {
    return NextResponse.json({ message: `You can upload up to ${MAX_FILES} images` }, { status: 400 });
  }

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: `${file.name} is not an image file` }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { message: `${file.name} exceeds the 8 MB upload limit` },
        { status: 400 },
      );
    }
  }

  try {
    const urls = await Promise.all(files.map((file) => uploadFileToImgBb(file, apiKey)));
    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Image upload failed. Please try again.",
      },
      { status: 502 },
    );
  }
}
