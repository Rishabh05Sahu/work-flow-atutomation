import { apiFetch } from "@/lib/utils/fetcher";

export async function getCurrentUser() {
  return apiFetch<{
    success: boolean;
    message: string;
    data: {
      userId: string;
      email: string;
    };
  }>("/api/auth/me", {
    method: "GET",
    cache: "no-store",
  });
}

export async function logoutUser() {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
}