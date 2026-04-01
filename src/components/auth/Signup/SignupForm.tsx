"use client";
import Link from "next/link";
import React, { Suspense } from "react";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { useOAuthError } from "@/features/auth/hooks/useOAuthError";
import useSignupForm from "@/features/auth/signup/hooks/useSignupForm";

// TODO : 이메일 중복 체크 디자인 수정 예정
const SignupForm = () => {
  const {
    values,
    errors,
    showPassword,
    showPasswordConfirm,
    togglePassword,
    togglePasswordConfirm,
    handleSubmit,
    handleChange,
    handleBlur,
    handleEmailDuplicate,
    isEmailChecked,
  } = useSignupForm();

  // useSearchParams() 사용으로 인한 CSR Suspense 추가
  const OAuthErrorHandler = () => {
    useOAuthError("signup");
    return null;
  };

  return (
    <>
      <Suspense fallback={null}>
        <OAuthErrorHandler />
      </Suspense>
      <form
        className="tablet:gap-4 flex w-full flex-col gap-3.5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="nickname"
            className="typography-label-1 font-semibold"
          >
            이름
          </label>
          <Input
            id="nickname"
            name="nickname"
            placeholder="이름을 입력해주세요"
            value={values.nickname}
            onChange={handleChange}
            errorMessage={errors.nickname}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label
              htmlFor="email"
              className="typography-label-1 font-semibold"
            >
              이메일
            </label>
            <button
              type="button"
              className="text-xs"
              onClick={handleEmailDuplicate}
            >
              이메일중복체크
            </button>
          </div>

          <Input
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            onChange={handleChange}
            errorMessage={errors.email}
            onBlur={handleBlur}
            supportingText={
              isEmailChecked ? "사용가능한 이메일입니다." : undefined
            }
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="typography-label-1 font-semibold"
          >
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
            errorMessage={errors.password}
            onBlur={handleBlur}
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
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="passwordConfirm"
            className="typography-label-1 font-semibold"
          >
            비밀번호 확인
          </label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={values.passwordConfirm}
            onChange={handleChange}
            errorMessage={errors.passwordConfirm}
            onBlur={handleBlur}
            rightIcon={
              <button
                type="button"
                onClick={togglePasswordConfirm}
              >
                <Icon
                  name={showPasswordConfirm ? "EyeOnIcon" : "EyeOffIcon"}
                  className="text-gray-300"
                />
              </button>
            }
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="mt-4 w-full"
        >
          회원가입하기
        </Button>
      </form>
      <p className="typography-body-2 mt-6 text-center font-medium">
        이미 회원이신가요?{" "}
        <Link
          href="/login"
          className="typography-body-2 font-semibold text-blue-800"
        >
          로그인하기
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
