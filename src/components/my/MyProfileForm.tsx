import React from "react";

import Button from "../common/Button/Button";
import { Icon } from "../common/Icon";
import Input from "../common/Input";

const MyProfileForm = () => {
  return (
    <div className="tablet:w-[560px] mx-auto w-[335px]">
      <div className="bg-background-normal tablet:px-8 tablet:pb-10 rounded-3xl px-6 pt-5 pb-6">
        <form className="flex flex-col">
          <div className="tablet:gap-4 flex flex-col gap-3.5">
            <div className="tablet:gap-2 flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-label-1 text-label-normal tablet:mb-2 font-semibold"
              >
                이메일
              </label>
              <Input
                id="email"
                disabled
              />
            </div>
            <div className="tablet:gap-2 flex flex-col gap-1.5">
              <label
                htmlFor="nickname"
                className="text-label-1 text-label-normal font-semibold"
              >
                닉네임
              </label>
              <Input id="nickname" />
            </div>
          </div>
          <label className="text-label-1 text-label-normal tablet:mt-10 mt-3.5 font-semibold">
            비밀번호 변경
          </label>
          <div className="tablet:gap-3 tablet:mt-2 mt-1.5 flex flex-col gap-1.5">
            <Input
              id="currentPassword"
              placeholder="현재 비밀번호를 입력해주세요"
              rightIcon={
                <button
                  type="button"
                  //onClick={togglePassword}
                >
                  <Icon
                    //   name={showPassword ? "EyeOnIcon" : "EyeOffIcon"}
                    name="EyeOffIcon"
                    className="text-gray-300"
                  />
                </button>
              }
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              rightIcon={
                <button type="button">
                  <Icon
                    name="EyeOffIcon"
                    className="text-gray-300"
                  />
                </button>
              }
            />
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              rightIcon={
                <button type="button">
                  <Icon
                    //   name={showPassword ? "EyeOnIcon" : "EyeOffIcon"}
                    name="EyeOffIcon"
                    className="text-gray-300"
                  />
                </button>
              }
            />
          </div>
          {/* TODO: 반응형 수정하기  */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="tablet:mt-12 mt-4"
          >
            저장하기
          </Button>
        </form>
      </div>
      {/* TODO: 버튼컴포넌트 생성 후 수정예정 */}
      <div className="tablet:mt-5 tablet:flex-row mt-10 flex flex-col justify-end gap-2 px-2">
        <button className="text-label-1 h-12 rounded-[10px] bg-blue-100 px-7 py-3 font-semibold text-blue-800">
          로그아웃
        </button>
        <button className="text-label-1 bg-background-normal-alternative-2 h-12 rounded-[10px] px-7 py-3 font-semibold text-gray-500 ring ring-gray-200">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyProfileForm;
