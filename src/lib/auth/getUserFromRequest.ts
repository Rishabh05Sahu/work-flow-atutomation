import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}