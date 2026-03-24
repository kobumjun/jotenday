import { getAuthEmailDomain } from "@/lib/env";

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
}

export function usernameToAuthEmail(username: string) {
  const normalized = normalizeUsername(username);
  return `${normalized}@${getAuthEmailDomain()}`;
}
