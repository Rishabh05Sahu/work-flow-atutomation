import { apiFetch } from "@/lib/utils/fetcher";
import { ITask, TaskStatus } from "@/types/task";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getAllTasks() {
  return apiFetch<ApiResponse<ITask[]>>("/api/tasks", {
    method: "GET",
    cache: "no-store",
  });
}

export async function createTaskRequest(payload: {
  title: string;
  status?: TaskStatus;
}) {
  return apiFetch<ApiResponse<ITask>>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTaskRequest(
  taskId: string,
  payload: {
    title?: string;
    status?: TaskStatus;
  }
) {
  return apiFetch<ApiResponse<ITask>>(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}