import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { getDashboardOverview } from "@/lib/services/dashboard.service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    const overview = await getDashboardOverview(user.userId);
    return successResponse("Dashboard overview fetched successfully", overview);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch dashboard overview";
    return errorResponse(message, 500);
  }
}