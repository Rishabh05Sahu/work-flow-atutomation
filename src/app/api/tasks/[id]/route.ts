import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { updateTask } from "@/lib/services/task.service";

type Context = {
  // Next is telling us params behaves like a Promise here
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, context: Context) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    // Unwrap params before using
    const { id } = await context.params;

    const task = await updateTask(user.userId, id, body);

    return successResponse("Task updated successfully", task);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update task";

    const status = message === "Task not found" ? 404 : 400;

    return errorResponse(message, status);
  }
}