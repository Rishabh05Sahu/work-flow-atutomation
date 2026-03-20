import { NextResponse } from "next/server";

export function successResponse(message: string, data?: unknown, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data: data ?? null,
    },
    { status }
  );
}

export function errorResponse(message: string, status = 500, error?: unknown) {
  return NextResponse.json(
    {
      success: false,
      message,
      error: error ?? null,
    },
    { status }
  );
}