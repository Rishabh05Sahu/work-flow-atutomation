import { apiFetch } from "@/lib/utils/fetcher";
import { ILog } from "@/types/log";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getAllLogs() {
  return apiFetch<ApiResponse<ILog[]>>("/api/logs", {
    method: "GET",
    cache: "no-store",
  });
}