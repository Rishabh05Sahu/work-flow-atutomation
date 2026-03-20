import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { getLogs } from "@/lib/services/log.service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const logs = await getLogs(user.userId);
    return successResponse("Logs fetched successfully", logs);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch logs";
    return errorResponse(message, 500);
  }
}