import Link from "next/link";
import React from "react";

import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";

const SignupForm = () => {
  return (
    <>
      <form className="tablet:gap-4 flex w-full flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="typography-label-1 font-semibold"
          >
            이름
          </label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="typography-label-1 font-semibold"
          >
            이메일
          </label>
          <Input
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
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
            type="password"
            placeholder="비밀번호를 입력해주세요"
            rightIcon={
              <button>
                <Icon
                  name="EyeOnIcon"
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
            name="password"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            rightIcon={
              <button>
                <Icon
                  name="EyeOnIcon"
                  className="text-gray-300"
                />
              </button>
            }
          />
        </div>
        <button className="mt-4">회원가입하기</button>
      </form>
      <p className="typography-body-2 mt-6 text-center font-medium">
        이미 회원이신가요?{" "}
        <Link
          href=""
          className="typography-body-2 font-semibold text-blue-800"
        >
          로그인하기
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
