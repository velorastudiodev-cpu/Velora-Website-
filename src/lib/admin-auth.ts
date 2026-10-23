import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "velora_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export function isAdminAuthConfigured(): boolean {
  const passcode = process.env.ADMIN_PASSCODE?.trim() || "";
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || "";
  return passcode.length >= 8 && secret.length >= 16;
}

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminSessionToken(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || "";
  if (secret.length < 16) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const nonce = crypto.randomBytes(12).toString("hex");
  const payload = `admin.${exp}.${nonce}`;
  const sig = signPayload(payload, secret);
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || "";
  if (!token || secret.length < 16) return false;

  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [role, expStr, nonce, sig] = parts;
  if (role !== "admin" || !nonce || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = signPayload(`${role}.${expStr}.${nonce}`, secret);
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyPasscodeInput(input: string): boolean {
  const configured = process.env.ADMIN_PASSCODE?.trim() || "";
  if (configured.length < 8 || !input) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(configured).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function isServerAdminAuthenticated(): Promise<boolean> {
  if (!isAdminAuthConfigured()) return false;
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export const ADMIN_COOKIE_MAX_AGE = SESSION_TTL_SECONDS;
