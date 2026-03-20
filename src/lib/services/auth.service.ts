import { User } from "@/models/User";
import { hashPassword, comparePassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";
import { signupSchema, loginSchema } from "@/lib/validations/auth";

export async function signupUser(body: unknown) {
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid input");
  }

  const { email, password } = parsed.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
    token,
  };
}

export async function loginUser(body: unknown) {
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid input");
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
    token,
  };
}