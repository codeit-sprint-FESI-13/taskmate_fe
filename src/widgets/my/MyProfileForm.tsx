"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

import { userQueries } from "@/entities/auth/query/user.queryKey";
import { logoutAction } from "@/features/auth/logout/actions/logoutAction";
import { useDeleteMeMutation } from "@/features/user/hooks/useDeleteMeMutation/useDeleteMeMutation";
import { useMyProfileForm } from "@/features/user/hooks/useMyProfileForm";
import { useOverlay } from "@/shared/hooks/useOverlay";
import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";
import Input from "@/shared/ui/Input/Input";

import ConfirmModal from "../../shared/ui/ConfirmModal";
import ProfileImageUploader from "./ProfileImageUploader";

const MyProfileForm = () => {
  const router = useRouter();
  const { data: myInfo } = useSuspenseQuery(userQueries.myInfo());
  const {
    values,
    errors,
    isPending,
    showCurrentPassword,
    showPassword,
    showPasswordConfirm,
    handleChange,
    handleBlur,
    toggleCurrentPassword,
    togglePassword,
    togglePasswordConfirm,
    handleSubmit,
  } = useMyProfileForm(myInfo.nickname);
  const { mutate: deleteMe } = useDeleteMeMutation();
  const overlay = useOverlay();

  const handleLogout = () => {
    overlay.open(
      "logout-modal",
      <ConfirmModal
        title="로그아웃 하시겠어요?"
        description="현재 계정에서 로그아웃됩니다."
        confirmLabel="로그아웃"
        cancelLabel="취소"
        onConfirm={async () => {
          await logoutAction();
          router.push("/login");
        }}
        onClose={() => overlay.close()}
      />,
    );
  };

  const handleDeleteMe = () => {
    overlay.open(
      "deleteMe-modal",
      <ConfirmModal
        title="정말 탈퇴하시겠어요?"
        info="탈퇴 후에는 계정과 모든 데이터가 삭제됩니다."
        confirmLabel="탈퇴하기"
        cancelLabel="취소"
        onConfirm={() => deleteMe()}
        onClose={() => overlay.close()}
      />,
    );
  };

  return (
    <div className="mt-20 flex w-full flex-col">
      <p className="tablet:block text-title-3 mb-10 ml-2 hidden font-semibold">
        내 정보 관리
      </p>
      <div className="bg-background-normal tablet:px-8 tablet:pb-10 tablet:gap-12 flex flex-col gap-8 rounded-3xl px-6 pt-10 pb-6">
        <div className="flex justify-center">
          <ProfileImageUploader imageUrl={myInfo.profileImageUrl} />
        </div>
        <form
          className="flex flex-col"
          id="profileForm"
          onSubmit={handleSubmit}
        >
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
                name="email"
                disabled
                value={myInfo.email}
              />
            </div>
            <div className="tablet:gap-2 flex flex-col gap-1.5">
              <label
                htmlFor="nickname"
                className="text-label-1 text-label-normal tablet:mb-2 font-semibold"
              >
                닉네임
              </label>
              <Input
                id="nickname"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.nickname}
              />
            </div>
          </div>
          <p className="text-label-1 text-label-normal tablet:mt-10 mt-3.5 font-semibold">
            비밀번호 변경
          </p>
          <div className="tablet:gap-3 tablet:mt-2 mt-1.5 flex flex-col gap-1.5">
            <Input
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="현재 비밀번호를 입력해주세요"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.currentPassword}
              rightIcon={
                <button
                  type="button"
                  onClick={toggleCurrentPassword}
                >
                  <Icon
                    name={showCurrentPassword ? "EyeOnIcon" : "EyeOffIcon"}
                    className="text-gray-300"
                  />
                </button>
              }
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="새 비밀번호를 입력해주세요"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.password}
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
            <Input
              name="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="새 비밀번호를 다시 입력해주세요"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.passwordConfirm}
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
        </form>
        {/* TODO: 반응형 수정하기  */}
        <Button
          type="submit"
          form="profileForm"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          저장하기
        </Button>
      </div>
      {/* TODO: 버튼컴포넌트 생성 후 수정예정 */}
      <div className="tablet:mt-5 tablet:flex-row mt-10 flex flex-col justify-end gap-2 px-2">
        <button
          type="button"
          onClick={handleLogout}
          className="text-label-1 h-12 rounded-[10px] bg-blue-100 px-7 py-3 font-semibold text-blue-800"
        >
          로그아웃
        </button>
        <button
          type="button"
          onClick={handleDeleteMe}
          className="text-label-1 bg-background-normal-alternative-2 h-12 rounded-[10px] px-7 py-3 font-semibold text-gray-500 ring ring-gray-200"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyProfileForm;
