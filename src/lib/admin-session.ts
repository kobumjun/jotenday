import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getAdminSessionSecret } from "@/lib/env";

const COOKIE_NAME = "joeultende_admin";
const MAX_AGE_SEC = 60 * 60 * 12;

function signPayload(payloadB64: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(payloadB64).digest("base64url");
}

export function createAdminSessionToken() {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payloadB64 = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const sig = signPayload(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token?.includes(".")) return false;
  const dot = token.lastIndexOf(".");
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = signPayload(payloadB64);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(payloadB64, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminSession() {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(COOKIE_NAME)?.value);
}

export async function assertAdminSession() {
  if (!(await isAdminSession())) {
    throw new Error("관리자 인증이 필요합니다.");
  }
}
