"use client";
import Link from "next/link";
import React, { useActionState } from "react";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { useOAuthError } from "@/features/auth/hooks/useOAuthError";
import { loginAction } from "@/features/auth/login/actions/loginAction";
import useLoginForm from "@/features/auth/login/hooks/useLoginForm";

const LoginForm = () => {
  const { values, showPassword, togglePassword, handleChange } = useLoginForm();
  const [state, formAction] = useActionState(loginAction, null);
  useOAuthError("login");
  return (
    <>
      <form
        className="tablet:gap-4 flex flex-col gap-2.5"
        action={formAction}
      >
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          errorMessage={state?.errors?.email}
        />
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleChange}
          errorMessage={state?.errors?.password}
          rightIcon={
            <button
              type="button"
              onClick={togglePassword}
            >
              <Icon
                name={showPassword ? "EyeOnIcon" : "EyeOffIcon"}
                className="text-gray-300"
              />
            </button>
          }
        />
        <Button
          type="submit"
          size="lg"
          className="tablet:hidden desktop:hidden mt-4 w-full"
        >
          로그인하기
        </Button>
        <Button
          type="submit"
          size="xl"
          className="mt-4 hidden w-full md:inline-flex"
        >
          로그인하기
        </Button>
      </form>
      <p className="typography-label-1 mt-6 text-center font-medium">
        테스트메이트가 처음이신가요?{" "}
        <Link
          href="/signup"
          className="typography-body-2 font-semibold text-blue-800"
        >
          회원가입
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
