import jwt from "jsonwebtoken";
import { AuthUserPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function signToken(payload: AuthUserPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthUserPayload {
  return jwt.verify(token, JWT_SECRET) as AuthUserPayload;
}