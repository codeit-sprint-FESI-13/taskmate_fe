"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { loginSchema } from "@/features/auth/login/types/login.type";

type LoginState = {
  errors?: {
    email?: string;
    password?: string;
    message?: string; // 서버 에러 (이메일/비번 불일치 등)
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

  const response = await fetch("https://api.example.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // ← 먼저 파싱
    return {
      errors: { message: errorData.message },
    };
  }

  const data = await response.json();

  // httpOnly 쿠키에 저장
  const cookieStore = await cookies();

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true, // ← JS 접근 차단
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 14, // 14분 (만료 1분 전)
  });

  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 59, // 59분 (만료 1분 전)
  });

  // 4단계: 로그인 성공 → 메인 페이지로 이동
  redirect("/");
}
