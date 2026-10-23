import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyPasscodeInput,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Otentikasi pengelola belum diaktifkan di server (ADMIN_PASSCODE & ADMIN_SESSION_SECRET).",
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as { passcode?: string } | null;
  const passcode = body?.passcode || "";

  if (!verifyPasscodeInput(passcode)) {
    return NextResponse.json(
      { ok: false, message: "Kredensial pengelola tidak sesuai." },
      { status: 401 }
    );
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Gagal membuat sesi aman." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}
