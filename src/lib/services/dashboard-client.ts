import { apiFetch } from "@/lib/utils/fetcher";
import { ILog } from "@/types/log";

type DashboardOverviewResponse = {
  success: boolean;
  message: string;
  data: {
    stats: {
      totalTasks: number;
      activeWorkflows: number;
      totalLogs: number;
      successRate: number;
    };
    recentLogs: ILog[];
  };
};

export async function getDashboardOverviewRequest() {
  return apiFetch<DashboardOverviewResponse>("/api/dashboard/overview", {
    method: "GET",
    cache: "no-store",
  });
}