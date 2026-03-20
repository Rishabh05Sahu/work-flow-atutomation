import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { toggleWorkflow } from "@/lib/services/workflow.service";

type Context = {
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

    const { id } = await context.params;

    const workflow = await toggleWorkflow(user.userId, id);

    return successResponse("Workflow updated successfully", workflow);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update workflow";
    return errorResponse(message, 400);
  }
}