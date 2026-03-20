import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { createWorkflow, getWorkflows } from "@/lib/services/workflow.service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const workflows = await getWorkflows(user.userId);
    return successResponse("Workflows fetched successfully", workflows);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch workflows";
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
    const workflow = await createWorkflow(user.userId, body);

    return successResponse("Workflow created successfully", workflow, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create workflow";
    return errorResponse(message, 400);
  }
}