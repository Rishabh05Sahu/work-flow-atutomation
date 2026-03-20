import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(request);

    if (!user) {
      return errorResponse("Unauthorized", 401);
    }

    return successResponse("User fetched successfully", user);
  } catch {
    return errorResponse("Failed to fetch user", 500);
  }
}