"use server";

import { redirect } from "next/navigation";
import z from "zod";

import { loginSchema } from "@/features/auth/login/types/login.type";
import { setTokenCookiesServerAction } from "@/shared/lib/auth/cookies";

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
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.code === "USER_LOGIN_PASSWORD_INCORRECT") {
        return { errors: { password: errorData.message } };
      } else if (errorData.code === "USER_LOGIN_EMAIL_NOT_REGISTERED") {
        return { errors: { email: errorData.message } };
      } else {
        return {
          errors: { message: errorData.message },
        };
      }
    }

    const data = await response.json();
    await setTokenCookiesServerAction(
      data.data.accessToken,
      data.data.refreshToken,
    );
  } catch {
    return { errors: { message: "서버와 통신할 수 없습니다." } };
  }
  redirect("/taskmate");
}
