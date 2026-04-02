"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { loginSchema } from "@/features/auth/login/types/login.type";

type LoginState = {
  errors?: {
    email?: string;
    password?: string;
    message?: string;
  };
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  // TODO: 백엔드 배포 후 테스트 필요
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      errors: { message: errorData.message },
    };
  }

  const data = await response.json();
  const cookieStore = await cookies();

  cookieStore.set("accessToken", data.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 59,
  });

  cookieStore.set("refreshToken", data.data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/taskmate");
}
