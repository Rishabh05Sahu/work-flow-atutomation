import { apiFetch } from "@/lib/utils/fetcher";
import { IWorkflow } from "@/types/workflow";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getAllWorkflows() {
  return apiFetch<ApiResponse<IWorkflow[]>>("/api/workflows", {
    method: "GET",
    cache: "no-store",
  });
}

export async function createWorkflowRequest(payload: {
  trigger: "task_created" | "task_updated";
  action: "log_message" | "save_db_entry";
  message: string;
}) {
  return apiFetch<ApiResponse<IWorkflow>>("/api/workflows", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function toggleWorkflowRequest(workflowId: string) {
  return apiFetch<ApiResponse<IWorkflow>>(`/api/workflows/${workflowId}/toggle`, {
    method: "PATCH",
  });
}