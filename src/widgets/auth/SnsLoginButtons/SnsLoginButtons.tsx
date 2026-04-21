"use client";
import { AuthFormType } from "@/entities/auth/types/auth.type";
import SocialButton from "@/shared/ui/Button/SocialButton/SocialButton";

const SnsLoginButtons = ({
  label,
  type,
}: {
  label: string;
  type: AuthFormType;
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-gray-200" />
        <p className="text-label-alternative text-label-1 font-medium">
          {label}
        </p>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="flex gap-4">
        <SocialButton
          social="google"
          from={type}
        />
        <SocialButton
          social="kakao"
          from={type}
        />
      </div>
    </div>
  );
};

export default SnsLoginButtons;
