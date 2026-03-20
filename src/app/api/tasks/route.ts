import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { createTask, getTasks } from "@/lib/services/task.service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const tasks = await getTasks(user.userId);

    return successResponse("Tasks fetched successfully", tasks);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch tasks";
    return errorResponse(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const task = await createTask(user.userId, body);

    return successResponse("Task created successfully", task, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create task";
    return errorResponse(message, 400);
  }
}