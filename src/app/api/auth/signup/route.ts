import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { signupUser } from "@/lib/services/auth.service";
import { errorResponse } from "@/lib/utils/api-response";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { user, token } = await signupUser(body);

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        data: user,
      },
      { status: 201 }
    );

    const isSecure = request.nextUrl.protocol === "https";

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create account";
    return errorResponse(message, 400);
  }
}